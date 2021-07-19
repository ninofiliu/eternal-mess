import { approximate, elementEvent } from './mosh.lib';
import { fetchShifts } from './sources';
import { Shift } from './types';

export default async () => {
  const w = 370;
  const h = 188;
  const name = 'helmet-1.mp4';

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');

  const video = document.createElement('video');
  video.src = `/in/${w}x${h}/${name}`;
  await elementEvent(video, 'canplaythrough');

  const shifts = (await fetchShifts(w, h, [name]))[name];

  ctx.drawImage(video, 0, 0);
  for (const shift of shifts as Shift[]) {
    const previous = ctx.getImageData(0, 0, w, h);
    const next = approximate(previous, shift);
    ctx.putImageData(next, 0, 0);
    await new Promise((r) => requestAnimationFrame(r));
  }
};
