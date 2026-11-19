# Contributing / Közreműködés

## English

**Run locally**
```bash
python3 -m http.server 8765   # then open http://localhost:8765/index.html
```

**Project layout:** everything lives in `index.html` (JS, CSS, base64 sprites in one huge `SP={...}` line). Do not open the file whole; search with e.g. `grep -n -o '.\{0,200\}pattern.\{0,200\}' index.html` and exclude the `SP` line.

**Before opening a PR**
1. Bump `var VER='YYYY.MM.DD-n'` at the top of `index.html` (otherwise the app will not update).
2. Syntax check:
   ```bash
   python3 -c "import re;s=open('index.html',encoding='utf-8').read();open('/tmp/a.js','w').write('\n'.join(re.findall(r'<script>(.*?)</script>',s,re.S)))" && node --check /tmp/a.js
   ```
3. Load the page (Playwright or a browser), call `G.start('mh')` / `G.start('cr')` / `G.home()` and make sure there are no `pageerror`s; check desktop (1280×720) and phone landscape (844×390).

**Style:** protesters are drawn realistically (about 7.5 heads tall, painted look, no outline, no chibi style). Game balance changes (damage, wave strength) should be based on playtest feedback.

**PR flow:** fork, create a branch, make a small focused change, open a pull request describing what and why.

## Magyar

**Futtatás helyben:** `python3 -m http.server 8765`, majd `http://localhost:8765/index.html`.

**Felépítés:** minden az `index.html`-ben van (JS, CSS, base64 sprite az óriási `SP={...}` sorban). Ne olvasd be egészben, keress `grep -n -o`-val, és zárd ki az `SP` sort.

**PR előtt**
1. Növeld az `index.html` elején a `var VER='ÉÉÉÉ.HH.NN-n'` értéket (különben az app nem frissül).
2. Szintaxis: lásd fenti `node --check` parancs.
3. Töltsd be az oldalt, hívd a `G.start('mh')`, `G.start('cr')`, `G.home()` függvényeket, és nézd meg, hogy nincs `pageerror` (asztali 1280×720 és telefonos fekvő 844×390 nézet).

**Stílus:** a tüntetők valósághűek (kb. 7,5 fejnyi arány, festett hatás, körvonal nélkül, nem chibi). Játékegyensúlyt csak játékosi visszajelzés alapján hangolj.

**PR menete:** fork, ág, kis, célzott változtatás, pull request leírással.
