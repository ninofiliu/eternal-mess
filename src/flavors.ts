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
  clemence: {
    names: randomPick([
      'baby-01.webm',
      'baby-02.webm',
      'baby-03.webm',
      'baby-04.webm',
      'baby-05.webm',
      'baby-06.webm',
      'baby-07.webm',
      'baby-14.webm',
      'baby-15.webm',
      'baby-16.webm',
      'baby-17.webm',
      'baby-18.webm',
      'baby-19.webm',
      'baby-20.webm',
      'chaos-6.webm',
      'chaos-7.webm',
      'chaos-8.webm',
      'close-ups-001.webm',
      'close-ups-002.webm',
      'close-ups-003.webm',
      'close-ups-004.webm',
      'collapse-00.mp4',
      'collapse-01.mp4',
      'collapse-02.mp4',
      'collapse-03.mp4',
      'collapse-04.mp4',
      'collapse-05.mp4',
      'collapse-06.mp4',
      'collapse-07.mp4',
      'collapse-08.mp4',
      'collapse-09.mp4',
      'collapse-10.mp4',
      'collapse-11.mp4',
      'collapse-12.mp4',
      'collapse-13.mp4',
      'collapse-14.mp4',
      'collapse-15.mp4',
      'collapse-16.mp4',
      'collapse-17.mp4',
      'collapse-18.mp4',
      'collapse-19.mp4',
      'collapse-20.mp4',
      'collapse-21.mp4',
      'collapse-22.mp4',
      'collapse-26.mp4',
      'face-0.mp4',
      'face-1.mp4',
      'face-2.mp4',
      'face-3.mp4',
      'girl-in-plastic.mp4',
      'gosh-001.mp4',
      'gosh-002.mp4',
      'gosh-003.mp4',
      'gosh-004.mp4',
      'gosh-005.mp4',
      'gosh-006.mp4',
      'gosh-007.mp4',
      'gosh-008.mp4',
      'gosh-009.mp4',
      'gosh-010.mp4',
      'gosh-011.mp4',
      'gosh-012.mp4',
      'gosh-013.mp4',
      'gosh-014.mp4',
      'gosh-015.mp4',
      'gosh-016.mp4',
      'gosh-017.mp4',
      'gosh-018.mp4',
      'gosh-019.mp4',
      'gosh-020.mp4',
      'gosh-021.mp4',
      'gosh-022.mp4',
      'gosh-023.mp4',
      'gosh-024.mp4',
      'gosh-025.mp4',
      'gosh-026.mp4',
      'gosh-027.mp4',
      'gosh-028.mp4',
      'gosh-029.mp4',
      'gosh-030.mp4',
      'gosh-031.mp4',
      'hands-0.mp4',
      'hands-1.mp4',
      'hands-plastic-0.mp4',
      'hands-plastic-1.mp4',
      'helmet-0.mp4',
      'helmet-1.mp4',
      'helmet-2.mp4',
      'hyper-reality-00.mp4',
      'hyper-reality-02.mp4',
      'hyper-reality-32.mp4',
      'hyper-reality-33.mp4',
      'if-the-car-beside-you-moves-ahead-000.mp4',
      'if-the-car-beside-you-moves-ahead-001.mp4',
      'if-the-car-beside-you-moves-ahead-002.mp4',
      'if-the-car-beside-you-moves-ahead-003.mp4',
      'if-the-car-beside-you-moves-ahead-007.mp4',
      'if-the-car-beside-you-moves-ahead-008.mp4',
      'if-the-car-beside-you-moves-ahead-009.mp4',
      'if-the-car-beside-you-moves-ahead-010.mp4',
      'if-the-car-beside-you-moves-ahead-020.mp4',
      'if-the-car-beside-you-moves-ahead-021.mp4',
      'if-the-car-beside-you-moves-ahead-022.mp4',
      'if-the-car-beside-you-moves-ahead-023.mp4',
      'if-the-car-beside-you-moves-ahead-024.mp4',
      'if-the-car-beside-you-moves-ahead-025.mp4',
      'if-the-car-beside-you-moves-ahead-026.mp4',
      'if-the-car-beside-you-moves-ahead-027.mp4',
      'motocross-0.mp4',
      'motocross-1.mp4',
      'motocross-2.mp4',
      'motocross-3.mp4',
      'motocross-4.mp4',
      'scariest-coasters-04.mp4',
      'scariest-coasters-05.mp4',
      'scariest-coasters-15.mp4',
      'scariest-coasters-23.mp4',
      'suzinak-00.mp4',
      'suzinak-01.mp4',
      'suzinak-02.mp4',
      'suzinak-03.mp4',
      'suzinak-04.mp4',
      'suzinak-05.mp4',
      'suzinak-06.mp4',
      'suzinak-07.mp4',
      'suzinak-08.mp4',
      'suzinak-09.mp4',
      'suzinak-10.mp4',
      'suzinak-16.mp4',
      'suzinak-17.mp4',
      'suzinak-18.mp4',
      'suzinak-19.mp4',
      'suzinak-20.mp4',
      'suzinak-21.mp4',
      'suzinak-22.mp4',
      'suzinak-23.mp4',
      'suzinak-24.mp4',
      'suzinak-33.mp4',
      'suzinak-34.mp4',
      'suzinak-35.mp4',
      'suzinak-36.mp4',
      'suzinak-37.mp4',
      'suzinak-38.mp4',
      'the-island-001.mp4',
      'the-island-002.mp4',
      'the-island-003.mp4',
      'the-island-004.mp4',
      'the-island-011.mp4',
      'the-island-012.mp4',
      'the-island-013.mp4',
      'the-island-014.mp4',
      'the-island-022.mp4',
      'trainspotting-000.mp4',
      'trainspotting-001.mp4',
      'trainspotting-002.mp4',
      'trainspotting-003.mp4',
      'trainspotting-004.mp4',
      'trainspotting-005.mp4',
      'trainspotting-006.mp4',
      'trainspotting-007.mp4',
      'trainspotting-008.mp4',
      'trainspotting-009.mp4',
      'trainspotting-010.mp4',
      'trainspotting-011.mp4',
      'trainspotting-012.mp4',
      'trainspotting-013.mp4',
      'trainspotting-014.mp4',
      'trainspotting-015.mp4',
      'trainspotting-016.mp4',
      'trainspotting-017.mp4',
      'trainspotting-018.mp4',
      'trainspotting-019.mp4',
      'trainspotting-020.mp4',
      'trainspotting-021.mp4',
      'trainspotting-022.mp4',
      'trainspotting-023.mp4',
      'trainspotting-024.mp4',
      'trainspotting-025.mp4',
      'trainspotting-026.mp4',
      'walk-in-the-park-04.mp4',
      'walk-in-the-park-05.mp4',
      'walk-in-the-park-09.mp4',
      'walk-in-the-park-10.mp4',
      'walk-in-the-park-11.mp4',
      'walk-in-the-park-12.mp4',
      'walk-in-the-park-14.mp4',
      'walk-in-the-park-16.mp4',
      'walk-in-the-park-18.mp4',
      'walk-in-the-park-19.mp4',
      'walk-in-the-park-20.mp4',
      'walk-in-the-park-21.mp4',
      'walk-in-the-park-23.mp4',
      'walk-in-the-park-24.mp4',
      'walk-in-the-park-26.mp4',
      'walk-in-the-park-27.mp4',
      'walk-in-the-park-28.mp4',
      'walk-in-the-park-29.mp4',
      'walk-in-the-park-30.mp4',
    ], 25),
    maxDuration: 7,
    weigths: {
      reveal: 5,
      overlay: 5,
      new: 3,
      copy: 1,
      glide: 0,
      movement: 3,
      copyGlide: 0,
      repeat: 2,
    },
  },
};

export default flavors;
