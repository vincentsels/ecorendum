import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, Proposal, ProposalOrigin, Sector, Target, TargetType, TranslatedText, Variant } from './proposal';
import { ProposalDetail } from './proposal-details';

export const PROPOSALS: ProposalDetail[] = [
  new ProposalDetail({
    id: 1,
    committed: true,
    origin: ProposalOrigin.flemishGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'extra-measures-vekp',
    slugNl: 'extra-maatregelen-vekp',
    slugFr: 'extra-mesures-vekp',
    policyLevel: PolicyLevel.flemish,
    sector: Sector.general,
    icon: 'energy',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/nature-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: 20000000,
        costPerYearVariable: { 2024: 2000000, 2025: 2000000, 2026: 2000000, 2027: 2000000, 2028: 2000000 },
        title: [
          new TranslatedText('en', 'The only target'),
        ],
        impacts: [
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 12800 }),
          new Target({ type: TargetType.renewableEnergy, amount: 2000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 2000 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 2,
    committed: true,
    origin: ProposalOrigin.flemishGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'dri-installation-arcelor',
    slugNl: 'dri-installatie-arcelor',
    slugFr: 'installation-dri-arcelor',
    policyLevel: PolicyLevel.flemish,
    sector: Sector.industry,
    ets: true,
    icon: 'factory',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/dri-arcelor-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: 1100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', 'DRI installatie Arcelor'),
          new TranslatedText('en', 'DRI installation Arcelor'),
        ],
        description: [
          new TranslatedText('en', ''),
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
          new Target({ type: TargetType.ghgReduction, amount: 3900 }),
          new Target({ type: TargetType.energyEfficiency, amount: -1000 }),
        ]
      })
    ]
  }),
  new ProposalDetail({
    id: 3,
    committed: true,
    origin: ProposalOrigin.flemishGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'ccs-projects',
    slugNl: 'ccs-projecten',
    slugFr: 'projets-ccs',
    policyLevel: PolicyLevel.flemish,
    sector: Sector.industry,
    ets: true,
    icon: 'mode_fan',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/ccs-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: 1100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', 'CSS projecten'),
          new TranslatedText('en', 'CSS projects'),
        ],
        description: [
          new TranslatedText('en', ''),
        ],
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 2000 }),
        ]
      })
    ]
  }),
  new ProposalDetail({
    id: 4,
    origin: ProposalOrigin.veka,
    slugEn: 'phase-out-internal-combustion-engines',
    slugNl: 'uitfasering-fossiele-verbrandingsmotoren',
    slugFr: 'arret-progressif-moteurs-a-combustion-interne',
    policyLevel: PolicyLevel.federal,
    sector: Sector.transport,
    icon: 'electric_car',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/charge-electric-vehicle-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', 'Vanaf 2028'),
          new TranslatedText('en', 'Starting 2028'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, it will only be forbidden to sell vehicles with an internal combustion engine starting in 2028.'),
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
          new Target({ type: TargetType.ghgReduction, amount: 1500 }),
          new Target({ type: TargetType.energyEfficiency, amount: -1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', 'Vanaf 2026'),
          new TranslatedText('en', 'Starting 2026'),
        ],
        description: [
          new TranslatedText('en', 'In this more ambitious scenario, it will be forbidden to sell vehicles with an internal combustion engine starting in 2026.'),
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
          new Target({ type: TargetType.ghgReduction, amount: 3000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -2000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 200000,
        title: [
          new TranslatedText('nl', 'Vanaf 2024'),
          new TranslatedText('en', 'Starting 2024'),
        ],
        description: [
          new TranslatedText('en', 'In this ambitious scenario, it will be forbidden to sell vehicles with an internal combustion engine starting in 2024.'),
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
          new Target({ type: TargetType.ghgReduction, amount: 4500 }),
          new Target({ type: TargetType.energyEfficiency, amount: -3000 }),
        ]
      })
    ]
  }),
  new ProposalDetail({
    id: 5,
    origin: ProposalOrigin.veka,
    slugEn: 'phase-out-gas-fuel-oil-boilers',
    slugNl: 'uitfasering-gas-stookolie-ketels',
    slugFr: 'arret-progressif-chaudieres-a-gaz-et-fioul',
    policyLevel: PolicyLevel.federal,
    sector: Sector.buildings,
    icon: 'air_purifier',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/heat-pump-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', 'Vanaf 2028'),
          new TranslatedText('en', 'Starting 2028'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, it will only be forbidden to sell vehicles with an gas and fuel oil boilers starting in 2028.'),
        ],
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 1000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -500 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', 'Vanaf 2026'),
          new TranslatedText('en', 'Starting 2026'),
        ],
        description: [
          new TranslatedText('en', 'In this more ambitious scenario, it will be forbidden to sell vehicles with an gas and fuel oil boilers starting in 2026.'),
        ],
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 2000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 200000,
        title: [
          new TranslatedText('nl', 'Vanaf 2024'),
          new TranslatedText('en', 'Starting 2024'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, it will be forbidden to sell vehicles with an gas and fuel oil boilers starting in 2024.'),
        ],
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 3000 }),
          new Target({ type: TargetType.energyEfficiency, amount: -1500 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 6,
    origin: ProposalOrigin.veka,
    slugEn: 'reduction-cattle-pig-herds',
    slugNl: 'afbouw-rundvee-varkensstapel',
    slugFr: 'reduction-troupeaux-bovins-porcs',
    policyLevel: PolicyLevel.flemish,
    sector: Sector.agriculture,
    icon: 'agriculture',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/agriculture-cows-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 500000000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', '30% afbouw'),
          new TranslatedText('en', '30% reduction'),
        ],
        description: [
          new TranslatedText('en', ''),
        ],
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.phosphorusPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 1000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 500 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 1000000000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', '60% afbouw'),
          new TranslatedText('en', '60% reduction'),
        ],
        description: [
          new TranslatedText('nl', ''),
        ],
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.phosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 2000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 1000 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 7,
    origin: ProposalOrigin.veka,
    slugEn: 'phase-out-carbon-intensive-industry',
    slugNl: 'afbouw-carbon-intensive-industry',
    slugFr: 'arret-progressif-industrie-intensive-carbone',
    policyLevel: PolicyLevel.flemish,
    sector: Sector.industry,
    ets: true,
    icon: 'factory',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/petrochemie-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 500000000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', '10% afbouw'),
          new TranslatedText('en', '10% reduction'),
        ],
        description: [
          new TranslatedText('en', ''),
        ],
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.phosphorusPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 2500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 1000000000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', '20% afbouw'),
          new TranslatedText('en', '20% reduction'),
        ],
        description: [
          new TranslatedText('en', ''),
        ],
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.phosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 5000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 2000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 1500000000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('nl', '30% afbouw'),
          new TranslatedText('en', '30% reduction'),
        ],
        description: [
          new TranslatedText('en', ''),
        ],
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.luLuCf, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.phosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 7500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 3000 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 10,
    origin: ProposalOrigin.unknown,
    ets: true,
    slugEn: 'obligatory-display-of-carbon-footprint-on-products-and-services',
    slugNl: 'verplicht-weergeven-koolstofvoetafdruk-producten-en-diensten',
    slugFr: 'obligation-d-affichage-de-l-impact-carbone-des-produits-et-services',
    policyLevel: PolicyLevel.federal,
    sector: Sector.industry,
    icon: 'nest_found_savings',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/eco-shopping-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('en', 'Starting 2025, limited'),
          new TranslatedText('nl', 'Vanaf 2025, beperkt'),
          new TranslatedText('fr', 'À partir de 2025, limité'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, warehouses are only required to start applying the eco-score starting in 2025, the footprint is only limited to CO2-emissions, and only food and consumable products have to be labeled.'),
        ],
        impacts: [
          new Impact(ImpactDomain.redistributionLocal, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.redistributionGlobal, ImpactAmount.somewhatNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 500 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 100000,
        costPerYearFixed: 0,
        title: [
          new TranslatedText('en', 'Starting 2024, limited, eco-score'),
          new TranslatedText('nl', 'Vanaf 2024, beperkt, eco-score'),
          new TranslatedText('fr', 'À partir de 2024, limité, eco-score'),
        ],
        description: [
          new TranslatedText('en', 'In this more ambitious scenario, warehouses are required to start applying the eco-score starting in 2024, the footprint not only limited to CO2-emissions but also a couple of other ecological impacts such as potential biodiversity loss. Only food and consumable products must be labeled.'),
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
          new Target({ type: TargetType.ghgReduction, amount: 1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 200000,
        title: [
          new TranslatedText('en', 'Starting 2024, complete, eco-score'),
          new TranslatedText('nl', 'Vanaf 2024, compleet, eco-score'),
          new TranslatedText('fr', 'À partir de 2024, complèt, eco-score'),
        ],
        description: [
          new TranslatedText('en', 'In this scenario, warehouses are required to start applying the eco-score starting in 2023, the footprint not only limited to CO2-emissions but also its exhaustive ecological and social impact. All products must be labeled (albeit with different starting dates as feasible for the sector).'),
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
          new Target({ type: TargetType.ghgReduction, amount: 1500 }),
        ]
      })
    ]
  }),
]
