---
title: "If you load and explore data in Python, try this in R"
date: 2026-05-13
category: both
description: "Loading, exploring and manipulating data with Pandas and dplyr — the same dataset, two languages."
---

If you've used Pandas before, you know that DataFrames are the heart of data analysis in Python. What you might not know is that Pandas was actually **inspired by R** — so learning both side by side makes a lot of sense.

In this post we'll use a real bioscience dataset and perform the same operations in both languages. No competition, just comparison. 🔬

---

## The dataset

We'll use `msleep` — a classic bioscience dataset with sleep patterns and body weight data for 83 mammal species. It comes built into R's `ggplot2` package, and there's a public CSV version available online.

---

## Loading data

The first step in any analysis: getting data in.

```python
# Python
import pandas as pd

url = "https://raw.githubusercontent.com/selva86/datasets/master/msleep_ggplot2.csv"
df = pd.read_csv(url)
```

```r
# R
library(tidyverse)

url <- "https://raw.githubusercontent.com/selva86/datasets/master/msleep_ggplot2.csv"
df <- read_csv(url)
```

Both load data into a tabular structure — a **DataFrame** in Python, a **tibble** in R. Same concept, different names.

Pandas can also read Excel files and HTML tables directly:

```python
# Python — reading Excel
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# Python — reading an HTML table from a webpage
tables = pd.read_html('https://example.com/table')
df = tables[0]  # returns a list, grab the first table
```

```r
# R — reading Excel
library(readxl)
df <- read_excel('data.xlsx', sheet = 'Sheet1')

# R — reading HTML tables
library(rvest)
tables <- read_html('https://example.com/table') |> html_table()
df <- tables[[1]]
```

And saving data back out:

```python
# Python
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', sheet_name='Sheet1')
```

```r
# R
write_csv(df, 'output.csv')
writexl::write_xlsx(df, 'output.xlsx')
```

One thing to note: `index=False` in Pandas is important — without it, Python adds a row number column to your CSV that you probably don't want.

---

## Exploring the dataset

First thing I do with any new dataset: understand what's in it.

```python
# Python
df.shape        # rows and columns
df.info()       # data types and null counts
df.describe()   # descriptive statistics
df.head()       # first 5 rows
```

```r
# R
dim(df)         # rows and columns
glimpse(df)     # data types and sample values
summary(df)     # descriptive statistics
head(df)        # first 6 rows
```

`df.info()` and `glimpse()` are the closest equivalents — both show column names, types, and a sample of values. I find `glimpse()` slightly more readable, but that's personal preference.

---

## Selecting columns

```python
# Python — single column
df['name']

# Python — multiple columns
df[['name', 'sleep_total', 'bodywt']]
```

```r
# R — single column
df$name

# R — multiple columns
df |> select(name, sleep_total, bodywt)
```

The big difference: Python uses bracket notation `[]`, R uses `select()` from dplyr. R's approach is cleaner when selecting many columns — no quotes needed around column names.

---

## Filtering rows

```python
# Python — mammals that sleep more than 12 hours
df[df['sleep_total'] > 12]

# Python — two conditions
df[(df['sleep_total'] > 12) & (df['vore'] == 'herbi')]
```

```r
# R — mammals that sleep more than 12 hours
df |> filter(sleep_total > 12)

# R — two conditions
df |> filter(sleep_total > 12, vore == "herbi")
```

R wins on readability here. `filter()` accepts multiple conditions separated by commas — in Python you need parentheses and an explicit `&`.

---

## Creating new columns

```python
# Python — brain weight in grams (was in kg)
df['brainwt_g'] = df['brainwt'] * 1000
```

```r
# R
df <- df |> mutate(brainwt_g = brainwt * 1000)
```

Python is a direct assignment. R uses `mutate()` — the name makes sense, you're literally mutating the dataframe.

---

## Dropping columns

```python
# Python
df.drop('brainwt_g', axis=1, inplace=True)
```

```r
# R
df <- df |> select(-brainwt_g)
```

The `-` in front of the column name in R is one of my favourite dplyr things — intuitive and clean.

---

## Handling missing values

Real biological data has missing values — `msleep` is no exception.

```python
# Python — drop rows where sleep_rem is missing
df.dropna(subset=['sleep_rem'])

# Python — keep only rows where sleep_rem has a value
df[df['sleep_rem'].notna()]
```

```r
# R
df |> filter(!is.na(sleep_rem))
```

`!is.na()` in R is the equivalent of `.notna()` — the `!` is the negation operator, so it literally reads "not is NA".

---

## Quick reference

| Operation | Python (Pandas) | R (dplyr) |
|---|---|---|
| Read CSV | `pd.read_csv('file.csv')` | `read_csv('file.csv')` |
| Read Excel | `pd.read_excel('file.xlsx')` | `read_excel('file.xlsx')` |
| Save CSV | `df.to_csv('file.csv', index=False)` | `write_csv(df, 'file.csv')` |
| Check structure | `df.info()` | `glimpse(df)` |
| Descriptive stats | `df.describe()` | `summary(df)` |
| Select columns | `df[['col1', 'col2']]` | `select(col1, col2)` |
| Filter rows | `df[df['col'] > x]` | `filter(col > x)` |
| Create column | `df['new'] = ...` | `mutate(new = ...)` |
| Drop column | `df.drop('col', axis=1)` | `select(-col)` |
| Remove NAs | `df.dropna()` | `filter(!is.na(col))` |

---

## What I took from this

Pandas and dplyr solve the same problems — the difference is philosophical. Pandas feels closer to traditional programming: you operate directly on the object. dplyr uses the pipe (`|>`) to chain operations, making code read more like a sentence.

Neither is better. But if you're coming from Python and learning R, `dplyr` will feel strange for a couple of days — then it becomes second nature.

Next up: **visualisation**. The same chart made in Seaborn and ggplot2. 📊
