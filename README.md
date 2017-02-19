![preview.gif](preview.gif)

# [react-parallax-card](https://theopak.github.io/react-parallax-card)

[![Build Status](https://img.shields.io/travis/theopak/react-parallax-card.svg?style=flat-square)](https://travis-ci.org/theopak/react-parallax-card)
[![codecov](https://img.shields.io/codecov/c/github/theopak/react-parallax-card.svg?style=flat-square)](https://codecov.io/gh/theopak/react-parallax-card)
[![NPM version](https://img.shields.io/npm/v/react-parallax-card.svg?style=flat-square)](http://badge.fury.io/js/react-parallax-card)

React component for a card with 3D effects similar to Apple TV app icons. Work in progress. Heavily inspired by https://github.com/drewwilson/atvImg

### Demo

https://theopak.github.io/react-parallax-card


### Usage

```bash
# Install from npm
npm install react-parallax-card --save
```

```js
import ParallaxCard from 'react-parallax-card'

<ParallaxCard
  label='Label (optional)'
  enableRotate
  style={{ margin: '0 auto', width: 240, height: 240 }}>
  <img src='https://s3-us-west-1.amazonaws.com/tachyonsio/img/Blonde-Frank_Ocean.jpeg' width='240' role='presentation' />
</ParallaxCard>
```


### Alternative: Usage from cdn

Instead of installing from npm, you can use the standalone build (UMD module) by adding the script tag to your HTML. But if you do, you'll also need to include the dependencies separately.

```html
<!-- NOTE: react must be included first -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/react/15.1.0/react-dom.min.js"></script>

<!-- Include react-parallax-card as 'window.ReactParallaxCard' -->
<script src="https://unpkg.com/react-parallax-card/dist/umd/react-parallax-card.js"></script>
```


### License

Copyright 2017 Theodore X. Pak

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
