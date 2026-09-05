# ZimonAI knowledge publishing guide

This file defines the repeatable publishing contract for the ZimonAI knowledge desk.

## Purpose and scope

Publish useful, source-backed content for overseas buyers and readers following chargers, power adapters, power banks, GaN fast chargers and relevant upstream components. The desk carries two distinct formats: buyer-focused industry knowledge and readable current-affairs reporting.

Do not publish generic SEO filler, broad consumer advice, invented cases, client stories, customer numbers, credentials, partners, laboratories, teams or field capabilities.

## Two content formats

### Industry knowledge

Industry-knowledge articles answer one concrete buyer question. They should open with a self-contained reader overview, explain the evidence chain and end with a practical checklist and clear limits. The opening is not a yes/no verdict: it must bring together what the document, record or issue actually does, its most important boundary, what that means for an overseas buyer and a useful ZIMONAI editorial interpretation. Do not begin the overview—or any sentence inside it—with “No,” “Yes,” “It depends,” “Not necessarily,” “不能,” “可以,” “不一定” or an equivalent binary answer.

### Current affairs

Current-affairs articles are written first as credible, readable news analysis. Their audience goal is legitimate organic discovery and brand exposure: earn the click with a timely, accurate headline, then keep the reader with a clear account of what happened and why it matters. Do not turn the opening into a verification lecture, a service pitch or a disguised sales page.

Every current-affairs article must:

- open with a self-contained news summary covering what happened, who announced it, when, and the central significance;
- use a news-led sequence: event summary, confirmed details, why the development matters, likely industry or supply-chain implications, what to watch next, and what remains unknown;
- keep sentences concrete and readable, with enough context for a non-specialist reader;
- place ZIMONAI's buyer, manufacturing or supply-chain interpretation after the event is clear, as added value rather than the premise of every paragraph;
- distinguish company claims from independent records and editorial inference without repeatedly interrupting the story;
- avoid forced marketing. The article should build familiarity with ZIMONAI by being useful and trustworthy, not by repeatedly promoting its services.

In `knowledgeArticleSpecs`, set `contentType` to `industry-knowledge` or `current-affairs`. Current-affairs locale objects must also provide independent labels for the summary, follow-up list and unknowns so the page never mislabels a news summary as a buyer-verification conclusion.

## Source standard

1. Start with the exact buyer question.
2. Locate current primary sources from regulators, statutory registries, standards bodies or certification owners.
3. Record the publisher, source title and direct URL in `knowledgeArticleSpecs`.
4. State what the evidence establishes and what it does not establish.
5. If the primary source is unavailable or the rule cannot be verified, do not publish the article as fact.

## Article structure

Every locale must include:

- one self-contained overview paragraph;
- three concise takeaways;
- three evidence-led sections;
- a practical buyer checklist;
- a visible limitations statement;
- links to all primary sources;
- one licensed editorial photograph with meaningful alternative text and a truthful caption.

The source field remains named `answer` for compatibility with the existing schema, and the template class remains `answer-first`; those internal names do not define the writing style. A reader who sees only this paragraph should still understand the subject, the decisive facts, the evidence boundary, the practical consequence and the editorial takeaway. Do not turn it into a disclaimer, a checklist, a restatement of the headline or a mechanical list of things the document cannot prove.

Automated validation must reject binary-verdict sentence openings, summaries that are too short to stand alone, and industry summaries that lack both a buyer perspective and an editorial insight. Passing the validator is only the first gate: a human reviewer must still compare every locale with the complete article and confirm that the overview accurately represents the whole piece.

The visible end of every article must carry the approved editorial credit for its locale. Use the shared `knowledge.ui.editorialCredit` value so every existing and future article displays the same ZIMONAI／智蒙灣科技 editorial ownership line without copy drift.

## Language standard

English, Traditional Chinese and Simplified Chinese are written as independent editorial versions. Preserve facts, legal meaning, model identifiers and technical terminology, but do not translate sentence by sentence. Traditional Chinese must read naturally to a Taiwan reader; Simplified Chinese must use natural mainland business terminology.

## Taxonomy and search metadata

Every article specification in `src/knowledge-content.mjs` must include all of the following locale-independent fields:

- one `category` selected from `supplier-identity`, `certification-market-access`, `product-transport-documents`, `factory-onsite` or `commercial-risk`;
- a non-empty `products` array using the controlled product IDs represented in `knowledgeContent[locale].taxonomy.products`;
- a non-empty `markets` array using the controlled market IDs represented in `knowledgeContent[locale].taxonomy.markets`;
- a `keywords` object with non-empty `en`, `zh-tw` and `zh-cn` arrays.

