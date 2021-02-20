'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vector = _interopRequireDefault(require("./vector"));

var _polygon = _interopRequireDefault(require("./polygon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A box represents an axis-aligned box with a width and height.
 */
var Box = /*#__PURE__*/function () {
  /**
   * The position of this box as a Vector.
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * The width of this box.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The height of this box.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * Creates a new Box, with the specified position, width, and height.
   * 
   * If no position is given, the position will be `(0, 0)`. If no width or height are given, they will be set to `0`.
   * 
   * @param {Vector} [position=new Vector()] The position of this box as a Vector.
   * @param {number} [width=0] The width of this box.
   * @param {number} [height=0] The height of this box.
   */
  function Box() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _vector["default"]();
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Box);

    _defineProperty(this, "_position", new _vector["default"]());

    _defineProperty(this, "_width", 0);

    _defineProperty(this, "_height", 0);

    this._position = position;
    this._width = width;
    this._height = height;
  }
  /**
   * Returns a Polygon whose edges are the same as this Box.
   * 
   * @returns {Polygon} A new Polygon that represents this Box.
   */


  _createClass(Box, [{
    key: "toPolygon",
    value: function toPolygon() {
      return new _polygon["default"](new _vector["default"](this._position.x, this._position.y), [new _vector["default"](), new _vector["default"](this._width, 0), new _vector["default"](this._width, this._height), new _vector["default"](0, this._height)]);
    }
  }]);

  return Box;
}();

exports["default"] = Box;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9ib3gudHMiXSwibmFtZXMiOlsiQm94IiwicG9zaXRpb24iLCJWZWN0b3IiLCJ3aWR0aCIsImhlaWdodCIsIl9wb3NpdGlvbiIsIl93aWR0aCIsIl9oZWlnaHQiLCJQb2x5Z29uIiwieCIsInkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBO0FBQ0E7QUFDQTtJQUNxQkEsRztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDRSxpQkFBb0Y7QUFBQSxRQUF4RUMsUUFBd0UsdUVBQXJELElBQUlDLGtCQUFKLEVBQXFEO0FBQUEsUUFBdkNDLEtBQXVDLHVFQUF2QixDQUF1QjtBQUFBLFFBQXBCQyxNQUFvQix1RUFBSCxDQUFHOztBQUFBOztBQUFBLHVDQTdCeEQsSUFBSUYsa0JBQUosRUE2QndEOztBQUFBLG9DQXBCM0QsQ0FvQjJEOztBQUFBLHFDQVgxRCxDQVcwRDs7QUFDbEYsU0FBS0csU0FBTCxHQUFpQkosUUFBakI7QUFDQSxTQUFLSyxNQUFMLEdBQWNILEtBQWQ7QUFDQSxTQUFLSSxPQUFMLEdBQWVILE1BQWY7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7O1dBQ0UscUJBQXFCO0FBQ25CLGFBQU8sSUFBSUksbUJBQUosQ0FBWSxJQUFJTixrQkFBSixDQUFXLEtBQUtHLFNBQUwsQ0FBZUksQ0FBMUIsRUFBNkIsS0FBS0osU0FBTCxDQUFlSyxDQUE1QyxDQUFaLEVBQTRELENBQ2pFLElBQUlSLGtCQUFKLEVBRGlFLEVBQ25ELElBQUlBLGtCQUFKLENBQVcsS0FBS0ksTUFBaEIsRUFBd0IsQ0FBeEIsQ0FEbUQsRUFFakUsSUFBSUosa0JBQUosQ0FBVyxLQUFLSSxNQUFoQixFQUF3QixLQUFLQyxPQUE3QixDQUZpRSxFQUUxQixJQUFJTCxrQkFBSixDQUFXLENBQVgsRUFBYyxLQUFLSyxPQUFuQixDQUYwQixDQUE1RCxDQUFQO0FBSUQiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi92ZWN0b3InO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuL3BvbHlnb24nO1xyXG5cclxuLyoqXHJcbiAqIEEgYm94IHJlcHJlc2VudHMgYW4gYXhpcy1hbGlnbmVkIGJveCB3aXRoIGEgd2lkdGggYW5kIGhlaWdodC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJveCB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHBvc2l0aW9uIG9mIHRoaXMgYm94IGFzIGEgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtWZWN0b3J9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHdpZHRoIG9mIHRoaXMgYm94LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfd2lkdGg6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBoZWlnaHQgb2YgdGhpcyBib3guXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9oZWlnaHQ6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgQm94LCB3aXRoIHRoZSBzcGVjaWZpZWQgcG9zaXRpb24sIHdpZHRoLCBhbmQgaGVpZ2h0LlxyXG4gICAqIFxyXG4gICAqIElmIG5vIHBvc2l0aW9uIGlzIGdpdmVuLCB0aGUgcG9zaXRpb24gd2lsbCBiZSBgKDAsIDApYC4gSWYgbm8gd2lkdGggb3IgaGVpZ2h0IGFyZSBnaXZlbiwgdGhleSB3aWxsIGJlIHNldCB0byBgMGAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IFtwb3NpdGlvbj1uZXcgVmVjdG9yKCldIFRoZSBwb3NpdGlvbiBvZiB0aGlzIGJveCBhcyBhIFZlY3Rvci5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3dpZHRoPTBdIFRoZSB3aWR0aCBvZiB0aGlzIGJveC5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW2hlaWdodD0wXSBUaGUgaGVpZ2h0IG9mIHRoaXMgYm94LlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHBvc2l0aW9uOiBWZWN0b3IgPSBuZXcgVmVjdG9yKCksIHdpZHRoOiBudW1iZXIgPSAwLCBoZWlnaHQ6IG51bWJlciA9IDApIHtcclxuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xyXG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIFBvbHlnb24gd2hvc2UgZWRnZXMgYXJlIHRoZSBzYW1lIGFzIHRoaXMgQm94LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBBIG5ldyBQb2x5Z29uIHRoYXQgcmVwcmVzZW50cyB0aGlzIEJveC5cclxuICAgKi9cclxuICB0b1BvbHlnb24oKTogUG9seWdvbiB7XHJcbiAgICByZXR1cm4gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih0aGlzLl9wb3NpdGlvbi54LCB0aGlzLl9wb3NpdGlvbi55KSwgW1xyXG4gICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IodGhpcy5fd2lkdGgsIDApLFxyXG4gICAgICBuZXcgVmVjdG9yKHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpLCBuZXcgVmVjdG9yKDAsIHRoaXMuX2hlaWdodClcclxuICAgIF0pO1xyXG4gIH1cclxufSJdfQ==