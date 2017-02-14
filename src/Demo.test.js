import React from 'react'
import ReactDOM from 'react-dom'
import Demo from './Demo'

describe('documentation demo', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Demo />, div)
  })
})
