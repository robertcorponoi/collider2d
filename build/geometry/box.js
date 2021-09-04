'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.BoxOrigin = void 0;

var _vector = _interopRequireDefault(require("./vector"));

var _polygon = _interopRequireDefault(require("./polygon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * a enum for quick assignment of common origins
 */
var BoxOrigin;
/**
 * A box represents an axis-aligned box with a width and height.
 */

exports.BoxOrigin = BoxOrigin;

(function (BoxOrigin) {
  BoxOrigin[BoxOrigin["center"] = 0] = "center";
  BoxOrigin[BoxOrigin["bottomLeft"] = 1] = "bottomLeft";
  BoxOrigin[BoxOrigin["bottomRight"] = 2] = "bottomRight";
  BoxOrigin[BoxOrigin["topRigth"] = 3] = "topRigth";
  BoxOrigin[BoxOrigin["topLeft"] = 4] = "topLeft";
})(BoxOrigin || (exports.BoxOrigin = BoxOrigin = {}));

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
   * The origin point of this box.
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * Creates a new Box, with the specified position, width, and height.
   * 
   * If no position is given, the position will be `(0, 0)`. If no width or height are given, they will be set to `0`.
   * 
   * @param {Vector} [position=new Vector()] The position of this box as a Vector.
   * @param {number} [width=0] The width of this box.
   * @param {number} [height=0] The height of this box.
   * @param {Vector | BoxOrigin} [origin=BoxOrigin.bottomLeft] the custom point of origin or common point of origin.
   */
  function Box() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _vector["default"]();
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var origin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : BoxOrigin.bottomLeft;

    _classCallCheck(this, Box);

    _defineProperty(this, "_position", new _vector["default"]());

    _defineProperty(this, "_width", 0);

    _defineProperty(this, "_height", 0);

    _defineProperty(this, "_origin", new _vector["default"]());

    this._position = position;
    this._width = width;
    this._height = height;
    this.setOrigin(origin);
  }
  /**
   * set the origin point of this Box.
   * 
   * @param {Vector | BoxOrigin} newOrigin the custom point of origin or common point of origin.
   */


  _createClass(Box, [{
    key: "setOrigin",
    value: function setOrigin(newOrigin) {
      this._origin = newOrigin instanceof _vector["default"] ? newOrigin : this._getCommonsOrigin(newOrigin);
    }
    /**
     * Returns a Polygon whose edges are the same as this Box.
     * 
     * @returns {Polygon} A new Polygon that represents this Box.
     */

  }, {
    key: "toPolygon",
    value: function toPolygon() {
      return new _polygon["default"](new _vector["default"](this._position.x, this._position.y), [new _vector["default"]().sub(this._origin), new _vector["default"](this._width, 0).sub(this._origin), new _vector["default"](this._width, this._height).sub(this._origin), new _vector["default"](0, this._height).sub(this._origin)]);
    }
    /**
     * Return the common origin point
     * 
     * @param {BoxOrigin} origin Common origin point type
     * @returns {Vector} Common origin point
     */

  }, {
    key: "_getCommonsOrigin",
    value: function _getCommonsOrigin(origin) {
      var _Origins;

      var Origins = (_Origins = {}, _defineProperty(_Origins, BoxOrigin.center, new _vector["default"](this._width / 2, this._height / 2)), _defineProperty(_Origins, BoxOrigin.bottomLeft, new _vector["default"]()), _defineProperty(_Origins, BoxOrigin.bottomRight, new _vector["default"](this._width, 0)), _defineProperty(_Origins, BoxOrigin.topRigth, new _vector["default"](this._width, this._height)), _defineProperty(_Origins, BoxOrigin.topLeft, new _vector["default"](0, this._height)), _Origins);
      return Origins[origin];
    }
  }]);

  return Box;
}();

