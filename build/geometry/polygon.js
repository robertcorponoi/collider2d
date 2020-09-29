'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _vector = _interopRequireDefault(require("./vector"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Represents a *convex* polygon with any number of points (specified in counter-clockwise order).
 * 
 * Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the provided  setters. 
 * Otherwise the calculated properties will not be updated correctly.
 * 
 * The `pos` property can be changed directly.
 */
var Polygon = /*#__PURE__*/function () {
  /**
   * A vector representing the origin of this polygon (all other points are relative to this one).
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * An array of vectors representing the points in the polygon, in counter-clockwise order.
   * 
   * @private
   * 
   * @property {Array<Vector>}
   */

  /**
   * The angle of this polygon.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * The offset of this polygon.
   * 
   * @private
   * 
   * @property {Vector}
   */

  /**
   * The calculated points of this polygon.
   * 
   * @private
   * 
   * @property {Array<Vector>}
   */

  /**
   * The edges of this polygon.
   * 
   * @private
   * 
   * @property {Array<Vector>}
   */

  /**
   * The normals of this polygon.
   * 
   * @private
   * 
   * @property {Array<Vector>}
   */

  /**
   * Create a new polygon, passing in a position vector, and an array of points (represented by vectors 
   * relative to the position vector). If no position is passed in, the position of the polygon will be `(0,0)`.
   * 
   * @param {Vector} [position=Vector] A vector representing the origin of the polygon (all other points are relative to this one)
   * @param {Array<Vector>} [points=[]] An array of vectors representing the points in the polygon, in counter-clockwise order.
   */
  function Polygon() {
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _vector["default"]();
    var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Polygon);

    _defineProperty(this, "_position", new _vector["default"]());

    _defineProperty(this, "_points", []);

    _defineProperty(this, "_angle", 0);

    _defineProperty(this, "_offset", new _vector["default"]());

    _defineProperty(this, "_calcPoints", []);

    _defineProperty(this, "_edges", []);

    _defineProperty(this, "_normals", []);

    this._position = position;
    this.setPoints(points);
  }
  /**
   * Returns the position of this polygon.
   * 
   * @returns {Vector}
   */


  _createClass(Polygon, [{
    key: "setPoints",

    /**
     * Set the points of the polygon. Any consecutive duplicate points will be combined.
     * 
     * Note: The points are counter-clockwise *with respect to the coordinate system*. If you directly draw the points on a screen 
     * that has the origin at the top-left corner it will _appear_ visually that the points are being specified clockwise. This is 
     * just because of the inversion of the Y-axis when being displayed.
     * 
     * @param {Array<Vector>} points An array of vectors representing the points in the polygon, in counter-clockwise order.
     *    * 
     * @returns {Polygon} Returns this for chaining.
     */
    value: function setPoints(points) {
      // Only re-allocate if this is a new polygon or the number of points has changed.
      var lengthChanged = !this.points || this.points.length !== points.length;

      if (lengthChanged) {
        var i;
        var calcPoints = this._calcPoints = [];
        var edges = this._edges = [];
        var normals = this._normals = []; // Allocate the vector arrays for the calculated properties

        for (i = 0; i < points.length; i++) {
          // Remove consecutive duplicate points
          var p1 = points[i];
          var p2 = i < points.length - 1 ? points[i + 1] : points[0];

          if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {
            points.splice(i, 1);
            i -= 1;
            continue;
          }

          calcPoints.push(new _vector["default"]());
          edges.push(new _vector["default"]());
          normals.push(new _vector["default"]());
        }
      }

      this._points = points;

      this._recalc();

      return this;
    }
    /**
     * Set the current rotation angle of the polygon.
     * 
     * @param {number} angle The current rotation angle (in radians).
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "setAngle",
    value: function setAngle(angle) {
      this._angle = angle;

      this._recalc();

      return this;
    }
    /**
     * Set the current offset to apply to the `points` before applying the `angle` rotation.
     * 
     * @param {Vector} offset The new offset Vector.
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "setOffset",
    value: function setOffset(offset) {
      this._offset = offset;

      this._recalc();

      return this;
    }
    /**
     * Rotates this Polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `position`).
     * 
     * Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
     * 
     * @param {number} angle The angle to rotate (in radians).
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "rotate",
    value: function rotate(angle) {
      var points = this.points;
      var len = points.length;

      for (var i = 0; i < len; i++) {
        points[i].rotate(angle);
      }

      this._recalc();

      return this;
    }
    /**
     * Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate system* (i.e. `position`).
     * 
     * Note: This changes the **original** points (so any `offset` will be applied on top of this translation)
     * 
     * @param {number} x The horizontal amount to translate.
     * @param {number} y The vertical amount to translate.
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "translate",
    value: function translate(x, y) {
      var points = this.points;
      var len = points.length;

      for (var i = 0; i < len; i++) {
        points[i].x += x;
        points[i].y += y;
      }

      this._recalc();

      return this;
    }
    /**
     * Computes the calculated collision Polygon.
     * 
     * This applies the `angle` and `offset` to the original points then recalculates the edges and normals of the collision Polygon.
     * 
     * @private
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "_recalc",
    value: function _recalc() {
      // Calculated points - this is what is used for underlying collisions and takes into account
      // the angle/offset set on the polygon.
      var calcPoints = this.calcPoints; // The edges here are the direction of the `n`th edge of the polygon, relative to
      // the `n`th point. If you want to draw a given edge from the edge value, you must
      // first translate to the position of the starting point.

      var edges = this._edges; // The normals here are the direction of the normal for the `n`th edge of the polygon, relative
      // to the position of the `n`th point. If you want to draw an edge normal, you must first
      // translate to the position of the starting point.

      var normals = this._normals; // Copy the original points array and apply the offset/angle

      var points = this.points;
      var offset = this.offset;
      var angle = this.angle;
      var len = points.length;
      var i;

      for (i = 0; i < len; i++) {
        var calcPoint = calcPoints[i].copy(points[i]);
        calcPoint.x += offset.x;
        calcPoint.y += offset.y;
        if (angle !== 0) calcPoint.rotate(angle);
      } // Calculate the edges/normals


      for (i = 0; i < len; i++) {
        var p1 = calcPoints[i];
        var p2 = i < len - 1 ? calcPoints[i + 1] : calcPoints[0];
        var e = edges[i].copy(p2).sub(p1);
        normals[i].copy(e).perp().normalize();
      }

      return this;
    }
    /**
     * Compute the axis-aligned bounding box.
     * 
     * Any current state (translations/rotations) will be applied before constructing the AABB.
     * 
     * Note: Returns a _new_ `Polygon` each time you call this.
     * 
     * @returns {Polygon} Returns this for chaining.
     */

  }, {
    key: "getAABB",
    value: function getAABB() {
      var points = this.calcPoints;
      var len = points.length;
      var xMin = points[0].x;
      var yMin = points[0].y;
      var xMax = points[0].x;
      var yMax = points[0].y;

      for (var i = 1; i < len; i++) {
        var point = points[i];
        if (point["x"] < xMin) xMin = point["x"];else if (point["x"] > xMax) xMax = point["x"];
        if (point["y"] < yMin) yMin = point["y"];else if (point["y"] > yMax) yMax = point["y"];
      }

      return new Polygon(this._position.clone().add(new _vector["default"](xMin, yMin)), [new _vector["default"](), new _vector["default"](xMax - xMin, 0), new _vector["default"](xMax - xMin, yMax - yMin), new _vector["default"](0, yMax - yMin)]);
    }
    /**
     * Compute the centroid (geometric center) of the Polygon.
     * 
     * Any current state (translations/rotations) will be applied before computing the centroid.
     * 
     * See https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon
     * 
     * Note: Returns a _new_ `Vector` each time you call this.
     * 
     * @returns {Vector} Returns a Vector that contains the coordinates of the centroid.
     */

  }, {
    key: "getCentroid",
    value: function getCentroid() {
      var points = this.calcPoints;
      var len = points.length;
      var cx = 0;
      var cy = 0;
      var ar = 0;

      for (var i = 0; i < len; i++) {
        var p1 = points[i];
        var p2 = i === len - 1 ? points[0] : points[i + 1]; // Loop around if last point

        var a = p1["x"] * p2["y"] - p2["x"] * p1["y"];
        cx += (p1["x"] + p2["x"]) * a;
        cy += (p1["y"] + p2["y"]) * a;
        ar += a;
      }

      ar = ar * 3; // we want 1 / 6 the area and we currently have 2*area

      cx = cx / ar;
      cy = cy / ar;
      return new _vector["default"](cx, cy);
    }
  }, {
    key: "position",
    get: function get() {
      return this._position;
    }
    /**
     * **Note:** Not sure if this will be kept or not but for now it's disabled.
     * 
     * Sets a new position for this polygon and recalculates the points.
     * 
     * @param {Vector} position A Vector representing the new position of this polygon.
     */
    // set position(position: Vector) {
    //   const diffX: number = -(this._position.x - position.x);
    //   const diffY: number = -(this._position.y - position.y);
    //   const diffPoint: Vector = new Vector(diffX, diffY);
    //   const points: Array<Vector> = [];
    //   this._points.map((point: Vector) => {
    //     const tempX: number = point.x;
    //     const tempY: number = point.y;
    //     const tempPoint: Vector = new Vector(tempX, tempY);
    //     const calculatedPoint: Vector = tempPoint.add(diffPoint);
    //     points.push(calculatedPoint);
    //   });
    //   this.setPoints(points, true);
    // }

    /**
     * Returns the points of this polygon.
     * 
     * @returns {Array<Vector>}
     */

  }, {
    key: "points",
    get: function get() {
      return this._points;
    }
    /**
     * Returns the calculated points of this polygon.
     * 
     * @returns {Array<Vector>}
     */

  }, {
    key: "calcPoints",
    get: function get() {
      return this._calcPoints;
    }
    /**
     * Returns the offset of this polygon.
     * 
     * @returns {Vector}
     */

  }, {
    key: "offset",
    get: function get() {
      return this._offset;
    }
    /**
     * Returns the angle of this polygon.
     * 
     * @returns {number}
     */

  }, {
    key: "angle",
    get: function get() {
      return this._angle;
    }
    /**
     * Returns the edges of this polygon.
     * 
     * @returns {Array<Vector>}
     */

  }, {
    key: "edges",
    get: function get() {
      return this._edges;
    }
    /**
     * Returns the normals of this polygon.
     * 
     * @returns {Array<Vector>}
     */

  }, {
    key: "normals",
    get: function get() {
      return this._normals;
    }
  }]);

  return Polygon;
}();

