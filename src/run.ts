import { fps, runCopySegment, runGlideSegment, runMovementSegment, weightedRandomPick } from './mosh.lib';
import { fetchDurations, fetchShiftss, images } from './sources';
import { runNewImage, runOverlayImage } from './spiral.lib';

const w = 800;
const h = 450;

export default async () => {
  console.time('fetching durations');
  const durations = await fetchDurations(w, h);
  console.timeEnd('fetching durations');

  console.time('fetching shifts');
  const shiftss = await fetchShiftss(w, h);
  console.timeEnd('fetching shifts');

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  document.body.style.margin = '0';
  document.body.style.overflow = 'hidden';
  document.body.append(canvas);

  let first = true;

  let recording = false;
  let recorder: MediaRecorder;
  document.addEventListener('keypress', ({ key }) => {
    if (key !== 'p') return;
    if (recording) {
      recorder.addEventListener('dataavailable', ({ data }) => {
        const video = document.createElement('video');
        video.src = URL.createObjectURL(data);
        video.controls = true;
        document.body.append(video);
      }, { once: true });
      recorder.stop();
      recording = false;
    } else {
      // @ts-ignore
      const stream = canvas.captureStream();
      recorder = new MediaRecorder(stream);
      recorder.start();
      recording = true;
    }
  });

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      if (Math.random() < 0.2) {
        if (Math.random() < 0.8) {
          await runOverlayImage(ctx, w, h);
        } else {
          const name = images[~~(Math.random() * images.length)];
          const src = `/in/images/${name}`;
          await runNewImage(src, ctx, w, h);
        }
      } else {
        const name = weightedRandomPick(durations);
        const src = `/in/${w}x${h}/${name}`;
        const transform = first ? 'copy' : weightedRandomPick({
          copy: 1,
          glide: 2,
          movement: 2,
          copyGlide: 3,
        });
        const start = Math.random() * durations[name];
        const duration = Math.random() * Math.min(3, (durations[name] - start));
        first = false;

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
              shift: shiftss[name][~~(start * fps)],
            }, ctx);
            break;
          case 'movement':
            await runMovementSegment({
              transform: 'movement',
              src,
              start,
              end: start + duration,
              shifts: shiftss[name].splice(
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
              shift: shiftss[name][~~((start + duration) * fps)],
            }, ctx);
            break;
        }
      }
    } catch (e) {
      console.log(e);
    }
  }
};
