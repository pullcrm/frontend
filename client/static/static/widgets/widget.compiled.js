var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
/* Use `yarn build:widget` to transpile this file */
var _a, _b;
var UTM_PARAMS_COOKIE = 'pullcrm_widget_utm_params';
var UTM_PARAMS_COOKIE_MAX_AGE = 1 * 60 * 60 * 24;
window.pullcrm = (_a = window.pullcrm) !== null && _a !== void 0 ? _a : {};
window.pullcrm._host = (_b = window.pullcrm._host) !== null && _b !== void 0 ? _b : 'pullcrm.com';
window.pullcrm._stylesLoaded = false;
window.pullcrm._serializeQueryParams = function (params) {
    var query = [];
    var _loop_1 = function (key) {
        var value = params[key];
        if (Array.isArray(value)) {
            value.forEach(function (value) {
                query.push(key + "=" + value);
            });
        }
        if (typeof value === 'string') {
            query.push(key + "=" + value);
        }
    };
    for (var key in params) {
        _loop_1(key);
    }
    return query.join('&');
};
window.pullcrm._saveUTMParamsToCookie = function (params) {
    var key = UTM_PARAMS_COOKIE;
    var value = encodeURIComponent(JSON.stringify(params));
    var maxAge = UTM_PARAMS_COOKIE_MAX_AGE;
    document.cookie = key + "=" + value + "; max-age=" + maxAge;
};
window.pullcrm._getUTMParamsFromCookie = function () {
    var _a;
    var utmParams = (_a = document.cookie.match(new RegExp(UTM_PARAMS_COOKIE + "=([^;]+)"))) === null || _a === void 0 ? void 0 : _a[1];
    try {
        utmParams = JSON.parse(decodeURIComponent(utmParams !== null && utmParams !== void 0 ? utmParams : ''));
    }
    catch (_b) { }
    return utmParams;
};
window.pullcrm._getUTMParamsFromQuery = function () {
    var _a, _b, _c, _d, _e;
    var search = window.location.search;
    var utmTerm = (_a = search.match(/utm_term=([^&]+)/)) === null || _a === void 0 ? void 0 : _a[1];
    var utmMedium = (_b = search.match(/utm_medium=([^&]+)/)) === null || _b === void 0 ? void 0 : _b[1];
    var utmSource = (_c = search.match(/utm_source=([^&]+)/)) === null || _c === void 0 ? void 0 : _c[1];
    var utmContent = (_d = search.match(/utm_content=([^&]+)/)) === null || _d === void 0 ? void 0 : _d[1];
    var utmCampaign = (_e = search.match(/utm_campaign=([^&]+)/)) === null || _e === void 0 ? void 0 : _e[1];
    if (![utmTerm, utmMedium, utmSource, utmContent, utmCampaign].some(Boolean)) {
        return;
    }
    return {
        utmTerm: utmTerm,
        utmMedium: utmMedium,
        utmSource: utmSource,
        utmContent: utmContent,
        utmCampaign: utmCampaign
    };
};
window.pullcrm._validateLoadOptions = function (options) {
    var companyId = options.companyId;
    if (!companyId) {
        throw new TypeError('[Pullcrm] Для загрузки виджета необходимо передать параметр "companyId"');
    }
};
window.pullcrm._loadStyles = function () {
    if (window.pullcrm._stylesLoaded) {
        return;
    }
    var style = document.createElement('style');
    style.innerHTML = "\n    @keyframes ui-popup-backdrop {\n      from {\n        opacity: 0;\n      }\n\n      to {\n        opacity: 1;\n      }\n    }\n\n    .pullcrm-widget-full {\n      position: fixed;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      z-index: 100;\n      -webkit-animation: ui-popup-backdrop 0.2s both ease-out;\n      animation: ui-popup-backdrop 0.2s both ease-out;\n    }\n\n    .pullcrm-widget-full__backdrop {\n      position: absolute;\n      top: 0;\n      right: 0;\n      bottom: 0;\n      left: 0;\n      background-color: rgba(29, 29, 33, 0.75);\n    }\n\n    .pullcrm-widget-full__body {\n      display: inline-block;\n      width: 100%;\n      height: 100%;\n      overflow: auto;\n      white-space: nowrap;\n      text-align: center;\n      -webkit-overflow-scrolling: touch;\n    }\n\n    .pullcrm-widget-full__body::before {\n      display: inline-block;\n      height: 100%;\n      vertical-align: middle;\n      content: '';\n    }\n\n    .pullcrm-widget-full__container {\n      box-shadow: 0 8px 16px rgb(0 0 0 / 12%);\n      position: relative;\n      z-index: 101;\n      max-height: 700px;\n      height: calc(100% - 48px);\n      display: inline-block;\n      white-space: normal;\n      text-align: left;\n      vertical-align: middle;\n      background-color: #fff;\n      border-radius: 8px;\n      pointer-events: all;\n      margin: 24px 8px;\n      overflow: hidden;\n    }\n\n    .pullcrm-widget-full__container iframe {\n      width: 300px;\n      max-height: 100:;\n      border: none;\n    }\n\n    .pullcrm-widget-full__close {\n      position: absolute;\n      right: 16px;\n      top: 16px;\n      font-size: 24px;\n      width: 28px;\n      text-align: center;\n      height: 28px;\n      line-height: 1;\n      cursor: pointer;\n    }\n\n    @media (min-width: 360px) {\n      .pullcrm-widget-full__container iframe {\n        width: 340px;\n      }\n    }\n\n    @media (min-width: 410px) {\n      .pullcrm-widget-full__container iframe {\n        width: 360px;\n      }\n    }\n\n    @media (min-width: 480px) {\n      .pullcrm-widget-full__container iframe {\n        width: 420px;\n      }\n    }\n\n    @media (min-width: 600px) {\n      .pullcrm-widget-full__container iframe {\n        width: 460px;\n      }\n    }\n\n    @media (min-width: 800px) {\n      .pullcrm-widget-full__container iframe {\n        width: 620px;\n      }\n    }\n  ";
    document.head.appendChild(style);
    window.pullcrm._stylesLoaded = true;
};
window.pullcrm._createWidget = function (url) {
    var widget = document.createElement('div');
    widget.className = 'pullcrm-widget-full';
    var backdrop = document.createElement('div');
    backdrop.className = 'pullcrm-widget-full__backdrop';
    var body = document.createElement('div');
    body.className = 'pullcrm-widget-full__body';
    var container = document.createElement('div');
    container.className = 'pullcrm-widget-full__container';
    var close = document.createElement('div');
    close.className = 'pullcrm-widget-full__close';
    close.innerHTML = '&times;';
    var iframe = document.createElement('iframe');
    iframe.src = url;
    container.appendChild(close);
    container.appendChild(iframe);
    body.appendChild(container);
    widget.appendChild(backdrop);
    widget.appendChild(body);
    close.addEventListener('click', window.pullcrm._close, { passive: true });
    backdrop.addEventListener('click', window.pullcrm._close, { passive: true });
    document.body.appendChild(widget);
};
window.pullcrm._close = function () {
    var widget = document.querySelector('.pullcrm-widget-full');
    var close = document.querySelector('.pullcrm-widget-full__close');
    var backdrop = document.querySelector('.pullcrm-widget-full__backdrop');
    if (!widget) {
        return;
    }
    widget.remove();
    close.removeEventListener('click', window.pullcrm._close);
    backdrop.removeEventListener('click', window.pullcrm._close);
};
window.pullcrm.loadWidget = function () {
    var _a;
    window.pullcrm._validateLoadOptions(window.pullcrm);
    var utmParams = ((_a = window.pullcrm._getUTMParamsFromQuery()) !== null && _a !== void 0 ? _a : window.pullcrm._getUTMParamsFromCookie());
    if (utmParams) {
        window.pullcrm._saveUTMParamsToCookie(utmParams);
    }
    var _b = window.pullcrm, _host = _b._host, companyId = _b.companyId;
    var query = window.pullcrm._serializeQueryParams({
        companyId: companyId,
        utm_term: utmParams === null || utmParams === void 0 ? void 0 : utmParams.utmTerm,
        utm_source: utmParams === null || utmParams === void 0 ? void 0 : utmParams.utmSource,
        utm_medium: utmParams === null || utmParams === void 0 ? void 0 : utmParams.utmMedium,
        utm_content: utmParams === null || utmParams === void 0 ? void 0 : utmParams.utmContent,
        utm_campaign: utmParams === null || utmParams === void 0 ? void 0 : utmParams.utmCampaign
    });
    window.pullcrm._loadStyles();
    window.pullcrm._createWidget("https://" + _host + "/widgets/full/?" + query);
};
(function () {
    var buttons = document.querySelectorAll("a[href=\"https://" + window.pullcrm._host + "\"]");
    __spreadArray([], buttons).forEach(function (button) {
        button.addEventListener('click', function (event) {
            event.stopPropagation();
            event.preventDefault();
            window.pullcrm.loadWidget();
        });
    });
})();
window.addEventListener('message', function (ev) {
    var matches = String(ev.data).match(/^pullcrm:(w+)|(.+)$/i);
    if (!matches)
        return;
    var event = matches[1];
    // const payload = JSON.parse(matches[2])
    var onOrderCreated = window.pullcrm.onOrderCreated;
    if (event === 'orderCreated' && typeof onOrderCreated === 'function') {
        onOrderCreated();
    }
});
