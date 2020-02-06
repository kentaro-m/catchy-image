require('colors')
const generateOpenGraphImage = require('.')

const config = {
  output: {
    directory: '',
    fileName: 'thumbnail.png',
  },
  image: {
    width: 1200,
    height: 630,
    backgroundColor: '#15202B',
    backgroundImage: require.resolve('./images/background.jpg'),
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

/**
 * Add an exclamation mark to avoid formatting codes of an immediately invoked function expression (IIFE).
 */
!(async () => {
  try {
    const output = await generateOpenGraphImage(config)
    console.log('INFO'.brightBlue + ' - ' + `Generated an image: ${output}`)
  } catch (error) {
    console.error('ERROR'.brightRed + ' - ' + error.message)
  }
})()
