---
title: "A Simple CSV Writer in Go"
author: "Shiplet"
date: "2020-11-13"
---

Hey future-Shiplet, this is the pattern you usually follow. I gotchu.

\- past-Shiplet


```go
package main

import (
	"encoding/csv"
	"fmt"
	"io"
	"log"
	"os"
)

type CustomCSVWriter struct {
	Writer  *csv.Writer
	Records [][]string
}

type CustomCSVRecord struct {
	ColumnA string
	ColumnB string
	ColumnC string
}

func (c *CustomCSVRecord) ToString() []string {
	return []string{
		c.ColumnA, c.ColumnB, c.ColumnC,
	}
}

var HeaderRow = [][]string {
	{"ColumnA", "ColumnB", "ColumnC"},
}

func initCSV(writer io.Writer) *CustomCSVWriter {
	return &CustomCSVWriter{
		Writer: csv.NewWriter(writer),
		Records: HeaderRow,
	}
}

func buildCSV(inMemCSV *CustomCSVWriter) {
	for i := 0; i < 25; i++ {
		record := CustomCSVRecord{
			ColumnA: "test",
			ColumnB: "test2",
			ColumnC: "test3",
		}
		inMemCSV.Records = append(inMemCSV.Records, record.ToString())
	}
}

func main() {
	title := "CSV_TITLE.csv"
	file, err := os.Create(title)
	if err != nil {
		log.Fatalln("failed to create csv: ", err)
	}

	inMemCSV := initCSV(file)
	buildCSV(inMemCSV)
	inMemCSV.Writer.WriteAll(inMemCSV.Records)
	fmt.Printf("wrote %d records to %s", len(inMemCSV.Records), title)
}
```