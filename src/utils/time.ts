export function slugFromTime (time) {
  return `time-${time.slice(0, 5).replace(':', '-')}`
}
