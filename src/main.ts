import run from "./run";
import prepare from "./prepare";
import flavors from "./flavors";

const sp = new URLSearchParams(window.location.search);
const fn = sp.get("fn");

if (fn === "run") {
  run(flavors.debug);
}
if (fn === "prepare") {
  const w = +sp.get("w");
  const h = +sp.get("h");
  const name = sp.get("name");
  prepare(w, h, name);
}
