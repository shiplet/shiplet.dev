---
title: "Why Is Security Both So Important and So Clunky?"
author: "Shiplet"
date: "2021-04-26"
host: "https://shiplet.dev"
description: "Thoughts on patterns I've observed in infosec"
imgUrl: "https://shiplet.dev/static/triangle.png"
fbUrl: "https://shiplet.dev/post/why-is-security-so-important-and-so-clunky"
twDomain: "shiplet.dev"
---

_These are personal observations about the role of security in everyday interactions with technology. It's not intended_
_to be exhaustive or dogmatic._

---

Information Security is important because it's the technological response to plotholes in our collective understanding of computers.

Aside from the _lowest_ levels of physics and electrical engineering at work in the design of chips - or
the things that turn electricity into logic - and many times even then, every functional layer of a computer is the result of a decision
made by a person or group of people. The people making these decisions are (ideally) intelligent, scientifically informed,
rigorous, and, inevitably, isolated from the totality of the ways in which their decisions can be used or abused.

The cumulative effect of these rigorous and informed decisions is that each successive or "downstream" decision is based on 1.) assumptions
made _about_ and 2.) assumptions made _by_ the structural layers immediately before it. We can know what those assumptions are at either
a surface level or at the level of their actual implementation, but unless we specialize in every facet of a particular
vertical of logic, it becomes unsustainable to maintain a complete and unproblematic understanding of the structure and
nuance of an entire machine, let alone hundreds, all of which contain their own architecture and design. Factor in the use of 
general- and special-purpose libraries to perform certain critical or non-critical tasks, and the complexity multiplies
significantly.

Both hackers and the people who slow them down know this, so they often focus on and initially redefine the _assumptions_ themselves, 
rather than their particular _implementations_. What this tends to reveal is that the most vulnerable
parts of a structure are the parts that humans interact with most closely and most frequently, both in their engineering and in their consumption, 
and so those assumptions shift to allow for the _unpredictability of human behavior_ as well as the more general
_predictability of human motivations_. The interplay between these two forces raises questions and inspires answers
that affect nearly every element of technology and how we interact with it. It also, to the furthest extent possible,
shifts the burden of responsibility to the consumer through individual liability, rather than the engineer.

This exchange is predicated on and enforceable through a basic social contract between the engineer and the consumer. 
The engineer's portion of the contract is that they've done their due diligence in simplifying & streamlining 
usage while also hardening against attack vectors, and that if the consumer uses the product _in the way in which it's intended_, 
they'll be kept safe. The consumer's portion of the contract is that they'll follow these guidelines, indeed use the product as intended, 
and absolve the engineer of the steepest responsibilities of failure. Either half of the contract is rendered unenforceable in cases 
of negligence.

Given this, the role of Information Security is to translate human behavior and motivation into reproducible steps either to
uphold OR to break that contract and thereby redefine and re-provision it. The weakest clauses of this contract are: 

  1. That the logic of any particular decision is sufficiently complete.
  2. That the definition of _intended use_ is sufficiently broad.

This results in an iterative exchange between engineers and consumers, informed by attackers as a third party, and which
fluctuates among varying ergonomic degrees. Fortunately, these degrees of clunkiness have, overall, trended toward less 
friction in adoption, rather than more.