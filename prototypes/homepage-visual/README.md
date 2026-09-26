# Homepage visual prototype — review only

Scope: navigation/mega menu, English homepage hero, one evidence section, and the T1/T2/Advanced service overview. No production integration or deployment. Other pages, shared website styles, commercial facts, routing, metadata, analytics and backend files remain untouched.

## Design plan, reviewed before implementation

- Subject: independent, buyer-paid verification of Chinese charger and power-electronics suppliers. Not a manufacturer, certification body or generic consulting firm.
- Palette: brand navy `#142C49`, brand blue `#2358BD`, white `#FFFFFF`, document backdrop `#E9EEF1`, body slate `#405063`, supporting cool white `#F7F9FB`. Actual manufacturing photography supplies the green/copper/material colors; no artificial glow or gradient.
- Type: Avenir Next / Avenir, with Segoe UI and sans-serif fallbacks. One family, moderate 50–56 px desktop hero and 35–40 px mobile headline; body 17–19 px. No tracked all-caps labels or decorative numbering.
- Layout: image-led, left-aligned, clear uneven hierarchy. The hero has a compact navy message area and edge-to-edge manufacturing photography. A white evidence section holds actual report-cover material, with no recreated report fields. T1 is a wide primary row, T2 a different, narrower text composition, Advanced a compact full-width extension.
- Distinctive moment: close-range electronics assembly machinery and the circuit board, not a port, container, handshake or floating dashboard. The rest stays quiet.

```text
DESKTOP
[ Brand     Services v   Resources v   Methodology  About   EN v   CTA ]
[ Compact navy message     |              Real manufacturing photo     ]
[ CTA / service comparison |              No floating report UI        ]
[ Category focus           |              Photo provenance             ]
[ Evidence question + actual check scope       | Actual report cover   ]
[                                             | Explicit material gap ]
[ Services heading                              Brief scope guidance  ]
[ T1: main scope / price / clear boundaries   | T2: deeper review       ]
[ Advanced: separately scoped fieldwork and ongoing support            ]
[ Prototype boundary / sources                                        ]

MOBILE
[ Brand                            Menu ]
[ Compact headline + CTA                ]
[ Real photo                            ]
[ Evidence question / checks            ]
[ Actual cover + missing-interior note  ]
[ T1 detailed scope                     ]
[ T2 deeper research                    ]
[ Advanced scoped engagement            ]
```

Review against rejected direction: no invented document dashboard, equal three-card grid, ornamental 01/02/03 sequence, pill badges, giant headline or all-navy page. The actual report cover is an existing artifact, displayed flat and labeled; it is not evidence of a newly completed case. An anonymized, publication-cleared report interior is still missing. Existing sample body is not copied into the prototype.

## Asset provenance

Hero: *Machine places components on a circuit board during manufacturing in a factory environment*, photographed by Nenad Stojković, Wikimedia account Shixart1985, dated 2026-05-20. [Source](https://commons.wikimedia.org/wiki/File:Machine_places_components_on_a_circuit_board_during_manufacturing_in_a_factory_environment.jpg), [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/). Downloaded 2026-09-26. Responsive copies resized/encoded; display crops via CSS. The source does not establish a China location. Never describe it as a ZimonAI assignment, client, inspection or Chinese factory.

Report cover: existing `src/assets/zimonai-t1-sample-report-cover.png`, checked against page 1 of the existing 8-page public sample PDF. The interior retains certificate/model identifiers and historical claims, so it is excluded from the visual. The existing sample is not represented as the current standard 3–5 page deliverable. No new fake report, invented finding or anonymized-supplier claim is created.

## Run

From the repository root: `node prototypes/homepage-visual/serve.mjs`. Binds only to `127.0.0.1:4174`; serves only this English prototype and allowlisted assets. It does not build or write `dist`, call backend APIs, submit forms or emit analytics. Inquiry actions open a local explanatory dialog. Off-prototype informational/language links point to the corresponding existing public site pages in the same tab; they are not redesigned.

Commercial names, prices, scope and timing are imported read-only from the existing shared service facts and localized service copy. English is the only new visual implementation in this review round. The language menu keeps existing English-root, zh-tw and zh-cn homepage equivalents; no browser-language redirect/suggestion is introduced.

Approval gate: review desktop/mobile and hero/services screenshots before any integration or further rollout.
