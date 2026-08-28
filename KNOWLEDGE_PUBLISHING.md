# ZimonAI knowledge publishing guide

This file defines the repeatable publishing contract for the ZimonAI knowledge desk.

## Purpose and scope

Publish one useful, source-backed field note for overseas buyers of chargers, power adapters, power banks, GaN fast chargers and relevant upstream components. Topics must help a buyer verify a supplier, document, model, claim or pre-payment decision.

Do not publish generic SEO filler, broad consumer advice, invented cases, client stories, customer numbers, credentials, partners, laboratories, teams or field capabilities.

## Source standard

1. Start with the exact buyer question.
2. Locate current primary sources from regulators, statutory registries, standards bodies or certification owners.
3. Record the publisher, source title and direct URL in `knowledgeArticleSpecs`.
4. State what the evidence establishes and what it does not establish.
5. If the primary source is unavailable or the rule cannot be verified, do not publish the article as fact.

## Article structure

Every locale must include:

- one answer-first paragraph;
- three concise takeaways;
- three evidence-led sections;
- a practical buyer checklist;
- a visible limitations statement;
- links to all primary sources;
- one licensed editorial photograph with meaningful alternative text and a truthful caption.

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

Use a locally stored image with a licence that permits commercial website use. Record the photographer, source page, licence and website use in `THIRD_PARTY_ASSETS.md`. Do not use a supplier logo, certification mark or third-party factory photograph as decoration. Editorial images are not ZimonAI evidence and must remain labelled accordingly.

Every article specification must also define `imageCrop.card`, `imageCrop.article` and `imageCrop.mobile` as percentage-based focal positions. Choose each position by visually reviewing the knowledge-card crop, desktop article hero and mobile article hero separately. Do not default every image to the centre, stretch an image, or accept a crop that removes the product's identifying form, plug, ports or other subject-defining detail. If one photograph cannot support all three contexts, select another photograph before publication.

Browser review must reuse a small number of named Playwright sessions: normally one for local review and one for production review. Switch locale, route and viewport inside those sessions instead of launching a separate headed browser for every check. Close every session created by the run in both success and failure paths, verify that no run-owned browser remains, and never close the user's personal Chrome or a session belonging to another task.

Visual acceptance is a hard publication gate, not a screenshot-generation task. The reviewer must actually open and inspect the rendered English, Traditional Chinese and Simplified Chinese article in desktop and mobile viewports, plus the knowledge-card presentation. Confirm that the intended subject remains recognisable, focal details are not cut off, the mobile image is not stretched by intrinsic dimensions, and text, navigation, captions and page rhythm remain usable. A saved screenshot, an automated dimension check or a passing build does not by itself count as visual approval. If any inspected view is materially wrong, adjust the focal position, ratio or image and repeat the review; do not deploy or report success until every required view passes.

## Publication checklist

1. Confirm the topic does not duplicate an existing article.
2. Add the article specification, its category/products/markets/three-locale keywords and all three locale article objects to `src/knowledge-content.mjs`.
3. Add and document the local image.
4. Run `npm run build`, `npm run check` and `git diff --check`.
5. Review desktop and mobile rendering, including the Chinese line breaks.
6. Deploy only a complete, passing build.
7. Verify the production article, image, canonical URL, hreflang links, Article schema and sitemap entry.

If any step fails, leave production unchanged and report the failure plainly.
