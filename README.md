# Wonderlog - simple and customizable browser console styling

## Highlights

- easy to use, intuitive ui
- fully customizable
- usefull predefined styles included
- typescript support

## Installation

```console
npm install wonderlog-console
```

## Usage

Basic usage:

```js
import { wonder } from "wonderlog-console";

// 👇 Support for all the basic console logging functions
wonder.log("Normal log");
wonder.warn("Warning");
wonder.error("Error");
// + group, groupCollapsed, groupEnd, debug
```

Using styles:

```js
// ✨ Apply styles using the predefined properties
wonder.log("Normal text", wonder.purple("Purple text"));
wonder.log(wonder.bold("Bold text"), wonder.italic("Italic text"));
wonder.log(wonder.tag("Text in a tag"), wonder.dangerTag("Text in a red tag"));

// ...or use custom values!
wonder.log(wonder.color("#FF00FF")("Magenta text"));
wonder.log(wonder.bg("black").white("White text on a black background"));
```

Nesting styles:

```js
// Styles can be nested and chained intuitively 🎒
wonder.log(wonder.red("Red text", wonder.bold("Bold red text", wonder.blue("Bold blue text")))));

// If styles set the same property, only the last style is used
wonder.log(wonder.red.green.blue("Blue text"));
```

## Readme WIP

<!-- ## Formatting data

By default, wonder passes data to the console regardless of it's type:

```js
wonder.log(["this", "array", "has", 5, "elements"]);
// ➡ console.log(["this", "array", "has", 5, "elements"])
wonder.log({ exampleProperty: "example property value" });
// ➡ console.log({ exampleProperty: "example property value" })
```

However, if you apply any styles to the data, it will have to be converted into strings so that it can be styled in the console. By default wonder uses `toString()` to get the displayed value, but you can override this behaviour using formatters:

```js
// Default behaviour:
wonder.log(wonder.red({ exampleProperty: "example property value" }));

//

``` -->
