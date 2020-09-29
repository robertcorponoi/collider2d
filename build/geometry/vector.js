'use strict';
/**
 * Represents a vector in two dimensions with `x` and `y` properties.
 * 
 * Create a new Vector, optionally passing in the `x` and `y` coordinates. If a coordinate is not specified, it will be set to `0`.
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Vector = /*#__PURE__*/function () {
  /**
   * The x coordinate of this vector.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The y coordinate of this vector.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * @param {number} [x=0] The x coordinate of this vector.
   * @param {number} [y=0] The y coordinate of this vector.
   */
  function Vector() {
    var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Vector);

    _defineProperty(this, "_x", 0);

    _defineProperty(this, "_y", 0);

    this._x = x;
    this._y = y;
  }
  /**
   * Returns the x value of this vector.
   * 
   * @returns {number}
   */


  _createClass(Vector, [{
    key: "copy",

    /**
     * Copy the values of another Vector into this one.
     * 
     * @param {Vector} other The other Vector.
     * 
     * @returns {Vector} Returns this for chaining.
     */
    value: function copy(other) {
      this._x = other.x;
      this._y = other.y;
      return this;
    }
    /**
     * Create a new Vector with the same coordinates as the one.
     * 
     * @returns {Vector} The new cloned Vector.
     */

  }, {
    key: "clone",
    value: function clone() {
      return new Vector(this.x, this.y);
    }
    /**
     * Change this Vector to be perpendicular to what it was before.
     * 
     * Effectively this rotates it 90 degrees in a clockwise direction.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "perp",
    value: function perp() {
      var x = this.x;
      this._x = this.y;
      this._y = -x;
      return this;
    }
    /**
     * Rotate this Vector (counter-clockwise) by the specified angle (in radians).
     * 
     * @param {number} angle The angle to rotate (in radians).
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "rotate",
    value: function rotate(angle) {
      var x = this.x;
      var y = this.y;
      this._x = x * Math.cos(angle) - y * Math.sin(angle);
      this._y = x * Math.sin(angle) + y * Math.cos(angle);
      return this;
    }
    /**
     * Reverse this Vector.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "reverse",
    value: function reverse() {
      this._x = -this.x;
      this._y = -this.y;
      return this;
    }
    /**
     * Normalize this vector (make it have a length of `1`).
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "normalize",
    value: function normalize() {
      var d = this.len();

      if (d > 0) {
        this._x = this.x / d;
        this._y = this.y / d;
      }

      return this;
    }
    /**
     * Add another Vector to this one.
     * 
     * @param {Vector} other The other Vector.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "add",
    value: function add(other) {
      this._x += other.x;
      this._y += other.y;
      return this;
    }
    /**
     * Subtract another Vector from this one.
     * 
     * @param {Vector} other The other Vector.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "sub",
    value: function sub(other) {
      this._x -= other.x;
      this._y -= other.y;
      return this;
    }
    /**
     * Scale this Vector.
     * 
     * An independent scaling factor can be provided for each axis, or a single scaling factor will scale both `x` and `y`.
     * 
     * @param {number} x The scaling factor in the x direction.
     * @param {number} [y] The scaling factor in the y direction.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "scale",
    value: function scale(x, y) {
      this._x *= x;
      this._y *= typeof y != 'undefined' ? y : x;
      return this;
    }
    /**
     * Project this Vector onto another Vector.
     * 
     * @param {Vector} other The Vector to project onto.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "project",
    value: function project(other) {
      var amt = this.dot(other) / other.len2();
      this._x = amt * other.x;
      this._y = amt * other.y;
      return this;
    }
    /**
     * Project this Vector onto a Vector of unit length.
     * 
     * This is slightly more efficient than `project` when dealing with unit vectors.
     * 
     * @param {Vector} other The unit vector to project onto.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "projectN",
    value: function projectN(other) {
      var amt = this.dot(other);
      this._x = amt * other.x;
      this._y = amt * other.y;
      return this;
    }
    /**
     * Reflect this Vector on an arbitrary axis.
     * 
     * @param {Vector} axis The Vector representing the axis.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "reflect",
    value: function reflect(axis) {
      var x = this.x;
      var y = this.y;
      this.project(axis).scale(2);
      this._x -= x;
      this._y -= y;
      return this;
    }
    /**
     * Reflect this Vector on an arbitrary axis.
     * 
     * This is slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
     * 
     * @param {Vector} axis The Vector representing the axis.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "reflectN",
    value: function reflectN(axis) {
      var x = this.x;
      var y = this.y;
      this.projectN(axis).scale(2);
      this._x -= x;
      this._y -= y;
      return this;
    }
    /**
     * Get the dot product of this Vector and another.
     * 
     * @param {Vector} other The Vector to dot this one against.
     * 
     * @returns {number} Returns the dot product of this vector.
     */

  }, {
    key: "dot",
    value: function dot(other) {
      return this.x * other.x + this.y * other.y;
    }
    /**
     * Get the squared length of this Vector.
     * 
     * @returns {number} Returns the squared length of this vector.
     */

  }, {
    key: "len2",
    value: function len2() {
      return this.dot(this);
    }
    /**
     * Get the length of this Vector.
     * 
     * @returns {number} Returns the length of this vector.
     */

  }, {
    key: "len",
    value: function len() {
      return Math.sqrt(this.len2());
    }
  }, {
    key: "x",
    get: function get() {
      return this._x;
    }
    /**
     * Returns the y value of this vector.
     * 
     * @returns {number}
     */
    ,

    /**
     * Sets a new x value for this vector.
     * 
     * @param {number} x The new x value for this vector.
     */
    set: function set(x) {
      this._x = x;
    }
    /**
     * Sets a new y value for this vector.
     * 
     * @param {number} y The new y value for this vector.
     */

  }, {
    key: "y",
    get: function get() {
      return this._y;
    },
    set: function set(y) {
      this._y = y;
    }
  }]);

  return Vector;
}();

