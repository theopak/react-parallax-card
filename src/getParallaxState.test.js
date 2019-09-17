import {
  default as makeGetParallaxState,
  getParallaxState,
} from './getParallaxState'

describe('getParallaxState', () => {
  const prevState = {
    height: 90,
    width: 91,
    left: 93,
    top: 92,
  }
  const props = {
    tiltMidpoint: 0.52,
    tiltX: 0.1,
    tiltY: 0.07,
  }

  const mockBody = {
    scrollLeft: 11,
    scrollTop: 12,
  }
  const mockEvent = {
    touches: [{ pageX: 21, pageY: 22 }],
  }

  test('default export is a factory', () => {
    expect(typeof makeGetParallaxState).toEqual('function')
  })

  describe('functionality', () => {
    const testCases = [
      [
        { scrollLeft: 0, scrollTop: 0 },
        { pageX: 21, pageY: 22 },
        { width: 100, height: 100, left: 0, top: 0 },
        { tiltMidpoint: 0.5, tiltX: 0.1, tiltY: 0.1 },
      ],
      [
        { scrollLeft: 0, scrollTop: 0 },
        { touches: [{ pageX: 21, pageY: 22 }] },
        { width: 100, height: 100, left: 0, top: 0 },
        { tiltMidpoint: 0.5, tiltX: 0.1, tiltY: 0.1 },
      ],
      [
        { scrollLeft: 0, scrollTop: 0 },
        { pageX: 8, pageY: 9, touches: [{ pageX: 1, pageY: 2 }] },
        { width: 100, height: 100, left: 0, top: 0 },
        { tiltMidpoint: 0.5, tiltX: 0.1, tiltY: 0.1 },
      ],
      [
        { scrollLeft: 10, scrollTop: 20 },
        { pageX: 21, pageY: 22 },
        { width: 100, height: 100, left: 0, top: 0 },
        { tiltMidpoint: 0.5, tiltX: 0.1, tiltY: 0.1 },
      ],
      [
        { scrollLeft: 10, scrollTop: 20 },
        { pageX: 30, pageY: 40 },
        { width: 250, height: 250, left: 18, top: 19 },
        { tiltMidpoint: 0.45, tiltX: 0.101, tiltY: 0.202 },
      ],
    ]

    test.each(testCases)(
      'getParallaxState(%p, %p, %p, %p)',
      (body, event, prevState, props) => {
        const result = getParallaxState(body, event, prevState, props)
        expect(result).toMatchSnapshot()
      }
    )
  })
})
