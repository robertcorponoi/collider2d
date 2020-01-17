'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Vector = _interopRequireDefault(require("../geometry/Vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * An object representing the result of an intersection containing:
 * - The two objects participating in the intersection
 * - The vector representing the minimum change necessary to extract the first object from the second one (as well as a unit vector in that direction and the magnitude of the overlap)
 * - Whether the first object is entirely inside the second, and vice versa.
 */
var CollisionDetails =
/*#__PURE__*/
function () {
  /**
   * The first collision object.
   * 
   * @property {Circle|Polygon}
   */

  /**
   * The second collision object.
   * 
   * @property {Circle|Polygon}
   */

  /**
   * A unit vector representing the direction and magnitude of the overlap.
   * 
   * @property {Vector}
   */

  /**
   * A vector representing the minimum change necessary to extract the first object from the second one.
   * 
   * @property {Vector}
   */

  /**
   * The amount that is overlapping.
   * 
   * @property {number}
   */

  /**
   * Returns true if the first collision object is completely in the second collision object.
   * 
   * @property {boolean}
   */

  /**
   * Returns true if the second collision object is completely in the first collision object.
   * 
   * @property {boolean}
   */
  function CollisionDetails() {
    _classCallCheck(this, CollisionDetails);

    _defineProperty(this, "a", void 0);

    _defineProperty(this, "b", void 0);

    _defineProperty(this, "overlapN", new _Vector["default"]());

    _defineProperty(this, "overlapV", new _Vector["default"]());

    _defineProperty(this, "overlap", Number.MAX_VALUE);

    _defineProperty(this, "aInB", true);

    _defineProperty(this, "bInA", true);

    this.clear();
  }
  /**
   * Set some values of the response back to their defaults.
   * 
   * Call this between tests if you are going to reuse a single CollisionDetails object for multiple intersection tests (recommended as it will avoid allcating extra memory)
   * 
   * @returns {CollisionDetails} Returns this for chaining.
   */


  _createClass(CollisionDetails, [{
    key: "clear",
    value: function clear() {
      this.aInB = true;
      this.bInA = true;
      this.overlap = Number.MAX_VALUE;
      return this;
    }
  }]);

  return CollisionDetails;
}();

