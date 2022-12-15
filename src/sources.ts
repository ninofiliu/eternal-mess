import { elementEvent } from "./mosh.lib";
import { Shift } from "./types";
import allNamesAny from "./allNames.json";
import imagesAny from "./images.json";

export const images = imagesAny as string[];
export const allNames = allNamesAny as string[];

export const defaultImages =
  "blurry-hug.jpg chris-s-dog.jpg dead-roses.jpg dirty-mirror.jpg eye.jpg hand.jpg heaven-knows-what.jpg hot-guy.jpg pale-creatures.jpg red-lips.jpg red-shoes.jpg renaissance.jpg robot.jpg sweater.jpg vampire-babe.jpg".split(
    " "
  );
export const eyeImages = [...Array(21).keys()].map((i) => `eyes/${i}.jpg`);

export const fetchDurations = async (
  names: string[],
  w: number,
  h: number,
  fetchElt: HTMLElement
) => {
  const durations: Record<string, number> = {};
  await Promise.all(
    names.map(async (name) => {
      const video = document.createElement("video");
      video.src = `/in/${w}x${h}/${name}`;
      await elementEvent(video, "canplay");
      durations[name] = video.duration;
      // eslint-disable-next-line no-param-reassign
      fetchElt.innerText = `fetched durations ${
        Object.keys(durations).length
      }/${names.length}`;
    })
  );
  return durations;
};

export const fetchShiftss = async (
  names: string[],
  w: number,
  h: number,
  fetchElt: HTMLElement
) => {
  const shifts: { [name: string]: Shift[] } = {};
  await Promise.all(
    names.map(async (name) => {
      const src = `/in/${w}x${h}/${name}.shifts.json`;
      const resp = await fetch(src);
      shifts[name] = (await resp.json()) as Shift[];
      // eslint-disable-next-line no-param-reassign
      fetchElt.innerHTML = `fetched shifts ${Object.keys(shifts).length}/${
        names.length
      }`;
    })
  );
  return shifts;
};
