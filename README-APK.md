# CRC PLAY – önálló Android app

**Letöltés (mindig a legfrissebb APK):**
https://github.com/strattila90-hue/crc-military-game/releases/latest/download/CRC-PLAY.apk

Kiadási oldal: https://github.com/strattila90-hue/crc-military-game/releases/latest

## Hogyan készül
A `.github/workflows/android.yml` minden `main` ágra pusholt változás után automatikusan megépíti az APK-t
(GitHub ▸ Actions, kb. 5-8 perc), és közzéteszi a "latest" kiadásban. A kiadás leírásában a `VER=...` sor az app verziója.

## Kötelező frissítés
Az app indításkor és visszatéréskor lekérdezi a "latest" kiadást. Ha annak `VER=` értéke újabb, mint a telepített verzió,
a főmenün letiltja a játékot egy "Új verzió érhető el" ablakkal, amíg a felhasználó nem telepíti az új APK-t.
Játék közben csak figyelmeztetés jelenik meg, a menübe lépéskor már blokkol. Kapcsolat nélkül nem blokkol.
A webes változat (Vercel) magától frissíti magát, ha új verziót talál.

## Telepítés
Android ▸ APK megnyitása ▸ "Ismeretlen források engedélyezése" ▸ Telepítés.
