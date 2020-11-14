---
title: "How to Serve Golang Netlify Functions Locally"
author: "Shiplet"
date: "2020-11-13"
---

I've been writing a lot of Netlify (AWS Lambda) functions lately, and I got tired of having to create an
entirely separate control flow in order to test my logic. I wanted to be able to run these functions locally
just like the JavaScript peeps.

So I created this little localServer package! It's not published in git anywhere yet, so I'll update this if/when that happens. But, the 
gist of what's going on is: I made a stdlib golang http server that captures incoming http events, mocks them to the
`events.APIGatewayProxyRequest` and `events.APIGatewayProxyResponse` objects that the `github.com/aws/aws-lambda-go/events` 
looks for, and which then passes those objects along to the main AWS handler.

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

func LocalServer(proxyHandler func(event *events.APIGatewayProxyRequest)(*events.APIGatewayProxyResponse, error)) {
	http.HandleFunc("/.netlify/functions/get-submission-data", handleLocal(proxyHandler))
	http.ListenAndServe(":3000", nil)
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

And then to use it in your Netlify function's main.go, add it to a sibling directory called `localServer`, and invoke it
like so:

```go
package main

import "main/localServer"

func main() {
	//lambda.Start(HandleEvent)
	localServer.LocalServer(HandleEvent)
}
```

The final file-tree should look like:

```plaintext
functionRoot
└── main.go
      localServer
      └──  localServer.go
```
