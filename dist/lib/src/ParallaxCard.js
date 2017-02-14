'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

require('./ParallaxCard.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ParallaxCard = function (_Component) {
  _inherits(ParallaxCard, _Component);

  function ParallaxCard(props) {
    _classCallCheck(this, ParallaxCard);

    var _this = _possibleConstructorReturn(this, (ParallaxCard.__proto__ || Object.getPrototypeOf(ParallaxCard)).call(this, props));

    _this.state = {
      width: -1,
      height: -1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      angle: 135,
      shineMidpointAlpha: 0
    };
    _this._element = undefined; // ref
    return _this;
  }

  _createClass(ParallaxCard, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      // TODO: update these on resize
      var width = this._element.clientWidth || this._element.offsetWidth || this._element.scrollWidth;
      var height = this._element.clientHeight || this._element.offsetHeight || this._element.scrollHeight;
      this.setState({ width: width, height: height });

      // Rotate the card when the cursor interacts with it
      // TODO: mobile
      // TODO: debounce event handler
      this._element.addEventListener('mousemove', function (e) {
        e.preventDefault();
        // algo shoutout https://github.com/drewwilson/atvImg/blob/master/atvImg.js
        var _state = _this2.state,
            width = _state.width,
            height = _state.height;
        var _document$body = document.body,
            scrollTop = _document$body.scrollTop,
            scrollLeft = _document$body.scrollLeft;

        var _element$getBoundingC = _this2._element.getBoundingClientRect(),
            top = _element$getBoundingC.top,
            left = _element$getBoundingC.left;

        var pageX = e.pageX,
            pageY = e.pageY;

        var offsetX = 0.52 - (pageX - left - scrollTop) / width;
        var offsetY = 0.52 - (pageY - top - scrollLeft) / height;
        var comX = pageX - left - scrollLeft - width / 2;
        var comY = pageY - top - scrollTop - height / 2;
        var rotateX = (comY - offsetY) * (0.10 * (320 / width));
        var rotateY = (offsetX - comX) * (0.07 * (320 / width));
        var scale = 1.07;
        var angle = Math.atan2(comY, comX) * (180 / Math.PI) - 90;
        var shineMidpointAlpha = (pageY - top - scrollTop) / height * 0.4;
        _this2.setState({ rotateX: rotateX, rotateY: rotateY, scale: scale, angle: angle, shineMidpointAlpha: shineMidpointAlpha });
        // console.log(angle)
      });

      // Reset the card when the cursor leaves
      this._element.addEventListener('mouseleave', function (e) {
        return _this2.setState({ rotateX: 0, rotateY: 0, scale: 1, angle: 135, shineMidpointAlpha: 0 });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          style = _props.style,
          className = _props.className,
          children = _props.children,
          _props$enableRotate = _props.enableRotate,
          enableRotate = _props$enableRotate === undefined ? true : _props$enableRotate,
          label = _props.label,
          hideLabel = _props.hideLabel,
          rest = _objectWithoutProperties(_props, ['style', 'className', 'children', 'enableRotate', 'label', 'hideLabel']);

      var containerStyle = {
        willChange: 'transform',
        transform: 'rotateX(' + (enableRotate && this.state.rotateX) + 'deg)\n                  rotateY(' + (enableRotate && this.state.rotateY) + 'deg)\n                  scale3d(' + this.state.scale + ', ' + this.state.scale + ', ' + this.state.scale + ')'
      };
      var shineStyle = {
        willChange: 'background',
        backgroundImage: enableRotate ? 'linear-gradient(' + this.state.angle + 'deg,\n                           rgba(255, 255, 255, ' + this.state.shineMidpointAlpha + ') 0%,\n                           rgba(255,255,255,0) 80%)' : ''
      };

      return _react2.default.createElement(
        'div',
        _extends({
          style: style,
          ref: function ref(_ref) {
            _this3._element = _ref;
          },
          className: (0, _classnames2.default)('ParallaxCard', className)
        }, rest),
        _react2.default.createElement(
          'div',
          { className: 'ParallaxCard-container', style: containerStyle },
          _react2.default.createElement('div', { className: 'ParallaxCard-shadow' }),
          _react2.default.createElement(
            'div',
            { className: 'ParallaxCard-layers' },
            children
          ),
          enableRotate && _react2.default.createElement('div', { className: 'ParallaxCard-shine', style: shineStyle })
        ),
        label && !hideLabel && _react2.default.createElement(
          'div',
          { className: 'ParallaxCard-label' },
          label
        )
      );
    }
  }]);

  return ParallaxCard;
}(_react.Component);

ParallaxCard.propTypes = {
  style: _react.PropTypes.object,
  className: _react.PropTypes.string,
  label: _react.PropTypes.string,
  hideLabel: _react.PropTypes.bool,
  enableRotate: _react.PropTypes.bool,
  children: _react.PropTypes.node.isRequired
};

ParallaxCard.defaultProps = {
  hideLabel: false,
  children: {},
  enableRotate: true
};

exports.default = ParallaxCard;
//# sourceMappingURL=ParallaxCard.js.map