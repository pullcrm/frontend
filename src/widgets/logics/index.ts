export function sendIframeMessage(event: any, payload = {}) {
  parent.postMessage(`pullcrm:${event}|${JSON.stringify(payload)}`, '*')
}
