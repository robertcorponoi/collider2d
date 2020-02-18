'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Box = _interopRequireDefault(require("./Box"));

var _Vector = _interopRequireDefault(require("./Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents a circle with a position and a radius.
 * 
 * Creates a new Circle, optionally passing in a position and/or radius. If no position is given, the Circle will be at `(0,0)`. 
 * 
 * If no radius is provided the circle will have a radius of `0`.
 */
var Circle =
/*#__PURE__*/
function () {
  /**
   * A Vector representing the center point of this circle.
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * The radius of this circle.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * A Vector representing the offset of this circle.
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * @param {Vector} position A Vector representing the center of this Circle.
   * @param {number} radius The radius of this Circle. 
   */
  function Circle() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Vector["default"]();
    var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Circle);

    _defineProperty(this, "_position", new _Vector["default"]());

    _defineProperty(this, "_radius", 0);

    _defineProperty(this, "_offset", new _Vector["default"]());

    this._position = position;
    this._radius = radius;
  }
  /**
   * Returns the position of this circle.
   * 
   * @returns {Vector}
   */


  _createClass(Circle, [{
    key: "translate",

    /**
     * Translate the center of the cirlc.e
     * 
     * @param {Vector} position A Vector representing the new center of this circle.
     */
    value: function translate(x, y) {
      this._position.x += x;
      this._position.y += y;
    }
    /**
     * Compute the axis-aligned bounding box (AABB) of this Circle.
     * 
     * Note: Returns a new `Polygon` each time this is called.
     * 
     * @returns {Polygon} Returns the AABB of this circle.
     */

  }, {
    key: "getAABB",
    value: function getAABB() {
      var corner = this._position.clone().add(this._offset).sub(new _Vector["default"](this._radius, this._radius));

      return new _Box["default"](corner, this._radius * 2, this._radius * 2).toPolygon();
    }
    /**
     * Set the current offset to apply to the radius.
     * 
     * @param {Vector} offset The new offset Vector.
     * 
     * @returns {Circle} Returns this for chaining.
     */

  }, {
    key: "setOffset",
    value: function setOffset(offset) {
      this._offset = offset;
      return this;
    }
  }, {
    key: "position",
    get: function get() {
      return this._position;
    }
    /**
     * Returns the radius of this circle.
     * 
     * @returns {number}
     */

  }, {
    key: "radius",
    get: function get() {
      return this._radius;
    }
    /**
     * Returns the offset of this circle.
     * 
     * @returns {Vector}
     */

  }, {
    key: "offset",
    get: function get() {
      return this._offset;
    }
    /**
     * Set a new offset for this circle.
     * 
     * @param {Vector} offset The new offset for this circle.
     */
    ,
    set: function set(offset) {
      this._offset = offset;
    }
  }]);

  return Circle;
}();

