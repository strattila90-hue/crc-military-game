# CRC PLAY – önálló Android app

A `.github/workflows/android.yml` minden `main` ágra pusholt változás után automatikusan megépíti az APK-t.

1. Töltsd fel ezeket a fájlokat a repó gyökerébe (mappák nélkül a webes fájloknál), commit + push.
2. GitHub ▸ **Actions** fül ▸ "Build Android APK" futás (kb. 5-8 perc).
3. Kész: GitHub ▸ **Releases** ▸ "CRC PLAY – legfrissebb APK" ▸ `CRC-PLAY.apk` letöltése a telefonra.
4. Telepítés: Android ▸ megnyitás ▸ "Ismeretlen források engedélyezése" ▸ Telepítés.

Az app fekvő módban, teljes képernyőn fut, internet és tárhely nélkül. A weboldal (Vercel) változatlanul működik.
