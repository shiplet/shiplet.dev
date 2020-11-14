---
title: "How to Get a Fauna Value's Ref in Go"
author: "Shiplet"
date: "2020-11-14"
host: "https://shiplet.dev"
description: "An example of how to get an object's ref with fauna & go"
imgUrl: "https://shiplet.dev/static/triangle.png"
fbUrl: "https://shiplet.dev/post/serve-golang-netlify-function-local"
twDomain: "shiplet.dev"
---

The [FaunaDB docs](https://docs.fauna.com/fauna/current/) are pretty thorough, but I've noticed that every example of querying an object by `ref` assumes you already have the ref ID handy.

Take, for instance, this `Update` example in Go:

```go
result, _ := client.Query(
  f.Update(
      f.RefCollection(f.Collection("spells"), "181388642581742080"),
      f.Obj{
          "data": f.Obj{"name": "Mountain's Thunder", "cost": nil}}))

if (err != nil) {
  fmt.Println(err)
} else {
  fmt.Println(result)
}
```

The ref ID `181388642581742080` is hard-coded! But what if you don't just have a handy map of all the refs in your collection??

Don't worry, I gotchu. Go's typing system makes the process a little additionally verbose, but it's reliable.

```go
import (
    f "github.com/fauna/faunadb-go/v3/faunadb"
)

// setup code

client := f.NewFaunaClient("YOUR_CLIENT_KEY")

ref, err := client.Query(f.Get(f.MatchTerm(f.Index("ANY_INDEX_YOURE_USING"), theSearchValue)))
if err != nil {
    // handle error
}

var refAssert *f.RefV
if err = ref.At(f.ObjKey("ref")).Get(&refAssert); err != nil {
    // handle error
}

// the rest
```

The key piece is running `ref.At().Get(&refAssert)`, where `refAssert` is of type `*f.RefV`. This accurately maps to the response value you get from your query and should allow you to use `refAssert.ID` for any future queries.

Enjoy!