export type SpiralParams = {
  ctx: CanvasRenderingContext2D;
  imageData: ImageData;
  channel: 0 | 1 | 2;
  /** between 0 and 1 */
  stopAt: number;
} & (
  | {
    kind: 'basic';
    /** between 0 and 1 */
    treshold: number;
  }
  | {
    kind: 'linear';
    /** starting at 1 */
    divider: number;
  }
  | {
    kind: 'looped';
    /** starting at 1 */
    divider: number;
    /** starting at 1 */
    multiplier: number;
  } | {
    kind: 'compressed';
    divider: number;
    multiplier: number;
    quality: number;
  }
);

export const createSpiral = (params: SpiralParams) => {
  const { width, height } = params.imageData;

  const state = {
    x: Math.floor(width / 2),
    y: Math.floor(height / 2),
    done: false,
  };

  const stopFn = (() => {
    switch (params.kind) {
      case 'basic': return (l: number) => l < params.treshold;
      case 'linear': return (l: number, i: number) => l < (i / params.divider);
      case 'looped': return (l: number, i: number) => ((l * params.multiplier) % 1) < (i / params.divider);
      case 'compressed': return (l: number, i: number) => (((Math.floor(l * params.quality) / params.quality) * params.multiplier) % 1) < (i / params.divider);
    }
  })();

  const createMatrix = (fn) => (new Array(width)).fill(null).map((_, x) => (
    (new Array(height)).fill(null).map((__, y) => (
      fn(x, y)
    ))
  ));

  const src = createMatrix((x, y) => params.imageData.data[4 * (width * y + x) + params.channel] / 256);
  const drawn = createMatrix(() => false);

  const isInCanvas = ({ x, y }) => x >= 0 && x < width && y >= 0 && y < height;

  function* spiralPositions() {
    const spiralPosition = {
      x: state.x,
      y: state.y,
    };
    for (let l = 1; l < Math.max(width, height); l += 2) {
      for (let i = 0; i < l; i++) {
        spiralPosition.x++;
        if (isInCanvas(spiralPosition)) yield spiralPosition;
      }
      for (let i = 0; i < l; i++) {
        spiralPosition.y++;
        if (isInCanvas(spiralPosition)) yield spiralPosition;
      }
      for (let i = 0; i < l + 1; i++) {
        spiralPosition.x--;
        if (isInCanvas(spiralPosition)) yield spiralPosition;
      }
      for (let i = 0; i < l + 1; i++) {
        spiralPosition.y--;
        if (isInCanvas(spiralPosition)) yield spiralPosition;
      }
    }
  }

  let nbDrawn = 0;
  const move = () => {
    let i = 0;
    for (const spiralPosition of spiralPositions()) {
      i++;
      const { x, y } = spiralPosition;
      if (!drawn[x][y]) {
        if (stopFn(src[x][y], i)) {
          state.x = x;
          state.y = y;
          drawn[x][y] = true;
          nbDrawn++;
          if (nbDrawn > width * height * params.stopAt) state.done = true;
          return;
        }
      }
    }
    state.done = true;
  };

  return Object.assign(state, { move });
};

export const getCoveredImageData = async (src: string, w: number, h: number): Promise<ImageData> => {
  const image = new Image();
  image.src = src;
  await new Promise((r) => { image.onload = r; });

  const srcRatio = image.width / image.height;
  const dstRatio = w / h;
  const srcWidth = srcRatio < dstRatio
    ? image.width
    : image.width * (dstRatio / srcRatio);
  const srcHeight = srcRatio < dstRatio
    ? image.height * (srcRatio / dstRatio)
    : image.height;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    image,
    (image.width - srcWidth) / 2,
    (image.height - srcHeight) / 2,
    srcWidth,
    srcHeight,
    0, 0, w, h,
  );

  return ctx.getImageData(0, 0, w, h);
};

export const runImage = async (src: string, ctx: CanvasRenderingContext2D, w: number, h: number): Promise<void> => {
  const batch = 200;
  ctx.fillStyle = 'red';

  const imageData = await getCoveredImageData(src, w, h);
  const channels = [0, 1, 2] as const;
  const spirals = channels.map((channel) => createSpiral({
    ctx,
    imageData,
    channel,
    stopAt: 0.5,
    kind: 'compressed',
    divider: 10,
    multiplier: 2,
    quality: 5,
  }));

  // eslint-disable-next-line no-constant-condition
  while (true) {
    console.log(0);
    for (let i = 0; i < batch; i++) {
      if (spirals.every((spiral) => spiral.done)) return;
      for (const spiral of spirals) {
        ctx.fillRect(spiral.x, spiral.y, 1, 1);
        spiral.move();
      }
    }
    await new Promise((resolve) => requestAnimationFrame(resolve));
  }
};
