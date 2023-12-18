import { Impact, ImpactAmount, ImpactDomain, PolicyLevel, Proposal, Sector, Target, TargetType, TranslatedText, Variant } from './proposal';
import { ProposalDetail } from './proposal-details';

export const PROPOSALS: ProposalDetail[] = [
  new ProposalDetail({
    id: 1,
    committed: true,
    selected: true,
    selectedAmbitionLevel: 1,
    title: [
      new TranslatedText('en', 'VEKP additional measures'),
      new TranslatedText('nl', 'Extra maatregelen VEKP'),
    ],
    summary: [
      new TranslatedText('en', 'The additional measures as currently already included in the Flemish Energy & Climate plan (VEKP). Also called the \'With additional measures\' (WAM) scenario.'),
      new TranslatedText('nl', 'De extra maatregelen reeds opgenomen in het Vlaams Energie- en Klimaatplan (VEKP). Dit wordt ook het \'With additional measures\' (WAM) scenario genoemd.'),
    ],
    slug: [
      new TranslatedText('en', 'vekp-additional-measures'),
      new TranslatedText('nl', 'extra-maatregelen-vekp')
    ],
    policyLevel: PolicyLevel.flemish,
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
    ets: true,
    selected: true,
    selectedAmbitionLevel: 1,
    title: [
      new TranslatedText('nl', 'DRI installatie Arcelor'),
      new TranslatedText('en', 'DRI installation Arcelor'),
    ],
    summary: [
      new TranslatedText('nl', 'ArcelorMittal Belgium zal de CO2-uitstoot tegen 2030 met ongeveer 3,9 miljoen ton per jaar verminderen door de bouw van een installatie voor direct gereduceerd ijzer (DRI) met een capaciteit van 2,5 miljoen ton en twee elektrische ovens in de vestiging in Gent. Deze zullen parallel met de state-of-the-arthoogoven werken die klaar is om afvalhout en plastics te gebruiken als alternatief voor fossiele koolstof.'),
      new TranslatedText('en', 'ArcelorMittal Belgium will reduce CO2 emissions by 3.9 million tonnes per year by 2030, by building a 2.5 million-tonne direct reduced iron (DRI) plant and two electric furnaces at its Gent site, to operate alongside its state-of-the-art blast furnace that is ready to take waste wood and plastics as a substitute for fossil carbon. ')
    ],
    slug: [
      new TranslatedText('nl', 'dri-installatie-arcelor'),
      new TranslatedText('en', 'dri-installation-arcelor'),
    ],
    policyLevel: PolicyLevel.flemish,
    sector: Sector.industry,
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
    title: [
      new TranslatedText('nl', 'Uitfasering aankoop fossiele verbrandingsmotoren'),
      new TranslatedText('en', 'Phase-out purchase of internal combustion engines'),
    ],
    summary: [
      new TranslatedText('nl', 'De federale overheid verbiedt de verkoop van personen- en bestel- en vrachtwagens met een verbrandingsmotor. Op de tweedehandsmarkt kunnen deze wagens wel nog verkocht worden.'),
      new TranslatedText('en', 'The federal government forbids the sale of personal and transport transport vehicles with internal combustion engines. These can still be bought and sold on the second hand market.')
    ],
    slug: [
      new TranslatedText('nl', 'uitfasering-fossiele-verbrandingsmotoren'),
      new TranslatedText('en', 'phase-out-internal-combustion-engines'),
    ],
    policyLevel: PolicyLevel.federal,
    sector: Sector.transport,
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
    id: 4,
    title: [
      new TranslatedText('nl', 'Uitfasering aankoop gas- en stookolieketels'),
      new TranslatedText('en', 'Phase-out purchase of gas and fuel oil boilers'),
    ],
    summary: [
      new TranslatedText('nl', 'De federale overheid verbiedt de verkoop en installatie van gas- en stookolieketels voor nieuwe gebouwen en renovaties.'),
      new TranslatedText('en', 'The federal government forbids the sale and installation of gas and fuel oil boilers.')
    ],
    slug: [
      new TranslatedText('nl', 'uitfasering-gas-stookolie-ketels'),
      new TranslatedText('en', 'phase-out-gas-fuel-oil-boilers'),
    ],
    policyLevel: PolicyLevel.federal,
    sector: Sector.buildings,
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
    id: 5,
    title: [
      new TranslatedText('nl', 'Afbouw rundvee- en varkensstapel'),
      new TranslatedText('en', 'Reduction of cattle and pig herds'),
    ],
    summary: [
      new TranslatedText('nl', 'Afbouw van de rundvee- en de varkensstapel tegen 2030 vergeleken met 2021. Voor de varkensstapel zou het huidige reductietempo licht moeten versnellen, voor vleesvee zou het tempo moeten verdriedubbelen, en voor melkvee zou de stijgende trend volledig moeten worden omgekeerd. Vlaanderen zou tegen 2030 ca. 400.000 minder runderen hebben. Ingrijpen in de pluimveestapel heeft nauwelijks effect.'),
      new TranslatedText('en', 'Reduction in cattle and pig herds by 2030 compared to 2021. For the pig herd, the current rate of reduction should accelerate slightly, for beef cattle the rate should triple, and for dairy cattle the upward trend should be completely reversed. Flanders would have about 400,000 fewer cattle by 2030. Intervention in the poultry population has little effect.')
    ],
    slug: [
      new TranslatedText('nl', 'afbouw-rundvee-varkensstapel'),
      new TranslatedText('en', 'reduction-cattle-pig-herds'),
    ],
    policyLevel: PolicyLevel.flemish,
    sector: Sector.agriculture,
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
    id: 10,
    ets: true,
    title: [
      new TranslatedText('nl', 'Verplicht weergeven koolstofvoetafdruk producten en diensten'),
      new TranslatedText('fr', 'Obligation d\'affichage de l\'impact carbone des produits et services'),
      new TranslatedText('en', 'Obligatory display of carbon footprint on products and services'),
    ],
    summary: [
      new TranslatedText('nl', 'De federale overheid verplicht alle leveranciers van producten en diensten om weer te geven wat de koolstofvoetafdruk (en eventueel andere ecologische impact) is, zodat consumenten hier rekening mee kunnen houden.'),
      new TranslatedText('en', 'The federal government requires all suppliers of products and services to display the carbon footprint (and optionally wider ecological impact), so consumers can take that into account.'),
      new TranslatedText('fr', 'L’affichage de l’impact environnemental d’un produit nous paraît être un levier important de sensibilisation et d’information du consommateur. Ne souhaitant pas contraindre le consommateur dans ses choix, nous considérons qu’il est nécessaire de lui donner l’information appropriée à une prise de conscience de l’impact de ses choix afin de l’orienter vers des pratiques plus vertueuses.')
    ],
    slug: [
      new TranslatedText('nl', 'obligatory-display-of-carbon-footprint-on-products-and-services'),
      new TranslatedText('nl', 'verplicht-weergeven-koolstofvoetafdruk-producten-en-diensten'),
      new TranslatedText('fr', 'obligation-d-affichage-de-l-impact-carbone-des-produits-et-services'),
    ],
    policyLevel: PolicyLevel.federal,
    sector: Sector.industry,
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
