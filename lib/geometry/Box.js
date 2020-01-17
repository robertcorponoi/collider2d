'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Vector = _interopRequireDefault(require("./Vector"));

var _Polygon = _interopRequireDefault(require("./Polygon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * A box represents an axis-aligned box with a width and height.
 */
var Box =
/*#__PURE__*/
function () {
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
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Vector["default"]();
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

    _classCallCheck(this, Box);

    _defineProperty(this, "_position", new _Vector["default"]());

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
      return new _Polygon["default"](new _Vector["default"](this._position.x, this._position.y), [new _Vector["default"](), new _Vector["default"](this._width, 0), new _Vector["default"](this._width, this._height), new _Vector["default"](0, this._height)]);
    }
  }]);

  return Box;
}();

exports["default"] = Box;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9Cb3gudHMiXSwibmFtZXMiOlsiQm94IiwicG9zaXRpb24iLCJWZWN0b3IiLCJ3aWR0aCIsImhlaWdodCIsIl9wb3NpdGlvbiIsIl93aWR0aCIsIl9oZWlnaHQiLCJQb2x5Z29uIiwieCIsInkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLEc7OztBQUNuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7O0FBU0EsaUJBQW9GO0FBQUEsUUFBeEVDLFFBQXdFLHVFQUFyRCxJQUFJQyxrQkFBSixFQUFxRDtBQUFBLFFBQXZDQyxLQUF1Qyx1RUFBdkIsQ0FBdUI7QUFBQSxRQUFwQkMsTUFBb0IsdUVBQUgsQ0FBRzs7QUFBQTs7QUFBQSx1Q0E3QnhELElBQUlGLGtCQUFKLEVBNkJ3RDs7QUFBQSxvQ0FwQjNELENBb0IyRDs7QUFBQSxxQ0FYMUQsQ0FXMEQ7O0FBQ2xGLFNBQUtHLFNBQUwsR0FBaUJKLFFBQWpCO0FBRUEsU0FBS0ssTUFBTCxHQUFjSCxLQUFkO0FBRUEsU0FBS0ksT0FBTCxHQUFlSCxNQUFmO0FBQ0Q7QUFFRDs7Ozs7Ozs7O2dDQUtxQjtBQUNuQixhQUFPLElBQUlJLG1CQUFKLENBQVksSUFBSU4sa0JBQUosQ0FBVyxLQUFLRyxTQUFMLENBQWVJLENBQTFCLEVBQTZCLEtBQUtKLFNBQUwsQ0FBZUssQ0FBNUMsQ0FBWixFQUE0RCxDQUNqRSxJQUFJUixrQkFBSixFQURpRSxFQUNuRCxJQUFJQSxrQkFBSixDQUFXLEtBQUtJLE1BQWhCLEVBQXdCLENBQXhCLENBRG1ELEVBRWpFLElBQUlKLGtCQUFKLENBQVcsS0FBS0ksTUFBaEIsRUFBd0IsS0FBS0MsT0FBN0IsQ0FGaUUsRUFFMUIsSUFBSUwsa0JBQUosQ0FBVyxDQUFYLEVBQWMsS0FBS0ssT0FBbkIsQ0FGMEIsQ0FBNUQsQ0FBUDtBQUlEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vVmVjdG9yJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9Qb2x5Z29uJztcclxuXHJcbi8qKlxyXG4gKiBBIGJveCByZXByZXNlbnRzIGFuIGF4aXMtYWxpZ25lZCBib3ggd2l0aCBhIHdpZHRoIGFuZCBoZWlnaHQuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBCb3gge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBwb3NpdGlvbiBvZiB0aGlzIGJveCBhcyBhIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7VmVjdG9yfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3Bvc2l0aW9uOiBWZWN0b3IgPSBuZXcgVmVjdG9yKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB3aWR0aCBvZiB0aGlzIGJveC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgaGVpZ2h0IG9mIHRoaXMgYm94LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaGVpZ2h0OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IEJveCwgd2l0aCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLCB3aWR0aCwgYW5kIGhlaWdodC5cclxuICAgKiBcclxuICAgKiBJZiBubyBwb3NpdGlvbiBpcyBnaXZlbiwgdGhlIHBvc2l0aW9uIHdpbGwgYmUgYCgwLCAwKWAuIElmIG5vIHdpZHRoIG9yIGhlaWdodCBhcmUgZ2l2ZW4sIHRoZXkgd2lsbCBiZSBzZXQgdG8gYDBgLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBbcG9zaXRpb249bmV3IFZlY3RvcigpXSBUaGUgcG9zaXRpb24gb2YgdGhpcyBib3ggYXMgYSBWZWN0b3IuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt3aWR0aD0wXSBUaGUgd2lkdGggb2YgdGhpcyBib3guXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtoZWlnaHQ9MF0gVGhlIGhlaWdodCBvZiB0aGlzIGJveC5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogVmVjdG9yID0gbmV3IFZlY3RvcigpLCB3aWR0aDogbnVtYmVyID0gMCwgaGVpZ2h0OiBudW1iZXIgPSAwKSB7XHJcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcblxyXG4gICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIFBvbHlnb24gd2hvc2UgZWRnZXMgYXJlIHRoZSBzYW1lIGFzIHRoaXMgQm94LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBBIG5ldyBQb2x5Z29uIHRoYXQgcmVwcmVzZW50cyB0aGlzIEJveC5cclxuICAgKi9cclxuICB0b1BvbHlnb24oKTogUG9seWdvbiB7XHJcbiAgICByZXR1cm4gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih0aGlzLl9wb3NpdGlvbi54LCB0aGlzLl9wb3NpdGlvbi55KSwgW1xyXG4gICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IodGhpcy5fd2lkdGgsIDApLFxyXG4gICAgICBuZXcgVmVjdG9yKHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpLCBuZXcgVmVjdG9yKDAsIHRoaXMuX2hlaWdodClcclxuICAgIF0pO1xyXG4gIH1cclxufSJdfQ==