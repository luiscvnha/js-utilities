# JS Utilities

JavaScript/TypeScript utilities written in TypeScript.

## Install
```
npm i @luiscvnha/js-utilities
```

## Import

### Node.js
```js
const { List /*, ...*/ } = require("@luiscvnha/js-utilities");

const l = new List();
// ...
```

### Node.js with `"type": "module"`
```js
import utilities from '@luiscvnha/js-utilities';
const { List /*, ...*/ } = utilities;

const l = new List();
// ...
```

### Node.js with TypeScript
```ts
import { List /*, ...*/ } from "@luiscvnha/js-utilities";

const l = new List<string>();
// ...
```

### HTML
```html
<script src="node_modules/@luiscvnha/js-utilities/dist/index.js"></script>
<script>
  const l = new utilities.List();
  // ...
</script>
```

## [Docs](https://github.com/luiscvnha/js-utilities/wiki)
