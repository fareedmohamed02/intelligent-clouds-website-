# Intelligent-Cloud — Production SVG Pack

Handcrafted vector assets for the marketing site and admin.  
Brand colors: navy `#04275F`, azure `#438BD8`, orange `#F26A13`.

## Usage

- Prefer **inline SVG** in React for diagrams that need Framer Motion / reduced-motion control.
- Use as `<img src="...">` for logos, OG, and static icons (SMIL still runs in most browsers for diagrams).
- `logo-mono.svg` uses `currentColor` — set CSS `color` to control fill.

## Brand (`../brand/`)

| File | Use |
| --- | --- |
| `logo-color.svg` | Primary mark on light backgrounds |
| `logo-reverse.svg` | Mark on navy / dark bands |
| `logo-mono.svg` | Single-color / print / watermark |
| `logo-mark.svg` | Drop-in mark alias |
| `favicon.svg` | Browser favicon / app icon base |
| `wordmark.svg` | Navbar / footer lockup |
| `wordmark-reverse.svg` | Footer on dark |
| `logo.png` | Original client raster (reference) |

## Illustrations

| Folder | Contents |
| --- | --- |
| `services/` | 8 service glyphs for bento / cards |
| `process/` | Assess → Design → Build → Operate |
| `diagrams/` | Architecture Engine, network, migration, security, observability, DevOps |
| `og/` | 1200×630 social share |
| `ui/` | Partner slot, tech chips |

## Still client-supplied later

- Official logo SVG if they have a refined master different from this recreation  
- Real partner logos / certification badges  
- PoC video poster