exports["default"] = CollisionDetails;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9kZXRhaWxzL0NvbGxpc2lvbkRldGFpbHMudHMiXSwibmFtZXMiOlsiQ29sbGlzaW9uRGV0YWlscyIsIlZlY3RvciIsIk51bWJlciIsIk1BWF9WQUxVRSIsImNsZWFyIiwiYUluQiIsImJJbkEiLCJvdmVybGFwIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7QUFJQTs7Ozs7O0lBTXFCQSxnQjs7O0FBQ25COzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7Ozs7QUFPQTs7Ozs7O0FBT0E7Ozs7OztBQU9BOzs7OztBQU9BLDhCQUFjO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsc0NBOUJLLElBQUlDLGtCQUFKLEVBOEJMOztBQUFBLHNDQXZCSyxJQUFJQSxrQkFBSixFQXVCTDs7QUFBQSxxQ0FoQklDLE1BQU0sQ0FBQ0MsU0FnQlg7O0FBQUEsa0NBVEUsSUFTRjs7QUFBQSxrQ0FGRSxJQUVGOztBQUNaLFNBQUtDLEtBQUw7QUFDRDtBQUVEOzs7Ozs7Ozs7Ozs0QkFPMEI7QUFDeEIsV0FBS0MsSUFBTCxHQUFZLElBQVo7QUFDQSxXQUFLQyxJQUFMLEdBQVksSUFBWjtBQUVBLFdBQUtDLE9BQUwsR0FBZUwsTUFBTSxDQUFDQyxTQUF0QjtBQUVBLGFBQU8sSUFBUDtBQUNEIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4uL2dlb21ldHJ5L1ZlY3Rvcic7XHJcbmltcG9ydCBDaXJjbGUgZnJvbSAnLi4vZ2VvbWV0cnkvQ2lyY2xlJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi4vZ2VvbWV0cnkvUG9seWdvbic7XHJcblxyXG4vKipcclxuICogQW4gb2JqZWN0IHJlcHJlc2VudGluZyB0aGUgcmVzdWx0IG9mIGFuIGludGVyc2VjdGlvbiBjb250YWluaW5nOlxyXG4gKiAtIFRoZSB0d28gb2JqZWN0cyBwYXJ0aWNpcGF0aW5nIGluIHRoZSBpbnRlcnNlY3Rpb25cclxuICogLSBUaGUgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbWluaW11bSBjaGFuZ2UgbmVjZXNzYXJ5IHRvIGV4dHJhY3QgdGhlIGZpcnN0IG9iamVjdCBmcm9tIHRoZSBzZWNvbmQgb25lIChhcyB3ZWxsIGFzIGEgdW5pdCB2ZWN0b3IgaW4gdGhhdCBkaXJlY3Rpb24gYW5kIHRoZSBtYWduaXR1ZGUgb2YgdGhlIG92ZXJsYXApXHJcbiAqIC0gV2hldGhlciB0aGUgZmlyc3Qgb2JqZWN0IGlzIGVudGlyZWx5IGluc2lkZSB0aGUgc2Vjb25kLCBhbmQgdmljZSB2ZXJzYS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxpc2lvbkRldGFpbHMge1xyXG4gIC8qKlxyXG4gICAqIFRoZSBmaXJzdCBjb2xsaXNpb24gb2JqZWN0LlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Q2lyY2xlfFBvbHlnb259XHJcbiAgICovXHJcbiAgYSE6IChDaXJjbGV8UG9seWdvbik7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBzZWNvbmQgY29sbGlzaW9uIG9iamVjdC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0NpcmNsZXxQb2x5Z29ufVxyXG4gICAqL1xyXG4gIGIhOiAoQ2lyY2xlfFBvbHlnb24pO1xyXG5cclxuICAvKipcclxuICAgKiBBIHVuaXQgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgZGlyZWN0aW9uIGFuZCBtYWduaXR1ZGUgb2YgdGhlIG92ZXJsYXAuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtWZWN0b3J9XHJcbiAgICovXHJcbiAgb3ZlcmxhcE46IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBtaW5pbXVtIGNoYW5nZSBuZWNlc3NhcnkgdG8gZXh0cmFjdCB0aGUgZmlyc3Qgb2JqZWN0IGZyb20gdGhlIHNlY29uZCBvbmUuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtWZWN0b3J9XHJcbiAgICovXHJcbiAgb3ZlcmxhcFY6IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGFtb3VudCB0aGF0IGlzIG92ZXJsYXBwaW5nLlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIG92ZXJsYXA6IG51bWJlciA9IE51bWJlci5NQVhfVkFMVUU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZmlyc3QgY29sbGlzaW9uIG9iamVjdCBpcyBjb21wbGV0ZWx5IGluIHRoZSBzZWNvbmQgY29sbGlzaW9uIG9iamVjdC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgYUluQjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgc2Vjb25kIGNvbGxpc2lvbiBvYmplY3QgaXMgY29tcGxldGVseSBpbiB0aGUgZmlyc3QgY29sbGlzaW9uIG9iamVjdC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59XHJcbiAgICovXHJcbiAgYkluQTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5jbGVhcigpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHNvbWUgdmFsdWVzIG9mIHRoZSByZXNwb25zZSBiYWNrIHRvIHRoZWlyIGRlZmF1bHRzLlxyXG4gICAqIFxyXG4gICAqIENhbGwgdGhpcyBiZXR3ZWVuIHRlc3RzIGlmIHlvdSBhcmUgZ29pbmcgdG8gcmV1c2UgYSBzaW5nbGUgQ29sbGlzaW9uRGV0YWlscyBvYmplY3QgZm9yIG11bHRpcGxlIGludGVyc2VjdGlvbiB0ZXN0cyAocmVjb21tZW5kZWQgYXMgaXQgd2lsbCBhdm9pZCBhbGxjYXRpbmcgZXh0cmEgbWVtb3J5KVxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtDb2xsaXNpb25EZXRhaWxzfSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIGNsZWFyKCk6IENvbGxpc2lvbkRldGFpbHMge1xyXG4gICAgdGhpcy5hSW5CID0gdHJ1ZTtcclxuICAgIHRoaXMuYkluQSA9IHRydWU7XHJcblxyXG4gICAgdGhpcy5vdmVybGFwID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcbn0iXX0=