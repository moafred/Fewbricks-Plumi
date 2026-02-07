# Mobile App Assets

Place the following files in this directory:

## Required Files

### `icon.png` (1024x1024px)
- Background: `#F0F7FF` (sky-50 from Plumi palette)
- Content: Plumi mascot or "Plumi" text in `#0369A1` (sky-700)
- Format: PNG with transparency

### `splash.png` (2732x2732px)
- Background: `#F0F7FF` (sky-50)
- Center: Plumi logo/mascot
- Format: PNG

## Generate Native Assets

After placing the files, run:

```bash
cd apps/frontend
pnpm dlx @capacitor/assets generate --iconBackgroundColor '#F0F7FF' --splashBackgroundColor '#F0F7FF'
```

This generates all required icon sizes for iOS and Android.
