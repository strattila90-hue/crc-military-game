# CRC PLAY – projektmemória Claude számára

Böngészős és Android (Capacitor) játék, magyar nyelven. Oldalnézetes tömegoszlatás:
két oldal, **Oszlató (MH)** és **Tüntető**, plusz szabad mód. A felhasználó magyarul ír, válaszolj magyarul.

## Felépítés
- **Egyetlen fájl:** az `index.html` tartalmaz minden JS-t, CSS-t és képet (base64 webp az `SP={...}` objektumban, egy nagyon hosszú sorban).
  - Ne olvasd be egészben. Használj `grep -n -o '.\{0,200\}minta.\{0,200\}'` mintát, és zárd ki az `SP` sort.
- **Fő részek a fájlban:**
  - `<head>` eleje: indító (boot) szkript, `var VER='ÉÉÉÉ.HH.NN-n'`, plusz OTA-betöltés.
  - `<style>`: a játék-HUD, a főmenü (`#home`, `.pn`, `.tl`…), az alsó vezérlősáv (`.bb`, `.grp`) és az oldalsó akciógombok (`.rail .ab`).
  - `AU`: szintetizált hangok. Az `AU.s(név,x,v)` hívás egyben rezgést is kelt (`HV` tábla, `hap()`).
    - Térhatás: a `out(x,v)` a kamerától mért távolsággal halkít és tompít (lowpass), és zengésbe küld (konvolúciós utózengés + házfal-visszhang).
    - Az `x=null` felület-hang: nincs térhatás. A `UI` tábla sorolja fel ezeket.
    - Lejátszásonként véletlen hangmagasság (`PV`) és hangerő. Emberi hang a `vox()`: formánsos magánhangzók.
    - A `loop()` hangjai LFO-val hullámzanak. A sziréna magyar rendőrségi kéthangú.
  - `App`: telepítés, megosztás, frissítés/OTA (`check`, `update`, `otaUpd`, `remoteVer`, `grab`).
  - `G`: a játék.
    - Állapot: `S` = katonák, `C` = tüntetők, `PJ` = lövedékek, `PT` = részecskék, `PR` = tárgyak, `BR` = barikádok, `FR` = tűz, `GS` = gáz, `SM` = füst.
    - Fő függvények: `up(dt)` (szimuláció), `draw()`, `act(k)` (eszközök), `land(p)` (becsapódás).
    - Gombkiosztás: a `BT` tábla, a cooldownok a `CD`-ben, a lőszer az `am`-ben.
- **Ikonok:** saját SVG piktogramkészlet (`<symbol id="i-…">` a `<body>` elején), használat: `<svg class="ic"><use href="#i-név"/></svg>`, JS-ben `ico(név)`. Emojit ne használj a felületen.
- **Pajzs/vízágyú:** `shR` = elöl, `shO` = fej fölött (felülről jövő találat ellen: `shd(s,d,rear,air)`), `shS` = eltolás. Vízágyú: joystick (`#joy`) → `nzdx/nzdy` analóg, `wj.t=10` mp, a tartály 24/mp-cel fogy.
- **Tüntetők:** procedurálisan rajzolja a `human(P,pose,wf,z)` függvény.
  - Valósághű, kb. 7,5 fejnyi arány. **Nem cuki/chibi stílus**, a felhasználó ezt kifejezetten kérte.
  - A `pose` 1 = dobás, a `wf` 0..7 = járásfázis (lustán generálva, `CP[i].w`).
  - `P.carry`: 1 = nemzeti zászló, 2 = tábla (`P.sign` felirat), 3 = jelzőfáklya. Ilyenkor magasabb a vászon (250 px), és a `CP[i].k` ezzel arányosan nagyobb.
  - Álló tömegben skandálás: ütemes, hullámszerű ökölemelés (az `f[1]` kockát használja).
