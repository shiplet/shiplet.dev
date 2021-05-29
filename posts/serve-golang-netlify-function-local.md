---
title: "How to Serve Golang Netlify Functions Locally"
author: "Shiplet"
date: "2020-11-13"
categorySlug: "serverless-in-go"
categoryTitle: "Serverless in Go"
host: "https://shiplet.dev"
description: "A quick & dirty local server for Netlify functions written in golang"
imgUrl: "https://shiplet.dev/static/triangle.png"
fbUrl: "https://shiplet.dev/post/serve-golang-netlify-function-local"
twDomain: "shiplet.dev"
---

I've been writing a lot of Netlify (AWS Lambda) functions lately, and I got tired of having to create an
entirely separate control flow in order to test my logic. I wanted to be able to run these functions locally
just like the JavaScript peeps.

So I created this little localServer package! It's not published in git anywhere yet, so I'll update this if/when that happens. But, the 
gist of what's going on is: I made a stdlib golang http server that captures incoming http events, mocks them to the
`events.APIGatewayProxyRequest` and `events.APIGatewayProxyResponse` objects which the `aws-lambda-go/events` package 
looks for, and then passes those objects to the main AWS Lambda handler.

So far it only supports GET, POST, and OPTIONS requests (it throws `Access-Control-Allow-Origin: *` on everything), and it 
only mocks the proxy items that I'm actually using, like `Method`, `QueryStringParameters`, `Body`,
and so forth. But it's working for me so far, and that's as good a place to start as any.

I'm sure the function signatures could stand some cleaning-up, but I'll get there when I get there.

Here's the code for it:

```go
package localServer

import (
	"fmt"
	"github.com/aws/aws-lambda-go/events"
	"io/ioutil"
	"net/http"
)

func LocalServer(endpointMock string, port int, proxyHandler func(event *events.APIGatewayProxyRequest)(*events.APIGatewayProxyResponse, error)) {
	http.HandleFunc(endpointMock, handleLocal(proxyHandler))
	log.Printf("listening on port %d", port)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", port), nil))
}

func handleLocal(proxyHandler func(event *events.APIGatewayProxyRequest)(*events.APIGatewayProxyResponse, error)) func(w http.ResponseWriter, r *http.Request) {
	return func(w http.ResponseWriter, r *http.Request) {
		var body []byte
		keys := make(map[string]string)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		w.Header().Set("Content-Type", "text/html; charset=utf-8")

		if r.Method == http.MethodOptions {
			return
		}

		if r.Method == http.MethodPost {
			parsed, err := ioutil.ReadAll(r.Body)
			body = parsed
			if err != nil {
				http.Error(w, "failed to read body", http.StatusInternalServerError)
				return
			}
		}

		if r.Method == http.MethodGet {
			queryKeys := r.URL.Query()
			for k, v := range queryKeys {
				keys[k] = v[0]
			}
		}

		request := &events.APIGatewayProxyRequest{
			HTTPMethod:            r.Method,
			RequestContext:        events.APIGatewayProxyRequestContext{},
			Body:                  string(body),
		}

		if len(keys) > 0 {
			request.QueryStringParameters = keys
		}

		res, err := proxyHandler(request)
		if err != nil {
			http.Error(w, fmt.Sprintf("failed to convert request to lambda event: %s", err), res.StatusCode)
			return
		}

		w.WriteHeader(res.StatusCode)
		fmt.Fprintf(w, res.Body)
	}
}
```

And then to use it in your Netlify function's `main.go`, add it to a sibling directory called `localServer`, and invoke it
like so:

```go
package main

import "main/localServer"

func main() {
	//lambda.Start(HandleEvent)
	localServer.LocalServer("/YOUR_ENDPOINT", 3000, HandleEvent)
}
```

The final file-tree should look like:

```plaintext
functionRoot
└── main.go
      localServer
      └──  localServer.go
```

And voila! You've got a local server you can test & debug against. Just make sure to move everything back over to the
`lambda.Start()` once you're finished. Also, it's not COMPLETELY like the JavaScript package, because you'll have to run
this on a function-by-function basis (just make sure you update your port), rather than at the top of your functions directory, 
or even better, the project root.

Future work!

