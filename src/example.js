const catchy = require('.')

async function run() {
  try {
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
    console.log(`INFO - Successfully generated: ${output}`)
  } catch (error) {
    console.error(`ERROR - ${error.message}`)
  }
}

run()
