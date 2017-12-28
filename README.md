[![npm package](https://img.shields.io/npm/v/@toba/test.svg)](https://www.npmjs.org/package/@toba/test)
![Code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)
[![Dependencies](https://img.shields.io/david/toba/test.svg)](https://david-dm.org/toba/test)
[![DevDependencies](https://img.shields.io/david/dev/toba/test.svg)](https://david-dm.org/toba/test#info=devDependencies&view=list)

# Usage

```
import "mocha";
import { render, tag } from "@toba/test";
import Button from "./button";

describe("Button Component", () => {
   it("renders button tag", () => {
      render(Button, { title: "Test Button" }).expect({
         tagName: tag.button,
         innerHTML: "Test Button"
      });
   });
});
```