exports["default"] = Box;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9ib3gudHMiXSwibmFtZXMiOlsiQm94T3JpZ2luIiwiQm94IiwicG9zaXRpb24iLCJWZWN0b3IiLCJ3aWR0aCIsImhlaWdodCIsIm9yaWdpbiIsImJvdHRvbUxlZnQiLCJfcG9zaXRpb24iLCJfd2lkdGgiLCJfaGVpZ2h0Iiwic2V0T3JpZ2luIiwibmV3T3JpZ2luIiwiX29yaWdpbiIsIl9nZXRDb21tb25zT3JpZ2luIiwiUG9seWdvbiIsIngiLCJ5Iiwic3ViIiwiT3JpZ2lucyIsImNlbnRlciIsImJvdHRvbVJpZ2h0IiwidG9wUmlndGgiLCJ0b3BMZWZ0Il0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTtBQUNBO0FBQ0E7SUFDWUEsUztBQVFaO0FBQ0E7QUFDQTs7OztXQVZZQSxTO0FBQUFBLEVBQUFBLFMsQ0FBQUEsUztBQUFBQSxFQUFBQSxTLENBQUFBLFM7QUFBQUEsRUFBQUEsUyxDQUFBQSxTO0FBQUFBLEVBQUFBLFMsQ0FBQUEsUztBQUFBQSxFQUFBQSxTLENBQUFBLFM7R0FBQUEsUyx5QkFBQUEsUzs7SUFXU0MsRztBQUNuQjtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNFLGlCQUF1STtBQUFBLFFBQTNIQyxRQUEySCx1RUFBeEcsSUFBSUMsa0JBQUosRUFBd0c7QUFBQSxRQUExRkMsS0FBMEYsdUVBQTFFLENBQTBFO0FBQUEsUUFBdkVDLE1BQXVFLHVFQUF0RCxDQUFzRDtBQUFBLFFBQW5EQyxNQUFtRCx1RUFBdEJOLFNBQVMsQ0FBQ08sVUFBWTs7QUFBQTs7QUFBQSx1Q0F2QzNHLElBQUlKLGtCQUFKLEVBdUMyRzs7QUFBQSxvQ0E5QjlHLENBOEI4Rzs7QUFBQSxxQ0FyQjdHLENBcUI2Rzs7QUFBQSxxQ0FaN0csSUFBSUEsa0JBQUosRUFZNkc7O0FBQ3JJLFNBQUtLLFNBQUwsR0FBaUJOLFFBQWpCO0FBQ0EsU0FBS08sTUFBTCxHQUFjTCxLQUFkO0FBQ0EsU0FBS00sT0FBTCxHQUFlTCxNQUFmO0FBQ0EsU0FBS00sU0FBTCxDQUFlTCxNQUFmO0FBRUQ7QUFFRDtBQUNGO0FBQ0E7QUFDQTtBQUNBOzs7OztXQUNFLG1CQUFVTSxTQUFWLEVBQTZDO0FBQzNDLFdBQUtDLE9BQUwsR0FBZ0JELFNBQVMsWUFBYVQsa0JBQXZCLEdBQStCUyxTQUEvQixHQUF5QyxLQUFLRSxpQkFBTCxDQUF1QkYsU0FBdkIsQ0FBeEQ7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7Ozs7V0FDRSxxQkFBcUI7QUFDbkIsYUFBTyxJQUFJRyxtQkFBSixDQUFZLElBQUlaLGtCQUFKLENBQVcsS0FBS0ssU0FBTCxDQUFlUSxDQUExQixFQUE2QixLQUFLUixTQUFMLENBQWVTLENBQTVDLENBQVosRUFBNEQsQ0FDakUsSUFBSWQsa0JBQUosR0FBYWUsR0FBYixDQUFpQixLQUFLTCxPQUF0QixDQURpRSxFQUNqQyxJQUFJVixrQkFBSixDQUFXLEtBQUtNLE1BQWhCLEVBQXdCLENBQXhCLEVBQTJCUyxHQUEzQixDQUErQixLQUFLTCxPQUFwQyxDQURpQyxFQUVqRSxJQUFJVixrQkFBSixDQUFXLEtBQUtNLE1BQWhCLEVBQXdCLEtBQUtDLE9BQTdCLEVBQXNDUSxHQUF0QyxDQUEwQyxLQUFLTCxPQUEvQyxDQUZpRSxFQUVSLElBQUlWLGtCQUFKLENBQVcsQ0FBWCxFQUFjLEtBQUtPLE9BQW5CLEVBQTRCUSxHQUE1QixDQUFnQyxLQUFLTCxPQUFyQyxDQUZRLENBQTVELENBQVA7QUFJRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztXQUNFLDJCQUE0QlAsTUFBNUIsRUFBcUQ7QUFBQTs7QUFDbkQsVUFBSWEsT0FBTyw2Q0FDUm5CLFNBQVMsQ0FBQ29CLE1BREYsRUFDVyxJQUFJakIsa0JBQUosQ0FBVyxLQUFLTSxNQUFMLEdBQVksQ0FBdkIsRUFBeUIsS0FBS0MsT0FBTCxHQUFhLENBQXRDLENBRFgsNkJBRVJWLFNBQVMsQ0FBQ08sVUFGRixFQUVlLElBQUlKLGtCQUFKLEVBRmYsNkJBR1JILFNBQVMsQ0FBQ3FCLFdBSEYsRUFHZ0IsSUFBSWxCLGtCQUFKLENBQVcsS0FBS00sTUFBaEIsRUFBdUIsQ0FBdkIsQ0FIaEIsNkJBSVJULFNBQVMsQ0FBQ3NCLFFBSkYsRUFJYSxJQUFJbkIsa0JBQUosQ0FBVyxLQUFLTSxNQUFoQixFQUF1QixLQUFLQyxPQUE1QixDQUpiLDZCQUtSVixTQUFTLENBQUN1QixPQUxGLEVBS1ksSUFBSXBCLGtCQUFKLENBQVcsQ0FBWCxFQUFhLEtBQUtPLE9BQWxCLENBTFosWUFBWDtBQU9BLGFBQU9TLE9BQU8sQ0FBQ2IsTUFBRCxDQUFkO0FBQ0QiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi92ZWN0b3InO1xyXG5pbXBvcnQgUG9seWdvbiBmcm9tICcuL3BvbHlnb24nO1xyXG5cclxuLyoqXHJcbiAqIGEgZW51bSBmb3IgcXVpY2sgYXNzaWdubWVudCBvZiBjb21tb24gb3JpZ2luc1xyXG4gKi9cclxuZXhwb3J0IGVudW0gQm94T3JpZ2luIHtcclxuICBjZW50ZXIsXHJcbiAgYm90dG9tTGVmdCxcclxuICBib3R0b21SaWdodCxcclxuICB0b3BSaWd0aCxcclxuICB0b3BMZWZ0LFxyXG59XHJcblxyXG4vKipcclxuICogQSBib3ggcmVwcmVzZW50cyBhbiBheGlzLWFsaWduZWQgYm94IHdpdGggYSB3aWR0aCBhbmQgaGVpZ2h0LlxyXG4gKi9cclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQm94IHtcclxuICAvKipcclxuICAgKiBUaGUgcG9zaXRpb24gb2YgdGhpcyBib3ggYXMgYSBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1ZlY3Rvcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9wb3NpdGlvbjogVmVjdG9yID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICAvKipcclxuICAgKiBUaGUgd2lkdGggb2YgdGhpcyBib3guXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGhlaWdodCBvZiB0aGlzIGJveC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2hlaWdodDogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG9yaWdpbiBwb2ludCBvZiB0aGlzIGJveC5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7VmVjdG9yfVxyXG4gICAqL1xyXG4gICBwcml2YXRlIF9vcmlnaW46VmVjdG9yID0gbmV3IFZlY3RvcigpO1xyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IEJveCwgd2l0aCB0aGUgc3BlY2lmaWVkIHBvc2l0aW9uLCB3aWR0aCwgYW5kIGhlaWdodC5cclxuICAgKiBcclxuICAgKiBJZiBubyBwb3NpdGlvbiBpcyBnaXZlbiwgdGhlIHBvc2l0aW9uIHdpbGwgYmUgYCgwLCAwKWAuIElmIG5vIHdpZHRoIG9yIGhlaWdodCBhcmUgZ2l2ZW4sIHRoZXkgd2lsbCBiZSBzZXQgdG8gYDBgLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBbcG9zaXRpb249bmV3IFZlY3RvcigpXSBUaGUgcG9zaXRpb24gb2YgdGhpcyBib3ggYXMgYSBWZWN0b3IuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFt3aWR0aD0wXSBUaGUgd2lkdGggb2YgdGhpcyBib3guXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IFtoZWlnaHQ9MF0gVGhlIGhlaWdodCBvZiB0aGlzIGJveC5cclxuICAgKiBAcGFyYW0ge1ZlY3RvciB8IEJveE9yaWdpbn0gW29yaWdpbj1Cb3hPcmlnaW4uYm90dG9tTGVmdF0gdGhlIGN1c3RvbSBwb2ludCBvZiBvcmlnaW4gb3IgY29tbW9uIHBvaW50IG9mIG9yaWdpbi5cclxuICAgKi9cclxuICBjb25zdHJ1Y3Rvcihwb3NpdGlvbjogVmVjdG9yID0gbmV3IFZlY3RvcigpLCB3aWR0aDogbnVtYmVyID0gMCwgaGVpZ2h0OiBudW1iZXIgPSAwLCBvcmlnaW46IFZlY3RvciB8IEJveE9yaWdpbiA9IEJveE9yaWdpbi5ib3R0b21MZWZ0KSB7XHJcbiAgICB0aGlzLl9wb3NpdGlvbiA9IHBvc2l0aW9uO1xyXG4gICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcclxuICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcclxuICAgIHRoaXMuc2V0T3JpZ2luKG9yaWdpbik7XHJcbiAgICBcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogc2V0IHRoZSBvcmlnaW4gcG9pbnQgb2YgdGhpcyBCb3guXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3IgfCBCb3hPcmlnaW59IG5ld09yaWdpbiB0aGUgY3VzdG9tIHBvaW50IG9mIG9yaWdpbiBvciBjb21tb24gcG9pbnQgb2Ygb3JpZ2luLlxyXG4gICAqL1xyXG4gIHNldE9yaWdpbihuZXdPcmlnaW46VmVjdG9yIHwgQm94T3JpZ2luKTp2b2lkIHtcclxuICAgIHRoaXMuX29yaWdpbiA9IChuZXdPcmlnaW4gaW5zdGFuY2VvZiAgVmVjdG9yKT9uZXdPcmlnaW46dGhpcy5fZ2V0Q29tbW9uc09yaWdpbihuZXdPcmlnaW4pO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIFBvbHlnb24gd2hvc2UgZWRnZXMgYXJlIHRoZSBzYW1lIGFzIHRoaXMgQm94LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBBIG5ldyBQb2x5Z29uIHRoYXQgcmVwcmVzZW50cyB0aGlzIEJveC5cclxuICAgKi9cclxuICB0b1BvbHlnb24oKTogUG9seWdvbiB7XHJcbiAgICByZXR1cm4gbmV3IFBvbHlnb24obmV3IFZlY3Rvcih0aGlzLl9wb3NpdGlvbi54LCB0aGlzLl9wb3NpdGlvbi55KSwgW1xyXG4gICAgICBuZXcgVmVjdG9yKCkuc3ViKHRoaXMuX29yaWdpbiksIG5ldyBWZWN0b3IodGhpcy5fd2lkdGgsIDApLnN1Yih0aGlzLl9vcmlnaW4pLFxyXG4gICAgICBuZXcgVmVjdG9yKHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpLnN1Yih0aGlzLl9vcmlnaW4pLCBuZXcgVmVjdG9yKDAsIHRoaXMuX2hlaWdodCkuc3ViKHRoaXMuX29yaWdpbilcclxuICAgIF0pO1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBSZXR1cm4gdGhlIGNvbW1vbiBvcmlnaW4gcG9pbnRcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0JveE9yaWdpbn0gb3JpZ2luIENvbW1vbiBvcmlnaW4gcG9pbnQgdHlwZVxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9IENvbW1vbiBvcmlnaW4gcG9pbnRcclxuICAgKi9cclxuICBwcm90ZWN0ZWQgX2dldENvbW1vbnNPcmlnaW4ob3JpZ2luOkJveE9yaWdpbik6VmVjdG9yIHtcclxuICAgIGxldCBPcmlnaW5zID0ge1xyXG4gICAgICBbQm94T3JpZ2luLmNlbnRlcl06IG5ldyBWZWN0b3IodGhpcy5fd2lkdGgvMix0aGlzLl9oZWlnaHQvMiksXHJcbiAgICAgIFtCb3hPcmlnaW4uYm90dG9tTGVmdF06IG5ldyBWZWN0b3IoKSxcclxuICAgICAgW0JveE9yaWdpbi5ib3R0b21SaWdodF06IG5ldyBWZWN0b3IodGhpcy5fd2lkdGgsMCksXHJcbiAgICAgIFtCb3hPcmlnaW4udG9wUmlndGhdOiBuZXcgVmVjdG9yKHRoaXMuX3dpZHRoLHRoaXMuX2hlaWdodCksXHJcbiAgICAgIFtCb3hPcmlnaW4udG9wTGVmdF06IG5ldyBWZWN0b3IoMCx0aGlzLl9oZWlnaHQpXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIE9yaWdpbnNbb3JpZ2luXTtcclxuICB9XHJcbn0iXX0=