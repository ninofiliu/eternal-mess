import run from './run';
import prepare from './prepare';

const sp = new URLSearchParams(window.location.search);
const fn = sp.get('fn');

if (fn === 'run') run();
if (fn === 'prepare') {
  const w = +sp.get('w');
  const h = +sp.get('h');
  const name = sp.get('name');
  prepare(w, h, name);
}
