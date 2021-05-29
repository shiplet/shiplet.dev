---
title: "Down the Rabbit-Hole of Academic Research"
author: "Shiplet"
date: "2021-01-17"
host: "https://shiplet.dev"
description: "Tracing the wonderful, fractal world of academic papers and their findings."
imgUrl: "https://shiplet.dev/static/triangle.png"
fbUrl: "https://shiplet.dev/post/down-the-rabbit-hole-of-academic-research"
twDomain: "shiplet.dev"
---

In my ongoing efforts to keep myself mentally quick, aware of academic and research trends, and sharp on important topics of the day, I've done a bit of digging into popular, influential, and well-regarded academic journals in Computer Science. Within the first 45 minutes of my investigation, I found myself deep in the stacks of "small-world" system topology[[1]], infodemics[[2,3]], and random network scaling[[4]].

This is my attempt to follow my own line of thinking and to document the threads as they unraveled. I haven't figured out how to make my markdown renderer link to inline or non-header anchor points though, so if you see [[1]]-style annotations and they don't link anywhere, just think of them as footnotes. They should all be listed at the bottom of the page. Godspeed to all involved.

It began with the [IEEE Open Journal of the Computer Society](https://ieeexplore.ieee.org/xpl/mostRecentIssue.jsp?punumber=8782664), (IEEE OJCS) an open-access, peer-reviewed journal provided by the IEEE. It has an international board of editors and associate editors, has one volume (released in 2020), and so far covers a fairly wide range of Computer Science subjects. I was particularly drawn to it because it's open-access, meaning I can read any and all of the articles without spending either $157/yr for a sub to the journal, $14 for the article itself, or $268 for a combined IEEE membership + journal subscription. I'm sure the costs are worth it, but I'm glad to have access to the Open Journal to assess how diligent I'll be in reading these pieces before I shell out the money for a full-on membership.

The article of interest today is: "Analysis and Insights for Myths Circulating on Twitter During the COVID-19 Pandemic"[[3]]. Below are my notes. Areas where I have questions or make editorial notes are indicated by `inline code blocks`.

- S. Yang _et al_ -- "Analysis and Insights for Myths Circulating on Twitter During the COVID-19 Pandemic"
    - `published in IEEE OJCS October of 2020 (most likely had access to Gallotti's[2] work, since this article was published first`
    - classification of the myths circulating on twitter
        - 5 categories:
            1. spread of infection
            2. preventative measures
            3. detection measures
            4. treatment
            5. miscellaneous
    - mapped categories to [SIR](https://www.maa.org/press/periodicals/loci/joma/the-sir-model-for-spread-of-disease-the-differential-equation-model) model of spread of disease
    - found that _spread of infection_ and _preventative measures_ myths spread faster than other categories of myths from 1 January to 7 July
    - After June 2020, miscellaneous myths spread faster
    - fear was the strongest emotion in all categories of myths and accounted for the emotional impact of nearly 64% of all tweets analyzed
    - `how did they determine that fear was the emotion expressed? a bespoke implementation of a language processing engine, or leveraging existing products like Nuvi?`
    - Cited research indicates that Gallotti _et all_ [[2]] analyzed over 100M twitter posts across 64 languages
        - developed Infodemic Risk Index
        - found that in  low-risk regions (like South Korea), infodemic risk remains small despite an initial spike
        - high-risk regions (like Venezuela) display infodemic traits throughout the epidemic period
        - `what classifies a region as low-risk or high risk?`
- Gallotti _et all_ -- "Assessing the risks of 'infodemics' in response to COVID-19 epidemics."
    - `published in Nature October of 2020`
    - analyzed 100M+ twitter messages from 22 January to 10 March 2020
    - classified reliability of news being spread
    - found that rises in COVID-19 infections were preceded by _measurable_ waves of potentially unreliable information
    - some of these waves exposed entire countries to falsehoods regarding the virus
    - as infections rose, more reliable and credible sources became more dominant, and twitter discourse continues to shift toward more credible sources
    - infodemic early-warning signals can inform counter-misinformation strategies
    - low-quality and misleading information appeals to certain psychological mechanisms:
        - curbing anxiety by denying or minimizing the seriousness of a threat
        - controlling fear or anger by scapegoating individuals, groups, or organizations, labeling them as responsible for the situation
        - delivering illusory senses of control by providing 'miracle' remedies
    - infodemics also tend to proliferate when the credible information sources either fail to or don't match the following:
        - capture the attention and trust of _some_ parts of the public
        - the level of overall appeal of the low-quality sources
        - the beliefs or prejudices of certain parts of the public
        - sound as convincing because their messages are typically more nuanced than the reductionist, or straightforward messages of the low-quality sources
    - focuses their research on Twitter, a network "characterized by heterogeneous activity and topological shortcuts typical of small-world systems"
        - `what is heterogeneous connectivity?`
        - `what are small-world systems?`
        - `what are the topological shortcuts of small-world systems?`
- Barabasi, A. L. & Albert, R. -- "Emergence of scaling in random networks"
    - `only have access to the abstract`
    - `published in Science 1999`
    - systems ranging from genetic networks to the web can broadly classify as networks with "complex topology"
        - `what is meant by topology here?`
            - `broadly, topologies refer to the study of localities; deriving historical knowledge of a place or thing from its geographic features`: [OED](https://www.oed.com/view/Entry/203426)
            - `in reference to networks: network topology refers to the arrangement of the nodes within a network. This is the most likely usage here.`: [Wiki](https://en.wikipedia.org/wiki/Network_topology)
    - many large networks follow a "scale-free power-law distribution"
        - `what is this?`
            - `most likely refers to the fact that they have large hubs (nodes) that contain massively more connections than other nodes`
    - two particular mechanisms drive this fact:
        1. "networks expand continuously by the addition of new vertices"
            - `so in terms of social media, new users are the only real means of expanding the size of the network`
        2. "new vertices attach preferentially to sites that are already well connected"
            - `again, in terms of social media, new users typically join existing networks by attaching first to accounts with already-large followings`
    - simulated models suggest that these two ingredients are all that's necessary to replicate existing scale-free distributions
    - this suggests that _large_ networks tend to be self-organizing in ways that go beyond individual systems
    - `so, in other words, the larger the continuously expanding network, the more likely it is to have certain self-organizing characteristics - thereby generally reducing entropy over time, relative to smaller systems, at least as it regards its topological traits`



1. Watts, D., Strogatz, S. Collective dynamics of ‘small-world’ networks. Nature 393, 440–442 (1998). https://doi.org/10.1038/30918
2. Gallotti, R., Valle, F., Castaldo, N. et al. Assessing the risks of ‘infodemics’ in response to COVID-19 epidemics. Nat Hum Behav 4, 1285–1293 (2020). https://doi.org/10.1038/s41562-020-00994-6
3. S. Yang, J. Jiang, A. Pal, K. Yu, F. Chen and S. Yu, "Analysis and Insights for Myths Circulating on Twitter During the COVID-19 Pandemic," in IEEE Open Journal of the Computer Society, vol. 1, pp. 209-219, 2020, doi: 10.1109/OJCS.2020.3028573.
4. Barabasi, A. L. & Albert, R. Emergence of scaling in random networks. Science 286, 509–512 (1999).

