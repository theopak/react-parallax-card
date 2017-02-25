import React, { Component, PropTypes } from 'react'

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

  render () {
    const { style, className, children, enableRotate = true, label, hideLabel, ...rest } = this.props

    const containerStyle = {
      willChange: 'transform',
      transform: `rotateX(${enableRotate && this.state.rotateX}deg)
                  rotateY(${enableRotate && this.state.rotateY}deg)
                  scale3d(${this.state.scale}, ${this.state.scale}, ${this.state.scale})`
    }
    const shineStyle = {
      willChange: 'background',
      backgroundImage: enableRotate
        ? `linear-gradient(${this.state.angle}deg,
                           rgba(255, 255, 255, ${this.state.shineMidpointAlpha}) 0%,
                           rgba(255,255,255,0) 80%)`
        : ''
    }

    return (
      <div
        style={style}
        ref={(ref) => { this._element = ref }}
        className={`ParallaxCard ${className}`}
        {...rest}>
        <style jsx>{`
          .ParallaxCard {
            box-sizing: border-box;
            margin: 0 0 2rem;
            padding: 0;
            border: none;
            border-radius: 0.3125rem;
            color: white;
            font-size: 1rem;
            line-height: 1rem;
            cursor: pointer;
            transform-style: preserve-3d;
            will-change: transform;
          }

          .ParallaxCard-container {
            position: relative;
            transform: rotate(0) scale3d(1, 1, 1);
            transition: transform 500ms ease-out;
          }

          .ParallaxCard:hover .ParallaxCard-container {
            transform: scale3d(1.07, 1.07, 1.07);
            transition: transform 200ms ease-out;
          }

          .ParallaxCard-shadow {
            position: absolute;
            top: 5%;
            left: 5%;
            width: 90%;
            height: 90%;
            border-radius: 0.3125rem;
            box-shadow: 0 0.5rem 2rem rgba(14, 21, 47, 0.6);
            transition: box-shadow 200ms ease-out;
          }

          .ParallaxCard:hover .ParallaxCard-shadow {
            box-shadow: 0 2.8125rem 6.25rem rgba(14, 21, 47, 0.4), 0 16px 40px rgba(14, 21, 47, 0.4);
          }

          .ParallaxCard-layers {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 0.3125rem;
            overflow: hidden;
            transform-style: preserve-3d;
          }

          .ParallaxCard-layers:before,
          .ParallaxCard-layers:after   { content: " "; display: table; }
          .ParallaxCard-layers:after   { clear: both; }
          .ParallaxCard-layers         { *zoom: 1; }

          .ParallaxCard-label {
            position: absolute;
            top: 100%;
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            font-size: 1rem;
            color: #bfbfbf;
            transition-delay: 0ms;
          }

          .ParallaxCard:hover .ParallaxCard-label {
            font-weight: bold;
            transform: translateY(10%);
            transition-delay: 25ms;
          }

          .ParallaxCard-shine {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 0.3125rem;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%,rgba(255, 255, 255, 0) 60%);
            will-change: background;
            pointer-events: none;
          }
       `}</style>

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
  className: PropTypes.string,
  label: PropTypes.string,
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
