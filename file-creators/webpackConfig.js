const fs = require('fs-extra')
const path = require('path')

function webpackConfig({title, description}) {
  const aliasPlaceholder = '__PLACEHOLDER_WEBPACK_ALIAS__'
  const titlePlaceholder = '__PLACEHOLDER_TITLE__'
  const descriptionPlaceholder = '__PLACEHOLDER_DESCRIPTION__'
  const filePath = path.resolve(__dirname, '../files/webpack.config.js')
  const config = fs.readFileSync(filePath, 'utf8')
  const lines = config.split('\n')

  // Which line #'s' has the placeholders.
  const aliasLineNum = lines.findIndex(line => line.includes(aliasPlaceholder))

  // The line contents.
  const aliasLine = lines[aliasLineNum]

  /*
    http://bit.ly/2XpC63A
    Figure out how many empty spaces there are for the indentation.
    Our object properties should be indented 2 more than that.
  */
  const indent = ' '.repeat(aliasLine.search(/\S/) + 2)

  // Construct the final alias object.
  const aliasObject = [
    '{',
    `${indent}components: path.resolve(__dirname, 'src/components'),`,
    `${indent}assets: path.resolve(__dirname, 'src/assets'),`,
    `${indent}hooks: path.resolve(__dirname, 'src/hooks'),`,
    `${indent}helpers: path.resolve(__dirname, 'src/helpers')`,
    `${indent.slice(2)}}`, // Closing bracket indented 2 spaces closer.
  ]
    .filter(Boolean)
    .join('\n')

  return config
    .replace(aliasPlaceholder, aliasObject)
    .replace(titlePlaceholder, `'${title}'`)
    .replace(descriptionPlaceholder, `'${description}'`)
}

module.exports = webpackConfig
