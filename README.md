# react-native-absolute-imports

[![Version](https://img.shields.io/npm/v/react-native-absolute-imports)](https://www.npmjs.com/package/react-native-absolute-imports)
[![NPM](https://img.shields.io/npm/dm/react-native-absolute-imports)](https://www.npmjs.com/package/react-native-absolute-imports)

`react-native-absolute-imports` configures your react-native project to support absolute imports like in web react project

## ✅ Use import like this

   ```bash
   import store from 'store'
   import moduleAStore from 'modules/moduleA/store'
   import ComponentA from 'modules/moduleA/ComponentA'
   import Avatar from 'components/ui/Avatar'
   ````
## ❌ Not this

   ```bash
   import store from '../store'
   import moduleAStore from '../../../modules/moduleA/store'
   import ComponentA from '../../../modules/moduleA/ComponentA'
   import Avatar from '../../../../../../components/ui/Avatar'
   ````



## Installation

   from npm

   ```bash
   npm install --save-dev react-native-absolute-imports
   ```

   from yarn

   ```bash
   yarn add -D react-native-absolute-imports
   ```

## Configuring

### You need also install babel-plugin-module-resolver

from npm

   ```bash
   npm install --save-dev babel-plugin-module-resolver
   ```

from yarn

   ```bash
   yarn add --dev babel-plugin-module-resolver
   ```

### Change your babel.config.js file

```bash
const setupAbsoluteImports = require('react-native-absolute-imports');

const alias = setupAbsoluteImports({tsEnabled: true, srcDirName: 'src'});

module.exports = {
  plugins: [
    [
      'module-resolver',
      {
        alias,
      },
    ],
  ],
};
```

### Run metro with cache clearing

#### ❗Run metro with cache clearing always when you change (renaming,removing, adding) top level directories in your source directory
 ```bash
   yarn start --reset-cache
   ```

### ✅ All done

## Properties

| Prop  | Default |        Type        | Description                                        |
| :------------ |:-------:|:------------------:|:---------------------------------------------------|
| srcDirName |    -    | `string`(required) | Specify your source directiory                     |
| tsEnabled |  false  |       `bool`       | Specify if your project configured with typescript |
