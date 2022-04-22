/* eslint-disable no-useless-escape */
export const code = `
<script>
  window.pullcrm = {}
  window.pullcrm._host = 'pullcrm.com'

  window.pullcrm.companyId = '{ companyId }'

  window.pullcrm.onOrderCreated = function () {
    // Подія успішно створеного запису
  }

  var script = document.createElement('script')
  script.src = 'https://' + window.pullcrm._host + '/app/static/widgets/widget.compiled.js?l=' + Date.now()
  script.async = true

  document.head.appendChild(script)
</script>
`

export const codeButton = '<a href="https://pullcrm.com"> Записатся онлайн </a>'
