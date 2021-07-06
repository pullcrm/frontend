/* Use `yarn build:widget` to transpile this file */

const UTM_PARAMS_COOKIE = 'pullcrm_widget_utm_params'
const UTM_PARAMS_COOKIE_MAX_AGE = 1 * 60 * 60 * 24

window.pullcrm = window.pullcrm ?? {}

window.pullcrm._host = window.pullcrm._host ?? 'pullcrm.com'
window.pullcrm._stylesLoaded = false

window.pullcrm._serializeQueryParams = (params) => {
  const query = []

  for (const key in params) {
    const value = params[key]

    if (Array.isArray(value)) {
      value.forEach((value) => {
        query.push(`${key}=${value}`)
      })
    }

    if (typeof value === 'string') {
      query.push(`${key}=${value}`)
    }
  }

  return query.join('&')
}

window.pullcrm._saveUTMParamsToCookie = (params) => {
  const key = UTM_PARAMS_COOKIE
  const value = encodeURIComponent(JSON.stringify(params))
  const maxAge = UTM_PARAMS_COOKIE_MAX_AGE

  document.cookie = `${key}=${value}; max-age=${maxAge}`
}

window.pullcrm._getUTMParamsFromCookie = () => {
  let utmParams = document.cookie.match(new RegExp(`${UTM_PARAMS_COOKIE}=([^;]+)`))?.[1]

  try {
    utmParams = JSON.parse(decodeURIComponent(utmParams ?? ''))
  } catch {}

  return utmParams
}

window.pullcrm._getUTMParamsFromQuery = () => {
  const { search } = window.location

  const utmTerm = search.match(/utm_term=([^&]+)/)?.[1]
  const utmMedium = search.match(/utm_medium=([^&]+)/)?.[1]
  const utmSource = search.match(/utm_source=([^&]+)/)?.[1]
  const utmContent = search.match(/utm_content=([^&]+)/)?.[1]
  const utmCampaign = search.match(/utm_campaign=([^&]+)/)?.[1]

  if (![utmTerm, utmMedium, utmSource, utmContent, utmCampaign].some(Boolean)) {
    return
  }

  return {
    utmTerm,
    utmMedium,
    utmSource,
    utmContent,
    utmCampaign
  }
}

window.pullcrm._validateLoadOptions = (options) => {
  const { companyId } = options

  if (!companyId) {
    throw new TypeError('[Pullcrm] Для загрузки виджета необходимо передать параметр "companyId"')
  }
}

window.pullcrm._loadStyles = () => {
  if (window.pullcrm._stylesLoaded) {
    return
  }

  const style = document.createElement('style')

  style.innerHTML = `
    @keyframes ui-popup-backdrop {
      from {
        opacity: 0;
      }

      to {
        opacity: 1;
      }
    }

    .pullcrm-widget-full {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 100;
      -webkit-animation: ui-popup-backdrop 0.2s both ease-out;
      animation: ui-popup-backdrop 0.2s both ease-out;
    }

    .pullcrm-widget-full__backdrop {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(29, 29, 33, 0.75);
    }

    .pullcrm-widget-full__body {
      display: inline-block;
      width: 100%;
      height: 100%;
      overflow: auto;
      white-space: nowrap;
      text-align: center;
      -webkit-overflow-scrolling: touch;
    }

    .pullcrm-widget-full__body::before {
      display: inline-block;
      height: 100%;
      vertical-align: middle;
      content: '';
    }

    .pullcrm-widget-full__container {
      box-shadow: 0 8px 16px rgb(0 0 0 / 12%);
      position: relative;
      z-index: 101;
      display: inline-block;
      white-space: normal;
      text-align: left;
      vertical-align: middle;
      background-color: #fff;
      border-radius: 8px;
      pointer-events: all;
      margin: 24px 8px;
      overflow: hidden;
    }

    .pullcrm-widget-full__container iframe {
      width: 300px;
      max-height: 700px;
      height: calc(100% - 48px);
      border: none;
    }

    .pullcrm-widget-full__close {
      position: absolute;
      right: 16px;
      top: 16px;
      font-size: 24px;
      width: 28px;
      text-align: center;
      height: 28px;
      line-height: 1;
      cursor: pointer;
    }

    @media (min-width: 360px) {
      .pullcrm-widget-full__container iframe {
        width: 340px;
      }
    }

    @media (min-width: 410px) {
      .pullcrm-widget-full__container iframe {
        width: 360px;
      }
    }

    @media (min-width: 480px) {
      .pullcrm-widget-full__container iframe {
        width: 420px;
      }
    }

    @media (min-width: 600px) {
      .pullcrm-widget-full__container iframe {
        width: 460px;
      }
    }

    @media (min-width: 800px) {
      .pullcrm-widget-full__container iframe {
        width: 620px;
      }
    }
  `

  document.head.appendChild(style)

  window.pullcrm._stylesLoaded = true
}

