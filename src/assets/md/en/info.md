# What is this website?

This website demonstrates a possible new way in which governments could poll their citizens about which policy measures they should adopt in order to meet multiple imposed ecological targets.

This is *not yet* a real government initiative. The data is *not yet* completely accurate. It is currently in a state used to showcase the concept, in order to find partners to turn it into a reality.

This tool is currently just the 'front-end' of the website; it is not connected to a database; it is not possible to actually 'submit' your selection of measures.

For a deep dive into the concept, you can read this [white paper](https://forum.effectivealtruism.org/posts/ytbjbS6wYBoyYLthu/online-preferendum-to-select-climate-policy-measures).

## Context and targets

The context for this demowebsite is currently Flanders, Belgium, and the ecological targets are:

- The CO2-equivalent emission reduction imposed by a judge in a case called the '[Klimaatzaak](https://www.klimaatzaak.eu)' (climate case);

- The CO2-equivalent emission reduction imposed to Belgium as a European Union member state in the '[Effort Sharing Regulation](https://ec.europa.eu/commission/presscorner/detail/en/qanda_21_3543)' framework;

- [Energy efficiency](https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficiency-targets-directive-and-rules/energy-efficiency-directive_en) (a reduction of used energy) and the percentage of [renewable energy](https://energy.ec.europa.eu/topics/renewable-energy/renewable-energy-directive-targets-and-rules/renewable-energy-directive_en) in the energy production mix, two other targets imposed to all EU member states through European directives.

Additionally, the total cost of these measures is displayed, taking into account the cost or profit of [emission trading](https://climate.ec.europa.eu/eu-action/eu-emissions-trading-system-eu-ets_en), a practice where countries can either sell emission rights in case they emit less than expected, or buy the rights to emit more than expected from other states, on a public market.

Finally, the website displays the broader estimated impact of the selected measures, on two dimensions:

- The broad ecological impact, in the framework of the (remaining) [9 planetary boundaries](https://www.stockholmresilience.org/research/planetary-boundaries.html), scientific thresholds for Earth-system processes, beyond which humanity risks destabilizing the planet's capacity to support life;

- The broad socio-economical impact, in the framework of the [Sustainable Development Goals](https://www.undp.org/sustainable-development-goals) (SDGs), 17 global goals set by the UN to achieve a sustainable, equitable, and prosperous world by 2030.

## Used data

### Flemish context

The Flemish data used for this demowebsite, both targets and measure impacts, is largely made up, yet semi-realistic. The tool allows switching context to the other Belgian regions, Brussels and Wallonia. However, these currently use entirely fake, dummy target and measure data.

### Targets

- The **legal 55% CO2-equivalent reduction target**, and its resulting 34 Mt absolute value, was calculated by VEKA and should be correct.

- The **European CO2-equivalent reduction target** is based on the EU ESR target of 47% for Belgium. The federal government, Brussels and Wallonia all recognize this 47%. Flanders currently only targets 42%, leaving a large gap nationally. As long as the different regions haven't come to an agreement of how to divide the efforts, this tool assumes Flanders should also achieve a 47% reduction. As an absolute value, this translates into roughly 27 Mt of CO2-equivalent reductions. Note that in the European context, this only includes the ESR-sectors (road transport, buildings, agriculture, small industry, waste management), no ETS-sectors (electricity and heat generation, large industry, aviation and maritime transport).

- The **energy efficiency target** is currently a very rough estimate of 10.000 GWh additional savings per year.

- The **renewable energy target** is currently a very rough estimate of 5.000 GWh additional renewable energy per year.

### Measures

The majority of the set of measures stems from a collection of sample measures compiled the first of december 2023 by the '[Vlaams Energie- en Klimaatagentschap](https://www.vlaanderen.be/veka)' (VEKA), ordered by the Flemish minister of Environment and Energy, Zuhal Demir, in response to the abovementioned Klimaatzaak ruling, to get an idea of the scope of measures to meet the imposed target. This came in the form of a 4-page Word document which they shared with us. We translated these measures into the format of our tool, which is of course a rough approximation.

An additional measure, 'Obligatory display of carbon footprint on products and services' was entirely made up by us, and added just to have a difference in the measures between preconfigured 'sets' and when you compile your own set.

### Measure impact

- All **measure cost estimates** are largely made-up, intuitive guesses, where possible loosely based on similar measures in other countries. The tool supports both an 'initial cost' and a 'yearly cost'. Ideally, this should be changed into a minimum and maximum value, to account for uncertainty. Certain measures will have a larger spread than others.

- The **ecological and SDG impact** are also largely made-up, intuitive guesses.

### Measure detail data

Clicking on a measure shows much more information about each measure such as a long explanation; the stance of all political parties on the measure; links to media articles, debates, scientific papers, examples abroad and explainers; frequently asked questions; and of course a link to crowd-source this data.

In this demo-version, all of this data is entirely made-up, even using randomly generated '[lorem ipsum](https://nl.wikipedia.org/wiki/Lorem_ipsum)' texts.

## Calculations

Currently, straightforward formulas are used to calculate the effect of measures on each of the targets: the estimted CO2-equivalent emissions saved, energy saved, and new renewable power generation added for each selected measure/variant are added up. Same for the cost and broader imapct. Diminishing returns, overlap between measures, mutually exclusive measures, or the timing at which or a degree in which a measure takes effect, are currently not taken into account. A real-world tool would use an advanced [System Dynamics](https://systemdynamics.org/what-is-system-dynamics/) model, such as used in the MIT [En-ROADS](https://www.climateinteractive.org/en-roads/) project, or the [2050 Pathway Explorer](https://becalc.netzero2050.be), in the Belgian context.

# What should the real version do more?

The real version of this tool should include at least the following:

- Allow citizens to authenticate and submit their preferred set of measures;
- Allow citizens to crowd-source details about the measures, discuss them, and collaboratively propose new measures;
- Support each of the Belgian regions; with their correct targets, measures, sets of measures, and political party stances;
- More measure sets, by e.g. think tanks and universities, reviewed by a carefully selected independent board; and ultimately a set of measures selected by every political party;
- Additional explicit (ecological) targets, presumably nitrogen disposition;
- Minimum and maximum measure impact, to express degree of uncertainty;
- An advanced system dynamics model to calculate impacts;
- More properties for each of the measures and the ability to filter;
- A thorough tutorial, guiding everyone through the features of the tool;
- Much more and better help tooltips/dialogs;
- A popular explanation of what the tool is, its purpose, why it is necessary,...
- And much more...

# Why is this website on the topic of ecology?

A large problem with our democratic system is that it was never conceived to deal with issues which have **deadlines** and **thresholds** imposed by unsurmountable laws of nature and physics. Such limits and their effect on societies were simply not yet known at the time the system was conceived: in 18th century America and France, or in 1831 in Belgium. This is a major flaw in the system which has never been properly corrected.

### Elections

The problem with a system where representatives are **elected** which hold all the power, is that this encourages **short-term** thinking and policy. Politicians which are willing to make sacrifices today, to the benefit of the future, do not get elected as long as there are others who proclaim such sacrifices are not necessary. This was popularized in Belgium by politician Bruno Tobback, as early as 2007, through his [quote](https://nl.wikiquote.org/wiki/Bruno_Tobback): "Almost every politician knows what to do to address the climate problem. There is just no politician who knows how to get elected after that."

### Political parties

The rise of **political parties** and the resulting party-political system (which is not per se necessary in a representative democracy -- the Belgian constitution, for instance, does not mention them at all), further complicates matters. Political parties become vast sovereign entities on themselves, with only **one raison d'être: to get re-elected**. Not to govern with good, responsible policy; not to protect or properly inform citizens.

Political parties play a **zero-sum game** in which the loss of one party equals the gain of another. This results in a negative atmosphere where parties work against each other rather than alongside each other; it results in polarization and dogmatism.

### The difficulties of ecological policy [1]

Ecological challenges such as controlling climate change or preserving biodiversity, in order to maintain the earth in an ecological state which has allowed human (and other life) to flourish, are particularly difficult to solve in this system:

- **Global Coordination and Cooperation**: Effective management of global ecological issues requires unprecedented levels of international cooperation, often hindered by differing political, economic, and cultural priorities.

- **Economic and Social Trade-offs**: Policies aimed at ecological preservation often conflict with short-term economic growth and social welfare, leading to resistance from various stakeholders.

- **Technological Limitations**: Current technological solutions may not be sufficient or scalable enough to address some of the major ecological challenges effectively.

- **Temporal Mismatch**: The effects of ecological policies and actions are often delayed, making it difficult to establish a direct cause-effect relationship and maintain public and political support.

### Europe's answer [1]

In response to these challenges, the European Union (EU) has adopted a strategy of setting **binding targets for its member states** in an effort to achieve collective ecological goals. These targets are part of a broader regulatory framework that includes the European Green Deal, aimed at making the EU's economy sustainable by turning climate and environmental challenges into opportunities.

The imposition of targets, such as those for reducing greenhouse gas emissions, increasing renewable energy usage, and improving energy efficiency, provides a clear and measurable goal for member states. These targets are often accompanied by guidelines and support mechanisms to help states achieve them. By setting these targets, the EU attempts to transcend the limitations of short-term, national political cycles and address ecological issues with a long-term, pan-European approach.

This approach also includes punitive measures for non-compliance, which serves as a deterrent against inaction.

### Judiciary answer [1]

In addition to policy and collaborative efforts, Europe is increasingly witnessing the use of judicial action as a means to enforce ecological commitments, exemplified by the rise of 'climate cases'. These legal challenges are brought by citizens, NGOs, and other groups against governments, arguing that the state's inaction or insufficient action on climate change violates existing laws or constitutional rights.

Such cases have seen notable successes, as in the Netherlands with the [Urgenda case](https://www.urgenda.nl/themas/klimaat-en-energie/klimaatzaak/), where the Dutch Supreme Court ruled that the government must take more aggressive action to reduce greenhouse gas emissions, setting a precedent for judicial enforcement of climate policy.

Similarly, in Belgium, the above mentioned [Klimaatzaak](https://www.klimaatzaak.eu/) case resulted in the court ruling that Belgian authorities had breached their duty of care and human rights obligations by failing to take sufficient measures against climate change, and in appeal, the judge [ruled](https://prismic-io.s3.amazonaws.com/affaireclimat/aff2e124-f79d-4d5a-916a-e7919342f880_SP52019923113012320+en.pdf) that by 2030 Belgium should have its emissions reduced by 55% compared to 1990 levels.

### Limitations of judiciary rulings

The problem with such 'climate cases' however is that a judge can only say *what* the country's governments should achieve, but not *how*. If political parties still do not dare to fill in the *how*, or do not take sufficient measures, out of a fear of electoral loss, society is no step further.

### Climate assemblies as answer [1]

[Climate assemblies](https://knoca.eu/what-is-a-climate-assembly/) on the other hand offer a new (or rather, [very old](https://en.wikipedia.org/wiki/Deliberative_democracy#History)) democratic tool, out of party politicians' hands, to come up with the *how* of meeting ecological targets.

Comprising diverse, randomly selected citizens, these assemblies deliberate on climate issues, ensuring policies reflect a broad spectrum of public views. This approach enhances the legitimacy and effectiveness of climate strategies, aligning them with the long-term interests of society.

The French [Convention Citoyenne pour le Climat](https://www.conventioncitoyennepourleclimat.fr/) (CCC) exemplifies this. It engaged 150 citizens in formulating proposals to reduce carbon emissions. Their [150 recommendations](https://propositions.conventioncitoyennepourleclimat.fr/), considered by the French government, highlight the impactful role of citizen assemblies in shaping national environmental policy, blending public involvement with substantive policy development.

### Limitations of climate assemblies

Climate assemblies have their limitations, however.

- Although the participating citizens are well informed and typically acknowledge the need of stringent action, and although they *demographically* represent the broad polulation from which they were randomly selected, they do not have the legitimacy to speak for the entirety of the population, who are not involved, neither in the deliberative phase of compiling measures, nor in deciding on which policies will actually be enacted.

- The only way to legitimately continue with the result of the climate assembly in thus to pass it on to the traditional party-political representative democratic system. The abovementioned problems again come into play: politicians will still be hesitant to impose stringent measures, out of a fear of electoral loss. This is what happened in France, where the government ultimately [fully adopted only 53% of proposals](https://reporterre.net/Convention-pour-le-climat-seules-10-des-propositions-ont-ete-reprises-par-le-gouvernement).

### The solution: preferenda

Ideally, the set of measures is still sourced deliberatively, such as in climate assemblies, for the reasons mentioned above. However, the **entire civil society** should get a chance to **participate in the creation of the list of measures**. Think tanks, universities, NGO's, lobby groups, and interested or expert citizens should get a chance to participate.

Doing that 'offline' is not possible without a system of representation/delegation; either through elections or sortition. However, **the internet** allows [the vast and ever increasing majority](https://statbel.fgov.be/en/themes/households/ict-usage-households) of citizens to participate. This must be done in a way that encourages qualitative, respectful contributions, and it should be thoroughly and justly moderated. Decades of experience (notably in the [software development world](https://resources.github.com/open-source/what-is-open-source-software/)) has taught us [how this can be done](https://www.lesswrong.com/posts/dYwQCFkR6cCbP9Xqk/how-forummagnum-builds-communities-of-inquiry), through crowd-sourcing.

However, given the challenging deadline of 2030, there may not be enough time to deliberatively compose a list of measures. Luckily, in the context of Belgium, many **institutions have already given a lot of though** on how to reduce emissions. The tool could start from such lists of measures, as long as their impact is calculated. Next, multiple collections of measures, or '**sets**', can be compiled, which ideally, as a whole, achieve the required targets.

Finally, the tool allows for **the entire population** to be involved in **choosing the set of measures**, or 'rating and ranking' them. Hence the name [preferendum](https://www.noemamag.com/democracys-missing-link/): a referendum which gauges the *preferences* of the population, rather than just asking one polarizing yes/no question.

While remaining entirely democratic, it moves this difficult exercise entirely out of the hands of the party-political system, which does thus not have to fear electoral repercussions.

Additionally, the stringent targets come from **outside of the party-political sphere** (namely, the already agreed upon frameworks by the UN and EU, and a judicial ruling). Political parties can still guide their electorate by compiling a set of measures that most aligns with their ideology. At least, the set of selected measures of each of the political parties will, finally, **have to be sufficient** to meet the targets, or, if not, it will be very visible, and the negative repercussians made clear.

# What are the next steps?

This website initially serves as a campaigning tool, as an example -- to the broad public, to possibly involved government agencies, and to political parties -- of how we can achieve sufficient ecological measures in a democratic and just way.

During this campaign, the quality of the tool can still be vastly improved, and its features expanded, to give an ever-broader idea of how it could function.

Over time, at least the results and a baseline set of measures should have accurate numbers for the targets, and a way to achieve them.

#### Election campaign

Ideally, this tool should encourage a wide range of institutions (universities, think tanks, interest groups,...) and ultimately all political parties during the Belgian electoral campaign of 2024, to come up with their own set of calculated measures which adequately tackle these ecological challenges. We will happily work together with them, and integrate them in our tool.

#### Official adoption

Afterwards, if this concept gets officially adopted by the government, and an official preferendum is launched to gauge the entire population's preferences, this implementation can serve as a starting point. The code is open source and can be reused, or it can just serve as inspiration.

The public at large, and in particular this website's authors, will continue to evaluate the quality of the official tool, by comparing it with this demo tool.

> *[1] These paragraphs were written with the help of ChatGPT*
