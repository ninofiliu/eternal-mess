import moshLoop from './moshLoop';
import prepare from './prepare';

const sp = new URLSearchParams(window.location.search);
const fn = sp.get('fn');

if (fn === 'moshLoop') moshLoop();
if (fn === 'prepare') {
  const w = +sp.get('w');
  const h = +sp.get('h');
  const name = sp.get('name');
  prepare(w, h, name);
}
