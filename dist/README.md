# Cart Trail — Mobile-Ready Build

This is a standalone, mobile-optimized build of **Cart Trail: A Métis Journey**.

## What's Included

- `index.html` — Complete game HTML with embedded engine, mobile CSS, and cart marker image
- `art/cart_marker_48px.png` — Red River cart illustration used as the map marker (transparent PNG)
- `art/cart_marker_32px.png` — Small version (fallback)
- `art/cart_marker_64px.png` — Large version (fallback)

## How to Use

### On Your Phone

1. **Option A: Upload to a static host**
   - Upload this entire folder (preserving `art/` subdirectory) to any static web host (GitHub Pages, Netlify, Cloudflare Pages, etc.)
   - Open the hosted URL in your phone's browser

2. **Option B: Direct file access**
   - Copy `index.html` and the `art/` folder to your phone's local storage
   - Open `index.html` directly in your mobile browser (Chrome, Firefox, Safari all work)
   - Some browsers may restrict local file access; if so, use Option A

### Desktop Testing

Open `index.html` in any desktop browser. Resize the window to test mobile layout (width ≤ 768px triggers mobile CSS).

## Mobile Optimizations

- **Touch targets ≥44px** — buttons are large enough for fingers
- **Responsive layout** — map fills available space, bottom controls adapt
- **Fullscreen toggle** — ⛶ button in status bar for immersive play
- **Smooth narrative scrolling** — optimized for touch
- **Pinch-zoom friendly** map with touch panning
- **Accessible font sizes** — readable without zoom

## Known Issues

- **Audio:** No sound effects or music yet (placeholder for future)
- **Balance:** Economy needs tuning — expect frequent starvation until numbers adjusted
- **Save/Load:** Not implemented — each session starts fresh

## Credits

- Historical research: Métis history of the Carlton Trail
- Art: Red River cart illustration from Google Drive (cropped and optimized)
- Engine: Pure JavaScript (no dependencies)

## License

[To be determined — likely CC BY-NC-SA for educational/historical content]

---

For developmental notes, see `~/.hermes/projects/metis-trail/` (design docs, engine source, test harness).
