# Generate Open Graph Image
A npm package for generating Open Graph images like Twitter Cards.

**This package is under development.**

## :art: Example
An image generated from this package.

![An image for Twitter Cards](./twitter-cards.png)

## :arrow_forward: Usage
**Execute this package requires Node v12.**

Install a package using the npm CLI. I have not published this package on npm yet. You can install it from GitHub instead.

```bash
$ npm install --save kentaro-m/generate-og-image
```

Write codes for importing a module, setting up options for generating an image, and executing a module.

```js
const generateOpenGraphImage = require('generate-og-image')

const options = {
  image: {
    width: 1200,
    height: 630,
    backgroundColor: '#15202B',
    backgroundImage: require.resolve('./images/background.jpg'),
    outputFileName: 'twitter-cards.png'
  },
  style: {
    fontFamily: 'Noto Sans CJK JP',
    title: {
      fontColor: '#1DA1F2',
      fontWeight: 'bold',
      fontSize: 64,
      paddingTop: 100,
      paddingBottom: 200,
      paddingLeft: 150,
      paddingRight: 150,
    },
    author: {
      fontColor: '#DDDDDD',
      fontWeight: 'bold',
      fontSize: 42,
    }
  },
  meta: {
    title: 'Things I have learned in leading the team',
    author: 'Kentaro Matsushita'
  },
  fontFile: require.resolve('./fonts/NotoSansCJKjp-Bold.otf'),
  iconFile: require.resolve('./images/avatar.jpeg'),
}

generateOpenGraphImage(options)
```

## :construction_worker: Development
```bash
$ npm install
# Execute an example script (src/example.js)
$ npm run dev
```

## :memo: Licence
MIT