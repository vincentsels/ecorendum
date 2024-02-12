import { PartyId } from '../../party';
import { Cost, Impact, ImpactAmount, ImpactDomain, PolicyLevel, ProposalOrigin, Sector, Target, TargetType, Variant } from '../proposal';
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
        costInitial: new Cost(10000000),
        costPerYearFixed: new Cost(1000000),
        impacts: [
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.moderatelyNegative),
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
        costInitial: new Cost(550000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatNegative),
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
        costInitial: new Cost(550000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
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
        costInitial: new Cost(250000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localLandUseChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 250 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: new Cost(1000000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localLandUseChange, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.moderatelyPositive),
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
        costInitial: new Cost(250000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localLandUseChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 1250 }),
          new Target({ type: TargetType.energyEfficiency, amount: 500 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: new Cost(500000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localLandUseChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 2500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: new Cost(750000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localLandUseChange, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.moderatelyPositive),
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
