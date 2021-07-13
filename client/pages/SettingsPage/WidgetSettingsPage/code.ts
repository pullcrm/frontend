/* eslint-disable no-useless-escape */
export const code = `
<script>
  window.pullcrm = {}
  window.pullcrm._host = 'pullcrm.com'

  window.pullcrm.companyId = '{ companyId }'

  window.pullcrm.onOrderCreated = function () {
    // Событие успешно созданой записи
  }

  var script = document.createElement('script')
  script.src = 'https://' + window.pullcrm._host + '/static/widgets/widget.compiled.js?l=' + Date.now()
  script.async = true

  document.head.appendChild(script)
</script>
`
