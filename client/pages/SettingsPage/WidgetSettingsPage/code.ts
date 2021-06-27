/* eslint-disable no-useless-escape */
export const code = `
<style>
  .pullcrm-pro-widget-iframe iframe {
    width: 100%;
    height: 0;
    margin: 0;
    padding: 0;
    border: none;
  }
</style>

<div class="pullcrm-pro-widget-iframe">
  <iframe src="https://pullcrm.com/widgets/base/{ companyId }/"></iframe>
</div>

<script>
  window.addEventListener('message', (ev) => {
    var matches = String(ev.data).match(/^pullcrm:(\w+)\|(.+)$/i)

    if (!matches) return

    var event = matches[1]
    var payload = JSON.parse(matches[2])

    if (event === 'updateHeight') {
      document.querySelector('.pullcrm-pro-widget-iframe iframe').style.height = payload.height + 'px'
    }

    if (event === 'createOrder') {
      // Order created
    }
  })
</script>
`
