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

Install a package using the npm CLI.

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

## :gear: Options

### Output
| name                    | required | description                                                 |
|-------------------------|----------|-------------------------------------------------------------|
| `directory`      | `true`     | directory path to output an image.                          |
| `fileName`       | `true`     | file name to output an image.                               |

### Image


| name                    | required | description                                                 |
|-------------------------|----------|-------------------------------------------------------------|
| `width`           | `true`     | width of a generated image.                                 |
| `height`          | `true`     | height of a generated image.                                |
| `backgroundColor` | `true`     | hex value for background color.                             |
| `backgroundImage` |          | image path using as the background (specify relative path). |

### Style

#### Title
| name          | required | description                                               |
|---------------|----------|-----------------------------------------------------------|
| `fontFamily`    | `true`     | font family for title text                                |
| `fontColor`     | `true`     | hex value for text color.                                 |
| `fontWeight`    | `true`     | font weight for title text.                               |
| `fontSize`      | `true`     | font size for title text.                                 |
| `paddingTop`    | `true`     | height of the padding area on the top of a title text.    |
| `paddingBottom` | `true`     | height of the padding area on the bottom of a title text. |
| `paddingLeft`   | `true`     | width of the padding area on the left of a title text.    |
| `paddingRight`  | `true`     | width of the padding area on the right of a title text.   |

#### Author
| name       | required | description                  |
|------------|----------|------------------------------|
| `fontFamily` | `true`     | font family for author text  |
| `fontColor`  | `true`     | hex value for text color.    |
| `fontWeight` | `true`     | font weight for author text. |
| `fontSize`   | `true`     | font size for author text.   |

### Meta
| name   | required | description                            |
|--------|----------|----------------------------------------|
| `title`  | `true`     | title text to be placed on the image.  |
| `author` | `true`     | author text to be placed on the image. |

### Font File
| name   | required | description                                              |
|--------|----------|----------------------------------------------------------|
| `path`   | `true`     | file path of font data (specify relative path).          |
| `family` | `true`     | font family name to register custom font to this module. |
| `weight` | `true`     | font weight to register custom font to this module.      |

### Icon File
| name     | required | description                                  |
|----------|----------|----------------------------------------------|
| `iconFile` | `true`     | file path of icon to be placed on the image. |

### Timeout
| name    | required | description                                                    |
|---------|----------|----------------------------------------------------------------|
| `timeout` | `true`     | the number of milliseconds to wait until complete the process. |

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