- **Főmenü tömegjelenet:** a `menuArt()` rajzolja, három mélységi sorban (szűrővel sötétítve), ellenfénnyel, füsttel és fáklyafénnyel. A szereplők a `menuArt.P` tömbben vannak.
- **Tüntetők stílusa:** festett hatás, körvonal nélkül, hengeres árnyékolás (`seg`), a végén `paint()` zaj. Igazodjon a katonák festett sprite-jaihoz. A járásnak 8 fázisa van, térdhajlítással; a lejjebb lévő boka mindig a talajon van.
- **Katonák:** festett sprite-ok (`IM.mh`, `gaitSpr`).
- **Civil autók:** a `carImg(o,kiégett)` gyorsítótárazott képet rajzol (`CARC`), a `drawCar` csak kirakja. Valós arány: kb. 4,3 m × 1,45 m, ahol 1 m ≈ 60 px (sc=1). Típusok: `o.ty` 0 = szedán, 1 = ferdehátú, 2 = kombi.

## Verzió és kiadás
- **Verziószám:** egyetlen helyen van, az `index.html` elején (`var VER='...'`). **Minden változtatásnál növeld**, különben az app nem frissül.
- **APK:** a `.github/workflows/android.yml` minden pushra megépíti. A „latest” kiadás csak a `main`/`master` ágról frissül.
- **OTA frissítés az APK-ban:**
  - A főmenü Frissítés gombja letölti a csatorna ágán (`CH`, alapból `main`) lévő `index.html`-t (raw.githubusercontent; `main` esetén tartalék: GitHub Pages).
  - A letöltött verzió `localStorage`-be kerül (`crc-ota-html`, `crc-ota-ver`), a boot szkript ezt tölti be, ha újabb a beépítettnél.
  - Hibás letöltés esetén automatikusan visszaáll a beépítettre (`crc-ota-pend`/`crc-ota-bad`).
  - Az appban nincs service worker.
- **APK aláírás:** állandó kulcs (Actions cache `crc-play-debug-keystore-v1`, vagy az `ANDROID_KEYSTORE_B64` secret). A `build.gradle`-ben `signingConfigs.debug` mutat rá, és a build ellenőrzi. Kulcsot ne commitolj a repóba.
- **Frissítési csatorna:** `CH` a boot szkriptben. A workflow az ág nevére állítja, így az előzetes APK a saját ágáról frissül.
- **Webes változat:** a `sw.js` stale-while-revalidate gyorsítótárat használ (`crc-play-v3`).

## Ellenőrzés változtatás után
1. **Szintaxis:** a `<script>` blokkok kinyerése után `node --check`:
   `python3 -c "import re;s=open('index.html',encoding='utf-8').read();open('/tmp/a.js','w').write('\n'.join(re.findall(r'<script>(.*?)</script>',s,re.S)))" && node --check /tmp/a.js`
2. **Futtatás:** `python3 -m http.server 8765`, majd Playwright (előtelepítve).
   - `G.start('mh'|'cr')`, `G.home()`, `G.cp()` (tüntetőképek).
   - Figyeld a `pageerror`-t, készíts képernyőképet (asztali 1280×720 és telefonos fekvő 844×390 nézetben).
3. **Appmód szimulálása:** `addInitScript(()=>{window.Capacitor={isNativePlatform:()=>true}})`, a GitHub URL-eket `ctx.route`-tal irányítsd át.

## Irányítás (a súgóban is szerepel)
- **Mozgás:** ←/→ vagy a képernyő nyilai (fokozatos gyorsulás).
- **Akciók:** Space/1–9/0. F = sörétes, G = paprikaspray/petárda, N = új ember, R = hátsó célzás, P/Esc = szünet.
- **Pajzs:** Z/X/A/D. **Vízágyú:** I/J/K/L (tehetetlenséggel mozog).
- Gamepad is támogatott (`padP`).

## Tapasztalatok
- A Python-cserékhez használt horgonyok behúzása eltérhet (1–3 szóköz). Mindig ellenőrizd `assert s.count(a)==1`-gyel.
- Bonyolult idézőjeles heredocot a shell elutasíthat. Ilyenkor a szkriptet a Write eszközzel írd fájlba.
- Játékegyensúlyt (sebzés, hullámerősség) csak a felhasználó visszajelzése alapján hangolj.
