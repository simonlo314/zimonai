# ZimonAI content and localisation rules

These rules are part of the website implementation, not optional writing advice.

## Truth before volume

- Add operational detail only when it is supported by ZimonAI's real service scope.
- Never create client counts, testimonials, cases, credentials, partners, team members, office photos, addresses or business registrations.
- Do not use a fictional supplier, client or case as homepage proof or visual decoration. A demonstration may be used only when the owner explicitly requests it and it remains unmistakably labelled as a demonstration.
- A real case may be published only after the owner supplies it, approves publication and defines what may be disclosed.
- Registration details may be published only from a supplied, verified source. A complete licence image may be published only after the owner explicitly approves full public display; the current ZimonAI licence has that approval.
- The full unified social credit code may be published only after explicit owner approval. The current code and footer placement have that approval.
- A registered address may be described as a reception address only after the owner explicitly confirms that use. The current Shenzhen address has that approval.
- Office address and photographs are published only through `src/brand-profile.mjs` after the owner supplies and approves them. Address approval does not automatically approve photographs.
- Public contact methods are published only through `src/brand-profile.mjs`. WhatsApp uses the owner-approved Taiwan number and must link to the corresponding `wa.me` address.

## Information density

Every commercial page should answer concrete buyer questions: who the service is for, what the buyer sends, what is checked, what the buyer receives, how long it takes, what it costs and where the conclusion stops. Large headlines and interaction cannot substitute for these answers.

## Approved category and service architecture

- Public positioning is limited to chargers, power adapters, power banks, GaN fast chargers and their upstream components.
- The service catalogue is a T1–T6 staircase. A higher tier inherits the work named in the lower tier and adds the stated access or execution.
- Every tier must visibly state what it excludes and whether supplier consent is required.
- Never invent a business-model exclusion. ZimonAI may search for and recommend suppliers, perform agreed quality work and manage verification across a sourcing process. Exact inclusions are defined by the selected tier and assignment.
- Taipei and Shenzhen are the operating bases. Do not publish a fixed list of serviceable cities or imply that all work is limited to South China.

## Chinese is independently written

- Traditional and Simplified Chinese are separate editorial versions, not character conversions of one another.
- Do not inherit Chinese content objects across locales and do not use `replaceAll`, machine translation or browser translation to produce publishable copy.
- Preserve meaning and commercial facts, but rewrite sentence order, rhythm and terminology for the target reader.
- Interface labels must also be localised; do not leave English labels inside Chinese layouts unless the term is a proper name or recognised technical standard.

## Chinese typography

- CJK pages use language-specific font stacks, tighter title scale, larger paragraph line-height and a shorter reading measure.
- Public interface text has a 13px minimum. Section eyebrows, field labels and captions use the shared 13–15px type tokens; mobile body and form text stay at 16px or above. The evidence aesthetic must come from typeface, weight and rules, not unreadably small text.
- Headings use the semantic home, page, section and card tokens defined in `src/assets/site.css`. CJK values are independently scaled through locale tokens; page-specific mobile `clamp()` rules are prohibited because they create breakpoint jumps and inconsistent hierarchy.
- Do not use negative tracking on Chinese headings.
- Use `text-autospace`, strict line breaking and natural word breaking where supported.
- Avoid single-character orphan lines in final visual review.

`npm run check` enforces the structural parts of this policy. A human language review is still required because natural writing cannot be guaranteed by code alone.

## Knowledge desk publishing

- Knowledge articles answer a real pre-purchase question within Chinese supplier verification, chargers, power adapters, power banks, GaN products or their relevant documentation.
- Every article begins with a concise answer, then separates official-source facts, practical interpretation and evidence limitations.
- Prefer primary sources: regulators, statutory registries, standards bodies and certification owners. Commercial summaries may help locate a source, but do not become the factual foundation when the original is available.
- Traditional Chinese, Simplified Chinese and English are three editorial versions. Technical names and legal meanings must remain consistent, while sentence structure and terminology are rewritten for each readership.
- Editorial photographs must have a traceable commercial-use licence, be stored locally and be recorded in `THIRD_PARTY_ASSETS.md`. They must never be presented as ZimonAI case evidence, client work, personnel or facilities.
- A scheduled article is not published when its sources, image licence, translated meaning, build checks or production deployment cannot be verified.