exports["default"] = Polygon;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9wb2x5Z29uLnRzIl0sIm5hbWVzIjpbIlBvbHlnb24iLCJwb3NpdGlvbiIsIlZlY3RvciIsInBvaW50cyIsIl9wb3NpdGlvbiIsInNldFBvaW50cyIsImxlbmd0aENoYW5nZWQiLCJsZW5ndGgiLCJpIiwiY2FsY1BvaW50cyIsIl9jYWxjUG9pbnRzIiwiZWRnZXMiLCJfZWRnZXMiLCJub3JtYWxzIiwiX25vcm1hbHMiLCJwMSIsInAyIiwieCIsInkiLCJzcGxpY2UiLCJwdXNoIiwiX3BvaW50cyIsIl9yZWNhbGMiLCJhbmdsZSIsIl9hbmdsZSIsIm9mZnNldCIsIl9vZmZzZXQiLCJsZW4iLCJyb3RhdGUiLCJjYWxjUG9pbnQiLCJjb3B5IiwiZSIsInN1YiIsInBlcnAiLCJub3JtYWxpemUiLCJ4TWluIiwieU1pbiIsInhNYXgiLCJ5TWF4IiwicG9pbnQiLCJjbG9uZSIsImFkZCIsImN4IiwiY3kiLCJhciIsImEiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7OztJQVFxQkEsTztBQUNuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQU9BLHFCQUF5RTtBQUFBLFFBQTdEQyxRQUE2RCx1RUFBMUMsSUFBSUMsa0JBQUosRUFBMEM7QUFBQSxRQUE1QkMsTUFBNEIsdUVBQUosRUFBSTs7QUFBQTs7QUFBQSx1Q0EvRDdDLElBQUlELGtCQUFKLEVBK0Q2Qzs7QUFBQSxxQ0F0RHhDLEVBc0R3Qzs7QUFBQSxvQ0E3Q2hELENBNkNnRDs7QUFBQSxxQ0FwQy9DLElBQUlBLGtCQUFKLEVBb0MrQzs7QUFBQSx5Q0EzQnBDLEVBMkJvQzs7QUFBQSxvQ0FsQnpDLEVBa0J5Qzs7QUFBQSxzQ0FUdkMsRUFTdUM7O0FBQ3ZFLFNBQUtFLFNBQUwsR0FBaUJILFFBQWpCO0FBQ0EsU0FB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Ozs7d0JBS3FCO0FBQUUsYUFBTyxLQUFLZ0IsT0FBWjtBQUFzQjtBQUU3Qzs7Ozs7Ozs7d0JBS29CO0FBQUUsYUFBTyxLQUFLRixNQUFaO0FBQXFCO0FBRTNDOzs7Ozs7Ozt3QkFLMkI7QUFBRSxhQUFPLEtBQUtaLE1BQVo7QUFBcUI7QUFFbEQ7Ozs7Ozs7O3dCQUs2QjtBQUFFLGFBQU8sS0FBS0UsUUFBWjtBQUF1QiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IFZlY3RvciBmcm9tICcuL3ZlY3Rvcic7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhICpjb252ZXgqIHBvbHlnb24gd2l0aCBhbnkgbnVtYmVyIG9mIHBvaW50cyAoc3BlY2lmaWVkIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyKS5cclxuICogXHJcbiAqIE5vdGU6IERvIF9ub3RfIG1hbnVhbGx5IGNoYW5nZSB0aGUgYHBvaW50c2AsIGBhbmdsZWAsIG9yIGBvZmZzZXRgIHByb3BlcnRpZXMuIFVzZSB0aGUgcHJvdmlkZWQgIHNldHRlcnMuIFxyXG4gKiBPdGhlcndpc2UgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllcyB3aWxsIG5vdCBiZSB1cGRhdGVkIGNvcnJlY3RseS5cclxuICogXHJcbiAqIFRoZSBgcG9zYCBwcm9wZXJ0eSBjYW4gYmUgY2hhbmdlZCBkaXJlY3RseS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbHlnb24ge1xyXG4gIC8qKlxyXG4gICAqIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgb3JpZ2luIG9mIHRoaXMgcG9seWdvbiAoYWxsIG90aGVyIHBvaW50cyBhcmUgcmVsYXRpdmUgdG8gdGhpcyBvbmUpLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtWZWN0b3J9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PFZlY3Rvcj59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhbmdsZSBvZiB0aGlzIHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9hbmdsZTogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG9mZnNldCBvZiB0aGlzIHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1ZlY3Rvcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9vZmZzZXQ6IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNhbGN1bGF0ZWQgcG9pbnRzIG9mIHRoaXMgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8VmVjdG9yPn1cclxuICAgKi9cclxuICBwcml2YXRlIF9jYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBlZGdlcyBvZiB0aGlzIHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PFZlY3Rvcj59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZWRnZXM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG5vcm1hbHMgb2YgdGhpcyBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxWZWN0b3I+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX25vcm1hbHM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IHBvbHlnb24sIHBhc3NpbmcgaW4gYSBwb3NpdGlvbiB2ZWN0b3IsIGFuZCBhbiBhcnJheSBvZiBwb2ludHMgKHJlcHJlc2VudGVkIGJ5IHZlY3RvcnMgXHJcbiAgICogcmVsYXRpdmUgdG8gdGhlIHBvc2l0aW9uIHZlY3RvcikuIElmIG5vIHBvc2l0aW9uIGlzIHBhc3NlZCBpbiwgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2x5Z29uIHdpbGwgYmUgYCgwLDApYC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gW3Bvc2l0aW9uPVZlY3Rvcl0gQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW4gb2YgdGhlIHBvbHlnb24gKGFsbCBvdGhlciBwb2ludHMgYXJlIHJlbGF0aXZlIHRvIHRoaXMgb25lKVxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gW3BvaW50cz1bXV0gQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKSwgcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW10pIHtcclxuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XHJcbiAgICB0aGlzLnNldFBvaW50cyhwb2ludHMpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcG9zaXRpb24gb2YgdGhpcyBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XHJcbiAgICovXHJcbiAgZ2V0IHBvc2l0aW9uKCk6IFZlY3RvciB7IHJldHVybiB0aGlzLl9wb3NpdGlvbjsgfVxyXG5cclxuICAvKipcclxuICAgKiAqKk5vdGU6KiogTm90IHN1cmUgaWYgdGhpcyB3aWxsIGJlIGtlcHQgb3Igbm90IGJ1dCBmb3Igbm93IGl0J3MgZGlzYWJsZWQuXHJcbiAgICogXHJcbiAgICogU2V0cyBhIG5ldyBwb3NpdGlvbiBmb3IgdGhpcyBwb2x5Z29uIGFuZCByZWNhbGN1bGF0ZXMgdGhlIHBvaW50cy5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcG9zaXRpb24gQSBWZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBuZXcgcG9zaXRpb24gb2YgdGhpcyBwb2x5Z29uLlxyXG4gICAqL1xyXG4gIC8vIHNldCBwb3NpdGlvbihwb3NpdGlvbjogVmVjdG9yKSB7XHJcbiAgLy8gICBjb25zdCBkaWZmWDogbnVtYmVyID0gLSh0aGlzLl9wb3NpdGlvbi54IC0gcG9zaXRpb24ueCk7XHJcbiAgLy8gICBjb25zdCBkaWZmWTogbnVtYmVyID0gLSh0aGlzLl9wb3NpdGlvbi55IC0gcG9zaXRpb24ueSk7XHJcblxyXG4gIC8vICAgY29uc3QgZGlmZlBvaW50OiBWZWN0b3IgPSBuZXcgVmVjdG9yKGRpZmZYLCBkaWZmWSk7XHJcblxyXG4gIC8vICAgY29uc3QgcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcblxyXG4gIC8vICAgdGhpcy5fcG9pbnRzLm1hcCgocG9pbnQ6IFZlY3RvcikgPT4ge1xyXG4gIC8vICAgICBjb25zdCB0ZW1wWDogbnVtYmVyID0gcG9pbnQueDtcclxuICAvLyAgICAgY29uc3QgdGVtcFk6IG51bWJlciA9IHBvaW50Lnk7XHJcblxyXG4gIC8vICAgICBjb25zdCB0ZW1wUG9pbnQ6IFZlY3RvciA9IG5ldyBWZWN0b3IodGVtcFgsIHRlbXBZKTtcclxuXHJcbiAgLy8gICAgIGNvbnN0IGNhbGN1bGF0ZWRQb2ludDogVmVjdG9yID0gdGVtcFBvaW50LmFkZChkaWZmUG9pbnQpO1xyXG5cclxuICAvLyAgICAgcG9pbnRzLnB1c2goY2FsY3VsYXRlZFBvaW50KTtcclxuICAvLyAgIH0pO1xyXG5cclxuICAvLyAgIHRoaXMuc2V0UG9pbnRzKHBvaW50cywgdHJ1ZSk7XHJcbiAgLy8gfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBwb2ludHMgb2YgdGhpcyBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxWZWN0b3I+fVxyXG4gICAqL1xyXG4gIGdldCBwb2ludHMoKTogQXJyYXk8VmVjdG9yPiB7IHJldHVybiB0aGlzLl9wb2ludHM7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgY2FsY3VsYXRlZCBwb2ludHMgb2YgdGhpcyBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxWZWN0b3I+fVxyXG4gICAqL1xyXG4gIGdldCBjYWxjUG9pbnRzKCk6IEFycmF5PFZlY3Rvcj4geyByZXR1cm4gdGhpcy5fY2FsY1BvaW50czsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBvZmZzZXQgb2YgdGhpcyBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtWZWN0b3J9XHJcbiAgICovXHJcbiAgZ2V0IG9mZnNldCgpOiBWZWN0b3IgeyByZXR1cm4gdGhpcy5fb2Zmc2V0OyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGFuZ2xlIG9mIHRoaXMgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIGdldCBhbmdsZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fYW5nbGU7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgZWRnZXMgb2YgdGhpcyBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxWZWN0b3I+fVxyXG4gICAqL1xyXG4gIGdldCBlZGdlcygpOiBBcnJheTxWZWN0b3I+IHsgcmV0dXJuIHRoaXMuX2VkZ2VzOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIG5vcm1hbHMgb2YgdGhpcyBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtBcnJheTxWZWN0b3I+fVxyXG4gICAqL1xyXG4gIGdldCBub3JtYWxzKCk6IEFycmF5PFZlY3Rvcj4geyByZXR1cm4gdGhpcy5fbm9ybWFsczsgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIHBvaW50cyBvZiB0aGUgcG9seWdvbi4gQW55IGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHMgd2lsbCBiZSBjb21iaW5lZC5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGUgcG9pbnRzIGFyZSBjb3VudGVyLWNsb2Nrd2lzZSAqd2l0aCByZXNwZWN0IHRvIHRoZSBjb29yZGluYXRlIHN5c3RlbSouIElmIHlvdSBkaXJlY3RseSBkcmF3IHRoZSBwb2ludHMgb24gYSBzY3JlZW4gXHJcbiAgICogdGhhdCBoYXMgdGhlIG9yaWdpbiBhdCB0aGUgdG9wLWxlZnQgY29ybmVyIGl0IHdpbGwgX2FwcGVhcl8gdmlzdWFsbHkgdGhhdCB0aGUgcG9pbnRzIGFyZSBiZWluZyBzcGVjaWZpZWQgY2xvY2t3aXNlLiBUaGlzIGlzIFxyXG4gICAqIGp1c3QgYmVjYXVzZSBvZiB0aGUgaW52ZXJzaW9uIG9mIHRoZSBZLWF4aXMgd2hlbiBiZWluZyBkaXNwbGF5ZWQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBwb2ludHMgQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICogICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBzZXRQb2ludHMocG9pbnRzOiBBcnJheTxWZWN0b3I+KTogUG9seWdvbiB7XHJcbiAgICAvLyBPbmx5IHJlLWFsbG9jYXRlIGlmIHRoaXMgaXMgYSBuZXcgcG9seWdvbiBvciB0aGUgbnVtYmVyIG9mIHBvaW50cyBoYXMgY2hhbmdlZC5cclxuICAgIGNvbnN0IGxlbmd0aENoYW5nZWQ6IGJvb2xlYW4gPSAhdGhpcy5wb2ludHMgfHwgdGhpcy5wb2ludHMubGVuZ3RoICE9PSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGlmIChsZW5ndGhDaGFuZ2VkKSB7XHJcbiAgICAgIGxldCBpOiBudW1iZXI7XHJcblxyXG4gICAgICBjb25zdCBjYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5fY2FsY1BvaW50cyA9IFtdO1xyXG4gICAgICBjb25zdCBlZGdlczogQXJyYXk8VmVjdG9yPiA9IHRoaXMuX2VkZ2VzID0gW107XHJcbiAgICAgIGNvbnN0IG5vcm1hbHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLl9ub3JtYWxzID0gW107XHJcblxyXG4gICAgICAvLyBBbGxvY2F0ZSB0aGUgdmVjdG9yIGFycmF5cyBmb3IgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllc1xyXG4gICAgICBmb3IgKGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGNvbnNlY3V0aXZlIGR1cGxpY2F0ZSBwb2ludHNcclxuICAgICAgICBjb25zdCBwMTogVmVjdG9yID0gcG9pbnRzW2ldO1xyXG4gICAgICAgIGNvbnN0IHAyOiBWZWN0b3IgPSBpIDwgcG9pbnRzLmxlbmd0aCAtIDEgPyBwb2ludHNbaSArIDFdIDogcG9pbnRzWzBdO1xyXG5cclxuICAgICAgICBpZiAocDEgIT09IHAyICYmIHAxLnggPT09IHAyLnggJiYgcDEueSA9PT0gcDIueSkge1xyXG4gICAgICAgICAgcG9pbnRzLnNwbGljZShpLCAxKTtcclxuICAgICAgICAgIGkgLT0gMTtcclxuICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2FsY1BvaW50cy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcbiAgICAgICAgZWRnZXMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gICAgICAgIG5vcm1hbHMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcG9pbnRzID0gcG9pbnRzO1xyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBjdXJyZW50IHJvdGF0aW9uIGFuZ2xlIG9mIHRoZSBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBhbmdsZSBUaGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgc2V0QW5nbGUoYW5nbGU6IG51bWJlcik6IFBvbHlnb24ge1xyXG4gICAgdGhpcy5fYW5nbGUgPSBhbmdsZTtcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY3VycmVudCBvZmZzZXQgdG8gYXBwbHkgdG8gdGhlIGBwb2ludHNgIGJlZm9yZSBhcHBseWluZyB0aGUgYGFuZ2xlYCByb3RhdGlvbi5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gb2Zmc2V0IFRoZSBuZXcgb2Zmc2V0IFZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBzZXRPZmZzZXQob2Zmc2V0OiBWZWN0b3IpOiBQb2x5Z29uIHtcclxuICAgIHRoaXMuX29mZnNldCA9IG9mZnNldDtcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJvdGF0ZXMgdGhpcyBQb2x5Z29uIGNvdW50ZXItY2xvY2t3aXNlIGFyb3VuZCB0aGUgb3JpZ2luIG9mICppdHMgbG9jYWwgY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NpdGlvbmApLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFRoaXMgY2hhbmdlcyB0aGUgKipvcmlnaW5hbCoqIHBvaW50cyAoc28gYW55IGBhbmdsZWAgd2lsbCBiZSBhcHBsaWVkIG9uIHRvcCBvZiB0aGlzIHJvdGF0aW9uKS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGFuZ2xlIHRvIHJvdGF0ZSAoaW4gcmFkaWFucykuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcm90YXRlKGFuZ2xlOiBudW1iZXIpOiBQb2x5Z29uIHtcclxuICAgIGNvbnN0IHBvaW50czogQXJyYXk8VmVjdG9yPiA9IHRoaXMucG9pbnRzO1xyXG4gICAgY29uc3QgbGVuOiBudW1iZXIgPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuOyBpKyspIHBvaW50c1tpXS5yb3RhdGUoYW5nbGUpO1xyXG5cclxuICAgIHRoaXMuX3JlY2FsYygpO1xyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogVHJhbnNsYXRlcyB0aGUgcG9pbnRzIG9mIHRoaXMgcG9seWdvbiBieSBhIHNwZWNpZmllZCBhbW91bnQgcmVsYXRpdmUgdG8gdGhlIG9yaWdpbiBvZiAqaXRzIG93biBjb29yZGluYXRlIHN5c3RlbSogKGkuZS4gYHBvc2l0aW9uYCkuXHJcbiAgICogXHJcbiAgICogTm90ZTogVGhpcyBjaGFuZ2VzIHRoZSAqKm9yaWdpbmFsKiogcG9pbnRzIChzbyBhbnkgYG9mZnNldGAgd2lsbCBiZSBhcHBsaWVkIG9uIHRvcCBvZiB0aGlzIHRyYW5zbGF0aW9uKVxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4IFRoZSBob3Jpem9udGFsIGFtb3VudCB0byB0cmFuc2xhdGUuXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkgVGhlIHZlcnRpY2FsIGFtb3VudCB0byB0cmFuc2xhdGUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgdHJhbnNsYXRlKHg6IG51bWJlciwgeTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IGxlbjogbnVtYmVyID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgcG9pbnRzW2ldLnggKz0geDtcclxuICAgICAgcG9pbnRzW2ldLnkgKz0geTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGVzIHRoZSBjYWxjdWxhdGVkIGNvbGxpc2lvbiBQb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIFRoaXMgYXBwbGllcyB0aGUgYGFuZ2xlYCBhbmQgYG9mZnNldGAgdG8gdGhlIG9yaWdpbmFsIHBvaW50cyB0aGVuIHJlY2FsY3VsYXRlcyB0aGUgZWRnZXMgYW5kIG5vcm1hbHMgb2YgdGhlIGNvbGxpc2lvbiBQb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcmVjYWxjKCk6IFBvbHlnb24ge1xyXG4gICAgLy8gQ2FsY3VsYXRlZCBwb2ludHMgLSB0aGlzIGlzIHdoYXQgaXMgdXNlZCBmb3IgdW5kZXJseWluZyBjb2xsaXNpb25zIGFuZCB0YWtlcyBpbnRvIGFjY291bnRcclxuICAgIC8vIHRoZSBhbmdsZS9vZmZzZXQgc2V0IG9uIHRoZSBwb2x5Z29uLlxyXG4gICAgY29uc3QgY2FsY1BvaW50czogQXJyYXk8VmVjdG9yPiA9IHRoaXMuY2FsY1BvaW50cztcclxuXHJcbiAgICAvLyBUaGUgZWRnZXMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmUgdG9cclxuICAgIC8vIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhIGdpdmVuIGVkZ2UgZnJvbSB0aGUgZWRnZSB2YWx1ZSwgeW91IG11c3RcclxuICAgIC8vIGZpcnN0IHRyYW5zbGF0ZSB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgY29uc3QgZWRnZXM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLl9lZGdlcztcclxuXHJcbiAgICAvLyBUaGUgbm9ybWFscyBoZXJlIGFyZSB0aGUgZGlyZWN0aW9uIG9mIHRoZSBub3JtYWwgZm9yIHRoZSBgbmB0aCBlZGdlIG9mIHRoZSBwb2x5Z29uLCByZWxhdGl2ZVxyXG4gICAgLy8gdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBgbmB0aCBwb2ludC4gSWYgeW91IHdhbnQgdG8gZHJhdyBhbiBlZGdlIG5vcm1hbCwgeW91IG11c3QgZmlyc3RcclxuICAgIC8vIHRyYW5zbGF0ZSB0byB0aGUgcG9zaXRpb24gb2YgdGhlIHN0YXJ0aW5nIHBvaW50LlxyXG4gICAgY29uc3Qgbm9ybWFsczogQXJyYXk8VmVjdG9yPiA9IHRoaXMuX25vcm1hbHM7XHJcblxyXG4gICAgLy8gQ29weSB0aGUgb3JpZ2luYWwgcG9pbnRzIGFycmF5IGFuZCBhcHBseSB0aGUgb2Zmc2V0L2FuZ2xlXHJcbiAgICBjb25zdCBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IG9mZnNldDogVmVjdG9yID0gdGhpcy5vZmZzZXQ7XHJcbiAgICBjb25zdCBhbmdsZTogbnVtYmVyID0gdGhpcy5hbmdsZTtcclxuXHJcbiAgICBjb25zdCBsZW46IG51bWJlciA9IHBvaW50cy5sZW5ndGg7XHJcbiAgICBsZXQgaTogbnVtYmVyO1xyXG5cclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBjb25zdCBjYWxjUG9pbnQ6IFZlY3RvciA9IGNhbGNQb2ludHNbaV0uY29weShwb2ludHNbaV0pO1xyXG5cclxuICAgICAgY2FsY1BvaW50LnggKz0gb2Zmc2V0Lng7XHJcbiAgICAgIGNhbGNQb2ludC55ICs9IG9mZnNldC55O1xyXG5cclxuICAgICAgaWYgKGFuZ2xlICE9PSAwKSBjYWxjUG9pbnQucm90YXRlKGFuZ2xlKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGVkZ2VzL25vcm1hbHNcclxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBjb25zdCBwMTogVmVjdG9yID0gY2FsY1BvaW50c1tpXTtcclxuICAgICAgY29uc3QgcDI6IFZlY3RvciA9IGkgPCBsZW4gLSAxID8gY2FsY1BvaW50c1tpICsgMV0gOiBjYWxjUG9pbnRzWzBdO1xyXG5cclxuICAgICAgY29uc3QgZTogVmVjdG9yID0gZWRnZXNbaV0uY29weShwMikuc3ViKHAxKTtcclxuXHJcbiAgICAgIG5vcm1hbHNbaV0uY29weShlKS5wZXJwKCkubm9ybWFsaXplKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlIHRoZSBheGlzLWFsaWduZWQgYm91bmRpbmcgYm94LlxyXG4gICAqIFxyXG4gICAqIEFueSBjdXJyZW50IHN0YXRlICh0cmFuc2xhdGlvbnMvcm90YXRpb25zKSB3aWxsIGJlIGFwcGxpZWQgYmVmb3JlIGNvbnN0cnVjdGluZyB0aGUgQUFCQi5cclxuICAgKiBcclxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFBvbHlnb25gIGVhY2ggdGltZSB5b3UgY2FsbCB0aGlzLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIGdldEFBQkIoKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBsZW46IG51bWJlciA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgbGV0IHhNaW46IG51bWJlciA9IHBvaW50c1swXS54O1xyXG4gICAgbGV0IHlNaW46IG51bWJlciA9IHBvaW50c1swXS55O1xyXG5cclxuICAgIGxldCB4TWF4OiBudW1iZXIgPSBwb2ludHNbMF0ueDtcclxuICAgIGxldCB5TWF4OiBudW1iZXIgPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBmb3IgKGxldCBpOiBudW1iZXIgPSAxOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgcG9pbnQ6IFZlY3RvciA9IHBvaW50c1tpXTtcclxuXHJcbiAgICAgIGlmIChwb2ludFtcInhcIl0gPCB4TWluKSB4TWluID0gcG9pbnRbXCJ4XCJdO1xyXG4gICAgICBlbHNlIGlmIChwb2ludFtcInhcIl0gPiB4TWF4KSB4TWF4ID0gcG9pbnRbXCJ4XCJdO1xyXG5cclxuICAgICAgaWYgKHBvaW50W1wieVwiXSA8IHlNaW4pIHlNaW4gPSBwb2ludFtcInlcIl07XHJcbiAgICAgIGVsc2UgaWYgKHBvaW50W1wieVwiXSA+IHlNYXgpIHlNYXggPSBwb2ludFtcInlcIl07XHJcblxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgUG9seWdvbih0aGlzLl9wb3NpdGlvbi5jbG9uZSgpLmFkZChuZXcgVmVjdG9yKHhNaW4sIHlNaW4pKSwgW1xyXG4gICAgICBuZXcgVmVjdG9yKCksIG5ldyBWZWN0b3IoeE1heCAtIHhNaW4sIDApLFxyXG4gICAgICBuZXcgVmVjdG9yKHhNYXggLSB4TWluLCB5TWF4IC0geU1pbiksIG5ldyBWZWN0b3IoMCwgeU1heCAtIHlNaW4pXHJcbiAgICBdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGNlbnRyb2lkIChnZW9tZXRyaWMgY2VudGVyKSBvZiB0aGUgUG9seWdvbi5cclxuICAgKiBcclxuICAgKiBBbnkgY3VycmVudCBzdGF0ZSAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb21wdXRpbmcgdGhlIGNlbnRyb2lkLlxyXG4gICAqIFxyXG4gICAqIFNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DZW50cm9pZCNDZW50cm9pZF9vZl9hX3BvbHlnb25cclxuICAgKiBcclxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFZlY3RvcmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyBhIFZlY3RvciB0aGF0IGNvbnRhaW5zIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgY2VudHJvaWQuXHJcbiAgICovXHJcbiAgZ2V0Q2VudHJvaWQoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHBvaW50czogQXJyYXk8VmVjdG9yPiA9IHRoaXMuY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGxlbjogbnVtYmVyID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBsZXQgY3g6IG51bWJlciA9IDA7XHJcbiAgICBsZXQgY3k6IG51bWJlciA9IDA7XHJcbiAgICBsZXQgYXI6IG51bWJlciA9IDA7XHJcblxyXG4gICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxOiBWZWN0b3IgPSBwb2ludHNbaV07XHJcbiAgICAgIGNvbnN0IHAyOiBWZWN0b3IgPSBpID09PSBsZW4gLSAxID8gcG9pbnRzWzBdIDogcG9pbnRzW2kgKyAxXTsgLy8gTG9vcCBhcm91bmQgaWYgbGFzdCBwb2ludFxyXG5cclxuICAgICAgY29uc3QgYTogbnVtYmVyID0gcDFbXCJ4XCJdICogcDJbXCJ5XCJdIC0gcDJbXCJ4XCJdICogcDFbXCJ5XCJdO1xyXG5cclxuICAgICAgY3ggKz0gKHAxW1wieFwiXSArIHAyW1wieFwiXSkgKiBhO1xyXG4gICAgICBjeSArPSAocDFbXCJ5XCJdICsgcDJbXCJ5XCJdKSAqIGE7XHJcbiAgICAgIGFyICs9IGE7XHJcbiAgICB9XHJcblxyXG4gICAgYXIgPSBhciAqIDM7IC8vIHdlIHdhbnQgMSAvIDYgdGhlIGFyZWEgYW5kIHdlIGN1cnJlbnRseSBoYXZlIDIqYXJlYVxyXG4gICAgY3ggPSBjeCAvIGFyO1xyXG4gICAgY3kgPSBjeSAvIGFyO1xyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKGN4LCBjeSk7XHJcbiAgfVxyXG59Il19