---
title: "Resolving FaunaDB Privacy Conversions in Go"
author: "Shiplet"
date: "2020-11-15"
host: "https://shiplet.dev"
description: "The result of researching a maddening error"
imgUrl: "https://shiplet.dev/static/triangle.png"
fbUrl: "https://shiplet.dev/post/serve-golang-netlify-function-local"
twDomain: "shiplet.dev"
---

So, apparently if you save your Fauna data in standard JSON notation, like this:

```json
{
    "name": "some name",
    "age": 25,
}
```

And then you define your struct in Go like this, to match it (for serialization purposes):

```go
type Person struct {
    name string
    age  int
}
```

When you run:

```go

var person Person
res, err := data.At(f.ObjKey("data")).Get(&person); err != nil {
    // handle err
}
```

You're NOT going to find any data in `person`! This is most likely due to how Go handles public vs private exports (i.e. - anything that starts with a lowercase value is private, anything with uppercase is public).
When the fauna library tries to convert the data from the found object to your struct, it doesn't have access to any of those properties, so you'll just get an object with a bunch of defaults or nil values.

However, if you update your struct to have publicly exported properties:

```go
type Person struct {
    Name string
    Age  string
}
```

The parser STILL won't know what to do with it, because the field names in your JSON are all lowercase! In this instance, it's the opposite problem - Go's happily serving up the fields it can support
but Fauna's all like, "none of those match pal".

The only time it works, is if BOTH data sets/types are capitalized.

```json
{
    "Name": "some name",
    "Age": 25
}
```

```go
type Person struct {
    Name string
    Age  string
}
```

At that point, both peculiarities are satisfied, and you can get the data you're looking for.

Granted, Fauna probably has some annotations you can append to the struct in order to avoid this issue, similar to how you'd annotate \`json:"value"\` for anything you're trying to json.Marshal into a particular format.
But I haven't found the documentation on that yet, and it's currently 2:33AM, so I'm not likely going to put that much more effort into it tonight.

Hope this helps some other poor soul though!