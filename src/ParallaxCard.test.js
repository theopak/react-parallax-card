import React from 'react'
import ReactDOM from 'react-dom'
import ParallaxCard from './ParallaxCard.js'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ParallaxCard>hello</ParallaxCard>, div)
})
