import React, { Component, PropTypes } from 'react'
import classNames from 'classnames'
import './ParallaxCard.css'

class ParallaxCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: -1,
      height: -1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      angle: 135,
      shineMidpointAlpha: 0
    }
    this._element = undefined // ref
  }

  componentDidMount () {
    // TODO: update these on resize
    const width = this._element.clientWidth || this._element.offsetWidth || this._element.scrollWidth
    const height = this._element.clientHeight || this._element.offsetHeight || this._element.scrollHeight
    this.setState({ width, height })

    // Rotate the card when the cursor interacts with it
    // TODO: mobile
    // TODO: debounce event handler
    this._element.addEventListener('mousemove', (e) => {
      e.preventDefault()
      // algo shoutout https://github.com/drewwilson/atvImg/blob/master/atvImg.js
      const { width, height } = this.state
      const { scrollTop, scrollLeft } = document.body
      const { top, left } = this._element.getBoundingClientRect()
      const { pageX, pageY } = e
      const offsetX = 0.52 - (pageX - left - scrollTop) / width
      const offsetY = 0.52 - (pageY - top - scrollLeft) / height
      const comX = (pageX - left - scrollLeft) - width / 2
      const comY = (pageY - top - scrollTop) - height / 2
      const rotateX = (comY - offsetY) * (0.10 * (320 / width))
      const rotateY = (offsetX - comX) * (0.07 * (320 / width))
      const scale = 1.07
      const angle = Math.atan2(comY, comX) * (180 / Math.PI) - 90
      const shineMidpointAlpha = (pageY - top - scrollTop) / height * 0.4
      this.setState({ rotateX, rotateY, scale, angle, shineMidpointAlpha })
      // console.log(angle)
    })

    // Reset the card when the cursor leaves
    this._element.addEventListener('mouseleave', (e) => this.setState({ rotateX: 0, rotateY: 0, scale: 1, angle: 135, shineMidpointAlpha: 0 }))
  }

  render() {
    const { style, className, children, enableRotate = true, label, hideLabel, ...rest } = this.props

    const containerStyle = {
      transform: `rotateX(${enableRotate && this.state.rotateX}deg)
                  rotateY(${enableRotate && this.state.rotateY}deg)
                  scale3d(${this.state.scale}, ${this.state.scale}, ${this.state.scale})`
    }
    const shineStyle = {
      backgroundImage: enableRotate
        ? `linear-gradient(${this.state.angle}deg,
                           rgba(255, 255, 255, ${this.state.shineMidpointAlpha}) 0%,
                           rgba(255,255,255,0) 80%)`
        : ''
    }

    return (
      <div
        style={style}
        ref={(ref) => this._element = ref}
        className={classNames('ParallaxCard', className)}
        {...rest}>
        <div className='ParallaxCard-container' style={containerStyle}>
          <div className='ParallaxCard-shadow' />
          <div className='ParallaxCard-layers'>
            {children}
          </div>
          {enableRotate && <div className='ParallaxCard-shine' style={shineStyle} />}
        </div>
        {label && !hideLabel && <div className='ParallaxCard-label'>{label}</div>}
      </div>
    )
  }
}

ParallaxCard.propTypes = {
  style: PropTypes.object,
  label: PropTypes.string.isRequired,
  hideLabel: PropTypes.bool,
  enableRotate: PropTypes.bool,
  children: PropTypes.node.isRequired
}

ParallaxCard.defaultProps = {
  hideLabel: false,
  children: {},
  enableRotate: true
}

export default ParallaxCard
