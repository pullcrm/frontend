function durationFromTime ({ hours = 0, minutes = 0 }) {
  return ((hours * 60 * 60) + (minutes * 60)) * 1000
}

function slugFromTime (time) {
  return `time-${time.substr(0, 5).replace(':', '-')}`
}

function timeIndexOnTimeline ({ hours, time }) {
  return hours.findIndex(hour => hour === time)
}

function fromToTimelineLength ({ from, to, hours }) {
  const start = timeIndexOnTimeline({ hours, time: from })
  const end = timeIndexOnTimeline({ hours, time: to })

  return end - start
}

function getFromToList ({ from, to, hours }) {
  const startIndex = timeIndexOnTimeline({ hours, from })
  const endIndex = timeIndexOnTimeline({ hours, to })

  return hours.slice(startIndex, endIndex)
}

export {
  fromToTimelineLength,
  timeIndexOnTimeline,
  durationFromTime,
  getFromToList,
  slugFromTime
}
