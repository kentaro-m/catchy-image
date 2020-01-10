const { createCanvas, registerFont, Image } = require('canvas')
const fs = require('fs').promises

const config = {
  image: {
    width: 1200,
    height: 630,
    backgroundColor: '#15202B',
    // backgroundImage: require.resolve('')
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
    title: 'ブランチ名をもとにIssueとPull Requestを自動で紐付けるGitHub Actionを作った',
    author: 'Kentaro Matsushita'
  },
  fontFile: './fonts/NotoSansCJKjp-Bold.ttf',
  iconFile: './images/avatar.jpeg',
}

registerFont(config.fontFile, { family: config.style.fontFamily, weight: config.style.fontWeight })

/**
 * @see https://github.com/shuhei/shuhei.github.com/blob/source/plugins/title-image.js 
 */
function calcurateTextPositionIntoRectangle({ ctx, text, style, rect }) {
  // Reduce font size until the title fits into the image.
  for (let fontSize = style.fontSize; fontSize > 0; fontSize -= 1) {
    ctx.font = getFontStyle({
      fontWeight: style.fontWeight,
      fontSize,
      fontFamily: style.fontFamily,
    })
    // Add support for surrogate-pair.
    let words = [...text]
    let { paddingLeft, paddingTop } = style
    const lines = []

    while (words.length > 0) {
      let i
      let slicedText
      let textSize

      // Remove words until the rest fit into the width.
      for (i = words.length; i >= 0; i -= 1) {
        slicedText = words.slice(0, i).join('')
        textSize = ctx.measureText(slicedText)

        if (textSize.width <= rect.width) {
          break
        }
      }

      if (i <= 0) {
        // A word doesn't fit into a line. Try a smaller font size.
        break;
      }

      lines.push({
        text: slicedText,
        x: paddingLeft,
        y: paddingTop + textSize.emHeightAscent
      });

      words = words.slice(i);
      paddingTop += textSize.emHeightAscent + textSize.emHeightDescent;
    }

    const space = style.paddingTop + rect.height - paddingTop;
    if (words.length === 0 && space >= 0) {
      // The title fits into the image with the font size.
      // Vertically centering the text in the given rectangle.
      const centeredLines = lines.map(line => {
        return {
          ...line,
          y: line.y + space / 2
        };
      });
      return {
        lines: centeredLines
      };
    }
  }
}

function getFontStyle(style) {
  return `${style.fontWeight} ${style.fontSize}px "${style.fontFamily}"`
}

async function getIconImage(fileData) {
  const image = new Image()
  image.src = fileData
  return image
}

async function createTwitterCards(options) {
  const canvas = createCanvas(options.image.width, options.image.height)
  const ctx = canvas.getContext('2d')

  // Draw a background
  ctx.fillStyle = options.image.backgroundColor
  ctx.fillRect(0, 0, options.image.width, options.image.height);

  const { lines } = calcurateTextPositionIntoRectangle({
    ctx,
    text: options.meta.title,
    style: {
      ...options.style.title,
      fontFamily: options.style.fontFamily,
    },
    rect: {
      width: options.image.width - options.style.title.paddingLeft - options.style.title.paddingRight,
      height:
        options.image.height - options.style.title.paddingTop - options.style.title.paddingBottom
    }
  })

  // Draw title texts
  lines.forEach(({ text, x, y }) => {
    ctx.fillStyle = options.style.title.fontColor
    ctx.fillText(text, x, y);
  });

  // Draw an author text
  ctx.font = getFontStyle({
    ...options.style.author,
    fontFamily: options.style.fontFamily,
  })
  ctx.fillStyle = options.style.author.fontColor
  ctx.fillText(options.meta.author, 260, options.image.height - 90);

  // Draw a icon
  const imageFile = await fs.readFile(require.resolve(config.iconFile));
  const image = await getIconImage(imageFile)
  ctx.drawImage(image, 150, options.image.height - 150, 80, 80)

  const buffer = canvas.toBuffer();
  await fs.writeFile("test.png", buffer);
}

createTwitterCards(config)
