import { elementEvent } from './mosh.lib';
import { Shift } from './types';

const allNames = 'close-ups-001.webm close-ups-002.webm close-ups-003.webm close-ups-004.webm face-0.mp4 face-1.mp4 face-2.mp4 face-3.mp4 girl-in-plastic.mp4 gosh-001.mp4 gosh-002.mp4 gosh-003.mp4 gosh-004.mp4 gosh-005.mp4 gosh-006.mp4 gosh-007.mp4 gosh-008.mp4 gosh-009.mp4 gosh-010.mp4 gosh-011.mp4 gosh-012.mp4 gosh-013.mp4 gosh-014.mp4 gosh-015.mp4 gosh-016.mp4 gosh-017.mp4 gosh-018.mp4 gosh-019.mp4 gosh-020.mp4 gosh-021.mp4 gosh-022.mp4 gosh-023.mp4 gosh-024.mp4 gosh-025.mp4 gosh-026.mp4 gosh-027.mp4 gosh-028.mp4 gosh-029.mp4 gosh-030.mp4 gosh-031.mp4 hands-0.mp4 hands-1.mp4 hands-plastic-0.mp4 hands-plastic-1.mp4 helmet-0.mp4 helmet-1.mp4 helmet-2.mp4 if-the-car-beside-you-moves-ahead-000.mp4 if-the-car-beside-you-moves-ahead-001.mp4 if-the-car-beside-you-moves-ahead-002.mp4 if-the-car-beside-you-moves-ahead-003.mp4 if-the-car-beside-you-moves-ahead-004.mp4 if-the-car-beside-you-moves-ahead-005.mp4 if-the-car-beside-you-moves-ahead-006.mp4 if-the-car-beside-you-moves-ahead-007.mp4 if-the-car-beside-you-moves-ahead-008.mp4 if-the-car-beside-you-moves-ahead-009.mp4 if-the-car-beside-you-moves-ahead-010.mp4 if-the-car-beside-you-moves-ahead-011.mp4 if-the-car-beside-you-moves-ahead-012.mp4 if-the-car-beside-you-moves-ahead-013.mp4 if-the-car-beside-you-moves-ahead-014.mp4 if-the-car-beside-you-moves-ahead-015.mp4 if-the-car-beside-you-moves-ahead-016.mp4 if-the-car-beside-you-moves-ahead-017.mp4 if-the-car-beside-you-moves-ahead-018.mp4 if-the-car-beside-you-moves-ahead-019.mp4 if-the-car-beside-you-moves-ahead-020.mp4 if-the-car-beside-you-moves-ahead-021.mp4 if-the-car-beside-you-moves-ahead-022.mp4 if-the-car-beside-you-moves-ahead-023.mp4 if-the-car-beside-you-moves-ahead-024.mp4 if-the-car-beside-you-moves-ahead-025.mp4 if-the-car-beside-you-moves-ahead-026.mp4 if-the-car-beside-you-moves-ahead-027.mp4 laplander-000.mp4 laplander-001.mp4 laplander-002.mp4 laplander-003.mp4 laplander-004.mp4 laplander-005.mp4 laplander-006.mp4 laplander-007.mp4 laplander-008.mp4 laplander-009.mp4 laplander-010.mp4 laplander-011.mp4 laplander-012.mp4 laplander-013.mp4 laplander-014.mp4 laplander-015.mp4 laplander-016.mp4 laplander-017.mp4 laplander-018.mp4 laplander-019.mp4 laplander-020.mp4 motocross-0.mp4 motocross-1.mp4 motocross-2.mp4 motocross-3.mp4 motocross-4.mp4 the-island-001.mp4 the-island-002.mp4 the-island-003.mp4 the-island-004.mp4 the-island-005.mp4 the-island-006.mp4 the-island-007.mp4 the-island-008.mp4 the-island-009.mp4 the-island-010.mp4 the-island-011.mp4 the-island-012.mp4 the-island-013.mp4 the-island-014.mp4 the-island-015.mp4 the-island-016.mp4 the-island-017.mp4 the-island-018.mp4 the-island-019.mp4 the-island-020.mp4 the-island-021.mp4 the-island-022.mp4 trainspotting-000.mp4 trainspotting-001.mp4 trainspotting-002.mp4 trainspotting-003.mp4 trainspotting-004.mp4 trainspotting-005.mp4 trainspotting-006.mp4 trainspotting-007.mp4 trainspotting-008.mp4 trainspotting-009.mp4 trainspotting-010.mp4 trainspotting-011.mp4 trainspotting-012.mp4 trainspotting-013.mp4 trainspotting-014.mp4 trainspotting-015.mp4 trainspotting-016.mp4 trainspotting-017.mp4 trainspotting-018.mp4 trainspotting-019.mp4 trainspotting-020.mp4 trainspotting-021.mp4 trainspotting-022.mp4 trainspotting-023.mp4 trainspotting-024.mp4 trainspotting-025.mp4 trainspotting-026.mp4 vordhosbn-000.mp4 vordhosbn-001.mp4 vordhosbn-002.mp4 vordhosbn-003.mp4 vordhosbn-004.mp4 vordhosbn-005.mp4 vordhosbn-006.mp4 vordhosbn-007.mp4 vordhosbn-008.mp4 vordhosbn-009.mp4 vordhosbn-010.mp4 vordhosbn-011.mp4 vordhosbn-012.mp4 vordhosbn-013.mp4 vordhosbn-014.mp4 vordhosbn-015.mp4 vordhosbn-016.mp4 vordhosbn-017.mp4 vordhosbn-018.mp4 vordhosbn-019.mp4 vordhosbn-020.mp4 vordhosbn-021.mp4 vordhosbn-022.mp4 vordhosbn-023.mp4 vordhosbn-024.mp4 vordhosbn-025.mp4 vordhosbn-026.mp4 vordhosbn-027.mp4 vordhosbn-028.mp4 vordhosbn-029.mp4'.split(' ');

// eslint-disable-next-line no-constant-condition
export const names = false ? allNames : allNames.filter(() => Math.random() < 0.1);

export const images = 'blurry-hug.jpg chris-s-dog.jpg dead-roses.jpg dirty-mirror.jpg eye.jpg hand.jpg heaven-knows-what.jpg hot-guy.jpg pale-creatures.jpg red-lips.jpg red-shoes.jpg renaissance.jpg robot.jpg sweater.jpg vampire-babe.jpg'.split(' ');

export const fetchDurations = async (w: number, h: number) => {
  const durations: Record<string, number> = {};
  await Promise.all(names.map(async (name) => {
    const video = document.createElement('video');
    video.src = `/in/${w}x${h}/${name}`;
    await elementEvent(video, 'canplay');
    durations[name] = video.duration;
    console.log(`fetched durations ${Object.keys(durations).length}/${names.length}`);
  }));
  return durations;
};

export const fetchShiftss = async (w: number, h: number) => {
  const shifts: {[name: string]: Shift[]} = {};
  await Promise.all(names.map(async (name) => {
    const src = `/in/${w}x${h}/${name}.shifts.json`;
    const resp = await fetch(src);
    shifts[name] = await resp.json() as Shift[];
    console.log(`fetched shifts ${Object.keys(shifts).length}/${names.length}`);
  }));
  return shifts;
};
