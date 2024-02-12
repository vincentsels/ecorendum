import { PartyId } from '../../party';
import { Cost, Impact, ImpactAmount, ImpactDomain, PolicyLevel, ProposalOrigin, Sector, Target, TargetType, Variant } from '../proposal';
import { PartyOpinion, ProposalDetail } from '../proposal-details';

export const PROPOSALS_FLANDERS: ProposalDetail[] = [
  new ProposalDetail({
    id: 101,
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
        costInitial: new Cost(500000000, 600000000),
        costPerYearFixed: new Cost(20000000, 30000000),
        impacts: [
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 12800 }),
          new Target({ type: TargetType.renewableEnergy, amount: 2000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 2000 }),
        ]
      }),
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 1),
    ],
  }),
  new ProposalDetail({
    id: 102,
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
        costInitial: new Cost(1100000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 3900 }),
          new Target({ type: TargetType.energyEfficiency, amount: -1000 }),
        ]
      })
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 1),
    ],
  }),
  new ProposalDetail({
    id: 103,
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
        costInitial: new Cost(20000000, 50000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 2000 }),
        ]
      })
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 1),
    ],
  }),
  new ProposalDetail({
    id: 104,
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
        costInitial: new Cost(100000000, 250000000),
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
          new Target({ type: TargetType.ghgReduction, amount: 1000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 500 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: new Cost(200000000, 1000000000),
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
          new Target({ type: TargetType.ghgReduction, amount: 2000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 1000 }),
        ]
      }),
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 2),
    ],
  }),
  new ProposalDetail({
    id: 105,
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
        costInitial: new Cost(100000000, 500000000),
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
          new Target({ type: TargetType.ghgReduction, amount: 2500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: new Cost(250000000, 1000000000),
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
          new Target({ type: TargetType.ghgReduction, amount: 5000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 2000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: new Cost(500000000, 1500000000),
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
          new Target({ type: TargetType.ghgReduction, amount: 7500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 3000 }),
        ]
      }),
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 3),
    ],
  }),
]