exports["default"] = Circle;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9DaXJjbGUudHMiXSwibmFtZXMiOlsiQ2lyY2xlIiwicG9zaXRpb24iLCJWZWN0b3IiLCJyYWRpdXMiLCJfcG9zaXRpb24iLCJfcmFkaXVzIiwieCIsInkiLCJjb3JuZXIiLCJjbG9uZSIsImFkZCIsIl9vZmZzZXQiLCJzdWIiLCJCb3giLCJ0b1BvbHlnb24iLCJvZmZzZXQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUdBOzs7Ozs7O0lBT3FCQSxNOzs7QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7QUFJQSxvQkFBaUU7QUFBQSxRQUFyREMsUUFBcUQsdUVBQWxDLElBQUlDLGtCQUFKLEVBQWtDO0FBQUEsUUFBcEJDLE1BQW9CLHVFQUFILENBQUc7O0FBQUE7O0FBQUEsdUNBeEJyQyxJQUFJRCxrQkFBSixFQXdCcUM7O0FBQUEscUNBZnZDLENBZXVDOztBQUFBLHFDQU52QyxJQUFJQSxrQkFBSixFQU11Qzs7QUFDL0QsU0FBS0UsU0FBTCxHQUFpQkgsUUFBakI7QUFFQSxTQUFLSSxPQUFMLEdBQWVGLE1BQWY7QUFDRDtBQUVEOzs7Ozs7Ozs7O0FBNEJBOzs7Ozs4QkFLVUcsQyxFQUFXQyxDLEVBQVc7QUFDOUIsV0FBS0gsU0FBTCxDQUFlRSxDQUFmLElBQW9CQSxDQUFwQjtBQUNBLFdBQUtGLFNBQUwsQ0FBZUcsQ0FBZixJQUFvQkEsQ0FBcEI7QUFDRDtBQUVEOzs7Ozs7Ozs7OzhCQU9tQjtBQUNqQixVQUFNQyxNQUFNLEdBQUcsS0FBS0osU0FBTCxDQUFlSyxLQUFmLEdBQXVCQyxHQUF2QixDQUEyQixLQUFLQyxPQUFoQyxFQUF5Q0MsR0FBekMsQ0FBNkMsSUFBSVYsa0JBQUosQ0FBVyxLQUFLRyxPQUFoQixFQUF5QixLQUFLQSxPQUE5QixDQUE3QyxDQUFmOztBQUVBLGFBQU8sSUFBSVEsZUFBSixDQUFRTCxNQUFSLEVBQWdCLEtBQUtILE9BQUwsR0FBZSxDQUEvQixFQUFrQyxLQUFLQSxPQUFMLEdBQWUsQ0FBakQsRUFBb0RTLFNBQXBELEVBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7OzhCQU9VQyxNLEVBQXdCO0FBQ2hDLFdBQUtKLE9BQUwsR0FBZUksTUFBZjtBQUVBLGFBQU8sSUFBUDtBQUNEOzs7d0JBekRzQjtBQUFFLGFBQU8sS0FBS1gsU0FBWjtBQUF3QjtBQUVqRDs7Ozs7Ozs7d0JBS3FCO0FBQUUsYUFBTyxLQUFLQyxPQUFaO0FBQXNCO0FBRTdDOzs7Ozs7Ozt3QkFLcUI7QUFBRSxhQUFPLEtBQUtNLE9BQVo7QUFBc0I7QUFFN0M7Ozs7OztzQkFLV0ksTSxFQUFnQjtBQUFFLFdBQUtKLE9BQUwsR0FBZUksTUFBZjtBQUF3QiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEJveCBmcm9tICcuL0JveCc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9WZWN0b3InO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuL1BvbHlnb24nO1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSBjaXJjbGUgd2l0aCBhIHBvc2l0aW9uIGFuZCBhIHJhZGl1cy5cclxuICogXHJcbiAqIENyZWF0ZXMgYSBuZXcgQ2lyY2xlLCBvcHRpb25hbGx5IHBhc3NpbmcgaW4gYSBwb3NpdGlvbiBhbmQvb3IgcmFkaXVzLiBJZiBubyBwb3NpdGlvbiBpcyBnaXZlbiwgdGhlIENpcmNsZSB3aWxsIGJlIGF0IGAoMCwwKWAuIFxyXG4gKiBcclxuICogSWYgbm8gcmFkaXVzIGlzIHByb3ZpZGVkIHRoZSBjaXJjbGUgd2lsbCBoYXZlIGEgcmFkaXVzIG9mIGAwYC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENpcmNsZSB7XHJcbiAgLyoqXHJcbiAgICogQSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBjZW50ZXIgcG9pbnQgb2YgdGhpcyBjaXJjbGUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1ZlY3Rvcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9wb3NpdGlvbjogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgcmFkaXVzIG9mIHRoaXMgY2lyY2xlLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmFkaXVzOiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBBIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIG9mZnNldCBvZiB0aGlzIGNpcmNsZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7VmVjdG9yfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX29mZnNldDogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcG9zaXRpb24gQSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBjZW50ZXIgb2YgdGhpcyBDaXJjbGUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHJhZGl1cyBUaGUgcmFkaXVzIG9mIHRoaXMgQ2lyY2xlLiBcclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogVmVjdG9yID0gbmV3IFZlY3RvcigpLCByYWRpdXM6IG51bWJlciA9IDApIHtcclxuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgdGhpcy5fcmFkaXVzID0gcmFkaXVzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhpcyBjaXJjbGUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn1cclxuICAgKi9cclxuICBnZXQgcG9zaXRpb24oKTogVmVjdG9yIHsgcmV0dXJuIHRoaXMuX3Bvc2l0aW9uOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHJhZGl1cyBvZiB0aGlzIGNpcmNsZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCByYWRpdXMoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3JhZGl1czsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBvZmZzZXQgb2YgdGhpcyBjaXJjbGUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn1cclxuICAgKi9cclxuICBnZXQgb2Zmc2V0KCk6IFZlY3RvciB7IHJldHVybiB0aGlzLl9vZmZzZXQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IGEgbmV3IG9mZnNldCBmb3IgdGhpcyBjaXJjbGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG9mZnNldCBUaGUgbmV3IG9mZnNldCBmb3IgdGhpcyBjaXJjbGUuXHJcbiAgICovXHJcbiAgc2V0IG9mZnNldChvZmZzZXQ6IFZlY3RvcikgeyB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlIHRoZSBjZW50ZXIgb2YgdGhlIGNpcmxjLmVcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcG9zaXRpb24gQSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBuZXcgY2VudGVyIG9mIHRoaXMgY2lyY2xlLlxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcikge1xyXG4gICAgdGhpcy5fcG9zaXRpb24ueCArPSB4O1xyXG4gICAgdGhpcy5fcG9zaXRpb24ueSArPSB5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSB0aGUgYXhpcy1hbGlnbmVkIGJvdW5kaW5nIGJveCAoQUFCQikgb2YgdGhpcyBDaXJjbGUuXHJcbiAgICogXHJcbiAgICogTm90ZTogUmV0dXJucyBhIG5ldyBgUG9seWdvbmAgZWFjaCB0aW1lIHRoaXMgaXMgY2FsbGVkLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoZSBBQUJCIG9mIHRoaXMgY2lyY2xlLlxyXG4gICAqL1xyXG4gIGdldEFBQkIoKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBjb3JuZXIgPSB0aGlzLl9wb3NpdGlvbi5jbG9uZSgpLmFkZCh0aGlzLl9vZmZzZXQpLnN1YihuZXcgVmVjdG9yKHRoaXMuX3JhZGl1cywgdGhpcy5fcmFkaXVzKSk7XHJcblxyXG4gICAgcmV0dXJuIG5ldyBCb3goY29ybmVyLCB0aGlzLl9yYWRpdXMgKiAyLCB0aGlzLl9yYWRpdXMgKiAyKS50b1BvbHlnb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY3VycmVudCBvZmZzZXQgdG8gYXBwbHkgdG8gdGhlIHJhZGl1cy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb2Zmc2V0IFRoZSBuZXcgb2Zmc2V0IFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Q2lyY2xlfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHNldE9mZnNldChvZmZzZXQ6IFZlY3Rvcik6IENpcmNsZSB7XHJcbiAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG59Il19