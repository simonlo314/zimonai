# ZimonAI — creative direction

## Thesis

**Verify before you buy.** The website should help a buyer understand what ZimonAI examines, how a conclusion is reached, and where each service stops—without inventing a supplier, a client case, or a result for visual effect.

Audience: overseas buyers, FBA and Shopify sellers, importers, and purchasing teams buying chargers and power electronics from China. The home page has one job: turn uncertainty about a supplier into a clearly scoped verification request.

## Visual system

- **ZimonAI navy — `#101D33`:** trust, structure, primary text and dark surfaces.
- **Signal blue — `#2358BD`:** decisions, links, calls to action and the verification path.
- **Signal sky — `#3192E8`:** secondary emphasis and motion light.
- **Evidence mist — `#EAF0F8`:** quiet section shifts and supporting surfaces.
- **Evidence white — `#F5F7FA`:** the main ground.
- **Verified — `#147A5A`:** confirmed evidence only.
- **Unresolved — `#A06A16`:** unable-to-verify states.
- **Discrepancy — `#B6463A`:** mismatched records and warnings.

The primary type system is a confident sans serif. CJK pages use language-specific system sans stacks and independent editorial line breaks. Mono type is reserved for real structural labels, dates, references and statuses. Serif is supporting, not the default voice.

### Type hierarchy

The website is an evidence desk, not a campaign poster. Every new page must use the semantic type tokens in `src/assets/site.css` instead of adding viewport-based title sizes to an individual component:

- `--type-home` — homepage thesis only
- `--type-page` — every internal-page and article title, including pages with media
- `--type-section` — major section headings
- `--type-card` — card, panel and supporting headings

Latin and CJK layouts use independent token values, but the hierarchy stays continuous across breakpoints. Do not add a second mobile `clamp()` for a title, do not allow an internal-page title to exceed the homepage title, and do not let a component heading inherit page-title scale. At 760px and 761px, type must change continuously rather than jump between two systems. Mobile body and form text stay at 16px or above, and frequently used touch targets are at least 44px high.

## Layout concept

The site uses a compact floating navigation, direct headlines, controlled whitespace, and dense factual rows. The first viewport should show more than a slogan: an internal page should normally reveal its lead, media or first decision cue without requiring a full-screen scroll. Rounded surfaces group related actions; they do not turn every sentence into a card.

```text
┌──────────────────────────────────────────────────────────────┐
│ floating navigation / clear booking action                   │
├───────────────────────────────┬──────────────────────────────┤
│ direct category thesis        │ what we actually examine      │
│ service boundary              │ entity / certificate / field  │
├───────────────────────────────┴──────────────────────────────┤
│ one-category positioning / real covered product families     │
├──────────────────────────────────────────────────────────────┤
│ buyer decision moments / the corresponding ZimonAI work      │
├──────────────────────────────────────────────────────────────┤
│ four-step verification path: receive → locate → compare → report│
├──────────────────────────────────────────────────────────────┤
│ operating facts / service staircase / source types / limits  │
└──────────────────────────────────────────────────────────────┘
```

## Signature interaction

The cobalt verification path is the site's signature element. Its four numbered steps describe the real working sequence and remain useful without animation. Motion is limited to background light, entrance hierarchy, and clear interface feedback; no animation implies a live database connection, a completed investigation, or a customer result.

## Component system

- Floating site navigation with a distinct booking entry
- Truthful hero scope index
- Buyer-decision ledger
- Four-step verification path
- Service staircase and detailed tier panel
- Source-type rows and scope boundary statements
- Real business registration and approved reception-area evidence
- Honest mail-draft request form and approved contact directory

## Truth constraint

Fictional supplier dossiers are not used as homepage proof or decoration. A real case may be added only after the owner supplies it, approves publication, and defines what can be disclosed. Until then, ZimonAI's distinctiveness comes from its real category focus, real service scope, real process, real company information and traceable reporting method.
