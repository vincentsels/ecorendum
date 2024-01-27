import { PartyId } from '../../party';
import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, ProposalOrigin, Sector, Target, TargetType, Variant } from '../proposal';
import { PartyOpinion, ProposalDetail } from '../proposal-details';

export const PROPOSALS_WALLONIA: ProposalDetail[] = [
  new ProposalDetail({
    id: 301,
    committed: true,
    origin: ProposalOrigin.wallonianGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'extra-measures-wekp',
    slugNl: 'extra-maatregelen-wekp',
    slugFr: 'extra-mesures-wekp',
    policyLevel: PolicyLevel.wallonian,
    sector: Sector.general,
    icon: 'energy',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/nature-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: 10000000,
        costPerYearVariable: { 2024: 1000000, 2025: 1000000, 2026: 1000000, 2027: 1000000, 2028: 1000000 },
        impacts: [
          new Impact(ImpactDomain.waterConsumption, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 6400 }),
          new Target({ type: TargetType.renewableEnergy, amount: 1000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 1000 }),
        ]
      }),
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 1),
    ],
  }),
  new ProposalDetail({
    id: 302,
    committed: true,
    origin: ProposalOrigin.wallonianGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'dri-installation-warcelor',
    slugNl: 'dri-installatie-warcelor',
    slugFr: 'installation-dri-warcelor',
    policyLevel: PolicyLevel.wallonian,
    sector: Sector.industry,
    ets: true,
    icon: 'factory',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/dri-arcelor-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: 550000,
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
          new Target({ type: TargetType.ghgReduction, amount: 1950 }),
          new Target({ type: TargetType.energyEfficiency, amount: -500 }),
        ]
      })
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 1),
    ],
  }),
  new ProposalDetail({
    id: 303,
    committed: true,
    origin: ProposalOrigin.wallonianGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'ccs-projects-wal',
    slugNl: 'ccs-projecten-wal',
    slugFr: 'projets-ccs-wal',
    policyLevel: PolicyLevel.wallonian,
    sector: Sector.industry,
    ets: true,
    icon: 'mode_fan',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/ccs-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: 550000,
        costPerYearFixed: 0,
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 1000 }),
        ]
      })
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 1),
    ],
  }),
  new ProposalDetail({
    id: 304,
    origin: ProposalOrigin.veka,
    slugEn: 'reduction-cattle-pig-herds-wal',
    slugNl: 'afbouw-rundvee-varkensstapel-wal',
    slugFr: 'reduction-troupeaux-bovins-porcs-wal',
    policyLevel: PolicyLevel.wallonian,
    sector: Sector.agriculture,
    icon: 'agriculture',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/agriculture-cows-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 250000000,
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
          new Target({ type: TargetType.ghgReduction, amount: 500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 250 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 1000000000,
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
          new Target({ type: TargetType.ghgReduction, amount: 1000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 500 }),
        ]
      }),
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 2),
    ],
  }),
  new ProposalDetail({
    id: 305,
    origin: ProposalOrigin.veka,
    slugEn: 'phase-out-carbon-intensive-industry-wal',
    slugNl: 'afbouw-carbon-intensive-industry-wal',
    slugFr: 'arret-progressif-industrie-intensive-carbone-wal',
    policyLevel: PolicyLevel.wallonian,
    sector: Sector.industry,
    ets: true,
    icon: 'factory',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/petrochemie-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: 250000000,
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
          new Target({ type: TargetType.ghgReduction, amount: 1250 }),
          new Target({ type: TargetType.energyEfficiency, amount: 500 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 500000000,
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
          new Target({ type: TargetType.ghgReduction, amount: 2500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 750000000,
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
          new Target({ type: TargetType.ghgReduction, amount: 3750 }),
          new Target({ type: TargetType.energyEfficiency, amount: 1500 }),
        ]
      }),
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 3),
    ],
  }),
]
