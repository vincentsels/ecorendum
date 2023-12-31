# What is this website?

This website demonstrates a possible new way in which governments could poll their citizens about which policy measures they should adopt in order to meet multiple imposed ecological targets.

This is *not yet* a real government initiative. The data is *not yet* completely accurate. It is currently in a state used to shocase the concept, in order to find partners to turn it into a reality.

This tool is currently just the 'front-end' of the website; it is not connected to a database; it is not possible to actually 'submit' your selection of measures.

For a deep dive into the concept, you can read this [white paper](https://forum.effectivealtruism.org/posts/ytbjbS6wYBoyYLthu/online-preferendum-to-select-climate-policy-measures).

## Context and targets

The context for this demowebsite is Flanders, Belgium, and the ecological targets are:

- The CO2-equivalent emission reduction imposed by a judge in a case called the '[Klimaatzaak](https://www.klimaatzaak.eu)' (climate case);

- The CO2-equivalent emission reduction imposed to Belgium as a European Union member state in the '[Effort Sharing Regulation](https://ec.europa.eu/commission/presscorner/detail/en/qanda_21_3543)' framework;

- [Energy efficiency](https://energy.ec.europa.eu/topics/energy-efficiency/energy-efficiency-targets-directive-and-rules/energy-efficiency-directive_en) (a reduction of used energy) and the percentage of [renewable energy](https://energy.ec.europa.eu/topics/renewable-energy/renewable-energy-directive-targets-and-rules/renewable-energy-directive_en) in the energy production mix, two other targets imposed to all EU member states through European directives.

Additionally, the total cost of these measures is displayed, taking into account the cost or profit of [emission trading](https://climate.ec.europa.eu/eu-action/eu-emissions-trading-system-eu-ets_en), a practice where countries can either sell emission rights in case they emit less than expected, or buy the rights to emit more than expected from other states, on a public market.

Finally, the website displays the broader estimated impact of the selected measures, on two dimensions:

- The broad ecological impact, in the framework of the (remaining) [9 planetary boundaries](https://www.stockholmresilience.org/research/planetary-boundaries.html), scientific thresholds for Earth-system processes, beyond which humanity risks destabilizing the planet's capacity to support life;

- The broad socio-economical impact, in the framework of the [Sustainable Development Goals](https://www.undp.org/sustainable-development-goals) (SDGs), 17 global goals set by the UN to achieve a sustainable, equitable, and prosperous world by 2030.

## Used data

### Flemish context

The data used for this demowebsite, both targets and measure impacts, is largely made up, yet semi-realistic. Although the website seems to allow to switch context to the other Belgian regions, Brussels and Wallonia, this currently does not change any of the data. Hence, all data is currently targeting Flanders.

### Targets

- The **legal 55% CO2-equivalent reduction target**, and its resulting 34 Mt absolute value, was calculated by VEKA and should be correct.

- The **European CO2-equivalent reduction target** is based on the EU ESR target of 47% for Belgium. The federal government, Brussels and Wallonia all recognize this 47%. Flanders currently only targets 42%, leaving a large gap nationally. As long as the different regions haven't come to an agreement of how to divide the efforts, this tool assumes Flanders should also achieve a 47% reduction. As an absolute value, this translates into roughly 27 Mt of CO2-equivalent reductions. Note that in the European context, this only includees the ESR-sectors (road transport, buildings, agriculture, small industry, waste management), no ETS-sectors (electricity and heat generation, large industry, aviation and maritime transport).

- The **energy efficiency target** is currently a very rough estimate of 10.000 GWh additional savings per year.

- The **renewable energy target** is currently a very rough estimate of 5.000 GWh additional renewable energy per year.

### Measures

The majority of the set of measures stems from a collection of sample measures compiled the first of december 2023 by the '[Vlaams Energie- en Klimaatagentschap](https://www.vlaanderen.be/veka)' (VEKA), ordered by the Flemish minister of Environment and Energy, Zuhal Demir, in response to the abovementioned Klimaatzaak ruling, to get an idea of the scope of measurements to require to meet the imposed target. This came in the form of a 4-page Word document which they shared with us. We translated these measures into the format of our tool, which is of course a rough approximation.

An additional measure, 'Obligatory display of carbon footprint on products and services' was entirely made up by us, and added just to have a difference in the measures between preconfigured 'sets' and when you compile your own set.

### Measure impact

- All **measurement cost estimates** are largely made-up, intuitive guesses, where possible loosely based on similar measures in other countries. The tool supports both 

- The **ecological and SDG impact** are also largely made-up, intuitive guesses.

### Measure detail data

Clicking on a measure shows much more information about each measure such as a long explanation; the stance of all political parties on the measure; links to media articles, debates, scientific papers, examples abroad and explainers; frequently asked questions; and of course a link to crowd-source this data.

In this demo-version, all of this data is entirely made-up, even using randomly generated '[lorem ipsum](https://nl.wikipedia.org/wiki/Lorem_ipsum)' texts.

## Calculations

Currently, straightforward formulas are used to calculate the effect of measures on each of the targets: the estimted CO2-equivalent emissions saved, energy saved, and new renewable power generation added for each selected measure/variant are added up. Same for the cost and broader imapct. Currently, diminishing returns, overlap between measures, mutually exclusive measures, or the timing at which or a degree in which a measure takes effect, are not taken into account.

# What should the real version do more?

The real version of this tool should include at least the following:

- Allow citizens to authenticate and submit their preferred set of measures;
- Allow citizens, to crowd-source details about the measures, discuss them, and collaboratively propose new measures;
- Support each of the Belgian regions; with their correct targets, measures, sets of measures, and political party stances;
- More measure sets, by e.g. think tanks and universities, reviewed by a carefully selected independent board; and ultimately a set of measures selected by every political party;
- Additional explicit (ecological) targets, presumably nitrogen disposition;
- Minimum and maximum measure impact, to express degree of uncertainty;
- More properties for each of the measures and the ability to filter;
- A thorough tutorial, guiding everyone through the features of the tool;
- Much more and better help tooltips/dialogs;
- A popular explanation of what the tool is, its purpose, why it is necessary,...
- And much more...

# Why is this website on the topic of ecology?

A large problem with our democratic system is that it was never conceived to deal with issues which have **deadlines** and **thresholds** imposed by unsurmountable laws of nature and physics, simply because at the time of its conception in the 18th and 19th century, these were not yet known. This is a major flaw in the system which has never been corrected.

#### Elections

The problem with a system where representatives are **elected** which hold all the power, is that this encourages **short-term** thinking and policy. Politicians which are willing to make sacrifices today, to the benefit of the future, do not get elected as long as there are others who proclaim such sacrifices are not necessary. This was popularized in Belgium by politician Bruno Tobback, as early as 2007, through his [quote](https://nl.wikiquote.org/wiki/Bruno_Tobback): "Almost every politician knows what to do to address the climate problem. There is just no politician who knows how to get elected after that."

#### Political parties

The rise of **political parties** and the resulting party-political system, which is not per se necessary in a representative democracy (the Belgian constitution, for instance, does not mention them at all) but which de facto has taken rule in almost every representative democracy, further complicates matters. Political parties become vast sovereign entities on themselves, with only **one raison d'être: to get re-elected**. Not to govern with good, responsible policy; not to protect or properly inform citizens.

Political parties play a **zero-sum game** in which the loss of one party equals the gain of another. This results in a negative atmosphere where parties work against each other rather than alongside each other; it results in polarization and dogmatism.

#### Ecological targets

