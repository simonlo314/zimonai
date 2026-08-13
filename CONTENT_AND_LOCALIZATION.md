# ZimonAI content and localisation rules

These rules are part of the website implementation, not optional writing advice.

## Truth before volume

- Add operational detail only when it is supported by ZimonAI's real service scope.
- Never create client counts, testimonials, cases, credentials, partners, team members, office photos, addresses or business registrations.
- Demonstration records must remain visibly fictional.
- Registration details may be published only from a supplied, verified source. Public derivatives must omit unnecessary identifiers such as the unified social credit code and QR code.
- A registered address may be described as a reception address only after the owner explicitly confirms that use. The current Shenzhen address has that approval.
- Office address and photographs are published only through `src/brand-profile.mjs` after the owner supplies and approves them. Address approval does not automatically approve photographs.

## Information density

Every commercial page should answer concrete buyer questions: who the service is for, what the buyer sends, what is checked, what the buyer receives, how long it takes, what it costs and where the conclusion stops. Large headlines and interaction cannot substitute for these answers.

## Chinese is independently written

- Traditional and Simplified Chinese are separate editorial versions, not character conversions of one another.
- Do not inherit Chinese content objects across locales and do not use `replaceAll`, machine translation or browser translation to produce publishable copy.
- Preserve meaning and commercial facts, but rewrite sentence order, rhythm and terminology for the target reader.
- Interface labels must also be localised; do not leave English labels inside Chinese layouts unless the term is a proper name or recognised technical standard.

## Chinese typography

- CJK pages use language-specific font stacks, tighter title scale, larger paragraph line-height and a shorter reading measure.
- Do not use negative tracking on Chinese headings.
- Use `text-autospace`, strict line breaking and natural word breaking where supported.
- Avoid single-character orphan lines in final visual review.

`npm run check` enforces the structural parts of this policy. A human language review is still required because natural writing cannot be guaranteed by code alone.
