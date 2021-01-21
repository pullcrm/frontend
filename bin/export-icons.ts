const fs = require('fs')
const path = require('path')

function replaceIcon (filePath) {
  const icon = fs.readFileSync(filePath, 'utf8')

  const newIcon = icon
    .replace(new RegExp('width="24" height="24"', 'g'), '')
    .replace(new RegExp('fill="white"/>', 'g'), 'fill="white" style="fill: var(--ui-icon-secondary-color);"/>')
    .replace(new RegExp('fill="#1D1F21"/>', 'g'), 'fill="#1D1F21" style="fill: var(--ui-icon-primary-color);"/>')
    .replace(new RegExp('xmlns="http://www.w3.org/2000/svg">', 'g'), 'xmlns="http://www.w3.org/2000/svg" id="__THIS_ID_NEEDS_FOR_UI_ICON_COMPONENT__">')

  fs.writeFileSync(filePath, newIcon, 'utf8')
}

function walkIcons (dir) {
  const files = fs.readdirSync(dir)

  files
    .filter((file) => {
      const filePath = path.join(dir, file)
      const stat = fs.statSync(filePath)

      return stat.isFile()
    })
    .forEach((file) => {
      const filePath = path.join(dir, file)

      replaceIcon(filePath)
    })
}

walkIcons('./src/assets/ui-icons/solid')
walkIcons('./src/assets/ui-icons/outlined')
