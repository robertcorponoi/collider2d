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

var Vector =
/*#__PURE__*/
function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9WZWN0b3IudHMiXSwibmFtZXMiOlsiVmVjdG9yIiwieCIsInkiLCJfeCIsIl95Iiwib3RoZXIiLCJhbmdsZSIsIk1hdGgiLCJjb3MiLCJzaW4iLCJkIiwibGVuIiwiYW10IiwiZG90IiwibGVuMiIsImF4aXMiLCJwcm9qZWN0Iiwic2NhbGUiLCJwcm9qZWN0TiIsInNxcnQiXSwibWFwcGluZ3MiOiJBQUFBO0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFLcUJBLE07OztBQUNuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7OztBQUlBLG9CQUEwQztBQUFBLFFBQTlCQyxDQUE4Qix1RUFBbEIsQ0FBa0I7QUFBQSxRQUFmQyxDQUFlLHVFQUFILENBQUc7O0FBQUE7O0FBQUEsZ0NBZnJCLENBZXFCOztBQUFBLGdDQU5yQixDQU1xQjs7QUFDeEMsU0FBS0MsRUFBTCxHQUFVRixDQUFWO0FBRUEsU0FBS0csRUFBTCxHQUFVRixDQUFWO0FBQ0Q7QUFFRDs7Ozs7Ozs7OztBQTRCQTs7Ozs7Ozt5QkFPS0csSyxFQUF1QjtBQUMxQixXQUFLRixFQUFMLEdBQVVFLEtBQUssQ0FBQ0osQ0FBaEI7QUFDQSxXQUFLRyxFQUFMLEdBQVVDLEtBQUssQ0FBQ0gsQ0FBaEI7QUFFQSxhQUFPLElBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs0QkFLZ0I7QUFDZCxhQUFPLElBQUlGLE1BQUosQ0FBVyxLQUFLQyxDQUFoQixFQUFtQixLQUFLQyxDQUF4QixDQUFQO0FBQ0Q7QUFFRDs7Ozs7Ozs7OzsyQkFPZTtBQUNiLFVBQU1ELENBQVMsR0FBRyxLQUFLQSxDQUF2QjtBQUVBLFdBQUtFLEVBQUwsR0FBVSxLQUFLRCxDQUFmO0FBQ0EsV0FBS0UsRUFBTCxHQUFVLENBQUNILENBQVg7QUFFQSxhQUFPLElBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7OzJCQU9PSyxLLEVBQXVCO0FBQzVCLFVBQU1MLENBQVMsR0FBRyxLQUFLQSxDQUF2QjtBQUNBLFVBQU1DLENBQVMs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QSxXQUFLZCxFQUFMLElBQVdGLENBQVg7QUFDQSxXQUFLRyxFQUFMLElBQVdGLENBQVg7QUFFQSxhQUFPLElBQVA7QUFDRDtBQUVEOzs7Ozs7Ozs7O3dCQU9JRyxLLEVBQXVCO0FBQ3pCLGFBQU8sS0FBS0osQ0FBTCxHQUFTSSxLQUFLLENBQUNKLENBQWYsR0FBbUIsS0FBS0MsQ0FBTCxHQUFTRyxLQUFLLENBQUNILENBQXpDO0FBQ0Q7QUFFRDs7Ozs7Ozs7MkJBS2U7QUFDYixhQUFPLEtBQUtXLEdBQUwsQ0FBUyxJQUFULENBQVA7QUFDRDtBQUVEOzs7Ozs7OzswQkFLYztBQUNaLGFBQU9OLElBQUksQ0FBQ1ksSUFBTCxDQUFVLEtBQUtMLElBQUwsRUFBVixDQUFQO0FBQ0Q7Ozt3QkE3UGU7QUFBRSxhQUFPLEtBQUtYLEVBQVo7QUFBaUI7QUFFbkM7Ozs7Ozs7QUFPQTs7Ozs7c0JBS01GLEMsRUFBVztBQUFFLFdBQUtFLEVBQUwsR0FBVUYsQ0FBVjtBQUFjO0FBRWpDOzs7Ozs7Ozt3QkFUZ0I7QUFBRSxhQUFPLEtBQUtHLEVBQVo7QUFBaUIsSztzQkFjN0JGLEMsRUFBVztBQUFFLFdBQUtFLEVBQUwsR0FBVUYsQ0FBVjtBQUFjIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhIHZlY3RvciBpbiB0d28gZGltZW5zaW9ucyB3aXRoIGB4YCBhbmQgYHlgIHByb3BlcnRpZXMuXHJcbiAqIFxyXG4gKiBDcmVhdGUgYSBuZXcgVmVjdG9yLCBvcHRpb25hbGx5IHBhc3NpbmcgaW4gdGhlIGB4YCBhbmQgYHlgIGNvb3JkaW5hdGVzLiBJZiBhIGNvb3JkaW5hdGUgaXMgbm90IHNwZWNpZmllZCwgaXQgd2lsbCBiZSBzZXQgdG8gYDBgLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmVjdG9yIHtcclxuICAvKipcclxuICAgKiBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfeDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHkgY29vcmRpbmF0ZSBvZiB0aGlzIHZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3k6IG51bWJlciA9IDA7XHJcblxyXG4gIC8qKlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeD0wXSBUaGUgeCBjb29yZGluYXRlIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbeT0wXSBUaGUgeSBjb29yZGluYXRlIG9mIHRoaXMgdmVjdG9yLlxyXG4gICAqL1xyXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciA9IDAsIHk6IG51bWJlciA9IDApIHtcclxuICAgIHRoaXMuX3ggPSB4O1xyXG5cclxuICAgIHRoaXMuX3kgPSB5O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgeCB2YWx1ZSBvZiB0aGlzIHZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCB4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLl94OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHkgdmFsdWUgb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgeSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5feTsgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXRzIGEgbmV3IHggdmFsdWUgZm9yIHRoaXMgdmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBuZXcgeCB2YWx1ZSBmb3IgdGhpcyB2ZWN0b3IuXHJcbiAgICovXHJcbiAgc2V0IHgoeDogbnVtYmVyKSB7IHRoaXMuX3ggPSB4OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldHMgYSBuZXcgeSB2YWx1ZSBmb3IgdGhpcyB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgVGhlIG5ldyB5IHZhbHVlIGZvciB0aGlzIHZlY3Rvci5cclxuICAgKi9cclxuICBzZXQgeSh5OiBudW1iZXIpIHsgdGhpcy5feSA9IHk7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29weSB0aGUgdmFsdWVzIG9mIGFub3RoZXIgVmVjdG9yIGludG8gdGhpcyBvbmUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBvdGhlciBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBjb3B5KG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy5feCA9IG90aGVyLng7XHJcbiAgICB0aGlzLl95ID0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZSBhIG5ldyBWZWN0b3Igd2l0aCB0aGUgc2FtZSBjb29yZGluYXRlcyBhcyB0aGUgb25lLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFRoZSBuZXcgY2xvbmVkIFZlY3Rvci5cclxuICAgKi9cclxuICBjbG9uZSgpOiBWZWN0b3Ige1xyXG4gICAgcmV0dXJuIG5ldyBWZWN0b3IodGhpcy54LCB0aGlzLnkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hhbmdlIHRoaXMgVmVjdG9yIHRvIGJlIHBlcnBlbmRpY3VsYXIgdG8gd2hhdCBpdCB3YXMgYmVmb3JlLlxyXG4gICAqIFxyXG4gICAqIEVmZmVjdGl2ZWx5IHRoaXMgcm90YXRlcyBpdCA5MCBkZWdyZWVzIGluIGEgY2xvY2t3aXNlIGRpcmVjdGlvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHBlcnAoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueDtcclxuXHJcbiAgICB0aGlzLl94ID0gdGhpcy55O1xyXG4gICAgdGhpcy5feSA9IC14O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUm90YXRlIHRoaXMgVmVjdG9yIChjb3VudGVyLWNsb2Nrd2lzZSkgYnkgdGhlIHNwZWNpZmllZCBhbmdsZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgeDogbnVtYmVyID0gdGhpcy54O1xyXG4gICAgY29uc3QgeTogbnVtYmVyID0gdGhpcy55O1xyXG5cclxuICAgIHRoaXMuX3ggPSB4ICogTWF0aC5jb3MoYW5nbGUpIC0geSAqIE1hdGguc2luKGFuZ2xlKTtcclxuICAgIHRoaXMuX3kgPSB4ICogTWF0aC5zaW4oYW5nbGUpICsgeSAqIE1hdGguY29zKGFuZ2xlKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldmVyc2UgdGhpcyBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICByZXZlcnNlKCk6IFZlY3RvciB7XHJcbiAgICB0aGlzLl94ID0gLXRoaXMueDtcclxuICAgIHRoaXMuX3kgPSAtdGhpcy55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogTm9ybWFsaXplIHRoaXMgdmVjdG9yIChtYWtlIGl0IGhhdmUgYSBsZW5ndGggb2YgYDFgKS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIG5vcm1hbGl6ZSgpOiBWZWN0b3Ige1xyXG4gICAgY29uc3QgZDogbnVtYmVyID0gdGhpcy5sZW4oKTtcclxuXHJcbiAgICBpZiAoZCA+IDApIHtcclxuICAgICAgdGhpcy5feCA9IHRoaXMueCAvIGQ7XHJcbiAgICAgIHRoaXMuX3kgPSB0aGlzLnkgLyBkO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQWRkIGFub3RoZXIgVmVjdG9yIHRvIHRoaXMgb25lLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgb3RoZXIgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgYWRkKG90aGVyOiBWZWN0b3IpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy5feCArPSBvdGhlci54O1xyXG4gICAgdGhpcy5feSArPSBvdGhlci55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU3VidHJhY3QgYW5vdGhlciBWZWN0b3IgZnJvbSB0aGlzIG9uZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb3RoZXIgVGhlIG90aGVyIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHN1YihvdGhlcjogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIHRoaXMuX3ggLT0gb3RoZXIueDtcclxuICAgIHRoaXMuX3kgLT0gb3RoZXIueTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNjYWxlIHRoaXMgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEFuIGluZGVwZW5kZW50IHNjYWxpbmcgZmFjdG9yIGNhbiBiZSBwcm92aWRlZCBmb3IgZWFjaCBheGlzLCBvciBhIHNpbmdsZSBzY2FsaW5nIGZhY3RvciB3aWxsIHNjYWxlIGJvdGggYHhgIGFuZCBgeWAuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHggVGhlIHNjYWxpbmcgZmFjdG9yIGluIHRoZSB4IGRpcmVjdGlvbi5cclxuICAgKiBAcGFyYW0ge251bWJlcn0gW3ldIFRoZSBzY2FsaW5nIGZhY3RvciBpbiB0aGUgeSBkaXJlY3Rpb24uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBzY2FsZSh4OiBudW1iZXIsIHk/OiBudW1iZXIpOiBWZWN0b3Ige1xyXG4gICAgdGhpcy5feCAqPSB4O1xyXG4gICAgdGhpcy5feSAqPSB0eXBlb2YgeSAhPSAndW5kZWZpbmVkJyA/IHkgOiB4O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvamVjdCB0aGlzIFZlY3RvciBvbnRvIGFub3RoZXIgVmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgVmVjdG9yIHRvIHByb2plY3Qgb250by5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHByb2plY3Qob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCBhbXQ6IG51bWJlciA9IHRoaXMuZG90KG90aGVyKSAvIG90aGVyLmxlbjIoKTtcclxuXHJcbiAgICB0aGlzLl94ID0gYW10ICogb3RoZXIueDtcclxuICAgIHRoaXMuX3kgPSBhbXQgKiBvdGhlci55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUHJvamVjdCB0aGlzIFZlY3RvciBvbnRvIGEgVmVjdG9yIG9mIHVuaXQgbGVuZ3RoLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgaXMgc2xpZ2h0bHkgbW9yZSBlZmZpY2llbnQgdGhhbiBgcHJvamVjdGAgd2hlbiBkZWFsaW5nIHdpdGggdW5pdCB2ZWN0b3JzLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBvdGhlciBUaGUgdW5pdCB2ZWN0b3IgdG8gcHJvamVjdCBvbnRvLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHJvamVjdE4ob3RoZXI6IFZlY3Rvcik6IFZlY3RvciB7XHJcbiAgICBjb25zdCBhbXQ6IG51bWJlciA9IHRoaXMuZG90KG90aGVyKTtcclxuXHJcbiAgICB0aGlzLl94ID0gYW10ICogb3RoZXIueDtcclxuICAgIHRoaXMuX3kgPSBhbXQgKiBvdGhlci55O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVmbGVjdCB0aGlzIFZlY3RvciBvbiBhbiBhcmJpdHJhcnkgYXhpcy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYXhpcyBUaGUgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgYXhpcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHJlZmxlY3QoYXhpczogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueDtcclxuICAgIGNvbnN0IHk6IG51bWJlciA9IHRoaXMueTtcclxuXHJcbiAgICB0aGlzLnByb2plY3QoYXhpcykuc2NhbGUoMik7XHJcblxyXG4gICAgdGhpcy5feCAtPSB4O1xyXG4gICAgdGhpcy5feSAtPSB5O1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmVmbGVjdCB0aGlzIFZlY3RvciBvbiBhbiBhcmJpdHJhcnkgYXhpcy5cclxuICAgKiBcclxuICAgKiBUaGlzIGlzIHNsaWdodGx5IG1vcmUgZWZmaWNpZW50IHRoYW4gYHJlZmxlY3RgIHdoZW4gZGVhbGluZyB3aXRoIGFuIGF4aXMgdGhhdCBpcyBhIHVuaXQgdmVjdG9yLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBheGlzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcmVmbGVjdE4oYXhpczogVmVjdG9yKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHg6IG51bWJlciA9IHRoaXMueDtcclxuICAgIGNvbnN0IHk6IG51bWJlciA9IHRoaXMueTtcclxuXHJcbiAgICB0aGlzLnByb2plY3ROKGF4aXMpLnNjYWxlKDIpO1xyXG5cclxuICAgIHRoaXMuX3ggLT0geDtcclxuICAgIHRoaXMuX3kgLT0geTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEdldCB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyBWZWN0b3IgYW5kIGFub3RoZXIuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG90aGVyIFRoZSBWZWN0b3IgdG8gZG90IHRoaXMgb25lIGFnYWluc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgZG90IHByb2R1Y3Qgb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICovXHJcbiAgZG90KG90aGVyOiBWZWN0b3IpOiBudW1iZXIge1xyXG4gICAgcmV0dXJuIHRoaXMueCAqIG90aGVyLnggKyB0aGlzLnkgKiBvdGhlci55O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogR2V0IHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBzcXVhcmVkIGxlbmd0aCBvZiB0aGlzIHZlY3Rvci5cclxuICAgKi9cclxuICBsZW4yKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gdGhpcy5kb3QodGhpcyk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGlzIFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBsZW5ndGggb2YgdGhpcyB2ZWN0b3IuXHJcbiAgICovXHJcbiAgbGVuKCk6IG51bWJlciB7XHJcbiAgICByZXR1cm4gTWF0aC5zcXJ0KHRoaXMubGVuMigpKTtcclxuICB9XHJcbn0iXX0=