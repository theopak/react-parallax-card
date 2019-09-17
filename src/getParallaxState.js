/*
 * algo shoutout https://github.com/drewwilson/atvImg/blob/master/atvImg.js
 */
export const getParallaxState = (body, event, prevState, props) => {
  const { scrollLeft, scrollTop } = body
  const isTouches = Boolean(
    event.touches && Array.isArray(event.touches) && event.touches[0]
  )
  const pageX = isTouches ? event.touches[0].pageX : event.pageX
  const pageY = isTouches ? event.touches[0].pageY : event.pageY

  const { height, left, top, width } = prevState
  const { tiltMidpoint = 0.52, tiltX = 0.1, tiltY = 0.07 } = props

  const comX = pageX - left - scrollLeft - width / 2.0
  const comY = pageY - top - scrollTop - height / 2.0
  const offsetX = tiltMidpoint - (pageX - left - scrollLeft) / width
  const offsetY = tiltMidpoint - (pageY - top - scrollTop) / height

  return {
    angle: Math.atan2(comY, comX) * 180 / Math.PI - 90,
    offsetX,
    offsetY,
    rotateX: (comY - offsetY) * tiltX * 320 / width,
    rotateY: (offsetX - comX) * tiltY * 320 / width,
    scale: 1.07,
    shineMidpointAlpha: (pageY - top - scrollTop) / height * 0.4,
  }
}

const makeGetParallaxState = (body, event) => (prevState, props) =>
  getParallaxState(body, event, prevState, props)

export default makeGetParallaxState
