import React from 'react'
import ReactDOM from 'react-dom'
import ParallaxCard from './ParallaxCard.js'
import TestRenderer from 'react-test-renderer'

describe('ParallaxCard', () => {
  const props = {
    className: 'TEST_CLASSNAME',
    style: { testStyleAttr: 'TEST_STYLE_VALUE' },
  }

  test('renders without requiring any props', () => {
    const div = document.createElement('div')
    ReactDOM.render(
      <ParallaxCard>
        <p>hello</p>
      </ParallaxCard>,
      div
    )
  })

  test('accepts className and style props', () => {
    const rendered = TestRenderer.create(
      <ParallaxCard {...props}>
        <p>hello</p>
      </ParallaxCard>
    )
    const renderedProps = rendered.toJSON().props
    expect(renderedProps.className).toContain(props.className)
    expect(renderedProps.style).toMatchObject(props.style)
  })
})
