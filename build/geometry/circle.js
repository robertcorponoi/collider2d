'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _box = _interopRequireDefault(require("./box"));

var _vector = _interopRequireDefault(require("./vector"));

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
var Circle = /*#__PURE__*/function () {
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
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _vector["default"]();
    var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Circle);

    _defineProperty(this, "_position", new _vector["default"]());

    _defineProperty(this, "_radius", 0);

    _defineProperty(this, "_offset", new _vector["default"]());

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
      var corner = this._position.clone().add(this._offset).sub(new _vector["default"](this._radius, this._radius));

      return new _box["default"](corner, this._radius * 2, this._radius * 2).toPolygon();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9jaXJjbGUudHMiXSwibmFtZXMiOlsiQ2lyY2xlIiwicG9zaXRpb24iLCJWZWN0b3IiLCJyYWRpdXMiLCJfcG9zaXRpb24iLCJfcmFkaXVzIiwieCIsInkiLCJjb3JuZXIiLCJjbG9uZSIsImFkZCIsIl9vZmZzZXQiLCJzdWIiLCJCb3giLCJ0b1BvbHlnb24iLCJvZmZzZXQiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUdBOzs7Ozs7O0lBT3FCQSxNO0FBQ25COzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7O0FBSUEsb0JBQWlFO0FBQUEsUUFBckRDLFFBQXFELHVFQUFsQyxJQUFJQyxrQkFBSixFQUFrQztBQUFBLFFBQXBCQyxNQUFvQix1RUFBSCxDQUFHOztBQUFBOztBQUFBLHVDQXhCckMsSUFBSUQsa0JBQUosRUF3QnFDOztBQUFBLHFDQWZ2QyxDQWV1Qzs7QUFBQSxxQ0FOdkMsSUFBSUEsa0JBQUosRUFNdUM7O0FBQy9ELFNBQUtFLFNBQUwsR0FBaUJILFFBQWpCO0FBRUEsU0FBS0ksT0FBTCxHQUFlRixNQUFmO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQTRCQTs7Ozs7OEJBS1VHLEMsRUFBV0MsQyxFQUFXO0FBQzlCLFdBQUtILFNBQUwsQ0FBZUUsQ0FBZixJQUFvQkEsQ0FBcEI7QUFDQSxXQUFLRixTQUFMLENBQWVHLENBQWYsSUFBb0JBLENBQXBCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs4QkFPbUI7QUFDakIsVUFBTUMsTUFBTSxHQUFHLEtBQUtKLFNBQUwsQ0FBZUssS0FBZixHQUF1QkMsR0FBdkIsQ0FBMkIsS0FBS0MsT0FBaEMsRUFBeUNDLEdBQXpDLENBQTZDLElBQUlWLGtCQUFKLENBQVcsS0FBS0csT0FBaEIsRUFBeUIsS0FBS0EsT0FBOUIsQ0FBN0MsQ0FBZjs7QUFDQSxhQUFPLElBQUlRLGVBQUosQ0FBUUwsTUFBUixFQUFnQixLQUFLSCxPQUFMLEdBQWUsQ0FBL0IsRUFBa0MsS0FBS0EsT0FBTCxHQUFlLENBQWpELEVBQW9EUyxTQUFwRCxFQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs4QkFPVUMsTSxFQUF3QjtBQUNoQyxXQUFLSixPQUFMLEdBQWVJLE1BQWY7QUFDQSxhQUFPLElBQVA7QUFDRDs7O3dCQXZEc0I7QUFBRSxhQUFPLEtBQUtYLFNBQVo7QUFBd0I7QUFFakQ7Ozs7Ozs7O3dCQUtxQjtBQUFFLGFBQU8sS0FBS0MsT0FBWjtBQUFzQjtBQUU3Qzs7Ozs7Ozs7d0JBS3FCO0FBQUUsYUFBTyxLQUFLTSxPQUFaO0FBQXNCO0FBRTdDOzs7Ozs7c0JBS1dJLE0sRUFBZ0I7QUFBRSxXQUFLSixPQUFMLEdBQWVJLE1BQWY7QUFBd0IiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBCb3ggZnJvbSAnLi9ib3gnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vdmVjdG9yJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9wb2x5Z29uJztcclxuXHJcbi8qKlxyXG4gKiBSZXByZXNlbnRzIGEgY2lyY2xlIHdpdGggYSBwb3NpdGlvbiBhbmQgYSByYWRpdXMuXHJcbiAqIFxyXG4gKiBDcmVhdGVzIGEgbmV3IENpcmNsZSwgb3B0aW9uYWxseSBwYXNzaW5nIGluIGEgcG9zaXRpb24gYW5kL29yIHJhZGl1cy4gSWYgbm8gcG9zaXRpb24gaXMgZ2l2ZW4sIHRoZSBDaXJjbGUgd2lsbCBiZSBhdCBgKDAsMClgLiBcclxuICogXHJcbiAqIElmIG5vIHJhZGl1cyBpcyBwcm92aWRlZCB0aGUgY2lyY2xlIHdpbGwgaGF2ZSBhIHJhZGl1cyBvZiBgMGAuXHJcbiAqL1xyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDaXJjbGUge1xyXG4gIC8qKlxyXG4gICAqIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgY2VudGVyIHBvaW50IG9mIHRoaXMgY2lyY2xlLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtWZWN0b3J9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHJhZGl1cyBvZiB0aGlzIGNpcmNsZS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JhZGl1czogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBvZmZzZXQgb2YgdGhpcyBjaXJjbGUuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1ZlY3Rvcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9vZmZzZXQ6IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvc2l0aW9uIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgY2VudGVyIG9mIHRoaXMgQ2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGlzIENpcmNsZS4gXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKSwgcmFkaXVzOiBudW1iZXIgPSAwKSB7XHJcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG5cclxuICAgIHRoaXMuX3JhZGl1cyA9IHJhZGl1cztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoaXMgY2lyY2xlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XHJcbiAgICovXHJcbiAgZ2V0IHBvc2l0aW9uKCk6IFZlY3RvciB7IHJldHVybiB0aGlzLl9wb3NpdGlvbjsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSByYWRpdXMgb2YgdGhpcyBjaXJjbGUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgcmFkaXVzKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9yYWRpdXM7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgb2Zmc2V0IG9mIHRoaXMgY2lyY2xlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XHJcbiAgICovXHJcbiAgZ2V0IG9mZnNldCgpOiBWZWN0b3IgeyByZXR1cm4gdGhpcy5fb2Zmc2V0OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCBhIG5ldyBvZmZzZXQgZm9yIHRoaXMgY2lyY2xlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvZmZzZXQgVGhlIG5ldyBvZmZzZXQgZm9yIHRoaXMgY2lyY2xlLlxyXG4gICAqL1xyXG4gIHNldCBvZmZzZXQob2Zmc2V0OiBWZWN0b3IpIHsgdGhpcy5fb2Zmc2V0ID0gb2Zmc2V0OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJsYy5lXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvc2l0aW9uIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbmV3IGNlbnRlciBvZiB0aGlzIGNpcmNsZS5cclxuICAgKi9cclxuICB0cmFuc2xhdGUoeDogbnVtYmVyLCB5OiBudW1iZXIpIHtcclxuICAgIHRoaXMuX3Bvc2l0aW9uLnggKz0geDtcclxuICAgIHRoaXMuX3Bvc2l0aW9uLnkgKz0geTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGF4aXMtYWxpZ25lZCBib3VuZGluZyBib3ggKEFBQkIpIG9mIHRoaXMgQ2lyY2xlLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFJldHVybnMgYSBuZXcgYFBvbHlnb25gIGVhY2ggdGltZSB0aGlzIGlzIGNhbGxlZC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGUgQUFCQiBvZiB0aGlzIGNpcmNsZS5cclxuICAgKi9cclxuICBnZXRBQUJCKCk6IFBvbHlnb24ge1xyXG4gICAgY29uc3QgY29ybmVyID0gdGhpcy5fcG9zaXRpb24uY2xvbmUoKS5hZGQodGhpcy5fb2Zmc2V0KS5zdWIobmV3IFZlY3Rvcih0aGlzLl9yYWRpdXMsIHRoaXMuX3JhZGl1cykpO1xyXG4gICAgcmV0dXJuIG5ldyBCb3goY29ybmVyLCB0aGlzLl9yYWRpdXMgKiAyLCB0aGlzLl9yYWRpdXMgKiAyKS50b1BvbHlnb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY3VycmVudCBvZmZzZXQgdG8gYXBwbHkgdG8gdGhlIHJhZGl1cy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb2Zmc2V0IFRoZSBuZXcgb2Zmc2V0IFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Q2lyY2xlfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHNldE9mZnNldChvZmZzZXQ6IFZlY3Rvcik6IENpcmNsZSB7XHJcbiAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn0iXX0=