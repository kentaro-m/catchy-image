const { createCanvas, registerFont, loadImage } = require('canvas')
const fs = require('fs')

registerFont('./fonts/NotoSansCJKjp-Bold.ttf', { family: 'Noto Sans CJK JP', weight: 'bold' })

/**
 * @see https://github.com/shuhei/shuhei.github.com/blob/source/plugins/title-image.js 
 */
function calcurateTextIntoRectangle({ ctx, text, style, rect }) {
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

async function createTwitterCards(options) {
  const canvas = createCanvas(options.image.width, options.image.height)
  const ctx = canvas.getContext('2d')

  ctx.fillStyle = options.image.backgroundColor
  ctx.fillRect(0, 0, options.image.width, options.image.height);

  ctx.fillStyle = options.style.title.fontColor

  const { lines } = calcurateTextIntoRectangle({
    ctx,
    text: options.meta.title,
    style: {
      fontSize: options.style.title.fontSize,
      fontFamily: options.style.fontFamily,
      fontWeight: options.style.title.fontWeight,
      paddingTop: options.style.title.paddingTop,
      paddingBottom: options.style.title.paddingBottom,
      paddingLeft: options.style.title.paddingLeft,
      paddingRight: options.style.title.paddingRight,
    },
    rect: {
      width: options.image.width - options.style.title.paddingLeft - options.style.title.paddingRight,
      height:
        options.image.height - options.style.title.paddingTop - options.style.title.paddingBottom
    }
  })

  lines.forEach(({ text, x, y }) => {
    ctx.fillStyle = options.style.title.fontColor
    ctx.fillText(text, x, y);
  });

  ctx.font = getFontStyle({
    fontWeight: options.style.author.fontWeight,
    fontSize: options.style.author.fontSize,
    fontFamily: options.style.fontFamily,
  })
  ctx.fillStyle = options.style.author.fontColor
  ctx.fillText(options.meta.author, 260, options.image.height - 90);

  const profileImage = await loadImage('https://blog.kentarom.com/static/4db386e4c1729715cf6a03185d4fc448/c42a3/avatar.jpg')
  ctx.drawImage(profileImage, 150, options.image.height - 150, 80, 80)

  const buffer = canvas.toBuffer();
  fs.writeFileSync("test.png", buffer);
}

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
      fontSize: 72,
      paddingTop: 0,
      paddingBottom: 175,
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
    title: 'ブランチ名をもとにIssueとPull Requestを自動で紐付けるGitHub Actionを作ったあああああああああああああああああああああああああああああああああああああブランチ名',
    author: 'Kentaro Matsushita'
  }
}

createTwitterCards(config)
