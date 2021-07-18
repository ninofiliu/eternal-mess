import d370x188v0 from './shifts/370x188/close-ups.webm.shifts.json';
import d370x188v1 from './shifts/370x188/girl-in-plastic.mp4.shifts.json';
import d370x188v2 from './shifts/370x188/helmet-1.mp4.shifts.json';
import { Shift } from './types';

export const names = 'close-ups.webm face-0.mp4 face-1.mp4 face-2.mp4 face-3.mp4 girl-in-plastic.mp4 gosh.mp4 hands-0.mp4 hands-1.mp4 hands-plastic-0.mp4 hands-plastic-1.mp4 helmet-0.mp4 helmet-1.mp4 helmet-2.mp4 if-the-car-beside-you-moves-ahead.mkv laplander.mkv motocross-0.mp4 motocross-1.mp4 motocross-2.mp4 motocross-3.mp4 motocross-4.mp4 the-island.mp4 trainspgirl-in-plastic.mp4otting.mp4 vordhosbn.mkv'.split(' ');

export const shifts = {
  370: {
    188: {
      'close-ups.webm': d370x188v0 as Shift[],
      'girl-in-plastic.mp4': d370x188v1 as Shift[],
      'helmet-1.mp4': d370x188v2 as Shift[],
    },
  },
};