window.pullcrm._createWidget = (url) => {
  const widget = document.createElement('div')
  widget.className = 'pullcrm-widget-full'

  const backdrop = document.createElement('div')
  backdrop.className = 'pullcrm-widget-full__backdrop'

  const body = document.createElement('div')
  body.className = 'pullcrm-widget-full__body'

  const container = document.createElement('div')
  container.className = 'pullcrm-widget-full__container'

  const close = document.createElement('div')
  close.className = 'pullcrm-widget-full__close'
  close.innerHTML = '&times;'

  const iframe = document.createElement('iframe')
  iframe.src = url

  container.appendChild(close)
  container.appendChild(iframe)
  body.appendChild(container)
  widget.appendChild(backdrop)
  widget.appendChild(body)

  close.addEventListener('click', window.pullcrm._close, { passive: true })
  backdrop.addEventListener('click', window.pullcrm._close, { passive: true })

  document.body.appendChild(widget)
}

window.pullcrm._close = () => {
  const widget = document.querySelector('.pullcrm-widget-full')

  const close = document.querySelector('.pullcrm-widget-full__close')
  const backdrop = document.querySelector('.pullcrm-widget-full__backdrop')

  if (!widget) {
    return
  }

  widget.remove()
  close.removeEventListener('click', window.pullcrm._close)
  backdrop.removeEventListener('click', window.pullcrm._close)
}

window.pullcrm.loadWidget = () => {
  window.pullcrm._validateLoadOptions(window.pullcrm)

  const utmParams = (
    window.pullcrm._getUTMParamsFromQuery() ??
    window.pullcrm._getUTMParamsFromCookie()
  )

  if (utmParams) {
    window.pullcrm._saveUTMParamsToCookie(utmParams)
  }

  const { _host, companyId } = window.pullcrm

  const query = window.pullcrm._serializeQueryParams({
    companyId,
    utm_term: utmParams?.utmTerm,
    utm_source: utmParams?.utmSource,
    utm_medium: utmParams?.utmMedium,
    utm_content: utmParams?.utmContent,
    utm_campaign: utmParams?.utmCampaign
  })

  window.pullcrm._loadStyles()

  window.pullcrm._createWidget(`https://${_host}/widgets/full/?${query}`)
}

(function () {
  const buttons = document.querySelectorAll(`a[href="https://${window.pullcrm._host}"]`)

  ;[...buttons].forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault()

      window.pullcrm.loadWidget()
    })
  })
})()

window.addEventListener('message', (ev) => {
  const matches = String(ev.data).match(/^pullcrm:(w+)|(.+)$/i)

  if (!matches) return

  const event = matches[1]
  // const payload = JSON.parse(matches[2])

  const { onOrderCreated } = window.pullcrm

  if (event === 'orderCreated' && typeof onOrderCreated === 'function') {
    onOrderCreated()
  }
})
