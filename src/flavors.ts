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
    spiralWeight: 0.5,
    maxDuration: 5,
    transformWeights: {
      copy: 1,
      glide: 2,
      movement: 3,
      copyGlide: 2,
      repeat: 1,
    },
  },
};

export default flavors;
