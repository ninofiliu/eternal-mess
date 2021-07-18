import {
  Shift,
  Segment,
  MovementSegment,
  GlideSegment,
  PreparedMovementSegment,
  PreparedGlideSegment,
  PreparedCopySegment,
} from './types';

export const fps = 30;
const size = 16;
const shiftOptions = [0, 1, -1, 2, -2, 4, -4, 8, -8];

export const getShift = (previous: ImageData, real: ImageData) => {
  const { width, height } = previous;
  const shift: Shift = {};

  for (let xOffset = 0; xOffset < width; xOffset += size) {
    if (!shift[xOffset]) shift[xOffset] = [];
    for (let yOffset = 0; yOffset < height; yOffset += size) {
      if (!shift[xOffset][yOffset]) shift[xOffset][yOffset] = { x: NaN, y: NaN };

      const xMax = Math.min(xOffset + size, width);
      const yMax = Math.min(yOffset + size, height);

      let minDiff = +Infinity;
      for (const xShift of shiftOptions) {
        for (const yShift of shiftOptions) {
          let diff = 0;

          for (let x = xOffset; x < xMax; x++) {
            for (let y = yOffset; y < yMax; y++) {
              const xsrc = (x + xShift + width) % width;
              const ysrc = (y + yShift + height) % height;
              const isrc = 4 * (width * ysrc + xsrc);
              const idst = 4 * (width * y + x);
              diff += Math.abs(previous.data[isrc + 0] - real.data[idst + 0]);
              diff += Math.abs(previous.data[isrc + 1] - real.data[idst + 1]);
              diff += Math.abs(previous.data[isrc + 2] - real.data[idst + 2]);
            }
          }

          if (diff < minDiff) {
            minDiff = diff;
            shift[xOffset][yOffset].x = xShift;
            shift[xOffset][yOffset].y = yShift;
          }
        }
      }
    }
  }

  return shift;
};

export const approximate = (previous: ImageData, shift: Shift): ImageData => {
  const { width, height } = previous;
  const out = new ImageData(width, height);

  for (let i = 3; i < out.data.length; i += 4) {
    out.data[i] = 255;
  }

  for (let xOffset = 0; xOffset < width; xOffset += size) {
    for (let yOffset = 0; yOffset < height; yOffset += size) {
      const xMax = Math.min(xOffset + size, width);
      const yMax = Math.min(yOffset + size, height);

      for (let x = xOffset; x < xMax; x++) {
        for (let y = yOffset; y < yMax; y++) {
          const xsrc = (x + shift[xOffset][yOffset].x + width) % width;
          const ysrc = (y + shift[xOffset][yOffset].y + height) % height;
          const isrc = 4 * (width * ysrc + xsrc);
          const idst = 4 * (width * y + x);
          out.data[idst + 0] = previous.data[isrc + 0];
          out.data[idst + 1] = previous.data[isrc + 1];
          out.data[idst + 2] = previous.data[isrc + 2];
        }
      }
    }
  }

  return out;
};

export const elementEvent = (element: HTMLElement, eventName: string) => new Promise((resolve) => {
  element.addEventListener(eventName, resolve, { once: true });
});

export const getDimensions = async (segments: Segment[]): Promise<{width: number; height: number}> => {
  const allDimensions = await Promise.all(segments.map(async (segment) => {
    const video = document.createElement('video');
    video.src = segment.src;
    await elementEvent(video, 'canplay');
    const width = video.videoWidth;
    const height = video.videoHeight;
    return { width, height };
  }));
  const widths = new Set(allDimensions.map((d) => d.width));
  const heights = new Set(allDimensions.map((d) => d.height));
  if (widths.size > 1 || heights.size > 1) {
    throw new Error('Videos do not all have the same dimensions');
  }
  return {
    width: [...widths][0],
    height: [...heights][0],
  };
};

export const prepareGlideSegment = async (segment: GlideSegment, renderRoot: HTMLElement): Promise<PreparedGlideSegment> => {
  const video = document.createElement('video');
  renderRoot.append(video);
  video.src = segment.src;
  await elementEvent(video, 'canplaythrough');

  const width = video.videoWidth;
  const height = video.videoHeight;

  const canvas = document.createElement('canvas');
  renderRoot.append(canvas);
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  video.currentTime = segment.time;
  await elementEvent(video, 'seeked');
  ctx.drawImage(video, 0, 0);
  const previous = ctx.getImageData(0, 0, width, height);

  const real = await (async () => {
    while (!video.ended) {
      video.currentTime += 1 / fps;
      await elementEvent(video, 'seeked');
      await new Promise((resolve) => requestAnimationFrame(resolve));
      ctx.drawImage(video, 0, 0);
      const ret = ctx.getImageData(0, 0, width, height);
      if (ret.data.filter((r, i) => r !== previous.data[i]).length > 100) {
        return ret;
      }
    }
    throw new Error('All frames are almost identical');
  })();

  const shift = getShift(previous, real);

  video.remove();
  canvas.remove();
  return { ...segment, shift };
};

export const prepareMovementSegment = async (segment: MovementSegment, renderRoot: HTMLElement): Promise<PreparedMovementSegment> => {
  const video = document.createElement('video');
  renderRoot.append(video);
  video.src = segment.src;
  await elementEvent(video, 'canplaythrough');

  const width = video.videoWidth;
  const height = video.videoHeight;

  const canvas = document.createElement('canvas');
  renderRoot.append(canvas);
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  video.currentTime = segment.start;
  await elementEvent(video, 'seeked');

  const shifts: Shift[] = [];

  while (video.currentTime < segment.end) {
    ctx.drawImage(video, 0, 0);
    const previous = ctx.getImageData(0, 0, width, height);
    video.currentTime += 1 / fps;
    await elementEvent(video, 'seeked');
    ctx.drawImage(video, 0, 0);
    const real = ctx.getImageData(0, 0, width, height);
    shifts.push(getShift(previous, real));
  }

  video.remove();
  canvas.remove();

  return { ...segment, shifts };
};

export const runCopySegment = async (segment: PreparedCopySegment, ctx: CanvasRenderingContext2D, renderRoot?: HTMLElement): Promise<void> => {
  const video = document.createElement('video');
  video.src = segment.src;
  if (renderRoot) renderRoot.append(video);
  await elementEvent(video, 'canplay');
  video.currentTime = segment.start;
  await elementEvent(video, 'seeked');
  while (video.currentTime < segment.end) {
    ctx.drawImage(video, 0, 0);
    video.currentTime += 1 / fps;
    await elementEvent(video, 'seeked');
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
  if (renderRoot) video.remove();
};

export const runGlideSegment = async (segment: PreparedGlideSegment, ctx: CanvasRenderingContext2D): Promise<void> => {
  for (let i = 0; i < segment.length * fps; i++) {
    const previous = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const next = approximate(previous, segment.shift);
    ctx.putImageData(next, 0, 0);
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};

export const runMovementSegment = async (segment: PreparedMovementSegment, ctx: CanvasRenderingContext2D): Promise<void> => {
  for (const shift of segment.shifts) {
    const previous = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
    const next = approximate(previous, shift);
    ctx.putImageData(next, 0, 0);
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
