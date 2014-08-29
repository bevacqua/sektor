# sektor

> A slim alternative to jQuery's [Sizzle][1]

Sektor has a smaller footprint than that of [Sizzle][1].

# Install

```shell
npm install sektor --save
```

```shell
bower install sektor --save
```

# Usage

The public API exposed by `sektor` mirrors the API in [Sizzle][1]. This means `sektor` is a drop-in replacement for [Sizzle][1].

# Drawbacks

Sektor has a few drawbacks when compared against [Sizzle][1].

* Attribute not equal selector
* Positional selectors (:first; :eq(n); :odd; etc.)
* Type selectors (:input; :checkbox; :button; etc.)
* State-based selectors (:animated; :visible; :hidden; etc.)
* :has(selector)
* :not(complex selector)
* custom selectors via Sizzle extensions
* Leading combinators (e.g., $collection.find("> *"))
* Reliable functionality on XML fragments
* Requiring all parts of a selector to match elements under context

  >  (e.g., $div.find("div > *") now matches children of $div)

* Matching against non-elements
* Reliable sorting of disconnected nodes
* querySelectorAll bug fixes (e.g., unreliable :focus on WebKit)

# License

MIT

[1]: https://github.com/jquery/sizzle
