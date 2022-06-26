export function copyText(text) {
  const textarea = document.createElement('textarea')
  textarea.value = text
  textarea.style.position = 'absolute'
  textarea.style.left = '-99999px'

  document.body.appendChild(textarea)

  textarea.select()

  document.execCommand('copy')

  document.body.removeChild(textarea)
}
