import React, { Component, PropTypes } from 'react'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'

class ParallaxCard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      width: 0,
      height: 0,
      boundingClientRect: { top: 0, left: 0 },
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      offsetX: 0,
      offsetY: 0,
      angle: 135,
      shineMidpointAlpha: 0
    }
    this._element = undefined // ref
  }

  componentDidMount () {
    // Helpers
    const init = () => {
      const width = this._element.clientWidth || this._element.offsetWidth || this._element.scrollWidth
      const height = this._element.clientHeight || this._element.offsetHeight || this._element.scrollHeight
      const boundingClientRect = this._element.getBoundingClientRect()
      this.setState({ width, height, boundingClientRect })
      console.log('resize handled')
    }
    const handleReset = () => {
      this.setState({
        rotateX: 0,
        rotateY: 0,
        offsetX: 0,
        offsetY: 0,
        scale: 1,
        angle: 135,
        shineMidpointAlpha: 0
      })
      console.log('reset handled')
    }
    const handleMovement = (e) => parallaxSetter({
      e: {
        pageX: (e.touches && Array.isArray(e.touches) && e.touches[0] && e.touches[0].pageX) || e.pageX,
        pageY: (e.touches && Array.isArray(e.touches) && e.touches[0] && e.touches[0].pageY) || e.pageY
      },
      state: this.state,
      setState: (nextState) => this.setState(nextState),
      tiltMidpoint,
      tiltX,
      tiltY
    })

    // Set things and update on resize
    init()
    window.addEventListener('resize', debounce(init, 150, { leading: false }), { passive: true })
    window.addEventListener('resize', debounce(handleReset, 150, { leading: false }), { passive: true })

    // Rotate the card when a pointer interacts with it
    // TODO: mobile
    // TODO: evaluate raf performance
    const { parallaxSetter = defaultParallaxSetter, tiltMidpoint, tiltX, tiltY } = this.props
    this._element.addEventListener('touchstart', throttle(handleMovement, 16))
    this._element.addEventListener('mousemove', throttle(handleMovement, 16))

    // Reset the card when a pointer leaves
    this._element.addEventListener('touchend', debounce(handleReset, 16, { leading: false }, { passive: true }))
    this._element.addEventListener('mouseleave', debounce(handleReset, 16, { leading: false }, { passive: true }))
  }

  render () {
    const {
      className = '',
      layerContainerClassName = '',
      children,
      layers,
      enableRotate = true,
      enableTranslate = true,
      distance,
      parallaxFactor,
      parallaxSetter,
      tiltMidpoint,
      tiltX,
      tiltY,
      label,
      hideLabel,
      ...rest
    } = this.props
    const childCount = children && (Object.keys(children) || []).length

    const containerStyle = {
      transform: `rotateX(${enableRotate && this.state.rotateX}deg)
                  rotateY(${enableRotate && this.state.rotateY}deg)
                  scale3d(${this.state.scale}, ${this.state.scale}, ${this.state.scale})`
    }
    const shineStyle = {
      backgroundImage: enableRotate
        ? `linear-gradient(${this.state.angle}deg,
                           rgba(255, 255, 255, ${this.state.shineMidpointAlpha}) 0%,
                           rgba(255, 255, 255, 0) 80%)`
        : ''
    }

    // Important to the parallax effect
    const translateXBasis = parallaxFactor * this.state.offsetX * this.state.width / 320
    const translateYBasis = parallaxFactor * this.state.offsetY  * this.state.height / 320

    return (
      <div
        ref={(ref) => { this._element = ref }}
        className={`ParallaxCard ${className}`}
        style={{ ...this.props.style, transform: `perspective(${distance})` }}
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
          <div className={`ParallaxCard-layers ${layerContainerClassName}`}>
            {childCount > 0 && Object.keys(children).map((key, i) => {
              const style = {
                position: i === 0 ? 'inherit' : 'absolute',
                top: 0,
                borderRadius: i === 0 ? 5 : 'inherit',
                ...children[key].props.style,
                willChange: 'transform',
                transition: 'transform 100ms ease-out',
                transform: `translateX(${enableTranslate && translateXBasis * (childCount - i)}px)
                            translateY(${enableTranslate && translateYBasis * (childCount)}px)
                            ${enableTranslate && i === 0 && 'scale(1.1)'}`
              }

              return React.cloneElement(children[key], { key: i, style })
            })}
          </div>
          {enableRotate && <div className='ParallaxCard-shine' style={shineStyle} />}
        </div>
        {label && !hideLabel && <div
          className='ParallaxCard-label'
          style={{ transform: `perspective(${distance})` }}>
          {label}
        </div>}
      </div>
    )
  }
}

ParallaxCard.propTypes = {
  className: PropTypes.string,
  layerContainerClassName: PropTypes.string,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  enableRotate: PropTypes.bool,
  enableTranslate: PropTypes.bool,
  distance: PropTypes.string,
  tiltMidpoint: PropTypes.number,
  tiltX: PropTypes.number,
  tiltY: PropTypes.number,
  parallaxSetter: PropTypes.func,
  parallaxFactor: PropTypes.number,
  children: PropTypes.node
}

ParallaxCard.defaultProps = {
  hideLabel: false,
  children: {},
  enableRotate: true,
  enableTranslate: true,
  distance: '60rem',
  tiltMidpoint: 0.52,
  tiltX: 0.1,
  tiltY: 0.07,
  parallaxFactor: 2.5
}

export default ParallaxCard

export const defaultParallaxSetter = (props) => {
  const {
    e: { preventDefault, stopPropagation, pageX, pageY },
    state: { width, height, boundingClientRect: { top, left } },
    tiltMidpoint = 0.52,
    tiltX = 0.1,
    tiltY = 0.07,
    setState
  } = props || {}
  const { scrollTop, scrollLeft } = document.body

  // Other interactions
  // preventDefault()
  // stopPropagation()

  // algo shoutout https://github.com/drewwilson/atvImg/blob/master/atvImg.js
  const offsetX = tiltMidpoint - (pageX - left - scrollLeft) / width
  const offsetY = tiltMidpoint - (pageY - top - scrollTop) / height
  const comX = (pageX - left - scrollLeft) - width / 2.0
  const comY = (pageY - top - scrollTop) - height / 2.0
  const rotateX = (comY - offsetY) * tiltX * 320 / width
  const rotateY = (offsetX - comX) * tiltY * 320 / width
  const scale = 1.07
  const angle = (Math.atan2(comY, comX) * 180 / Math.PI) - 90
  const shineMidpointAlpha = (pageY - top - scrollTop) / height * 0.4
  const computedProps = { rotateX, rotateY, offsetX, offsetY, scale, angle, shineMidpointAlpha }
  // console.log(computedProps)
  setState(computedProps)
}
