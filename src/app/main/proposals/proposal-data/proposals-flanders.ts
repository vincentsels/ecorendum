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
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localLandSystemChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localRedistribution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalAerosolLoading, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalBiodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalOceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalRedistribution, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.globalHumanRights, ImpactAmount.somewhatNegative),
        ],
        targets: [
          new Target({ sector: Sector.buildings, type: TargetType.ghgReduction, amount: 3600 }),
          new Target({ sector: Sector.transport, type: TargetType.ghgReduction, amount: 5100 }),
          new Target({ sector: Sector.agriculture, type: TargetType.ghgReduction, amount: 2800 }),
          new Target({ sector: Sector.wasteManagement, type: TargetType.ghgReduction, amount: 1300 }),
          new Target({ type: TargetType.renewableEnergy, amount: 2000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 20000 }),
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
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 3900 }),
          new Target({ type: TargetType.energyEfficiency, amount: -10000 }),
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
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.globalBiodiversityLoss, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.globalFreshwaterChange, ImpactAmount.moderatelyNegative),
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
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localLandSystemChange, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localAnimalRights, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalBiodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalFreshwaterChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalHumanRights, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalLandSystemChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalNitrogenPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalOceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalPhosphorusPollution, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 1000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 5000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: new Cost(200000000, 1000000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.localLandSystemChange, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localAnimalRights, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.globalBiodiversityLoss, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.globalFreshwaterChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalHumanRights, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalLandSystemChange, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.globalNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.globalOceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalPhosphorusPollution, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 2000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 10000 }),
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
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localLandSystemChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localRedistribution, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 2500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 10000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: new Cost(250000000, 1000000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localLandSystemChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localRedistribution, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 5000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 20000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: new Cost(500000000, 1500000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localLandSystemChange, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterConsumption, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localRedistribution, ImpactAmount.veryNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 7500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 30000 }),
        ]
      }),
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 3),
    ],
  }),
]
