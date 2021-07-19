import { fps, runCopySegment, runGlideSegment, runMovementSegment } from './lib';
import { durations, fetchShifts } from './sources';

const w = 370;
const h = 188;
// echo *.json | fmt -w 1 | rev | colrm 1 12 | rev | tr $'\n' ' ' | cc
const names = 'close-ups.webm face-0.mp4 face-1.mp4 face-2.mp4 face-3.mp4 girl-in-plastic.mp4 hands-0.mp4 hands-1.mp4 hands-plastic-0.mp4 hands-plastic-1.mp4 helmet-0.mp4 helmet-1.mp4'.split(' ');

export default async () => {
  console.time('fetching shifts');
  const shifts = await fetchShifts(w, h, names);
  console.timeEnd('fetching shifts');

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  document.body.append(canvas);
  const ctx = canvas.getContext('2d');

  // @ts-ignore
  const stream = canvas.captureStream();
  const recorder = new MediaRecorder(stream);
  recorder.start();

  let first = true;

  // eslint-disable-next-line no-constant-condition
  for (let i = 0; i < 10; i++) {
    console.log(i);
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

  recorder.addEventListener('dataavailable', (evt) => {
    const blob = evt.data;
    const src = URL.createObjectURL(blob);
    const video = document.createElement('video');
    video.src = src;
    document.body.append(video);
  });
  recorder.stop();
};
