import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, Proposal, Sector, Target, TargetType, TranslatedText, Variant } from './proposal';

export const PROPOSALS: Proposal[] = [
  new Proposal({
    title: [
      new TranslatedText('en', 'Test proposal')
    ],
    summary: [
      new TranslatedText('en', 'This is a summary a summary yeah This is a summary a summary yeah This is a summary a summary yeahThis is a summary a summary yeah This is a summary a summary yeahThis is a summary a summary yeahThis is a summary a summary yeah.')
    ],
    slug: [
      new TranslatedText('en', 'test-proposal')
    ],
    policyLevel: PolicyLevel.flemish,
    sector: Sector.industry,
    variants: [
      new Variant({
        ambitionLevel: 1,
        initialCost: 1000000,
        costPerYear: [ { year: 2022, amount: 1000000 }, { year: 2023, amount: 1000000 }, { year: 2024, amount: 500000 } ],
        description: [
          new TranslatedText('en', 'A basic target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.veryNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 10000 })
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        initialCost: 2000000,
        costPerYear: [ { year: 2022, amount: 3000000 }, { year: 2023, amount: 2000000 }, { year: 2024, amount: 800000 } ],
        description: [
          new TranslatedText('en', 'A more ambitious target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.veryNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 25000 })
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        initialCost: 3000000,
        costPerYear: [ { year: 2022, amount: 3000000 }, { year: 2023, amount: 3000000 }, { year: 2024, amount: 800000 } ],
        description: [
          new TranslatedText('en', 'A very ambitious target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.veryNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 40000 })
        ]
      })
    ]
  }),
  new Proposal({
    title: [
      new TranslatedText('en', 'Some other proposal')
    ],
    summary: [
      new TranslatedText('en', 'And this is its summary And this is its summaryAnd this is its summaryAnd this is its summary. This is a summary a summary yeahThis is a summary a summary yeah This is a summary a summary yeah.')
    ],
    slug: [
      new TranslatedText('en', 'other-proposal')
    ],
    policyLevel: PolicyLevel.federal,
    sector: Sector.agriculture,
    variants: [
      new Variant({
        ambitionLevel: 1,
        initialCost: 0,
        costPerYear: [ { year: 2022, amount: 2000000 }, { year: 2023, amount: 3000000 }, { year: 2024, amount: 2000000 }, { year: 2025, amount: 2000000 }, { year: 2026, amount: 2000000 } ],
        description: [
          new TranslatedText('en', 'A basic target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.veryNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 15000 })
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        initialCost: 15000000,
        description: [
          new TranslatedText('en', 'A more ambitious target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.veryNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 25000 })
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        initialCost: 20000000,
        costPerYear: [ { year: 2022, amount: 3000000 }, { year: 2023, amount: 3000000 }, { year: 2024, amount: 800000 } ],
        description: [
          new TranslatedText('en', 'A very ambitious target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.veryNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 30000 })
        ]
      })
    ]
  }),
  new Proposal({
    title: [
      new TranslatedText('en', 'Single-variant proposal')
    ],
    summary: [
      new TranslatedText('en', 'Soooo this is the texteelllee aet zaer Soooo this is the texteelllee aet zaerSoooo this is the texteelllee aet zaerSoooo this is the texteelllee aet zaer.')
    ],
    slug: [
      new TranslatedText('en', 'single-variant-proposal')
    ],
    policyLevel: PolicyLevel.flemish,
    sector: Sector.buildings,
    variants: [
      new Variant({
        ambitionLevel: 1,
        initialCost: 20000000,
        costPerYear: [ { year: 2022, amount: 2000000 }, { year: 2023, amount: 3000000 }, { year: 2024, amount: 4000000 } ],
        description: [
          new TranslatedText('en', 'The only target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.veryNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 10000 })
        ]
      }),
    ]
  })
]
