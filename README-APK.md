# CRC PLAY – önálló Android app

**Letöltés (mindig a legfrissebb APK):**
https://github.com/strattila90-hue/crc-military-game/releases/latest/download/CRC-PLAY.apk

Kiadási oldal: https://github.com/strattila90-hue/crc-military-game/releases/latest

Az APK-t elég **egyszer** telepíteni. Utána a játék magát frissíti.

## Frissítés (APK újratelepítése nélkül)
- Az app induláskor és visszatéréskor megnézi a `main` ágon lévő `index.html` verzióját
  (`raw.githubusercontent.com`, tartalék: GitHub Pages).
- Ha újabb van, a főmenü **Frissítés** gombja zölden villog: „⬆ Frissítés: vX”.
- A gombra koppintva az app letölti az új játékot (folyamatjelzővel), elmenti a telefonon,
  és újraindul. Ezután az új verzió fut, a kijelzett verziószám is az új.
- Internet nélkül a legutóbb letöltött verzió indul.
- Ha egy letöltött verzió nem indulna el, a következő indításkor az app magától visszaáll
  a beépített verzióra.
- Ha újabb APK-t telepítesz, mint a letöltött verzió, a beépített (újabb) indul.

## Verziószám
A verziószám egy helyen van: az `index.html` elején, `var VER='ÉÉÉÉ.HH.NN-n'`.
Minden kiadásnál ezt kell növelni. Ebből tudja az app, hogy van-e újabb.

## Hogyan készül az APK
A `.github/workflows/android.yml` minden pushra megépíti az APK-t (GitHub ▸ Actions, kb. 2–8 perc).
A `main` ágról készült build a „latest” kiadásba is felkerül, a kiadás leírásában a `VER=...` sor az app verziója.
Új APK-ra csak akkor van szükség, ha az Android-héj változik (pl. ikon, engedélyek, Capacitor-frissítés).

## Aláírás
Minden APK ugyanazzal a kulccsal van aláírva, így az új APK rátelepíthető a régire.
- A kulcs a GitHub Actions cache-ében van (az első build hozza létre), vagy ha megadod,
  az `ANDROID_KEYSTORE_B64` GitHub Secretből jön (base64-be kódolt keystore, jelszó/alias: `android`/`androiddebugkey`).
- A build elbukik, ha az APK nem ezzel a kulccsal készült.
- Ha a cache kiürül (kb. 7 nap használat nélkül), új kulcs készül, és egyszer újra kell telepíteni.
  Ezt a Secret megadása megszünteti.
- A 2026.11.09-7 előtti APK-k véletlen kulccsal készültek: ezeket egyszer törölni kell az új telepítése előtt.

## Telepítés
Android ▸ APK megnyitása ▸ „Ismeretlen források engedélyezése” ▸ Telepítés.
