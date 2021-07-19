import { Shift } from './types';

export const names = 'close-ups.webm face-0.mp4 face-1.mp4 face-2.mp4 face-3.mp4 girl-in-plastic.mp4 gosh.mp4 hands-0.mp4 hands-1.mp4 hands-plastic-0.mp4 hands-plastic-1.mp4 helmet-0.mp4 helmet-1.mp4 helmet-2.mp4 if-the-car-beside-you-moves-ahead.mp4 laplander.mp4 motocross-0.mp4 motocross-1.mp4 motocross-2.mp4 motocross-3.mp4 motocross-4.mp4 the-island.mp4 trainspotting.mp4 vordhosbn.mp4'.split(' ');

export const durations = {
  'close-ups.webm': 103.081000,
  'face-0.mp4': 13.033333,
  'face-1.mp4': 38.960000,
  'face-2.mp4': 21.440000,
  'face-3.mp4': 8.140000,
  'girl-in-plastic.mp4': 7.800000,
  'gosh.mp4': 322.642000,
  'hands-0.mp4': 15.500000,
  'hands-1.mp4': 16.000000,
  'hands-plastic-0.mp4': 5.240000,
  'hands-plastic-1.mp4': 8.760000,
  'helmet-0.mp4': 21.880000,
  'helmet-1.mp4': 11.880000,
  'helmet-2.mp4': 11.880000,
  'if-the-car-beside-you-moves-ahead.mp4': 278.721000,
  'laplander.mp4': 216.681000,
  'motocross-0.mp4': 14.400000,
  'motocross-1.mp4': 11.680000,
  'motocross-2.mp4': 8.320000,
  'motocross-3.mp4': 7.080000,
  'motocross-4.mp4': 14.080000,
  'the-island.mp4': 247.897000,
  'trainspotting.mp4': 268.608000,
  'vordhosbn.mp4': 291.381000,
};

export const fetchShifts = async (w: number, h: number, _names: string[] = names) => {
  const shifts: {[name: string]: Shift[]} = {};
  const cache = await caches.open('infinite');
  for (const name of _names) {
    const url = `/in/${w}x${h}/${name}.shifts.json`;
    if (await cache.match(url)) {
      console.log('cache hit');
    } else {
      console.log('cache miss');
      await cache.add(url);
    }
    const resp = await cache.match(url);
    if (!resp) throw new Error('resp is still undefined');
    shifts[name] = await resp.json() as Shift[];
  }
  return shifts;
};
