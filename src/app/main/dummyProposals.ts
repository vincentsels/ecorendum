import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, Proposal, Target, TargetType, TranslatedText, Variant } from './proposal';

export const PROPOSALS: Proposal[] = [
  new Proposal({
    title: [
      new TranslatedText('en', 'Test proposal')
    ],
    summary: [
      new TranslatedText('en', 'This is a summary a summary yeah')
    ],
    slug: [
      new TranslatedText('en', 'test-proposal')
    ],
    policyLevel: PolicyLevel.regional,
    variants: [
      new Variant({
        ambitionLevel: 2,
        costInitial: 1000000,
        costPerYear: { 2022: 1000000, 2023: 1000000, 2024: 500000 },
        description: [
          new TranslatedText('en', 'A more ambitious target')
        ],
        impacts: [
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.veryNegative),
        ],
        targets: [
          new Target({
            type: TargetType.co2reduction,
            amount: 10
          })
        ]
      })
    ]
  })
]
