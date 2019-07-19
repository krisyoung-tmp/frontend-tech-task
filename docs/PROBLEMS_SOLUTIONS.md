#Problems and Solutions

I wouldnt exactly describe it as a problem, but I was relatively unfamiliar with some aspects of the chosen tech stack

-   NextJS: Although I've investigated the framework before I've never found a suitable use-case for it and so my hands-on familiarity with it is limited. Having completed the project, I still feel it's use is limited as an application development framework.

-   SASS: I had to somewhat refamiliarize myself with SASS as I've neen working with CSS in JS solutions like Fela, StyledComponents and Emotion for the last 4 years or so.

One problem I did encounter is an intermittent issue with style rendering which appears to be a combination of SSR, lazy loading and css modules. It's an issue I've come across in the past where some styles are not picked up when an uncached page is loaded, subsequent loads from a warm cache work as expected.
If the usage of SASS and SSR weren't prescribed, I would likely solve this by disabling SSR (it doesnt provide much value for an app of this nature anyway) or swith to a CSS in JS solution, however, for the purposes of this project, i promoted some affect classes to global scope so they load as part of the inital page load to mitigate the issue.
