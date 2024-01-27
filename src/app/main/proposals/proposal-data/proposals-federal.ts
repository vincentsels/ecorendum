import { PartyId } from '../../party';
import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, ProposalOrigin, Sector, Target, TargetType, Variant } from '../proposal';
import { PartyOpinion, ProposalDetail } from '../proposal-details';

export const PROPOSALS_FEDERAL: ProposalDetail[] = [
  new ProposalDetail({
    id: 1,
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
        impacts: [
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.redistributionLocal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 1500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 1000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 2,
        costInitial: 100000,
        costPerYearFixed: 0,
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.redistributionLocal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 3000 }),
          new Target({ type: TargetType.energyEfficiency, amount: 2000 }),
        ]
      }),
      new Variant({
        ambitionLevel: 3,
        costInitial: 200000,
        impacts: [
          new Impact(ImpactDomain.chemicalPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.nitrogenPollution, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.oceanAcidification, ImpactAmount.moderatelyPositive),
          new Impact(ImpactDomain.aerosols, ImpactAmount.somewhatPositive),
          new Impact(ImpactDomain.biodiversityLoss, ImpactAmount.somewhatNegative),
          new Impact(ImpactDomain.humanRightsGlobal, ImpactAmount.moderatelyNegative),
          new Impact(ImpactDomain.redistributionLocal, ImpactAmount.moderatelyNegative),
        ],
        targets: [
          new Target({ type: TargetType.ghgReduction, amount: 4500 }),
          new Target({ type: TargetType.energyEfficiency, amount: 3000 }),
        ]
      })
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 3),
    ],
  }),
  new ProposalDetail({
    id: 2,
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
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 3),
    ],
  }),
  new ProposalDetail({
    id: 3,
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
    ],
    partyOpinions: [
      new PartyOpinion(PartyId.example, true, 3),
    ],
  }),
]
