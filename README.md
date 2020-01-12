# Generate Open Graph Image
A npm package for generating Open Graph images like Twitter Cards.

**This package is under development.**

## :art: Example
An image generated from this package.

![An Open Graph image](./og-image.png)

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
    outputFileName: 'og-image.png',
  },
  style: {
    title: {
      fontFamily: 'Noto Sans CJK JP',
      fontColor: '#1DA1F2',
      fontWeight: 'bold',
      fontSize: 64,
      paddingTop: 100,
      paddingBottom: 200,
      paddingLeft: 150,
      paddingRight: 150,
    },
    author: {
      fontFamily: 'Noto Sans CJK JP',
      fontColor: '#DDDDDD',
      fontWeight: '400',
      fontSize: 42,
    },
  },
  meta: {
    title: '怠惰なエンジニアのためのポートフォリオサイト構築術',
    author: 'Kentaro Matsushita',
  },
  fontFile: [
    {
      path: require.resolve('./fonts/NotoSansCJKjp-Bold.otf'),
      family: 'Noto Sans CJK JP',
      weight: 'bold',
    },
    {
      path: require.resolve('./fonts/NotoSansCJKjp-Regular.otf'),
      family: 'Noto Sans CJK JP',
      weight: '400',
    },
  ],
  iconFile: require.resolve('./images/avatar.jpeg'),
  timeout: 10000,
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

## :heart: Acknowledgments
Inspired by [@shuhei](https://github.com/shuhei)'s article.

[Generating Twitter Card Images from Blog Post Titles - Shuhei Kagawa](https://shuheikagawa.com/blog/2019/10/13/generating-twitter-card-images/)