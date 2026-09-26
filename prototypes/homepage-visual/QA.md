# Local homepage visual prototype — 2026-09-26

Status: ready for visual review, **not approved for integration or deployment**.

## Scope delivered

- Navigation with Services and Resources mega menus; language menu.
- English homepage hero with licensed, real component-placement photography.
- Core verification section with the existing, unaltered report cover.
- Unequal T1 / T2 presentation and a separate Advanced engagement band.
- Local-only inquiry previews. No forms, payments, analytics or backend connections.

## Verified

- `node --test prototypes/homepage-visual/test.mjs`: 7/7 pass. Checks English/noindex isolation, shared commercial facts, anchors/disclosures, language equivalents, provenance/material gap, asset responses/security headers, and blocking writes/non-home routes.
- Browser layout widths 360, 390, 768, 1024 and 1440: no document horizontal overflow; no broken images.
- English desktop and mobile full-page screenshots visually inspected. Hero crop, English long service title, report artifact, tier hierarchy and section transitions reviewed.
- Desktop Services menu: 11 links, Escape closes and restores focus. Resources menu and mutual exclusion tested. Language menu points to existing homepage equivalents; no forced redirect or language suggestion.
- Mobile Menu and Services disclosure open/close; menu content stays within a scrollable viewport. T2 anchor closes the menu and retains the local `#t2` destination.
- T2 inquiry preview works by keyboard and click; returning restores the triggering button. T1 and Advanced inquiry selections/destinations checked by keyboard.
- Original cover dialog opens; Escape closes and restores focus. This is the existing public cover, not a recreated report UI.
- Browser error/warning log empty at final inspection.
- 171 pre-existing tracked/untracked project files matched the SHA-256 baseline captured before prototype implementation. The prototype adds its own directory and screenshots only. Existing dirty work was preserved.

## Evidence files

Under `output/homepage-visual-prototype/`:

- `english-desktop-full.png`
- `english-mobile-full.png`
- `hero-desktop.png`
- `hero-mobile.png`
- `services-desktop.png`
- `mega-menu-desktop.png`

Full-page desktop viewport requested: 1440 px. Mobile viewport requested: 390 px. Browser full-page capture excludes its scrollbar strip. The additional expanded mega-menu capture uses the restored native 1920 px desktop viewport. Screenshots are browser captures, not generated mockups. Temporary viewport overrides were reset before handoff.

## Limits / next approval gate

- A publication-cleared anonymized report interior is still missing. Existing sample pages contain certificate/model identifiers and historical claims. No such interior has been fabricated or enlarged in this prototype.
- Hero photograph has manufacturing provenance, but the source does not establish a China location or any relationship with ZimonAI. Visible context/credit notes preserve that boundary.
- Only the English homepage has this new visual implementation. Chinese localization and other pages retain existing implementation; no claim of full-site or full-backend QA is made.
- Existing informational links point to the current public site in the same tab. They were not navigated during prototype QA. Inquiry controls never submit anything.
- Browser-emulated responsive testing is not physical-device testing. This is not an exhaustive accessibility or performance audit.
- No source integration, production build, commit, push, migration, deployment, DNS or Cloudflare changes were performed in this round.
- The local preview listens on loopback only at `http://127.0.0.1:4174/`. Wait for Simon’s visual approval before any further rollout.
