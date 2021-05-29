---
title: "Building a Physics Engine for the DOM: Part 1"
author: "Shiplet"
date: "2020-05-08"
host: "https://shiplet.dev"
description: "Some background on my interest in physics engines"
imgUrl: "https://shiplet.dev/static/triangle.png"
fbUrl: "https://shiplet.dev/post/building-a-physics-engine-part-1"
twDomain: "shiplet.dev"
---

I got into programming because I wanted to build video games. I love telling stories, I'm an illustrator, an accomplished musician & composer, but the part of games that always eluded me was the programming. I bought myself a couple books on C and C++, started learning Python, downloaded Unity but found that it worked with JavaScript and C#. By the time I felt I had all I needed to start building the game, I was so overwhelmed by the things I _didn't_ know, that the things I _did_ know paled in comparison. I also tend to build up volcanoes of energy for an idea only to have them sputter to little more than a cough by the time I feel like I'm actually ready to start. It's all very discouraging, and given that in order to build a game I felt like I would have to learn the totality of Computer Science, Linear Algebra, and Differential Calculus, I quickly gave up on the idea.

But I never _truly_ gave up on it. The more research I did, the more people I found saying things like, "Just learn Unity or Unreal! There are TONS of tutorials. If you really want to build games, then you should start working with whatever's available to you!" First off - that feels super gatekeeper-y. "If you _really_ want to build games..." What if I want to build games in a particular way? What if I just like knowing how things work? What if I want to understand all of the underlying game systems? But, secondly, _did_ I really want to build a game? What if these people were right? What if I had all the skills (except programming) and all the tools necessary, but the fact that I wasn't using them meant I actually didn't want to do anything with them?

Fast forward seven years, and now I have the programming skills. I'm a Software Engineer at one of the biggest tech companies in my area, I'm a tech lead on one of its core products, and I can lead workshops on languages like Rust and Go (and JS and Python and C# and...). And yet, I still haven't built my game. And I haven't built it for one. major. reason.

I'm still not sure that building a game is what I want to do. After seven grueling years of self-education, five years of on-the-job blood (yes blood!), sweat, and tears, overhauling how I write and compose music, and taking professional illustration classes, I find that building a game, in and of itself, isn't _that_ big of a draw for me. However, I have identified what is a draw.

The physics engine.

One of my favorite parts of the movie [IndieGame](https://en.wikipedia.org/wiki/Indie_Game:_The_Movie) is when Tommy Refenes talks about making Super Meat Boy's controls _feel_ spectacular. The way the character accelerates and jumps and slides along walls and surfaces, creating this graceful language of movement shared between developer and player. It captured my imagination because it brought to light something I had never consciously acknowledged, but had always known: some games feel better than others, and there's a reason for it.

So this brings me to today. Of course I still want to build a game, but I don't really have any fleshed-out ideas for game mechanics or storylines I want to build (yet). In the meantime, however, I _can_ continue my self-education around the various systems at work in a game, and seeing as how the physics engine is the one that's captured my attention the most, that's where I'll start.

My idea is simple: build a small physics engine for DOM elements. And not even elements that live inside Canvas. Just plain old DOM elements. `<div>` elements mainly, but really anything that satisfies the box model. I've got a solid understanding of rendering performance, so I'd like to combine that with my study of the engine itself to make a library that allows you to: throw a `<div>`, make it bounce around the screen, collide with other physics-enabled elements. Things like that. There may already be libraries that do this, but I'm not really concerned about that. This is purely an educational exercise: one that's meant to be fun, silly, and maintainable.

Speaking of maintainable, here are my goals for the project: keep it small, written in TypeScript, unit-tested, and open source. In fact, here's the [repo](https://github.com/shiplet/coma-physics). It's still a baby, so don't expect anything major yet. It'll get there.

I'll also keep track of what I'm learning in this series of blog posts in the form of an interactive, phase-based website. You can follow along here: [https://comaphysics.com](https://comaphysics.com). Why's it called Coma Physics you ask? Because comets are super cool, and one of the core elements of the comet is this layer of gas that surrounds the actual chunk of space rock, and that layer of gas is called The Coma. Combine that with the fact that physics are a core element of many games? Coma Physics.

Alright! Let's go make some stuff fly around the screen!
