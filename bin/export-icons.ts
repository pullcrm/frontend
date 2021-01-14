const fs = require('fs')

const path = require('path')

const fse = require('fs-extra')

function replaceIcon (filePath) {
  const icon = fs.readFileSync(filePath, 'utf8')
  const newFilePath = filePath.replace(/\s/g, '-').toLowerCase().replace('icons-figma', 'icons')

  const newIcon = icon
    .replace(new RegExp('width="24" height="24"', 'g'), '')
    .replace(new RegExp('fill="white"/>', 'g'), 'fill="white" style="fill: var(--ui-icon-secondary-color);"/>')
    .replace(new RegExp('fill="black"/>', 'g'), 'fill="#202020" style="fill: var(--ui-icon-primary-color);"/>')
    .replace(new RegExp('xmlns="http://www.w3.org/2000/svg">', 'g'), 'xmlns="http://www.w3.org/2000/svg" id="__THIS_ID_NEEDS_FOR_UI_ICON_COMPONENT__">')

  fse.outputFileSync(newFilePath, newIcon, 'utf8')
}

function walkIcons (dir) {
  const files = fs.readdirSync(dir)

  files
    .forEach((file) => {
      const filePath = path.join(dir, file)

      const stat = fs.statSync(filePath)

      if (stat.isFile()) {
        replaceIcon(filePath)
      } else {
        walkIcons(filePath)
      }
    })
}

walkIcons('./src/assets/icons-figma')
