import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import throttle from 'lodash.throttle'
import debounce from 'lodash.debounce'
import getParallaxState from './getParallaxState'

export default class ParallaxCard extends Component {
  constructor() {
    super()
    this.state = {
      angle: 135,
      height: 0,
      left: 0,
      offsetX: 0,
      offsetY: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      shineMidpointAlpha: 0,
      top: 0,
      width: 0,
    }
    this._ref = undefined

    this.handleInit = debounce(this._handleInit.bind(this), 150, {
      leading: false,
    })
    this.handleInteraction = throttle(this._handleInteraction.bind(this), 16)
    this.handleReset = debounce(this._handleReset.bind(this), 16, {
      leading: false,
    })
    this.renderChild = this.renderChild.bind(this)
  }

  componentDidMount() {
    this.handleInit()

    if (window) {
      // Set things and update on resize
      window.addEventListener('resize', this.handleInit, { passive: true })
      window.addEventListener('resize', this.handleReset, { passive: true })
    }

    if (this._ref) {
      // Rotate the card when a pointer interacts with it
      // TODO: mobile
      // TODO: evaluate raf performance
      this._ref.addEventListener('touchstart', this.handleInteraction)
      this._ref.addEventListener('mousemove', this.handleInteraction)

      // Reset the card when a pointer leaves
      this._ref.addEventListener('touchend', this.handleReset)
      this._ref.addEventListener('mouseleave', this.handleReset)
    }
  }

  componentWillUnmount() {
    if (window) {
      window.removeEventListener('resize', this.handleInit)
      window.removeEventListener('resize', this.handleReset)
    }

    if (this._ref) {
      this._ref.removeEventListener('touchstart', this.handleInteraction)
      this._ref.removeEventListener('mousemove', this.handleInteraction)
    }
  }

  getFirstState(element) {
    const {
      clientHeight,
      clientWidth,
      offsetHeight,
      offsetWidth,
      scrollHeight,
      scrollWidth,
    } = element
    const { left, top } = element.getBoundingClientRect()

    return {
      left,
      top,
      height: clientHeight || offsetHeight || scrollHeight,
      width: clientWidth || offsetWidth || scrollWidth,
    }
  }

  getZeroState() {
    return {
      rotateX: 0,
      rotateY: 0,
      offsetX: 0,
      offsetY: 0,
      scale: 1,
      angle: 135,
      shineMidpointAlpha: 0,
    }
  }

  _handleInit() {
    this.setState(this.getFirstState(this._ref))
  }

  _handleInteraction(evt) {
    this.setState(getParallaxState(document.body, evt))
  }

  _handleReset() {
    this.setState(this.getZeroState())
  }

  renderChild(child, index) {
    const { props: { style: childPropsStyle = {} } = {} } = child
    const { children, isTranslateEnabled, parallaxFactor } = this.props
    const { offsetX, offsetY, width, height } = this.state

    const childCount = React.Children.count(children)
    const translateXBasis = parallaxFactor * offsetX * width / 320
    const translateYBasis = parallaxFactor * offsetY * height / 320
    const translateX = translateXBasis * (childCount - index)
    const translateY = translateYBasis * childCount
    const style = {
      position: index === 0 ? 'inherit' : 'absolute',
      top: 0,
      ...childPropsStyle,
      borderRadius: index === 0 ? 5 : 'inherit',
      willChange: 'transform',
      transition: 'transform 100ms ease-out',
      transform: `translateX(${isTranslateEnabled ? translateX : 0}px)
                  translateY(${isTranslateEnabled ? translateY : 0}px)
                  ${isTranslateEnabled && index === 0 ? 'scale(1.1)' : ''}`,
    }

    return React.cloneElement(child, { key: index, style })
  }

  render() {
    const {
      children,
      className,
      distance,
      isRotateEnabled,
      label,
      layerContainerClassName,
      style,
    } = this.props
    const { angle, rotateX, rotateY, scale, shineMidpointAlpha } = this.state

    const containerStyle = {
      ...style,
      transform: `rotateX(${isRotateEnabled ? rotateX : 0}deg)
                  rotateY(${isRotateEnabled ? rotateY : 0}deg)
                  scale3d(${scale}, ${scale}, ${scale})`,
    }
    const shineStyle = {
      backgroundImage: isRotateEnabled
        ? `linear-gradient(${angle}deg,
                           rgba(255, 255, 255, ${shineMidpointAlpha}) 0%,
                           rgba(255, 255, 255, 0) 80%)`
        : '',
    }

    return (
      <div
        ref={ref => {
          this._ref = ref
        }}
        className={`ParallaxCard ${className}`}
        style={containerStyle}
      >
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
            transform: perspective(${distance});
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
            box-shadow: 0 2.8125rem 6.25rem rgba(14, 21, 47, 0.4),
              0 16px 40px rgba(14, 21, 47, 0.4);
          }

          .ParallaxCard-layers {
            position: relative;
            width: 100%;
            height: 100%;
            border-radius: 0.3125rem;
            overflow: hidden;
            transform-style: preserve-3d;
            *zoom: 1;
          }

          .ParallaxCard-layers:before,
          .ParallaxCard-layers:after {
            content: ' ';
            display: table;
          }

          .ParallaxCard-layers:after {
            clear: both;
          }

          .ParallaxCard-label {
            position: absolute;
            top: 100%;
            width: 100%;
            height: 2rem;
            line-height: 2rem;
            font-size: 1rem;
            color: #bfbfbf;
            transition-delay: 0ms;
            transform: perspective(${distance});
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
            background: linear-gradient(
              135deg,
              rgba(255, 255, 255, 0.25) 0%,
              rgba(255, 255, 255, 0) 60%
            );
            will-change: background;
            pointer-events: none;
          }
        `}</style>

        <div className="ParallaxCard-container">
          <div className="ParallaxCard-shadow" />
          <div className={`ParallaxCard-layers ${layerContainerClassName}`}>
            {React.Children.map(children, this.renderChild)}
          </div>
          {isRotateEnabled && (
            <div className="ParallaxCard-shine" style={shineStyle} />
          )}
        </div>
        {label && <div className="ParallaxCard-label">{label}</div>}
      </div>
    )
  }
}

ParallaxCard.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  distance: PropTypes.string,
  isRotateEnabled: PropTypes.bool,
  isTranslateEnabled: PropTypes.bool,
  label: PropTypes.string,
  layerContainerClassName: PropTypes.string,
  parallaxFactor: PropTypes.number,
  style: PropTypes.object,
  tiltMidpoint: PropTypes.number,
  tiltX: PropTypes.number,
  tiltY: PropTypes.number,
}

ParallaxCard.defaultProps = {
  distance: '60rem',
  isRotateEnabled: true,
  isTranslateEnabled: true,
  className: '',
  layerContainerClassName: '',
  parallaxFactor: 2.5,
  tiltMidpoint: 0.52,
  tiltX: 0.1,
  tiltY: 0.07,
}
