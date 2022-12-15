import { readdir, writeFile, stat } from "node:fs/promises";
import { join } from "node:path";

const readDeep = async (path): Promise<string[]> => {
  const files = [];
  const dirs = [];
  for (const sub of await readdir(path)) {
    const next = join(path, sub);
    if ((await stat(next)).isDirectory()) {
      dirs.push(next);
    } else {
      files.push(next);
    }
  }
  return [
    ...files,
    ...(await Promise.all(dirs.map((dir) => readDeep(dir)))).flat(),
  ];
};

(async () => {
  const allNames = await readdir("./in/src");
  await writeFile("./src/allNames.json", JSON.stringify(allNames));
  const images = (await readDeep("in/images/")).map((name) =>
    name.substring("in/images/".length)
  );
  await writeFile("./src/images.json", JSON.stringify(images));
})();
