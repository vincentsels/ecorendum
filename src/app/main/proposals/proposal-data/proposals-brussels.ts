import { PartyId } from '../../party';
import { Cost, Impact, ImpactAmount, ImpactDomain, PolicyLevel, ProposalOrigin, Sector, Target, TargetType, Variant } from '../proposal';
import { PartyOpinion, ProposalDetail } from '../proposal-details';

export const PROPOSALS_BRUSSELS: ProposalDetail[] = [
  new ProposalDetail({
    id: 201,
    committed: true,
    origin: ProposalOrigin.brusselsGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'extra-measures-bekp',
    slugNl: 'extra-maatregelen-bekp',
    slugFr: 'extra-mesures-bekp',
    policyLevel: PolicyLevel.brussels,
    sector: Sector.general,
    icon: 'energy',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/nature-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: new Cost(2000000),
        costPerYearFixed: new Cost(200000),
        impacts: [
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ sector: Sector.buildings, type: TargetType.ghgReduction, amount: 3600 / 10 }),
          new Target({ sector: Sector.transport, type: TargetType.ghgReduction, amount: 5100 / 10 }),
          new Target({ sector: Sector.agriculture, type: TargetType.ghgReduction, amount: 2800 / 10 }),
          new Target({ sector: Sector.wasteManagement, type: TargetType.ghgReduction, amount: 1300 / 10 }),
          new Target({ type: TargetType.renewableEnergy, amount: 200 }),
          new Target({ type: TargetType.energyEfficiency, amount: 2000 }),
        ]
      }),
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 1),
    ],
  }),
  new ProposalDetail({
    id: 202,
    committed: true,
    origin: ProposalOrigin.brusselsGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'dri-installation-barcelor',
    slugNl: 'dri-installatie-barcelor',
    slugFr: 'installation-dri-barcelor',
    policyLevel: PolicyLevel.brussels,
    sector: Sector.industry,
    ets: true,
    icon: 'factory',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/dri-arcelor-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: new Cost(110000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalAerosolLoading, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.globalHumanRights, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 390 }),
          new Target({ type: TargetType.energyEfficiency, amount: -1000 }),
        ]
      })
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 1),
    ],
  }),
  new ProposalDetail({
    id: 203,
    committed: true,
    origin: ProposalOrigin.brusselsGovernment,
    selected: true,
    selectedAmbitionLevel: 1,
    slugEn: 'ccs-projects-bxl',
    slugNl: 'ccs-projecten-bxl',
    slugFr: 'projets-ccs-bxl',
    policyLevel: PolicyLevel.brussels,
    sector: Sector.industry,
    ets: true,
    icon: 'mode_fan',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/ccs-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        selected: true,
        costInitial: new Cost(110000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 200 }),
        ]
      })
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 1),
    ],
  }),
  new ProposalDetail({
    id: 204,
    origin: ProposalOrigin.veka,
    slugEn: 'reduction-cattle-pig-herds-bxl',
    slugNl: 'afbouw-rundvee-varkensstapel-bxl',
    slugFr: 'reduction-troupeaux-bovins-porcs-bxl',
    policyLevel: PolicyLevel.brussels,
    sector: Sector.agriculture,
    icon: 'agriculture',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/agriculture-cows-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: new Cost(50000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalAerosolLoading, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localLandSystemChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 100 }),
          new Target({ type: TargetType.energyEfficiency, amount: 500 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: new Cost(100000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.globalAerosolLoading, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localLandSystemChange, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 200 }),
          new Target({ type: TargetType.energyEfficiency, amount: 1000 }),
        ]
      }),
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 2),
    ],
  }),
  new ProposalDetail({
    id: 205,
    origin: ProposalOrigin.veka,
    slugEn: 'phase-out-carbon-intensive-industry-bxl',
    slugNl: 'afbouw-carbon-intensive-industry-bxl',
    slugFr: 'arret-progressif-industrie-intensive-carbone-bxl',
    policyLevel: PolicyLevel.brussels,
    sector: Sector.industry,
    ets: true,
    icon: 'factory',
    pictureThumb: 'https://vincentsels.be/ext/ecorendum/petrochemie-640.jpg',
    variants: [
      new Variant({
        ambitionLevel: 1,
        costInitial: new Cost(50000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalAerosolLoading, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localLandSystemChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 250 }),
          new Target({ type: TargetType.energyEfficiency, amount: 1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: new Cost(100000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.globalAerosolLoading, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localLandSystemChange, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 2000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: new Cost(150000000),
        impacts: [
          new Impact(ImpactDomain.localNitrogenPollution, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.localAirPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.globalAerosolLoading, ImpactAmount.veryPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localBiodiversityLoss, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localLandSystemChange, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localPhosphorusPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.localWaterPollution, ImpactAmount.moderatelyPositive),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 750 }),
          new Target({ type: TargetType.energyEfficiency, amount: 3000 }),
        ]
      }),
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 3),
    ],
  }),
]
