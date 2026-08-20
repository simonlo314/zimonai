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

## Image standard

Use a locally stored image with a licence that permits commercial website use. Record the photographer, source page, licence and website use in `THIRD_PARTY_ASSETS.md`. Do not use a supplier logo, certification mark or third-party factory photograph as decoration. Editorial images are not ZimonAI evidence and must remain labelled accordingly.

## Publication checklist

1. Confirm the topic does not duplicate an existing article.
2. Add the article specification and all three locale objects to `src/knowledge-content.mjs`.
3. Add and document the local image.
4. Run `npm run build`, `npm run check` and `git diff --check`.
5. Review desktop and mobile rendering, including the Chinese line breaks.
6. Deploy only a complete, passing build.
7. Verify the production article, image, canonical URL, hreflang links, Article schema and sitemap entry.

If any step fails, leave production unchanged and report the failure plainly.
