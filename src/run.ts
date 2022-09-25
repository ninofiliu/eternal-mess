import {
  fps,
  runCopySegment,
  runGlideSegment,
  runMovementSegment,
  weightedRandomPick,
} from "./mosh.lib";
import { fetchDurations, fetchShiftss } from "./sources";
import { runNewImage, runOverlayImage, runRevealImage } from "./spiral.lib";
import { Flavor } from "./types";

const w = 480;
const h = 270;

export default async (flavor: Flavor) => {
  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";
  document.body.style.cursor = "none";
  document.body.style.fontFamily = "monospace";
  document.body.style.color = "white";

  const fetchElt = document.createElement("p");
  document.body.append(fetchElt);

  const audio = new Audio("/poem.mp3");
  audio.loop = true;
  audio.addEventListener("canplay", () => {
    audio.play();
  });

  console.time("fetching durations");
  const durations = await fetchDurations(flavor.names, w, h, fetchElt);
  console.timeEnd("fetching durations");

  console.time("fetching shifts");
  const shiftss = await fetchShiftss(flavor.names, w, h, fetchElt);
  console.timeEnd("fetching shifts");

  fetchElt.remove();

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");

  document.body.append(canvas);

  let first = true;

  let recording = false;
  let recorder: MediaRecorder;
  document.addEventListener("keypress", ({ key }) => {
    if (key !== "p") return;
    if (recording) {
      recorder.addEventListener(
        "dataavailable",
        ({ data }) => {
          const video = document.createElement("video");
          video.src = URL.createObjectURL(data);
          video.controls = true;
          document.body.append(video);
        },
        { once: true }
      );
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

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, w, h);

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const name = flavor.names[~~(Math.random() * flavor.names.length)];
      const src = `/in/${w}x${h}/${name}`;
      const duration =
        Math.random() * Math.min(durations[name], flavor.maxDuration);
      const start = Math.random() * (durations[name] - duration);
      const imageName =
        flavor.imageNames[~~(Math.random() * flavor.imageNames.length)];
      const imageSrc = `/in/images/${imageName}`;

      const transform = first ? "copy" : weightedRandomPick(flavor.weigths);
      first = false;

      console.log(transform, name);

      switch (transform) {
        case "new":
          await runNewImage(imageSrc, ctx, w, h);
          break;
        case "overlay":
          await runOverlayImage(ctx, w, h);
          break;
        case "reveal":
          await runRevealImage(imageSrc, ctx, w, h);
          break;
        case "copy":
          await runCopySegment(
            {
              transform: "copy",
              src,
              start,
              end: start + duration,
            },
            ctx
          );
          break;
        case "glide":
          await runGlideSegment(
            {
              transform: "glide",
              src,
              time: start,
              length: duration,
              shift: shiftss[name][~~(start * fps)],
            },
            ctx
          );
          break;
        case "movement":
          await runMovementSegment(
            {
              transform: "movement",
              src,
              start,
              end: start + duration,
              shifts: shiftss[name].splice(~~(start * fps), ~~(duration * fps)),
            },
            ctx
          );
          break;
        case "copyGlide":
          await runCopySegment(
            {
              transform: "copy",
              src,
              start,
              end: start + duration,
            },
            ctx
          );
          await runGlideSegment(
            {
              transform: "glide",
              src,
              time: start,
              length: Math.random() * 3,
              shift: shiftss[name][~~((start + duration) * fps)],
            },
            ctx
          );
          break;
        case "repeat":
          await runCopySegment(
            {
              transform: "copy",
              src,
              start,
              end: start + duration,
            },
            ctx
          );
          for (let i = 0; i < 5; i++) {
            await runMovementSegment(
              {
                transform: "movement",
                src,
                start,
                end: start + duration,
                shifts: shiftss[name].splice(
                  ~~(start * fps),
                  ~~(duration * fps)
                ),
              },
              ctx
            );
          }
      }
    } catch (e) {
      console.log(e);
    }
  }
};
