const generateOpenGraphImage = require('.')

const config = {
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
    title: '怠惰なエンジニアのためのポートフォリオサイト構築術',
    author: 'Kentaro Matsushita'
  },
  fontFile: require.resolve('./fonts/NotoSansCJKjp-Bold.otf'),
  iconFile: require.resolve('./images/avatar.jpeg'),
}

generateOpenGraphImage(config)