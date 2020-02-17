const { toMatchImageSnapshot } = require('jest-image-snapshot')
const catchy = require('../src')
const fs = require('fs').promises

expect.extend({ toMatchImageSnapshot })

describe('.generate()', () => {
  it('generates an image if specifies a custom background image.', async () => {
    const options = {
      output: {
        directory: 'test',
        fileName: '1.png',
      },
      image: {
        width: 1200,
        height: 630,
        backgroundColor: '#222639',
        backgroundImage: require.resolve('../src/images/background.jpg'),
      },
      style: {
        title: {
          fontFamily: 'Noto Sans CJK JP',
          fontColor: '#f0f5fa',
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
          path: require.resolve('../src/fonts/NotoSansCJKjp-Bold.otf'),
          family: 'Noto Sans CJK JP',
          weight: 'bold',
        },
        {
          path: require.resolve('../src/fonts/NotoSansCJKjp-Regular.otf'),
          family: 'Noto Sans CJK JP',
          weight: '400',
        },
      ],
      iconFile: require.resolve('../src/images/avatar.jpeg'),
      timeout: 10000,
    }

    const imagePath = await catchy.generate(options)
    const imageData = await fs.readFile(imagePath)

    expect(imageData).toMatchImageSnapshot()
  })

  it('generates an image if specifies a custom background color.', async () => {
    const options = {
      output: {
        directory: 'test',
        fileName: '2.png',
      },
      image: {
        width: 1200,
        height: 630,
        backgroundColor: '#222639',
      },
      style: {
        title: {
          fontFamily: 'Noto Sans CJK JP',
          fontColor: '#f0f5fa',
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
          path: require.resolve('../src/fonts/NotoSansCJKjp-Bold.otf'),
          family: 'Noto Sans CJK JP',
          weight: 'bold',
        },
        {
          path: require.resolve('../src/fonts/NotoSansCJKjp-Regular.otf'),
          family: 'Noto Sans CJK JP',
          weight: '400',
        },
      ],
      iconFile: require.resolve('../src/images/avatar.jpeg'),
      timeout: 10000,
    }

    const imagePath = await catchy.generate(options)
    const imageData = await fs.readFile(imagePath)

    expect(imageData).toMatchImageSnapshot()
  })
})
