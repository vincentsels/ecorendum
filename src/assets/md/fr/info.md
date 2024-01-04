# Qu'est-ce que ce site web ?

> ***Note** : Ce texte français est une traduction du texte anglais de ChatGPT*

Ce site web présente une nouvelle manière possible pour les gouvernements de sonder leurs citoyens sur les mesures politiques à adopter afin d'atteindre plusieurs objectifs écologiques imposés.

Ce n'est *pas encore* une initiative gouvernementale réelle. Les données ne sont *pas encore* totalement précises. Il est actuellement dans un état utilisé pour présenter le concept, afin de trouver des partenaires pour le transformer en réalité.

Cet outil est actuellement juste le 'front-end' du site web ; il n'est pas connecté à une base de données ; il n'est pas possible de 'soumettre' réellement votre sélection de mesures.

Pour une plongée approfondie dans le concept, vous pouvez lire ce [livre blanc](https://forum.effectivealtruism.org/posts/ytbjbS6wYBoyYLthu/online-preferendum-to-select-climate-policy-measures).

## Contexte et objectifs

Le contexte de ce site de démonstration est la Flandre, Belgique, et les objectifs écologiques sont :

- La réduction des émissions de CO2-équivalent imposée par un juge dans une affaire appelée '[Klimaatzaak](https://www.klimaatzaak.eu)' (affaire climatique);

- La réduction des émissions de CO2-équivalent imposée à la Belgique en tant qu'État membre de l'Union européenne dans le cadre du '[Règlement sur le partage des efforts](https://ec.europa.eu/commission/presscorner/detail/en/qanda_21_3543)';

- [Efficacité énergétique](https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficiency-targets-directive-and-rules/energy-efficiency-directive_en) (une réduction de l'énergie utilisée) et le pourcentage d'[énergie renouvelable](https://energy.ec.europa.eu/topics/renewable-energy/renewable-energy-directive-targets-and-rules/renewable-energy-directive_en) dans le mix de production d'énergie, deux autres objectifs imposés à tous les États membres de l'UE par des directives européennes.

De plus, le coût total de ces mesures est affiché, en tenant compte du coût ou du profit du [marché des émissions](https://climate.ec.europa.eu/eu-action/eu-emissions-trading-system-eu-ets_en), une pratique où les pays peuvent soit vendre des droits d'émission s'ils émettent moins que prévu, soit acheter le droit d'émettre plus que prévu à d'autres États, sur un marché public.

Enfin, le site affiche l'impact estimé plus large des mesures sélectionnées, sur deux dimensions :

- L'impact écologique large, dans le cadre des (restants) [9 limites planétaires](https://www.stockholmresilience.org/research/planetary-boundaries.html), seuils scientifiques pour les processus du système terrestre, au-delà desquels l'humanité risque de déstabiliser la capacité de la planète à soutenir la vie ;

- L'impact socio-économique large, dans le cadre des [Objectifs de développement durable](https://www.undp.org/sustainable-development-goals) (ODD), 17 objectifs mondiaux fixés par l'ONU pour atteindre un monde durable, équitable et prospère d'ici 2030.

## Données utilisées

### Contexte flamand

Les données utilisées pour ce site de démonstration, tant les objectifs que les impacts des mesures, sont largement fictives, mais semi-réalistes. Bien que le site semble permettre de changer de contexte pour les autres régions belges, Bruxelles et la Wallonie, cela ne change actuellement aucune des données. Par conséquent, toutes les données visent actuellement la Flandre.

### Objectifs

- L'**objectif de réduction de 55 % de CO2-équivalent légal**, et sa valeur absolue de 34 Mt, a été calculé par VEKA et devrait être correct.

- L'**objectif de réduction de CO2-équivalent européen** est basé sur l'objectif ESR de l'UE de 47% pour la Belgique. Le gouvernement fédéral, Bruxelles et la Wallonie reconnaissent tous ce 47%. La Fland

re vise actuellement seulement 42%, laissant un grand écart au niveau national. Tant que les différentes régions ne se sont pas mises d'accord sur la façon de diviser les efforts, cet outil suppose que la Flandre devrait également atteindre une réduction de 47%. En valeur absolue, cela se traduit par environ 27 Mt de réductions de CO2-équivalent. Notez que, dans le contexte européen, cela n'inclut que les secteurs ESR (transport routier, bâtiments, agriculture, petite industrie, gestion des déchets), pas les secteurs ETS (production d'électricité et de chaleur, grande industrie, aviation et transport maritime).

- L'**objectif d'efficacité énergétique** est actuellement une estimation très approximative de 10.000 GWh d'économies supplémentaires par an.

- L'**objectif d'énergie renouvelable** est actuellement une estimation très approximative de 5.000 GWh d'énergie renouvelable supplémentaire par an.

### Mesures

La majorité de l'ensemble des mesures provient d'une collection d'échantillons de mesures compilés le premier décembre 2023 par l'[Agence flamande de l'énergie et du climat](https://www.vlaanderen.be/veka)' (VEKA), commandée par le ministre flamand de l'Environnement et de l'Énergie, Zuhal Demir, en réponse à la décision de la Klimaatzaak mentionnée ci-dessus, pour avoir une idée de l'étendue des mesures à exiger pour atteindre l'objectif imposé. Cela a pris la forme d'un document Word de 4 pages qu'ils ont partagé avec nous. Nous avons traduit ces mesures dans le format de notre outil, ce qui est bien sûr une approximation grossière.

Une mesure supplémentaire, 'Affichage obligatoire de l'empreinte carbone sur les produits et services' a été entièrement inventée par nous, et ajoutée juste pour avoir une différence dans les mesures entre les 'ensembles' préconfigurés et lorsque vous compilez votre propre ensemble.

### Impact des mesures

- Toutes les **estimations des coûts de mesure** sont largement inventées, des suppositions intuitives, où possible vaguement basées sur des mesures similaires dans d'autres pays. L'outil prend en charge à la fois un « coût initial » et un « coût annuel ». Idéalement, cela devrait être modifié en valeurs minimale et maximale, pour tenir compte de l'incertitude. Certaines mesures auront une portée plus large que d’autres.

- L'**impact écologique et ODD** sont également largement inventés, des suppositions intuitives.

### Données détaillées sur les mesures

Cliquer sur une mesure affiche beaucoup plus d'informations sur chaque mesure, comme une longue explication ; la position de tous les partis politiques sur la mesure ; des liens vers des articles de presse, des débats, des articles scientifiques, des exemples à l'étranger et des explications ; des questions fréquemment posées ; et bien sûr un lien pour externaliser ces données.

Dans cette version de démonstration, toutes ces données sont entièrement inventées, même en utilisant des textes '[lorem ipsum](https://nl.wikipedia.org/wiki/Lorem_ipsum)' générés aléatoirement.

## Calculs

Actuellement, des formules simples sont utilisées pour calculer l'effet des mesures sur chacun des objectifs : les émissions estimées de CO2-équivalent économisées, l'énergie économisée et la nouvelle production d'énergie renouvelable ajoutée pour chaque mesure/variante sélectionnée sont additionnées. De même pour le coût et l'impact plus large. Actuellement, les rendements décroissants, la chevauchement entre les mesures, les mesures mutuellement exclusives, ou le moment auquel ou le degré auquel une mesure prend effet, ne sont pas pris en compte.

# Que devrait faire de plus la version réelle ?

La version réelle de cet outil devrait inclure au moins ce qui suit :

- Permettre aux citoyens de s'authentifier et de soumettre leur ensemble préféré de mesures ;
- Permettre aux citoyens de crowdsourcer des détails sur les mesures, d'en discuter, et de proposer collaborativement de nouvelles mesures ;
- Soutenir chacune des régions belges ; avec leurs objectifs corrects, mesures, ensembles de mesures, et positions des partis politiques ;
- Plus d'ensembles de mesures, par exemple par des think tanks et des universités, examinés par un conseil indépendant soigneusement sélectionné ; et finalement un ensemble de mesures choisi par chaque parti politique ;
- Des objectifs explicites supplémentaires (écologiques), probablement la disposition de l'azote ;
- Impact minimum et maximum de la mesure, pour exprimer le degré d'incertitude ;
- Un modèle plus réaliste pour agréger les impacts ;
- Plus de propriétés pour chacune des mesures et la capacité de filtrer ;
- Un tutoriel approfondi, guidant tout le monde à travers les fonctionnalités de l'outil ;
- Beaucoup plus et de meilleurs tooltips/dialogues d'aide ;
- Une explication populaire de ce qu'est l'outil, son but, pourquoi il est nécessaire, ...
- Et bien plus encore ...

# Pourquoi ce site Web traite-t-il de l'écologie ?

Un grand problème avec notre système démocratique est qu'il n'a jamais été conçu pour faire face à des problèmes qui ont des **délais** et des **seuils** imposés par des lois de la nature et de la physique insurmontables. Telles limites et leur effet sur les sociétés n'étaient simplement pas encore connus à l'époque où le système a été conçu : Amérique et la France de la 18ème siècle, ou à 1831 en Belgique. C'est un défaut majeur du système qui n'a jamais été correctement corrigé.

### Élections

Le problème avec un système où les représentants sont **élus** et détiennent tout le pouvoir, c'est que cela encourage la pensée et la politique **à court terme**. Les politiciens qui sont prêts à faire des sacrifices aujourd'hui, au bénéfice du futur, ne sont pas élus tant qu'il y en a d'autres qui proclament que de tels sacrifices ne sont pas nécessaires. Cela a été popularisé en Belgique par le politicien Bruno Tobback, dès 2007, à travers sa [citation](https://nl.wikiquote.org/wiki/Bruno_Tobback) : "Presque tous les politiciens savent quoi faire pour résoudre le problème climatique. Il n'y a juste aucun politicien qui sait comment être élu après cela."

### Partis politiques

L'émergence de **partis politiques** et du système parti-politique qui en résulte (qui n'est pas forcément nécessaire dans une démocratie représentative -- la constitution belge, par exemple, ne les mentionne pas du tout), complique encore les choses. Les partis politiques deviennent de vastes entités souveraines en elles-mêmes, avec une seule **raison d'être : être réélus**. Non pour gouverner avec une bonne politique responsable ; non pour protéger ou informer correctement les citoyens.

Les partis politiques jouent un **jeu à somme nulle** dans lequel la perte d'un parti équivaut au gain d'un autre. Cela entraîne une atmosphère négative où les partis travaillent les uns contre les autres plutôt qu'ensemble ; cela résulte en polarisation et dogmatisme.

### Les difficultés de la politique écologique [1]

Les défis écologiques tels que la maîtrise du changement climatique ou la préservation de la biodiversité, afin de maintenir la terre dans un état écologique qui a permis à l'homme (et à d'autres formes de vie) de prospérer, sont particulièrement difficiles à résoudre dans ce système :

- **Coordination et coopération mondiales** : La gestion efficace des problèmes écologiques mondiaux nécessite des niveaux de coopération internationale sans précédent, souvent entravés par des priorités politiques, économiques et culturelles différentes.

- **Compromis économiques et sociaux** : Les politiques visant à préserver l'écologie entrent souvent en conflit avec la croissance économique à court terme et le bien-être social, entraînant la résistance de diverses parties prenantes.

- **Limitations technologiques** : Les solutions technologiques actuelles peuvent ne pas être suffisantes ou assez évolutives pour relever efficacement certains des principaux défis écologiques.

- **Inadéquation temporelle** : Les effets des politiques et actions écologiques sont souvent retardés, rendant difficile d'établir une relation de cause à effet directe et de maintenir le soutien public et politique.

### La réponse de l'Europe [1]

En réponse à ces défis, l'Union Européenne (UE) a adopté une stratégie consistant à fixer des **objectifs contraignants pour ses États membres** dans le but d'atteindre des objectifs écologiques collectifs. Ces objectifs font partie d'un cadre réglementaire plus large qui comprend le Pacte vert européen, visant à rendre l'économie de l'UE durable en transformant les défis climatiques et environnementaux en opportunités.

L'imposition d'objectifs, tels que ceux visant à réduire les émissions de gaz à effet de serre, à augmenter l'utilisation des énergies renouvelables et à améliorer l'efficacité énergétique, fournit un objectif clair et mesurable pour les États membres. Ces objectifs sont souvent accompagnés de lignes directrices et de mécanismes de soutien pour aider les États à les atteindre. En fixant ces objectifs, l'UE tente de transcender les limites des cycles politiques nationaux à court terme et de traiter les problèmes écologiques avec une approche paneuropéenne à long terme.

Cette approche comprend également des mesures punitives en cas de non-conformité, ce qui sert de dissuasion contre l'inaction.

### Réponse judiciaire [1]

En plus des politiques et des efforts collaboratifs, l'Europe assiste de plus en plus à l'utilisation de l'action judiciaire comme moyen de faire respecter les engagements écologiques, illustrée par la montée des 'affaires climatiques'. Ces défis juridiques sont portés par des citoyens, des ONG et d'autres groupes contre les gouvernements, arguant que l'inaction de l'État ou son action insuffisante sur le changement climatique viole les lois ou droits constitutionnels existants.

De telles affaires ont connu des succès notables, comme aux Pays-Bas avec l'affaire [Urgenda](https://www.urgenda.nl/themas/klimaat-en-energie/klimaatzaak/), où la Cour suprême néerlandaise a statué que le gouvernement doit prendre des mesures plus agressives pour réduire les émissions de gaz à effet de serre, établissant un précédent pour l'application judiciaire de la politique climatique.

De même, en Belgique, l'affaire [Klimaatzaak](https://www.klimaatzaak.eu/) mentionnée ci-dessus a abouti à une décision de justice selon laquelle les autorités belges avaient manqué à leur devoir de diligence et à leurs obligations en matière de droits de l'homme en ne prenant pas de mesures suffisantes contre le changement climatique, et en appel, le juge a [statué](https://prismic-io.s3.amazonaws.com/affaireclimat/aff2e124-f79d-4d5a-916a-e7919342f880_SP52019923113012320+en.pdf) que en 2030 la Belgique devrait réduire ses émissions de 55% par rapport aux niveaux de 1990.

### Limitations des décisions judiciaires

Le problème avec de tels "cas climatiques", cependant, est qu'un juge ne peut que dire *quoi* les gouvernements du pays devraient atteindre, mais pas *comment*. Si les partis politiques n'osent toujours pas remplir le *comment*, ou ne prennent pas de mesures suffisantes, par peur de perdre des élections, la société ne progresse pas.

### Les assemblées climatiques comme réponse [1]

Les [assemblées climatiques](https://knoca.eu/what-is-a-climate-assembly/), en revanche, offrent un nouvel outil démocratique (ou plutôt, [très ancien](https://en.wikipedia.org/wiki/Deliberative_democracy#History)), hors des mains des politiciens de parti, pour trouver le *comment* de l'atteinte des objectifs écologiques.

Composées de citoyens divers et sélectionnés aléatoirement, ces assemblées délibèrent sur les questions climatiques, garantissant que les politiques reflètent un large éventail de points de vue publics. Cette approche renforce la légitimité et l'efficacité des stratégies climatiques, les alignant sur les intérêts à long terme de la société.

La [Convention Citoyenne pour le Climat](https://www.conventioncitoyennepourleclimat.fr/) (CCC) française en est un exemple. Elle a impliqué 150 citoyens dans la formulation de propositions pour réduire les émissions de carbone. Leurs [150 recommandations](https://propositions.conventioncitoyennepourleclimat.fr/), prises en compte par le gouvernement français, soulignent le rôle impactant des assemblées citoyennes dans la formation de la politique environnementale nationale, alliant participation publique et élaboration substantielle des politiques.

### Limitations des assemblées climatiques

Cependant, les assemblées climatiques ont leurs limites.

- Bien que les citoyens participants soient bien informés et reconnaissent généralement la nécessité d'une action rigoureuse, et bien qu'ils représentent *démographiquement* l'ample population d'où ils ont été sélectionnés aléatoirement, ils n'ont pas la légitimité de parler pour l'ensemble de la population, qui n'est pas impliquée, ni dans la phase délibérative de compilation des mesures, ni dans la décision sur les politiques qui seront effectivement mises en œuvre.

- La seule façon de légitimement continuer avec le résultat de l'assemblée climatique est donc de le transmettre au système démocratique représentatif traditionnel des partis politiques. Les problèmes mentionnés ci-dessus se posent à nouveau : les politiciens hésiteront toujours à imposer des mesures rigoureuses, par peur de perdre des élections. C'est ce qui s'est passé en France, où le gouvernement a finalement [adopté que 53 % des propositions](https://reporterre.net/Convention-pour-le-climat-seules-10-des-propositions-ont-ete-reprises-par-le-gouvernement).

### La solution : les préférendums

Idéalement, l'ensemble des mesures doit toujours être source de manière délibérative, comme dans les assemblées climatiques, pour les raisons mentionnées ci-dessus. Cependant, **l'ensemble de la société civile** devrait avoir la chance de **participer à la création de la liste des mesures**. Les groupes de réflexion, les universités, les ONG, les groupes de pression et les citoyens intéressés ou experts devraient avoir la possibilité de participer.

Le faire 'hors ligne' n'est pas possible sans un système de représentation/délégation ; soit par des élections, soit par tirage au sort. Cependant, **internet** permet à [la grande et toujours croissante majorité](https://statbel.fgov.be/en/themes/households/ict-usage-households) des citoyens de participer. Cela doit se faire d'une manière qui encourage des contributions qualitatives et respectueuses, et cela doit être modéré de manière approfondie et juste. Des décennies d'expérience (notamment dans [le monde du développement logiciel](https://resources.github.com/open-source/what-is-open-source-software/)) nous ont appris [comment cela peut être fait](https://www.lesswrong.com/posts/dYwQCFkR6cCbP9Xqk/how-forummagnum-builds-communities-of-inquiry), avec du crowdsourcing.

Cependant, étant donné l'échéance difficile de 2030, il se peut qu'il n'y ait pas assez de temps pour composer de manière délibérative une liste de mesures. Heureusement, dans le contexte de la Belgique, de nombreuses **institutions ont déjà beaucoup réfléchi** sur la manière de réduire les émissions. L'outil pourrait partir de telles listes de mesures, tant que leur impact est calculé. Ensuite, plusieurs collections de mesures, ou '**ensembles**', peuvent être compilées, qui idéalement, dans leur ensemble, atteignent les objectifs requis.

Enfin, l'outil permet à **l'ensemble de la population** de s'impliquer dans **le choix de l'ensemble des mesures**, ou de les 'noter et classer'. D'où le nom [preferendum](https://www.noemamag.com/democracys-missing-link/) : un référendum qui mesure les *préférences* de la population, plutôt que de poser simplement une question polarisante de oui/non.

Tout en restant entièrement démocratique, cela déplace cet exercice difficile entièrement hors des mains du système politique partisan, qui n'a donc pas à craindre de répercussions électorales.

De plus, les objectifs rigoureux proviennent de **l'extérieur de la sphère politique partisane** (à savoir, les cadres déjà convenus par l'ONU et l'UE, et une décision judiciaire). Les partis politiques peuvent toujours guider leur électorat en élaborant un ensemble de mesures qui correspondent le mieux à leur idéologie. Au moins, l'ensemble des mesures sélectionnées de chacun des partis politiques devra, finalement, **être suffisant** pour atteindre les objectifs, ou, sinon, cela sera très visible, et les répercussions négatives rendues claires.

# Quelles sont les prochaines étapes ?

Ce site Web sert dans un premier temps d'outil de campagne, d'exemple -- au grand public, aux agences gouvernementales éventuellement impliquées et aux partis politiques -- sur la manière dont nous pouvons obtenir des mesures écologiques suffisantes de manière démocratique et juste.

Pendant cette campagne, la qualité de l'outil peut encore être grandement améliorée, et ses fonctionnalités élargies, pour donner une idée toujours plus large de son fonctionnement.

Avec le temps, au moins les résultats et un ensemble de base de mesures devraient avoir des chiffres précis pour les objectifs, et une manière de les atteindre.

#### Campagne électorale

Idéalement, cet outil devrait encourager un large éventail d'institutions (universités, groupes de réflexion, groupes d'intérêt,...) et, à terme, tous les partis politiques, lors de la campagne électorale belge de 2024, à proposer leur propre ensemble de mesures calculées qui s'attaquent de manière adéquate ces défis écologiques. Nous serons heureux de travailler avec eux et de les intégrer dans notre outil.

#### Adoption officielle

Par la suite, si ce concept est officiellement adopté par le gouvernement et qu'un référendum officiel est lancé pour jauger les préférences de l'ensemble de la population, cette mise en œuvre peut servir de point de départ. Le code est open source et peut être réutilisé, ou il peut simplement servir d’inspiration.

Le grand public, et en particulier les auteurs de ce site Web, continueront à évaluer la qualité de l'outil officiel, en le comparant avec cet outil de démonstration.

> *[1] Ces paragraphes ont été rédigés avec l'aide de ChatGPT*
