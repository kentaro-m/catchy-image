const { createCanvas, registerFont, Image } = require('canvas')
const fs = require('fs').promises
const path = require('path')

/**
 * Calcurate text positions to draw texts into rectangle
 *
 * @param {Object} options options to draw texts
 *
 * Referred to codes in the below repository (shuhei/shuhei.github.com).
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
        break
      }

      lines.push({
        text: slicedText,
        x: paddingLeft,
        y: paddingTop + textSize.emHeightAscent,
      })

      words = words.slice(i)
      paddingTop += textSize.emHeightAscent + textSize.emHeightDescent
    }

    const space = style.paddingTop + rect.height - paddingTop
    if (words.length === 0 && space >= 0) {
      // The title fits into the image with the font size.
      // Vertically centering the text in the given rectangle.
      const centeredLines = lines.map(line => {
        return {
          ...line,
          y: line.y + space / 2,
        }
      })
      return {
        lines: centeredLines,
      }
    }

    throw new Error(
      'Failed a process to calculate text positions to draw texts into a rectangle. Change a smaller font size or shorten texts in the options and retry.'
    )
  }
}

/**
 * Crete font style property from a font style object.
 *
 * @param {Object} style font styles
 */
function getFontStyle(style) {
  return `${style.fontWeight} ${style.fontSize}px "${style.fontFamily}"`
}

/**
 * Create Image object from image file.
 *
 * @param {Buffer} fileData image data from local file system
 */
function getImage(fileData) {
  const image = new Image()
  image.src = fileData
  return image
}

/**
 * Generate Open Graph images.
 *
 * @param {Object} options options to generate an image
 */
async function generateOpenGraphImage(options) {
  if ('fontFile' in options && options.fontFile.length > 0) {
    options.fontFile.forEach(({ path, family, weight }) => {
      registerFont(path, {
        family,
        weight,
      })
    })
  }

  const canvas = createCanvas(options.image.width, options.image.height)
  const ctx = canvas.getContext('2d')

  // Draw a background
  ctx.fillStyle = options.image.backgroundColor
  ctx.fillRect(0, 0, options.image.width, options.image.height)

  if ('backgroundImage' in options.image && options.image.backgroundImage) {
    const imageFile = await fs.readFile(options.image.backgroundImage)
    const image = getImage(imageFile)
    ctx.drawImage(image, 0, 0, options.image.width, options.image.height)
  }

  const { lines } = calcurateTextPositionIntoRectangle({
    ctx,
    text: options.meta.title,
    style: {
      ...options.style.title,
    },
    rect: {
      width:
        options.image.width -
        options.style.title.paddingLeft -
        options.style.title.paddingRight,
      height:
        options.image.height -
        options.style.title.paddingTop -
        options.style.title.paddingBottom,
    },
  })

  // Draw title texts
  lines.forEach(({ text, x, y }) => {
    ctx.fillStyle = options.style.title.fontColor
    ctx.fillText(text, x, y)
  })

  // Draw an author text
  ctx.font = getFontStyle({
    ...options.style.author,
    fontFamily: options.style.author.fontFamily,
  })
  ctx.fillStyle = options.style.author.fontColor
  ctx.fillText(options.meta.author, 260, options.image.height - 90)

  // Draw a icon
  const imageFile = await fs.readFile(require.resolve(options.iconFile))
  const image = getImage(imageFile)
  ctx.drawImage(image, 150, options.image.height - 150, 80, 80)

  const buffer = canvas.toBuffer()

  try {
    if (options.output.directory) {
      await fs.mkdir(options.output.directory, { recursive: true })
    }
    await fs.writeFile(
      path.join(options.output.directory, options.output.fileName),
      buffer
    )
  } catch (error) {
    if (error.code !== 'EEXIST') {
      throw error
    }
  }

  return path.join(options.output.directory, options.output.fileName)
}

/**
 * Fail a process if it cannot be completed within a timeout specified.
 */
function timeout() {
  let timeoutId = null

  /**
   * Fail a process if it cannot be completed within a timeout specified.
   * @param {number} timeoutMs a millisecond to occur timeout error
   */
  const handle = async (timeoutMs = 10000) =>
    new Promise((_, reject) => {
      timeoutId = setTimeout(() => {
        reject(
          new Error(
            'Occurred timeout error in the process to generate an image. Change a smaller font size or shorten texts in the options and retry.'
          )
        )
      }, timeoutMs)
    })

  /**
   * Cancel timeout.
   */
  const cancel = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
  }

  return {
    handle,
    cancel,
  }
}

module.exports = async options => {
  const t = timeout()

  return Promise.race([
    generateOpenGraphImage(options),
    t.handle(options.timeout),
  ])
    .then(output => {
      t.cancel()
      return output
    })
    .catch(error => {
      t.cancel()
      throw error
    })
}
