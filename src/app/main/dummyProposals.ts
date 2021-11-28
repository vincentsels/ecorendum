import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, Proposal, Sector, Target, TargetType, TranslatedText, Variant } from './proposal';

export const PROPOSALS: Proposal[] = [
  new Proposal({
    id: 1,
    title: [
      new TranslatedText('nl', 'Uitfasering aankoop fossiele verbrandingsmotoren'),
      new TranslatedText('en', 'Phase-out purchase of internal combustion engines'),
    ],
    summary: [
      new TranslatedText('nl', 'De federale overheid verbiedt de verkoop van personen- en bestelwagens met een verbrandingsmotor. Op de tweedehandsmarkt kunnen deze wagens wel nog verkocht worden.'),
      new TranslatedText('en', 'The federal government forbids the sale of personal or small transport vehicles with internal combustion engines. These can still be bought and sold on the second hand market.')
    ],
    slug: [
      new TranslatedText('nl', 'uitfasering-aankoop-fossiele-verbrandingsmotoren'),
    ],
    policyLevel: PolicyLevel.federal,
    sector: Sector.transport,
    pictureThumb: 'https://i.ibb.co/ZcGmQV2/transportation-2-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 100000,
        costPerYearFixed: 0,
        description: [
          new TranslatedText('nl', 'Vanaf 2029'),
          new TranslatedText('en', 'Starting 2029'),
        ],
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 4000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 100000,
        costPerYearFixed: 0,
        description: [
          new TranslatedText('nl', 'Vanaf 2027'),
          new TranslatedText('en', 'Starting 2027'),
        ],
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 12000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -3000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 200000,
        description: [
          new TranslatedText('nl', 'Vanaf 2025'),
          new TranslatedText('en', 'Starting 2025'),
        ],
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 20000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -5000 }),
        ]
      })
    ]
  }),
  new Proposal({
    id: 2,
    title: [
      new TranslatedText('nl', 'Verplicht weergeven koolstofvoetafdruk producten en diensten'),
      new TranslatedText('fr', 'Obligation d\'affichage de l\'impact carbone des produits et services'),
      new TranslatedText('en', 'Obligatory display of carbon footprint on products and services'),
    ],
    summary: [
      new TranslatedText('nl', 'De federale overheid verplicht alle leveranciers van producten en diensten om weer te geven wat de koolstofvoetafdruk (en eventueel andere ecologische impact) is, zodat consumenten hier rekening mee kunnen houden.'),
      new TranslatedText('en', 'The federal government requires all suppliers of products and services to display the carbon footprint (and optionally wider ecological impact), so consumers can take that into account.'),
      new TranslatedText('fr', 'L’affichage de l’impact environnemental d’un produit nous paraît être un levier important de sensibilisation et d’information du consommateur. Ne souhaitant pas contraindre le consommateur dans ses choix, nous considérons qu’il est nécessaire de lui donner l’information appropriée à une prise de conscience de l’impact de ses choix afin de l’orienter vers des pratiques plus vertueuses..')
    ],
    slug: [
      new TranslatedText('nl', 'obligatory-display-of-carbon-footprint-on-products-and-services'),
      new TranslatedText('nl', 'verplicht-weergeven-koolstofvoetafdruk-producten-en-diensten'),
      new TranslatedText('fr', 'obligation-d-affichage-de-l-impact-carbone-des-produits-et-services'),
    ],
    policyLevel: PolicyLevel.federal,
    sector: Sector.industry,
    pictureThumb: 'https://i.ibb.co/F7nH8Wq/eco-shopping-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 100000,
        costPerYearFixed: 0,
        description: [
          new TranslatedText('en', 'Starting 2025, limited'),
          new TranslatedText('nl', 'Vanaf 2025, beperkt'),
          new TranslatedText('fr', 'À partir de 2025, limité'),
        ],
        impacts: [
          new Impact(ImpactDomain.redistributionLocal, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.somewhatNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 4000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 100000,
        costPerYearFixed: 0,
        description: [
          new TranslatedText('en', 'Starting 2024, limited, eco-score'),
          new TranslatedText('nl', 'Vanaf 2024, beperkt, eco-score'),
          new TranslatedText('fr', 'À partir de 2024, limité, eco-score'),
        ],
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.phosphorusPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.redistributionLocal, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.somewhatNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 5000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 200000,
        description: [
          new TranslatedText('en', 'Starting 2024, complete, eco-score'),
          new TranslatedText('nl', 'Vanaf 2024, compleet, eco-score'),
          new TranslatedText('fr', 'À partir de 2024, complèt, eco-score'),
        ],
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.phosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.redistributionLocal, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.somewhatNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 7000 }),
        ]
      })
    ]
  }),
  new Proposal({
    id: 3,
    title: [
      new TranslatedText('en', 'Some other proposal'),
    ],
    summary: [
      new TranslatedText('en', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'),
    ],
    slug: [
      new TranslatedText('en', 'other-proposal'),
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
          new TranslatedText('en', 'A basic target'),
        ],
        impacts: [
          new Impact(ImpactDomain.aerosols, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
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
          new TranslatedText('en', 'A more ambitious target'),
        ],
        impacts: [
          new Impact(ImpactDomain.aerosols, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.moderatelyPositive),
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
          new TranslatedText('en', 'A very ambitious target'),
        ],
        impacts: [
          new Impact(ImpactDomain.aerosols, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.moderatelyPositive),
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
    id: 4,
    title: [
      new TranslatedText('en', 'Single-variant proposal'),
    ],
    summary: [
      new TranslatedText('en', 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'),
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
          new TranslatedText('en', 'The only target'),
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
