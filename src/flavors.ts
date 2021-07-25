import { allNames } from './sources';
import { Flavor } from './types';

const randomPick = <T>(from: T[], nb: number): T[] => {
  const toSet = new Set<T>();
  while (toSet.size < nb) toSet.add(from[~~(Math.random() * from.length)]);
  return [...toSet];
};

const flavors: Record<string, Flavor> = {
  debug: {
    names: randomPick(allNames, 10),
    maxDuration: 5,
    weigths: {
      reveal: 5,
      overlay: 1,
      new: 1,
      copy: 1,
      glide: 2,
      movement: 3,
      copyGlide: 4,
      repeat: 1,
    },
  },
  alexia: {
    names: randomPick([
      'baby-01.webm',
      'baby-02.webm',
      'baby-03.webm',
      'baby-04.webm',
      'baby-05.webm',
      'baby-06.webm',
      'baby-07.webm',
      'baby-08.webm',
      'baby-09.webm',
      'baby-10.webm',
      'baby-11.webm',
      'baby-12.webm',
      'baby-13.webm',
      'baby-14.webm',
      'baby-15.webm',
      'baby-16.webm',
      'baby-17.webm',
      'baby-18.webm',
      'baby-19.webm',
      'baby-20.webm',
      'baby-21.webm',
      'baby-22.webm',
      'baby-23.webm',
      'baby-24.webm',
      'chaos-0.webm',
      'chaos-1.webm',
      'chaos-2.webm',
      'chaos-3.webm',
      'chaos-4.webm',
      'chaos-5.webm',
      'chaos-6.webm',
      'chaos-7.webm',
      'chaos-8.webm',
      'chaos.webm',
      'close-ups-001.webm',
      'close-ups-002.webm',
      'close-ups-003.webm',
      'close-ups-004.webm',
      'face-0.mp4',
      'face-1.mp4',
      'face-2.mp4',
      'face-3.mp4',
      'fractals-00.mp4',
      'fractals-01.mp4',
      'fractals-02.mp4',
      'fractals-04.mp4',
      'fractals-05.mp4',
      'fractals-14.mp4',
      'fractals-17.mp4',
      'fractals-18.mp4',
      'fractals-24.mp4',
      'fractals-26.mp4',
      'fractals-31.mp4',
      'fractals-32.mp4',
      'fractals-33.mp4',
      'fractals-36.mp4',
      'fractals-38.mp4',
      'fractals-40.mp4',
      'fractals-41.mp4',
      'fractals-45.mp4',
      'girl-in-plastic.mp4',
      'girl-of-the-year-01.mp4',
      'girl-of-the-year-02.mp4',
      'girl-of-the-year-03.mp4',
      'girl-of-the-year-04.mp4',
      'girl-of-the-year-05.mp4',
      'girl-of-the-year-06.mp4',
      'girl-of-the-year-07.mp4',
      'girl-of-the-year-08.mp4',
      'girl-of-the-year-09.mp4',
      'girl-of-the-year-10.mp4',
      'girl-of-the-year-11.mp4',
      'girl-of-the-year-12.mp4',
      'girl-of-the-year-13.mp4',
      'girl-of-the-year-14.mp4',
      'girl-of-the-year-15.mp4',
      'girl-of-the-year-16.mp4',
      'girl-of-the-year-17.mp4',
      'girl-of-the-year-18.mp4',
      'girl-of-the-year-19.mp4',
      'girl-of-the-year-20.mp4',
      'hands-0.mp4',
      'hands-1.mp4',
      'hands-plastic-0.mp4',
      'hands-plastic-1.mp4',
      'if-the-car-beside-you-moves-ahead-000.mp4',
      'if-the-car-beside-you-moves-ahead-001.mp4',
      'if-the-car-beside-you-moves-ahead-002.mp4',
      'if-the-car-beside-you-moves-ahead-003.mp4',
      'if-the-car-beside-you-moves-ahead-004.mp4',
      'if-the-car-beside-you-moves-ahead-005.mp4',
      'if-the-car-beside-you-moves-ahead-006.mp4',
      'if-the-car-beside-you-moves-ahead-007.mp4',
      'if-the-car-beside-you-moves-ahead-008.mp4',
      'if-the-car-beside-you-moves-ahead-009.mp4',
      'if-the-car-beside-you-moves-ahead-010.mp4',
      'if-the-car-beside-you-moves-ahead-011.mp4',
      'if-the-car-beside-you-moves-ahead-012.mp4',
      'if-the-car-beside-you-moves-ahead-013.mp4',
      'if-the-car-beside-you-moves-ahead-014.mp4',
      'if-the-car-beside-you-moves-ahead-015.mp4',
      'if-the-car-beside-you-moves-ahead-016.mp4',
      'if-the-car-beside-you-moves-ahead-017.mp4',
      'if-the-car-beside-you-moves-ahead-018.mp4',
      'if-the-car-beside-you-moves-ahead-019.mp4',
      'if-the-car-beside-you-moves-ahead-020.mp4',
      'if-the-car-beside-you-moves-ahead-021.mp4',
      'if-the-car-beside-you-moves-ahead-022.mp4',
      'if-the-car-beside-you-moves-ahead-023.mp4',
      'if-the-car-beside-you-moves-ahead-024.mp4',
      'if-the-car-beside-you-moves-ahead-025.mp4',
      'if-the-car-beside-you-moves-ahead-026.mp4',
      'if-the-car-beside-you-moves-ahead-027.mp4',
      'laplander-000.mp4',
      'laplander-001.mp4',
      'laplander-002.mp4',
      'laplander-003.mp4',
      'laplander-004.mp4',
      'laplander-005.mp4',
      'laplander-006.mp4',
      'laplander-007.mp4',
      'laplander-008.mp4',
      'laplander-009.mp4',
      'laplander-010.mp4',
      'laplander-011.mp4',
      'laplander-012.mp4',
      'laplander-013.mp4',
      'laplander-014.mp4',
      'laplander-015.mp4',
      'laplander-016.mp4',
      'laplander-017.mp4',
      'laplander-018.mp4',
      'laplander-019.mp4',
      'laplander-020.mp4',
      'sky-scream-coaster-01.mp4',
      'sky-scream-coaster-02.mp4',
      'sky-scream-coaster-03.mp4',
      'sky-scream-coaster-04.mp4',
      'sky-scream-coaster-13.mp4',
      'sky-scream-coaster-14.mp4',
      'sky-scream-coaster-15.mp4',
      'sky-scream-coaster-19.mp4',
      'vordhosbn-000.mp4',
      'vordhosbn-001.mp4',
      'vordhosbn-002.mp4',
      'vordhosbn-003.mp4',
      'vordhosbn-004.mp4',
      'vordhosbn-005.mp4',
      'vordhosbn-006.mp4',
      'vordhosbn-007.mp4',
      'vordhosbn-008.mp4',
      'vordhosbn-009.mp4',
      'vordhosbn-010.mp4',
      'vordhosbn-011.mp4',
      'vordhosbn-012.mp4',
      'vordhosbn-013.mp4',
      'vordhosbn-014.mp4',
      'vordhosbn-015.mp4',
      'vordhosbn-016.mp4',
      'vordhosbn-017.mp4',
      'vordhosbn-018.mp4',
      'vordhosbn-019.mp4',
      'vordhosbn-020.mp4',
      'vordhosbn-021.mp4',
      'vordhosbn-022.mp4',
      'vordhosbn-023.mp4',
      'vordhosbn-024.mp4',
      'vordhosbn-025.mp4',
      'vordhosbn-026.mp4',
      'vordhosbn-027.mp4',
      'vordhosbn-028.mp4',
      'vordhosbn-029.mp4',
    ], 25),
    maxDuration: 10,
    weigths: {
      reveal: 0,
      overlay: 0,
      new: 0,
      copy: 1,
      glide: 5,
      movement: 1,
      copyGlide: 2,
      repeat: 0,
    },
  },
};

export default flavors;