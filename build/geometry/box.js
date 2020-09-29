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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9ib3gudHMiXSwibmFtZXMiOlsiQm94IiwicG9zaXRpb24iLCJWZWN0b3IiLCJ3aWR0aCIsImhlaWdodCIsIl9wb3NpdGlvbiIsIl93aWR0aCIsIl9oZWlnaHQiLCJQb2x5Z29uIiwieCIsInkiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7SUFHcUJBLEc7QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7OztBQVNBLGlCQUFvRjtBQUFBLFFBQXhFQyxRQUF3RSx1RUFBckQsSUFBSUMsa0JBQUosRUFBcUQ7QUFBQSxRQUF2Q0MsS0FBdUMsdUVBQXZCLENBQXVCO0FBQUEsUUFBcEJDLE1BQW9CLHVFQUFILENBQUc7O0FBQUE7O0FBQUEsdUNBN0J4RCxJQUFJRixrQkFBSixFQTZCd0Q7O0FBQUEsb0NBcEIzRCxDQW9CMkQ7O0FBQUEscUNBWDFELENBVzBEOztBQUNsRixTQUFLRyxTQUFMLEdBQWlCSixRQUFqQjtBQUNBLFNBQUtLLE1BQUwsR0FBY0gsS0FBZDtBQUNBLFNBQUtJLE9BQUwsR0FBZUgsTUFBZjtBQUNEO0FBRUQ7Ozs7Ozs7OztnQ0FLcUI7QUFDbkIsYUFBTyxJQUFJSSxtQkFBSixDQUFZLElBQUlOLGtCQUFKLENBQVcsS0FBS0csU0FBTCxDQUFlSSxDQUExQixFQUE2QixLQUFLSixTQUFMLENBQWVLLENBQTVDLENBQVosRUFBNEQsQ0FDakUsSUFBSVIsa0JBQUosRUFEaUUsRUFDbkQsSUFBSUEsa0JBQUosQ0FBVyxLQUFLSSxNQUFoQixFQUF3QixDQUF4QixDQURtRCxFQUVqRSxJQUFJSixrQkFBSixDQUFXLEtBQUtJLE1BQWhCLEVBQXdCLEtBQUtDLE9BQTdCLENBRmlFLEVBRTFCLElBQUlMLGtCQUFKLENBQVcsQ0FBWCxFQUFjLEtBQUtLLE9BQW5CLENBRjBCLENBQTVELENBQVA7QUFJRCIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IFZlY3RvciBmcm9tICcuL3ZlY3Rvcic7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vcG9seWdvbic7XHJcblxyXG4vKipcclxuICogQSBib3ggcmVwcmVzZW50cyBhbiBheGlzLWFsaWduZWQgYm94IHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm94IHtcclxuICAvKipcclxuICAgKiBUaGUgcG9zaXRpb24gb2YgdGhpcyBib3ggYXMgYSBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1ZlY3Rvcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9wb3NpdGlvbjogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgd2lkdGggb2YgdGhpcyBib3guXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlaWdodCBvZiB0aGlzIGJveC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBCb3gsIHdpdGggdGhlIHNwZWNpZmllZCBwb3NpdGlvbiwgd2lkdGgsIGFuZCBoZWlnaHQuXHJcbiAgICogXHJcbiAgICogSWYgbm8gcG9zaXRpb24gaXMgZ2l2ZW4sIHRoZSBwb3NpdGlvbiB3aWxsIGJlIGAoMCwgMClgLiBJZiBubyB3aWR0aCBvciBoZWlnaHQgYXJlIGdpdmVuLCB0aGV5IHdpbGwgYmUgc2V0IHRvIGAwYC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gW3Bvc2l0aW9uPW5ldyBWZWN0b3IoKV0gVGhlIHBvc2l0aW9uIG9mIHRoaXMgYm94IGFzIGEgVmVjdG9yLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbd2lkdGg9MF0gVGhlIHdpZHRoIG9mIHRoaXMgYm94LlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbaGVpZ2h0PTBdIFRoZSBoZWlnaHQgb2YgdGhpcyBib3guXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKSwgd2lkdGg6IG51bWJlciA9IDAsIGhlaWdodDogbnVtYmVyID0gMCkge1xyXG4gICAgdGhpcy5fcG9zaXRpb24gPSBwb3NpdGlvbjtcclxuICAgIHRoaXMuX3dpZHRoID0gd2lkdGg7XHJcbiAgICB0aGlzLl9oZWlnaHQgPSBoZWlnaHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgUG9seWdvbiB3aG9zZSBlZGdlcyBhcmUgdGhlIHNhbWUgYXMgdGhpcyBCb3guXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IEEgbmV3IFBvbHlnb24gdGhhdCByZXByZXNlbnRzIHRoaXMgQm94LlxyXG4gICAqL1xyXG4gIHRvUG9seWdvbigpOiBQb2x5Z29uIHtcclxuICAgIHJldHVybiBuZXcgUG9seWdvbihuZXcgVmVjdG9yKHRoaXMuX3Bvc2l0aW9uLngsIHRoaXMuX3Bvc2l0aW9uLnkpLCBbXHJcbiAgICAgIG5ldyBWZWN0b3IoKSwgbmV3IFZlY3Rvcih0aGlzLl93aWR0aCwgMCksXHJcbiAgICAgIG5ldyBWZWN0b3IodGhpcy5fd2lkdGgsIHRoaXMuX2hlaWdodCksIG5ldyBWZWN0b3IoMCwgdGhpcy5faGVpZ2h0KVxyXG4gICAgXSk7XHJcbiAgfVxyXG59Il19