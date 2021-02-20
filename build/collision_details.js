'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vector = _interopRequireDefault(require("./geometry/vector"));

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
var CollisionDetails = /*#__PURE__*/function () {
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

    _defineProperty(this, "overlapN", new _vector["default"]());

    _defineProperty(this, "overlapV", new _vector["default"]());

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xsaXNpb25fZGV0YWlscy50cyJdLCJuYW1lcyI6WyJDb2xsaXNpb25EZXRhaWxzIiwiVmVjdG9yIiwiTnVtYmVyIiwiTUFYX1ZBTFVFIiwiY2xlYXIiLCJhSW5CIiwiYkluQSIsIm92ZXJsYXAiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtJQUNxQkEsZ0I7QUFDbkI7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUdFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBOztBQUdFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7O0FBR0U7QUFDRjtBQUNBO0FBQ0E7QUFDQTtBQUdFLDhCQUFjO0FBQUE7O0FBQUE7O0FBQUE7O0FBQUEsc0NBOUJLLElBQUlDLGtCQUFKLEVBOEJMOztBQUFBLHNDQXZCSyxJQUFJQSxrQkFBSixFQXVCTDs7QUFBQSxxQ0FoQklDLE1BQU0sQ0FBQ0MsU0FnQlg7O0FBQUEsa0NBVEUsSUFTRjs7QUFBQSxrQ0FGRSxJQUVGOztBQUNaLFNBQUtDLEtBQUw7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztXQUNFLGlCQUEwQjtBQUN4QixXQUFLQyxJQUFMLEdBQVksSUFBWjtBQUNBLFdBQUtDLElBQUwsR0FBWSxJQUFaO0FBRUEsV0FBS0MsT0FBTCxHQUFlTCxNQUFNLENBQUNDLFNBQXRCO0FBRUEsYUFBTyxJQUFQO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9nZW9tZXRyeS92ZWN0b3InO1xyXG5pbXBvcnQgQ2lyY2xlIGZyb20gJy4vZ2VvbWV0cnkvY2lyY2xlJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9nZW9tZXRyeS9wb2x5Z29uJztcclxuXHJcbi8qKlxyXG4gKiBBbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSByZXN1bHQgb2YgYW4gaW50ZXJzZWN0aW9uIGNvbnRhaW5pbmc6XHJcbiAqIC0gVGhlIHR3byBvYmplY3RzIHBhcnRpY2lwYXRpbmcgaW4gdGhlIGludGVyc2VjdGlvblxyXG4gKiAtIFRoZSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBtaW5pbXVtIGNoYW5nZSBuZWNlc3NhcnkgdG8gZXh0cmFjdCB0aGUgZmlyc3Qgb2JqZWN0IGZyb20gdGhlIHNlY29uZCBvbmUgKGFzIHdlbGwgYXMgYSB1bml0IHZlY3RvciBpbiB0aGF0IGRpcmVjdGlvbiBhbmQgdGhlIG1hZ25pdHVkZSBvZiB0aGUgb3ZlcmxhcClcclxuICogLSBXaGV0aGVyIHRoZSBmaXJzdCBvYmplY3QgaXMgZW50aXJlbHkgaW5zaWRlIHRoZSBzZWNvbmQsIGFuZCB2aWNlIHZlcnNhLlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ29sbGlzaW9uRGV0YWlscyB7XHJcbiAgLyoqXHJcbiAgICogVGhlIGZpcnN0IGNvbGxpc2lvbiBvYmplY3QuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtDaXJjbGV8UG9seWdvbn1cclxuICAgKi9cclxuICBhITogKENpcmNsZXxQb2x5Z29uKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIHNlY29uZCBjb2xsaXNpb24gb2JqZWN0LlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Q2lyY2xlfFBvbHlnb259XHJcbiAgICovXHJcbiAgYiE6IChDaXJjbGV8UG9seWdvbik7XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgdW5pdCB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBkaXJlY3Rpb24gYW5kIG1hZ25pdHVkZSBvZiB0aGUgb3ZlcmxhcC5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1ZlY3Rvcn1cclxuICAgKi9cclxuICBvdmVybGFwTjogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICAvKipcclxuICAgKiBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIG1pbmltdW0gY2hhbmdlIG5lY2Vzc2FyeSB0byBleHRyYWN0IHRoZSBmaXJzdCBvYmplY3QgZnJvbSB0aGUgc2Vjb25kIG9uZS5cclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1ZlY3Rvcn1cclxuICAgKi9cclxuICBvdmVybGFwVjogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgYW1vdW50IHRoYXQgaXMgb3ZlcmxhcHBpbmcuXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgb3ZlcmxhcDogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBmaXJzdCBjb2xsaXNpb24gb2JqZWN0IGlzIGNvbXBsZXRlbHkgaW4gdGhlIHNlY29uZCBjb2xsaXNpb24gb2JqZWN0LlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBhSW5COiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBzZWNvbmQgY29sbGlzaW9uIG9iamVjdCBpcyBjb21wbGV0ZWx5IGluIHRoZSBmaXJzdCBjb2xsaXNpb24gb2JqZWN0LlxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn1cclxuICAgKi9cclxuICBiSW5BOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmNsZWFyKCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgc29tZSB2YWx1ZXMgb2YgdGhlIHJlc3BvbnNlIGJhY2sgdG8gdGhlaXIgZGVmYXVsdHMuXHJcbiAgICogXHJcbiAgICogQ2FsbCB0aGlzIGJldHdlZW4gdGVzdHMgaWYgeW91IGFyZSBnb2luZyB0byByZXVzZSBhIHNpbmdsZSBDb2xsaXNpb25EZXRhaWxzIG9iamVjdCBmb3IgbXVsdGlwbGUgaW50ZXJzZWN0aW9uIHRlc3RzIChyZWNvbW1lbmRlZCBhcyBpdCB3aWxsIGF2b2lkIGFsbGNhdGluZyBleHRyYSBtZW1vcnkpXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge0NvbGxpc2lvbkRldGFpbHN9IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgY2xlYXIoKTogQ29sbGlzaW9uRGV0YWlscyB7XHJcbiAgICB0aGlzLmFJbkIgPSB0cnVlO1xyXG4gICAgdGhpcy5iSW5BID0gdHJ1ZTtcclxuXHJcbiAgICB0aGlzLm92ZXJsYXAgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxufSJdfQ==