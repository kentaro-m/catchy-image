# catchy-image
![npm](https://img.shields.io/npm/v/catchy-image)
![node](https://img.shields.io/node/v/catchy-image)
![npm](https://img.shields.io/npm/dt/catchy-image)
[![GitHub license](https://img.shields.io/github/license/kentaro-m/catchy-image)](https://github.com/kentaro-m/catchy-image/blob/master/LICENSE)

A Node.js module for dynamically generating Open Graph images.

## :art: Example
It can create an image like this by using the module.

![An Open Graph image](https://raw.githubusercontent.com/kentaro-m/catchy-image/master/thumbnail.png)

## :arrow_forward: Usage
**Executing this module requires Node v12.**

Install a package using the npm CLI. I have not published this package on npm yet. You can install it from GitHub instead.

```bash
$ npm install --save catchy-image
```

Write codes for importing a module, setting up options for generating an image, and executing a module.

```js
const catchy = require('catchy-image')

async function run() {
    const options = {
      output: {
        directory: '',
        fileName: 'thumbnail.png',
      },
      image: {
        width: 1200,
        height: 630,
        backgroundColor: '#222639',
        // backgroundImage: require.resolve('./images/background.jpg'),
      },
      style: {
        title: {
          fontFamily: 'Noto Sans CJK JP',
          fontColor: '#bb99ff',
          fontWeight: 'bold',
          fontSize: 64,
          paddingTop: 100,
          paddingBottom: 200,
          paddingLeft: 150,
          paddingRight: 150,
        },
        author: {
          fontFamily: 'Noto Sans CJK JP',
          fontColor: '#f0f5fa',
          fontWeight: '400',
          fontSize: 42,
        },
      },
      meta: {
        title: 'How to dynamically create  an Open Graph image.',
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

    const output = await catchy.generate(options)
    console.log(`Successfully generated: ${output}`)
  } catch (error) {
    console.error(error)
  }
}

run()
```

## :construction_worker: Development
```bash
$ npm install
# Execute an example script (src/example.js)
$ npm run build && npm run dev
```

## :memo: Licence
MIT

## :heart: Acknowledgments
Inspired by [@shuhei](https://github.com/shuhei)'s article.

[Generating Twitter Card Images from Blog Post Titles - Shuhei Kagawa](https://shuheikagawa.com/blog/2019/10/13/generating-twitter-card-images/)