Choose the category, product and market from what the article actually establishes. Keywords must be natural search terms that a buyer may use for the documented subject, including useful regional aliases where appropriate. They are search metadata, not permission to add unsupported facts. Do not invent certifications, product coverage, markets, customers, cases, supplier relationships, field work or service capabilities to fill a filter or improve ranking.

The knowledge hub's "Start here" article is an explicit editorial choice. Exactly one published article must carry `featured: true` at a time; array order must not decide which article is featured. When the selection changes, add the flag to the new article and remove it from the previous one in the same change.

When a new controlled product or market ID is genuinely needed, add its label in all three locale taxonomy objects and extend the taxonomy contract test in the same change. Category IDs and slugs are stable URLs: do not rename them for copywriting reasons. Category pages are generated only for categories that contain at least one published article; do not add empty category pages manually.

## Image standard

Use a locally stored image with a licence that permits commercial website use. Record the photographer or issuing organisation, source page, licence or official media-use basis, download date and website use in `THIRD_PARTY_ASSETS.md`. Do not use a supplier logo, certification mark or third-party factory photograph as decoration. Editorial images are not ZimonAI evidence and must remain labelled accordingly.

Image relevance is a publication gate. For current affairs, the image should show the actual company, product, event, person or regulated subject whenever a suitable licensed photograph or official press-kit asset exists. A generic stock image is a fallback, not the default; it must not replace an available, rights-cleared event-specific asset merely because it is easier to source. Never lift an image from a product page, retailer, news story, search result or social post. An official press-kit asset must be traceable to a manufacturer- or organiser-issued media release or media library, and the caption must identify it as official media material without implying sponsorship, testing or a ZIMONAI relationship.

Every article specification must also define `imageCrop.card`, `imageCrop.article` and `imageCrop.mobile` as percentage-based focal positions. Choose each position by visually reviewing the knowledge-card crop, desktop article hero and mobile article hero separately. Do not default every image to the centre, stretch an image, or accept a crop that removes the product's identifying form, plug, ports or other subject-defining detail. If one photograph cannot support all three contexts, select another photograph before publication.

Browser review must reuse a small number of named Playwright sessions: normally one for local review and one for production review. Switch locale, route and viewport inside those sessions instead of launching a separate headed browser for every check. Close every session created by the run in both success and failure paths, verify that no run-owned browser remains, and never close the user's personal Chrome or a session belonging to another task.

Visual acceptance is a hard publication gate, not a screenshot-generation task. The reviewer must actually open and inspect the rendered English, Traditional Chinese and Simplified Chinese article in desktop and mobile viewports, plus the knowledge-card presentation. Confirm that the intended subject remains recognisable, focal details are not cut off, the mobile image is not stretched by intrinsic dimensions, and text, navigation, captions and page rhythm remain usable. A saved screenshot, an automated dimension check or a passing build does not by itself count as visual approval. If any inspected view is materially wrong, adjust the focal position, ratio or image and repeat the review; do not deploy or report success until every required view passes.

## Publication checklist

1. Confirm the topic does not duplicate an existing article.
2. Add the article specification, its category/products/markets/three-locale keywords and all three locale article objects to `src/knowledge-content.mjs`.
3. Add and document the local image.
4. Run `npm run build`, `npm run check`, `npm test` and `git diff --check`.
5. Review desktop and mobile rendering, including the Chinese line breaks.
6. Commit the reviewed changes, fetch and compare the current `origin/main`, and synchronize the release to GitHub through a non-force fast-forward push or the repository's required PR process. Confirm the worktree is clean and `HEAD`, the local `origin/main` and the live `origin/main` all identify the reviewed release. If another change has arrived, review and reconcile it and repeat the affected checks before publishing; never overwrite it.
7. Follow `docs/PRODUCTION_RELEASE.md`: run the read-only `npm run release:preflight`, then publish only through `npm run deploy:production -- --confirm=deploy-zimonai-production`. A routine article release must stop if preflight reports pending database migrations or an unrelated schema/configuration change; database repair or migration requires its own authorized work. Never bypass the release guard with a direct `wrangler pages deploy`, and never treat `--branch=main` as proof that GitHub has been synchronized.
8. Verify the production article, image, canonical URL, hreflang links, Article schema and sitemap entry. Record the synchronized Git commit and successful production deployment separately; a push alone is not a publication.

If any step fails, leave production unchanged and report the failure plainly.
