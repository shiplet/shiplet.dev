---
title: "Building a Physics-Enabled TIE Fighter CLI in Go: Part 1"
author: "Shiplet"
date: "TBD"
---

What started off as a fun way to create a dueling TIE Fighter line-break during the Teams chat in backlog refinement:

```
|-o-| --- - -- - **#$*% - -- -- |-o-|
```

has now become a legitimate effort to build an interactive TIE Fighter that flies around your terminal window.

I've been productive with Go lately, so I'm using it to build the toy. Once it's gotten to a base level of interactivity, ideally with some physics and blasters, I'd like to port it from Go to Rust to see what kind of performance gains are possible. Go is already fast in this realm, but because of garbage collection I feel like I can see hiccups in the framerate after running the TIE around for a few seconds.

Here's the entry point:

```go
func main()  {
	keyChan := make(chan *keyboard.Key)
	go keyWatch(keyChan)
	go keyListen(keyChan)
	mainLoop(keyChan)
}
```

This sets up the main loop, which is comprised of two ongoing tasks: one that captures keyboard input, and one that handles the idle state. Both of those tasks will 
