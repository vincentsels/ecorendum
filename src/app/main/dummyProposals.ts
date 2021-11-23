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
        costInitial: 1000000,
        costPerYearFixed: 600000,
        description: [
          new TranslatedText('en', 'A basic target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 10000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 5000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 2000000,
        costPerYearFixed: 800000,
        description: [
          new TranslatedText('en', 'A more ambitious target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.veryNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 25000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 10000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 3000000,
        costPerYearFixed: 1000000,
        description: [
          new TranslatedText('en', 'A very ambitious target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.veryNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.veryNegative),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.extremelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 40000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 15000 }),
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
        costInitial: 0,
        costPerYearVariable: { 2022: 2000000, 2023: 2000000, 2024: 2000000, 2025: 2000000, 2026: 2000000 },
        description: [
          new TranslatedText('en', 'A basic target')
        ],
        impacts: [
          new Impact(ImpactDomain.luLuCf, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 15000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 5000 }),
          new Target({ type: TargetType.renewableEnergy, amount: 5000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 15000000,
        description: [
          new TranslatedText('en', 'A more ambitious target')
        ],
        impacts: [
          new Impact(ImpactDomain.luLuCf, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 25000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 10000 }),
          new Target({ type: TargetType.renewableEnergy, amount: 10000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 20000000,
        costPerYearVariable: { 2022: 3000000, 2023: 3000000, 2024: 800000 },
        description: [
          new TranslatedText('en', 'A very ambitious target')
        ],
        impacts: [
          new Impact(ImpactDomain.luLuCf, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.veryPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 30000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 15000 }),
          new Target({ type: TargetType.renewableEnergy, amount: 15000 }),
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
        costInitial: 20000000,
        costPerYearVariable: { 2022: 2000000, 2023: 2000000, 2024: 2000000, 2025: 2000000, 2026: 2000000 },
        description: [
          new TranslatedText('en', 'The only target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 10000 }),
          new Target({ type: TargetType.renewableEnergy, amount: 5000 }),
        ]
      }),
    ]
  })
]
