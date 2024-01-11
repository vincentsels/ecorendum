import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, ProposalOrigin, Sector, Target, TargetType, Variant } from '../proposal';
import { ProposalDetail } from '../proposal-details';

export const PROPOSALS_BRUSSELS: ProposalDetail[] = [
  new ProposalDetail({
    id: 11,
    committed: true,
    origin: ProposalOrigin.brusselianGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'extra-measures-bekp',
    slugNl: 'extra-maatregelen-bekp',
    slugFr: 'extra-mesures-bekp',
    policyLevel: PolicyLevel.brusselian,
    sector: Sector.general,
    icon: 'energy',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/nature-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: 2000000,
        costPerYearVariable: { 2024: 200000, 2025: 200000, 2026: 200000, 2027: 200000, 2028: 200000 },
        impacts: [
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 1280 }),
          new Target({ type: TargetType.renewableEnergy, amount: 200 }),
          new Target({ type: TargetType.energyEfficiency, amount: 200 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 12,
    committed: true,
    origin: ProposalOrigin.brusselianGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'dri-installation-barcelor',
    slugNl: 'dri-installatie-barcelor',
    slugFr: 'installation-dri-barcelor',
    policyLevel: PolicyLevel.brusselian,
    sector: Sector.industry,
    ets: true,
    icon: 'factory',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/dri-arcelor-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: 110000,
        costPerYearFixed: 0,
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 390 }),
          new Target({ type: TargetType.energyEfficiency, amount: -100 }),
        ]
      })
    ]
  }),
  new ProposalDetail({
    id: 13,
    committed: true,
    origin: ProposalOrigin.brusselianGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'ccs-projects-bxl',
    slugNl: 'ccs-projecten-bxl',
    slugFr: 'projets-ccs-bxl',
    policyLevel: PolicyLevel.brusselian,
    sector: Sector.industry,
    ets: true,
    icon: 'mode_fan',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/ccs-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: 110000,
        costPerYearFixed: 0,
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 200 }),
        ]
      })
    ]
  }),
  new ProposalDetail({
    id: 14,
    origin: ProposalOrigin.veka,
    slugEn: 'reduction-cattle-pig-herds-bxl',
    slugNl: 'afbouw-rundvee-varkensstapel-bxl',
    slugFr: 'reduction-troupeaux-bovins-porcs-bxl',
    policyLevel: PolicyLevel.brusselian,
    sector: Sector.agriculture,
    icon: 'agriculture',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/agriculture-cows-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 50000000,
        costPerYearFixed: 0,
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
          new Target({ type: TargetType.ghgReduction, amount: 100 }),
          new Target({ type: TargetType.energyEfficiency, amount: 50 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 100000000,
        costPerYearFixed: 0,
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
          new Target({ type: TargetType.ghgReduction, amount: 200 }),
          new Target({ type: TargetType.energyEfficiency, amount: 100 }),
        ]
      }),
    ]
  }),
  new ProposalDetail({
    id: 15,
    origin: ProposalOrigin.veka,
    slugEn: 'phase-out-carbon-intensive-industry-bxl',
    slugNl: 'afbouw-carbon-intensive-industry-bxl',
    slugFr: 'arret-progressif-industrie-intensive-carbone-bxl',
    policyLevel: PolicyLevel.brusselian,
    sector: Sector.industry,
    ets: true,
    icon: 'factory',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/petrochemie-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 50000000,
        costPerYearFixed: 0,
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
          new Target({ type: TargetType.ghgReduction, amount: 250 }),
          new Target({ type: TargetType.energyEfficiency, amount: 100 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 100000000,
        costPerYearFixed: 0,
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
          new Target({ type: TargetType.ghgReduction, amount: 500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 200 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 150000000,
        costPerYearFixed: 0,
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
          new Target({ type: TargetType.ghgReduction, amount: 750 }),
          new Target({ type: TargetType.energyEfficiency, amount: 300 }),
        ]
      }),
    ]
  }),
]
