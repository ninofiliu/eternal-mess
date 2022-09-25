import run from "./run";
import prepare from "./prepare";
import flavors from "./flavors";

(() => {
  const sp = new URLSearchParams(window.location.search);
  const fn = sp.get("fn");
  if (fn === "run") {
    document.body.style.backgroundColor = "black";
    const flavorName = sp.get("flavor");
    if (!(flavorName in flavors)) {
      alert(
        `Unknown ${flavorName}, ?flavor= should be one of ${Object.keys(
          flavors
        ).join(",")}`
      );
      return;
    }
    run(flavors[flavorName]);
  }
  if (fn === "prepare") {
    const w = +sp.get("w");
    const h = +sp.get("h");
    const name = sp.get("name");
    prepare(w, h, name);
  }
})();
