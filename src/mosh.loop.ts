import { fps, runCopySegment, runGlideSegment, runMovementSegment } from './lib';
import { durations } from './sources';
import { Shift } from './types';

const w = 370;
const h = 188;
const names = ['close-ups.webm', 'girl-in-plastic.mp4', 'helmet-1.mp4'];

export default async () => {
  console.time('fetching shifts');
  const shifts: {[name: string]: Shift[]} = {};
  for (const name of names) {
    const resp = await fetch(`/in/${w}x${h}/${name}.shifts.json`);
    shifts[name] = await resp.json() as Shift[];
  }
  console.timeEnd('fetching shifts');

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');

  let first = true;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const name = names[~~(Math.random() * names.length)];
      const src = `/in/${w}x${h}/${name}`;
      const transform = first ? 'copy' : ['copy', 'glide', 'movement'][~~(Math.random() * 3)];
      const start = Math.random() * durations[name];
      const duration = Math.random() * Math.min(3, (durations[name] - start));
      first = false;

      console.log({ name, src, transform, start, duration });

      switch (transform) {
        case 'copy':
          await runCopySegment({
            transform: 'copy',
            src,
            start,
            end: start + duration,
          }, ctx);
          break;
        case 'glide':
          await runGlideSegment({
            transform: 'glide',
            src,
            time: start,
            length: duration,
            shift: shifts[name][~~(start * fps)],
          }, ctx);
          break;
        case 'movement':
          await runMovementSegment({
            transform: 'movement',
            src,
            start,
            end: start + duration,
            shifts: shifts[name].splice(
              ~~(start * fps),
              ~~(duration * fps),
            ),
          }, ctx);
          break;
      }
    } catch (e) {
      console.log(e);
    }
  }
};