exports["default"] = Vector;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS92ZWN0b3IudHMiXSwibmFtZXMiOlsiVmVjdG9yIiwieCIsInkiLCJfeCIsIl95Iiwib3RoZXIiLCJhbmdsZSIsIk1hdGgiLCJjb3MiLCJzaW4iLCJkIiwibGVuIiwiYW10IiwiZG90IiwibGVuMiIsImF4aXMiLCJwcm9qZWN0Iiwic2NhbGUiLCJwcm9qZWN0TiIsInNxcnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLcUJBLE07QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7QUFJQSxvQkFBMEM7QUFBQSxRQUE5QkMsQ0FBOEIsdUVBQWxCLENBQWtCO0FBQUEsUUFBZkMsQ0FBZSx1RUFBSCxDQUFHOztBQUFBOztBQUFBLGdDQWZyQixDQWVxQjs7QUFBQSxnQ0FOckIsQ0FNcUI7O0FBQ3hDLFNBQUtDLEVBQUwsR0FBVUYsQ0FBVjtBQUVBLFNBQUtHLEVBQUwsR0FBVUYsQ0FBVjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7QUE0QkE7Ozs7Ozs7eUJBT0tHLEssRUFBdUI7QUFDMUIsV0FBS0YsRUFBTCxHQUFVRSxLQUFLLENBQUNKLENBQWhCO0FBQ0EsV0FBS0csRUFBTCxHQUFVQyxLQUFLLENBQUNILENBQWhCO0FBRUEsYUFBTyxJQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7NEJBS2dCO0FBQ2QsYUFBTyxJQUFJRixNQUFKLENBQVcsS0FBS0MsQ0FBaEIsRUFBbUIsS0FBS0MsQ0FBeEIsQ0FBUDtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7MkJBT2U7QUFDYixVQUFNRCxDQUFTLEdBQUcsS0FBS0EsQ0FBdkI7QUFFQSxXQUFLRSxFQUFMLEdBQVUsS0FBS0QsQ0FBZjtBQUNBLFdBQUtFLEVBQUwsR0FBVSxDQUFDSCxDQUFYO0FBRUEsYUFBTyxJQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7OzsyQkFPT0ssSyxFQUF1QjtBQUM1QixVQUFNTCxDQUFTLEdBQUcsS0FBS0EsQ0FBdkI7QUFDQSxVQUFNQyxDQUFTLEdB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V0FBS2QsRUFBTCxJQUFXRixDQUFYO0FBQ0EsV0FBS0csRUFBTCxJQUFXRixDQUFYO0FBRUEsYUFBTyxJQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozt3QkFPSUcsSyxFQUF1QjtBQUN6QixhQUFPLEtBQUtKLENBQUwsR0FBU0ksS0FBSyxDQUFDSixDQUFmLEdBQW1CLEtBQUtDLENBQUwsR0FBU0csS0FBSyxDQUFDSCxDQUF6QztBQUNEO0FBRUQ7Ozs7Ozs7OzJCQUtlO0FBQ2IsYUFBTyxLQUFLVyxHQUFMLENBQVMsSUFBVCxDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7MEJBS2M7QUFDWixhQUFPTixJQUFJLENBQUNZLElBQUwsQ0FBVSxLQUFLTCxJQUFMLEVBQVYsQ0FBUDtBQUNEOzs7d0JBN1BlO0FBQUUsYUFBTyxLQUFLWCxFQUFaO0FBQWlCO0FBRW5DOzs7Ozs7O0FBT0E7Ozs7O3NCQUtNRixDLEVBQVc7QUFBRSxXQUFLRSxFQUFMLEdBQVVGLENBQVY7QUFBYztBQUVqQzs7Ozs7Ozs7d0JBVGdCO0FBQUUsYUFBTyxLQUFLRyxFQUFaO0FBQWlCLEs7c0JBYzdCRixDLEVBQVc7QUFBRSxXQUFLRSxFQUFMLEdBQVVGLENBQVY7QUFBYyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuLyoqXHJcbiAqIFJlcHJlc2VudHMgYSB2ZWN0b3IgaW4gdHdvIGRpbWVuc2lvbnMgd2l0aCBgeGAgYW5kIGB5YCBwcm9wZXJ0aWVzLlxyXG4gKiBcclxuICogQ3JlYXRlIGEgbmV3IFZlY3Rvciwgb3B0aW9uYWxseSBwYXNzaW5nIGluIHRoZSBgeGAgYW5kIGB5YCBjb29yZGluYXRlcy4gSWYgYSBjb29yZGluYXRlIGlzIG5vdCBzcGVjaWZpZWQsIGl0IHdpbGwgYmUgc2V0IHRvIGAwYC5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFZlY3RvciB7XHJcbiAgLyoqXHJcbiAgICogVGhlIHggY29vcmRpbmF0ZSBvZiB0aGlzIHZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3g6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSB5IGNvb3JkaW5hdGUgb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF95OiBudW1iZXIgPSAwO1xyXG5cclxuICAvKipcclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3g9MF0gVGhlIHggY29vcmRpbmF0ZSBvZiB0aGlzIHZlY3Rvci5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3k9MF0gVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIHZlY3Rvci5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIgPSAwLCB5OiBudW1iZXIgPSAwKSB7XHJcbiAgICB0aGlzLl94ID0geDtcclxuXHJcbiAgICB0aGlzLl95ID0geTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHggdmFsdWUgb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgeCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5feDsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSB5IHZhbHVlIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9XHJcbiAgICovXHJcbiAgZ2V0IHkoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX3k7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0cyBhIG5ldyB4IHZhbHVlIGZvciB0aGlzIHZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgbmV3IHggdmFsdWUgZm9yIHRoaXMgdmVjdG9yLlxyXG4gICAqL1xyXG4gIHNldCB4KHg6IG51bWJlcikgeyB0aGlzLl94ID0geDsgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGEgbmV3IHkgdmFsdWUgZm9yIHRoaXMgdmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSBuZXcgeSB2YWx1ZSBmb3IgdGhpcyB2ZWN0b3IuXHJcbiAgICovXHJcbiAgc2V0IHkoeTogbnVtYmVyKSB7IHRoaXMuX3kgPSB5OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvcHkgdGhlIHZhbHVlcyBvZiBhbm90aGVyIFZlY3RvciBpbnRvIHRoaXMgb25lLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgY29weShvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIHRoaXMuX3ggPSBvdGhlci54O1xyXG4gICAgdGhpcy5feSA9IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGUgYSBuZXcgVmVjdG9yIHdpdGggdGhlIHNhbWUgY29vcmRpbmF0ZXMgYXMgdGhlIG9uZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBUaGUgbmV3IGNsb25lZCBWZWN0b3IuXHJcbiAgICovXHJcbiAgY2xvbmUoKTogVmVjdG9yIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yKHRoaXMueCwgdGhpcy55KTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoYW5nZSB0aGlzIFZlY3RvciB0byBiZSBwZXJwZW5kaWN1bGFyIHRvIHdoYXQgaXQgd2FzIGJlZm9yZS5cclxuICAgKiBcclxuICAgKiBFZmZlY3RpdmVseSB0aGlzIHJvdGF0ZXMgaXQgOTAgZGVncmVlcyBpbiBhIGNsb2Nrd2lzZSBkaXJlY3Rpb24uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwZXJwKCk6IFZlY3RvciB7XHJcbiAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLng7XHJcblxyXG4gICAgdGhpcy5feCA9IHRoaXMueTtcclxuICAgIHRoaXMuX3kgPSAteDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvdGF0ZSB0aGlzIFZlY3RvciAoY291bnRlci1jbG9ja3dpc2UpIGJ5IHRoZSBzcGVjaWZpZWQgYW5nbGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgYW5nbGUgdG8gcm90YXRlIChpbiByYWRpYW5zKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHJvdGF0ZShhbmdsZTogbnVtYmVyKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueDtcclxuICAgIGNvbnN0IHk6IG51bWJlciA9IHRoaXMueTtcclxuXHJcbiAgICB0aGlzLl94ID0geCAqIE1hdGguY29zKGFuZ2xlKSAtIHkgKiBNYXRoLnNpbihhbmdsZSk7XHJcbiAgICB0aGlzLl95ID0geCAqIE1hdGguc2luKGFuZ2xlKSArIHkgKiBNYXRoLmNvcyhhbmdsZSk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXZlcnNlIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcmV2ZXJzZSgpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy5feCA9IC10aGlzLng7XHJcbiAgICB0aGlzLl95ID0gLXRoaXMueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIE5vcm1hbGl6ZSB0aGlzIHZlY3RvciAobWFrZSBpdCBoYXZlIGEgbGVuZ3RoIG9mIGAxYCkuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBub3JtYWxpemUoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IGQ6IG51bWJlciA9IHRoaXMubGVuKCk7XHJcblxyXG4gICAgaWYgKGQgPiAwKSB7XHJcbiAgICAgIHRoaXMuX3ggPSB0aGlzLnggLyBkO1xyXG4gICAgICB0aGlzLl95ID0gdGhpcy55IC8gZDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEFkZCBhbm90aGVyIFZlY3RvciB0byB0aGlzIG9uZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIGFkZChvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIHRoaXMuX3ggKz0gb3RoZXIueDtcclxuICAgIHRoaXMuX3kgKz0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFN1YnRyYWN0IGFub3RoZXIgVmVjdG9yIGZyb20gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBzdWIob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICB0aGlzLl94IC09IG90aGVyLng7XHJcbiAgICB0aGlzLl95IC09IG90aGVyLnk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTY2FsZSB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBBbiBpbmRlcGVuZGVudCBzY2FsaW5nIGZhY3RvciBjYW4gYmUgcHJvdmlkZWQgZm9yIGVhY2ggYXhpcywgb3IgYSBzaW5nbGUgc2NhbGluZyBmYWN0b3Igd2lsbCBzY2FsZSBib3RoIGB4YCBhbmQgYHlgLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeCBkaXJlY3Rpb24uXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt5XSBUaGUgc2NhbGluZyBmYWN0b3IgaW4gdGhlIHkgZGlyZWN0aW9uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgc2NhbGUoeDogbnVtYmVyLCB5PzogbnVtYmVyKTogVmVjdG9yIHtcclxuICAgIHRoaXMuX3ggKj0geDtcclxuICAgIHRoaXMuX3kgKj0gdHlwZW9mIHkgIT0gJ3VuZGVmaW5lZCcgPyB5IDogeDtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhbm90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIFZlY3RvciB0byBwcm9qZWN0IG9udG8uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBwcm9qZWN0KG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgYW10OiBudW1iZXIgPSB0aGlzLmRvdChvdGhlcikgLyBvdGhlci5sZW4yKCk7XHJcblxyXG4gICAgdGhpcy5feCA9IGFtdCAqIG90aGVyLng7XHJcbiAgICB0aGlzLl95ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFByb2plY3QgdGhpcyBWZWN0b3Igb250byBhIFZlY3RvciBvZiB1bml0IGxlbmd0aC5cclxuICAgKiBcclxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHByb2plY3RgIHdoZW4gZGVhbGluZyB3aXRoIHVuaXQgdmVjdG9ycy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIHVuaXQgdmVjdG9yIHRvIHByb2plY3Qgb250by5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHByb2plY3ROKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgYW10OiBudW1iZXIgPSB0aGlzLmRvdChvdGhlcik7XHJcblxyXG4gICAgdGhpcy5feCA9IGFtdCAqIG90aGVyLng7XHJcbiAgICB0aGlzLl95ID0gYW10ICogb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmxlY3QgdGhpcyBWZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIFZlY3RvciByZXByZXNlbnRpbmcgdGhlIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICByZWZsZWN0KGF4aXM6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLng7XHJcbiAgICBjb25zdCB5OiBudW1iZXIgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy5wcm9qZWN0KGF4aXMpLnNjYWxlKDIpO1xyXG5cclxuICAgIHRoaXMuX3ggLT0geDtcclxuICAgIHRoaXMuX3kgLT0geTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJlZmxlY3QgdGhpcyBWZWN0b3Igb24gYW4gYXJiaXRyYXJ5IGF4aXMuXHJcbiAgICogXHJcbiAgICogVGhpcyBpcyBzbGlnaHRseSBtb3JlIGVmZmljaWVudCB0aGFuIGByZWZsZWN0YCB3aGVuIGRlYWxpbmcgd2l0aCBhbiBheGlzIHRoYXQgaXMgYSB1bml0IHZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYXhpcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHJlZmxlY3ROKGF4aXM6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCB4OiBudW1iZXIgPSB0aGlzLng7XHJcbiAgICBjb25zdCB5OiBudW1iZXIgPSB0aGlzLnk7XHJcblxyXG4gICAgdGhpcy5wcm9qZWN0TihheGlzKS5zY2FsZSgyKTtcclxuXHJcbiAgICB0aGlzLl94IC09IHg7XHJcbiAgICB0aGlzLl95IC09IHk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgVmVjdG9yIGFuZCBhbm90aGVyLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgVmVjdG9yIHRvIGRvdCB0aGlzIG9uZSBhZ2FpbnN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtudW1iZXJ9IFJldHVybnMgdGhlIGRvdCBwcm9kdWN0IG9mIHRoaXMgdmVjdG9yLlxyXG4gICAqL1xyXG4gIGRvdChvdGhlcjogVmVjdG9yKTogbnVtYmVyIHtcclxuICAgIHJldHVybiB0aGlzLnggKiBvdGhlci54ICsgdGhpcy55ICogb3RoZXIueTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgc3F1YXJlZCBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICovXHJcbiAgbGVuMigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMuZG90KHRoaXMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBsZW5ndGggb2YgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbGVuZ3RoIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAqL1xyXG4gIGxlbigpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIE1hdGguc3FydCh0aGlzLmxlbjIoKSk7XHJcbiAgfVxyXG59Il19