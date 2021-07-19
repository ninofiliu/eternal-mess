import { fps, runCopySegment, runGlideSegment, runMovementSegment, weightedRandomPick } from './mosh.lib';
import { durations, fetchShifts, names } from './sources';

const w = 370;
const h = 188;

export default async () => {
  console.time('fetching shifts');
  const shifts = await fetchShifts(w, h, names);
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
      const name = weightedRandomPick(durations);
      const src = `/in/${w}x${h}/${name}`;
      const transform = first ? 'copyGlide' : weightedRandomPick({
        glide: 2,
        movement: 2,
        copyGlide: 3,
        copy: 1,
      });
      const start = Math.random() * durations[name];
      const duration = Math.random() * Math.min(3, (durations[name] - start));
      first = false;

      console.log({ name, transform, start, duration });

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
        case 'copyGlide':
          await runCopySegment({
            transform: 'copy',
            src,
            start,
            end: start + duration,
          }, ctx);
          await runGlideSegment({
            transform: 'glide',
            src,
            time: start,
            length: Math.random() * 3,
            shift: shifts[name][~~((start + duration) * fps)],
          }, ctx);
      }
    } catch (e) {
      console.log(e);
    }
  }
};
