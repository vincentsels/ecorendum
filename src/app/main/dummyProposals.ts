import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, Proposal, Sector, Target, TargetType, TranslatedText, Variant } from './proposal';

export const PROPOSALS: Proposal[] = [
  new Proposal({
    title: [
      new TranslatedText('nl', 'Uitfasering aankoop fossiele verbrandingsmotoren'),
    ],
    summary: [
      new TranslatedText('nl', 'De federale overheid verbiedt de verkoop van personen- en bestelwagens met een verbrandingsmotor. Op de tweedehandsmarkt kunnen deze wagens wel nog verkocht worden.')
    ],
    slug: [
      new TranslatedText('nl', 'uitfasering-aankoop-fossiele-verbrandingsmotoren')
    ],
    policyLevel: PolicyLevel.federal,
    sector: Sector.transport,
    pictureThumb: 'https://i.ibb.co/X5M7Fc4/transportation-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 100000,
        costPerYearFixed: 0,
        description: [
          new TranslatedText('nl', 'Vanaf 2029')
        ],
        impacts: [
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 5000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 100000,
        costPerYearFixed: 0,
        description: [
          new TranslatedText('nl', 'Vanaf 2027')
        ],
        impacts: [
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 15000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -3000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 200000,
        description: [
          new TranslatedText('nl', 'Vanaf 2025')
        ],
        impacts: [
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 25000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -5000 }),
        ]
      })
    ]
  }),
  new Proposal({
    title: [
      new TranslatedText('en', 'Some other proposal')
    ],
    summary: [
      new TranslatedText('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.')
    ],
    slug: [
      new TranslatedText('en', 'other-proposal')
    ],
    policyLevel: PolicyLevel.federal,
    sector: Sector.agriculture,
    pictureThumb: 'https://i.ibb.co/j3YSRyQ/agriculture-640.jpg',
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
      new TranslatedText('en', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
    ],
    slug: [
      new TranslatedText('en', 'single-variant-proposal')
    ],
    policyLevel: PolicyLevel.flemish,
    sector: Sector.buildings,
    pictureThumb: 'https://i.ibb.co/1Mp0cN3/construction-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 20000000,
        costPerYearVariable: { 2022: 2000000, 2023: 2000000, 2024: 2000000, 2025: 2000000, 2026: 2000000 },
        description: [
          new TranslatedText('en', 'The only target')
        ],
        impacts: [
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 10000 }),
          new Target({ type: TargetType.renewableEnergy, amount: 5000 }),
        ]
      }),
    ]
  })
]
