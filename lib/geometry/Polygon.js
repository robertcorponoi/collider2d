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
 * Represents a *convex* polygon with any number of points (specified in counter-clockwise order).
 * 
 * Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the provided  setters. 
 * Otherwise the calculated properties will not be updated correctly.
 * 
 * The `pos` property can be changed directly.
 */
var Polygon =
/*#__PURE__*/
function () {
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
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new _Vector["default"]();
    var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Polygon);

    _defineProperty(this, "_position", new _Vector["default"]());

    _defineProperty(this, "_points", []);

    _defineProperty(this, "_angle", 0);

    _defineProperty(this, "_offset", new _Vector["default"]());

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

          calcPoints.push(new _Vector["default"]());
          edges.push(new _Vector["default"]());
          normals.push(new _Vector["default"]());
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

      return new _Box["default"](this._position.clone().add(new _Vector["default"](xMin, yMin)), xMax - xMin, yMax - yMin).toPolygon();
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
      return new _Vector["default"](cx, cy);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9nZW9tZXRyeS9Qb2x5Z29uLnRzIl0sIm5hbWVzIjpbIlBvbHlnb24iLCJwb3NpdGlvbiIsIlZlY3RvciIsInBvaW50cyIsIl9wb3NpdGlvbiIsInNldFBvaW50cyIsImxlbmd0aENoYW5nZWQiLCJsZW5ndGgiLCJpIiwiY2FsY1BvaW50cyIsIl9jYWxjUG9pbnRzIiwiZWRnZXMiLCJfZWRnZXMiLCJub3JtYWxzIiwiX25vcm1hbHMiLCJwMSIsInAyIiwieCIsInkiLCJzcGxpY2UiLCJwdXNoIiwiX3BvaW50cyIsIl9yZWNhbGMiLCJhbmdsZSIsIl9hbmdsZSIsIm9mZnNldCIsIl9vZmZzZXQiLCJsZW4iLCJyb3RhdGUiLCJjYWxjUG9pbnQiLCJjb3B5IiwiZSIsInN1YiIsInBlcnAiLCJub3JtYWxpemUiLCJ4TWluIiwieU1pbiIsInhNYXgiLCJ5TWF4IiwicG9pbnQiLCJCb3giLCJjbG9uZSIsImFkZCIsInRvUG9seWdvbiIsImN4IiwiY3kiLCJhciIsImEiXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBRUE7O0FBQ0E7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7OztJQVFxQkEsTzs7O0FBQ25COzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7OztBQVNBOzs7Ozs7O0FBT0EscUJBQXlFO0FBQUEsUUFBN0RDLFFBQTZELHVFQUExQyxJQUFJQyxrQkFBSixFQUEwQztBQUFBLFFBQTVCQyxNQUE0Qix1RUFBSixFQUFJOztBQUFBOztBQUFBLHVDQS9EN0MsSUFBSUQsa0JBQUosRUErRDZDOztBQUFBLHFDQXREeEMsRUFzRHdDOztBQUFBLG9DQTdDaEQsQ0E2Q2dEOztBQUFBLHFDQXBDL0MsSUFBSUEsa0JBQUosRUFvQytDOztBQUFBLHlDQTNCcEMsRUEyQm9DOztBQUFBLG9DQWxCekMsRUFrQnlDOztBQUFBLHNDQVR2QyxFQVN1Qzs7QUFDdkUsU0FBS0Us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Ozs7d0JBSzZCO0FBQUUsYUFBTyxLQUFLRSxRQUFaO0FBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXHJcblxyXG5pbXBvcnQgQm94IGZyb20gJy4vQm94JztcclxuaW1wb3J0IFZlY3RvciBmcm9tICcuL1ZlY3Rvcic7XHJcblxyXG4vKipcclxuICogUmVwcmVzZW50cyBhICpjb252ZXgqIHBvbHlnb24gd2l0aCBhbnkgbnVtYmVyIG9mIHBvaW50cyAoc3BlY2lmaWVkIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyKS5cclxuICogXHJcbiAqIE5vdGU6IERvIF9ub3RfIG1hbnVhbGx5IGNoYW5nZSB0aGUgYHBvaW50c2AsIGBhbmdsZWAsIG9yIGBvZmZzZXRgIHByb3BlcnRpZXMuIFVzZSB0aGUgcHJvdmlkZWQgIHNldHRlcnMuIFxyXG4gKiBPdGhlcndpc2UgdGhlIGNhbGN1bGF0ZWQgcHJvcGVydGllcyB3aWxsIG5vdCBiZSB1cGRhdGVkIGNvcnJlY3RseS5cclxuICogXHJcbiAqIFRoZSBgcG9zYCBwcm9wZXJ0eSBjYW4gYmUgY2hhbmdlZCBkaXJlY3RseS5cclxuICovXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFBvbHlnb24ge1xyXG4gIC8qKlxyXG4gICAqIEEgdmVjdG9yIHJlcHJlc2VudGluZyB0aGUgb3JpZ2luIG9mIHRoaXMgcG9seWdvbiAoYWxsIG90aGVyIHBvaW50cyBhcmUgcmVsYXRpdmUgdG8gdGhpcyBvbmUpLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtWZWN0b3J9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PFZlY3Rvcj59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBhbmdsZSBvZiB0aGlzIHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9hbmdsZTogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG9mZnNldCBvZiB0aGlzIHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1ZlY3Rvcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9vZmZzZXQ6IFZlY3RvciA9IG5ldyBWZWN0b3IoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIGNhbGN1bGF0ZWQgcG9pbnRzIG9mIHRoaXMgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8VmVjdG9yPn1cclxuICAgKi9cclxuICBwcml2YXRlIF9jYWxjUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRoZSBlZGdlcyBvZiB0aGlzIHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PFZlY3Rvcj59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZWRnZXM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGhlIG5vcm1hbHMgb2YgdGhpcyBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxWZWN0b3I+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX25vcm1hbHM6IEFycmF5PFZlY3Rvcj4gPSBbXTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlIGEgbmV3IHBvbHlnb24sIHBhc3NpbmcgaW4gYSBwb3NpdGlvbiB2ZWN0b3IsIGFuZCBhbiBhcnJheSBvZiBwb2ludHMgKHJlcHJlc2VudGVkIGJ5IHZlY3RvcnMgXHJcbiAgICogcmVsYXRpdmUgdG8gdGhlIHBvc2l0aW9uIHZlY3RvcikuIElmIG5vIHBvc2l0aW9uIGlzIHBhc3NlZCBpbiwgdGhlIHBvc2l0aW9uIG9mIHRoZSBwb2x5Z29uIHdpbGwgYmUgYCgwLDApYC5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gW3Bvc2l0aW9uPVZlY3Rvcl0gQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW4gb2YgdGhlIHBvbHlnb24gKGFsbCBvdGhlciBwb2ludHMgYXJlIHJlbGF0aXZlIHRvIHRoaXMgb25lKVxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gW3BvaW50cz1bXV0gQW4gYXJyYXkgb2YgdmVjdG9ycyByZXByZXNlbnRpbmcgdGhlIHBvaW50cyBpbiB0aGUgcG9seWdvbiwgaW4gY291bnRlci1jbG9ja3dpc2Ugb3JkZXIuXHJcbiAgICovXHJcbiAgY29uc3RydWN0b3IocG9zaXRpb246IFZlY3RvciA9IG5ldyBWZWN0b3IoKSwgcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gW10pIHtcclxuICAgIHRoaXMuX3Bvc2l0aW9uID0gcG9zaXRpb247XHJcblxyXG4gICAgdGhpcy5zZXRQb2ludHMocG9pbnRzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoaXMgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfVxyXG4gICAqL1xyXG4gIGdldCBwb3NpdGlvbigpOiBWZWN0b3IgeyByZXR1cm4gdGhpcy5fcG9zaXRpb247IH1cclxuXHJcbiAgLyoqXHJcbiAgICogKipOb3RlOioqIE5vdCBzdXJlIGlmIHRoaXMgd2lsbCBiZSBrZXB0IG9yIG5vdCBidXQgZm9yIG5vdyBpdCdzIGRpc2FibGVkLlxyXG4gICAqIFxyXG4gICAqIFNldHMgYSBuZXcgcG9zaXRpb24gZm9yIHRoaXMgcG9seWdvbiBhbmQgcmVjYWxjdWxhdGVzIHRoZSBwb2ludHMuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvc2l0aW9uIEEgVmVjdG9yIHJlcHJlc2VudGluZyB0aGUgbmV3IHBvc2l0aW9uIG9mIHRoaXMgcG9seWdvbi5cclxuICAgKi9cclxuICAvLyBzZXQgcG9zaXRpb24ocG9zaXRpb246IFZlY3Rvcikge1xyXG4gIC8vICAgY29uc3QgZGlmZlg6IG51bWJlciA9IC0odGhpcy5fcG9zaXRpb24ueCAtIHBvc2l0aW9uLngpO1xyXG4gIC8vICAgY29uc3QgZGlmZlk6IG51bWJlciA9IC0odGhpcy5fcG9zaXRpb24ueSAtIHBvc2l0aW9uLnkpO1xyXG5cclxuICAvLyAgIGNvbnN0IGRpZmZQb2ludDogVmVjdG9yID0gbmV3IFZlY3RvcihkaWZmWCwgZGlmZlkpO1xyXG5cclxuICAvLyAgIGNvbnN0IHBvaW50czogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG5cclxuICAvLyAgIHRoaXMuX3BvaW50cy5tYXAoKHBvaW50OiBWZWN0b3IpID0+IHtcclxuICAvLyAgICAgY29uc3QgdGVtcFg6IG51bWJlciA9IHBvaW50Lng7XHJcbiAgLy8gICAgIGNvbnN0IHRlbXBZOiBudW1iZXIgPSBwb2ludC55O1xyXG5cclxuICAvLyAgICAgY29uc3QgdGVtcFBvaW50OiBWZWN0b3IgPSBuZXcgVmVjdG9yKHRlbXBYLCB0ZW1wWSk7XHJcblxyXG4gIC8vICAgICBjb25zdCBjYWxjdWxhdGVkUG9pbnQ6IFZlY3RvciA9IHRlbXBQb2ludC5hZGQoZGlmZlBvaW50KTtcclxuXHJcbiAgLy8gICAgIHBvaW50cy5wdXNoKGNhbGN1bGF0ZWRQb2ludCk7XHJcbiAgLy8gICB9KTtcclxuXHJcbiAgLy8gICB0aGlzLnNldFBvaW50cyhwb2ludHMsIHRydWUpO1xyXG4gIC8vIH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgcG9pbnRzIG9mIHRoaXMgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8VmVjdG9yPn1cclxuICAgKi9cclxuICBnZXQgcG9pbnRzKCk6IEFycmF5PFZlY3Rvcj4geyByZXR1cm4gdGhpcy5fcG9pbnRzOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGNhbGN1bGF0ZWQgcG9pbnRzIG9mIHRoaXMgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8VmVjdG9yPn1cclxuICAgKi9cclxuICBnZXQgY2FsY1BvaW50cygpOiBBcnJheTxWZWN0b3I+IHsgcmV0dXJuIHRoaXMuX2NhbGNQb2ludHM7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyB0aGUgb2Zmc2V0IG9mIHRoaXMgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7VmVjdG9yfVxyXG4gICAqL1xyXG4gIGdldCBvZmZzZXQoKTogVmVjdG9yIHsgcmV0dXJuIHRoaXMuX29mZnNldDsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBhbmdsZSBvZiB0aGlzIHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge251bWJlcn1cclxuICAgKi9cclxuICBnZXQgYW5nbGUoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2FuZ2xlOyB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFJldHVybnMgdGhlIGVkZ2VzIG9mIHRoaXMgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8VmVjdG9yPn1cclxuICAgKi9cclxuICBnZXQgZWRnZXMoKTogQXJyYXk8VmVjdG9yPiB7IHJldHVybiB0aGlzLl9lZGdlczsgfVxyXG5cclxuICAvKipcclxuICAgKiBSZXR1cm5zIHRoZSBub3JtYWxzIG9mIHRoaXMgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7QXJyYXk8VmVjdG9yPn1cclxuICAgKi9cclxuICBnZXQgbm9ybWFscygpOiBBcnJheTxWZWN0b3I+IHsgcmV0dXJuIHRoaXMuX25vcm1hbHM7IH1cclxuXHJcbiAgLyoqXHJcbiAgICogU2V0IHRoZSBwb2ludHMgb2YgdGhlIHBvbHlnb24uIEFueSBjb25zZWN1dGl2ZSBkdXBsaWNhdGUgcG9pbnRzIHdpbGwgYmUgY29tYmluZWQuXHJcbiAgICogXHJcbiAgICogTm90ZTogVGhlIHBvaW50cyBhcmUgY291bnRlci1jbG9ja3dpc2UgKndpdGggcmVzcGVjdCB0byB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0qLiBJZiB5b3UgZGlyZWN0bHkgZHJhdyB0aGUgcG9pbnRzIG9uIGEgc2NyZWVuIFxyXG4gICAqIHRoYXQgaGFzIHRoZSBvcmlnaW4gYXQgdGhlIHRvcC1sZWZ0IGNvcm5lciBpdCB3aWxsIF9hcHBlYXJfIHZpc3VhbGx5IHRoYXQgdGhlIHBvaW50cyBhcmUgYmVpbmcgc3BlY2lmaWVkIGNsb2Nrd2lzZS4gVGhpcyBpcyBcclxuICAgKiBqdXN0IGJlY2F1c2Ugb2YgdGhlIGludmVyc2lvbiBvZiB0aGUgWS1heGlzIHdoZW4gYmVpbmcgZGlzcGxheWVkLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7QXJyYXk8VmVjdG9yPn0gcG9pbnRzIEFuIGFycmF5IG9mIHZlY3RvcnMgcmVwcmVzZW50aW5nIHRoZSBwb2ludHMgaW4gdGhlIHBvbHlnb24sIGluIGNvdW50ZXItY2xvY2t3aXNlIG9yZGVyLlxyXG4gICAqICAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgc2V0UG9pbnRzKHBvaW50czogQXJyYXk8VmVjdG9yPik6IFBvbHlnb24ge1xyXG4gICAgLy8gT25seSByZS1hbGxvY2F0ZSBpZiB0aGlzIGlzIGEgbmV3IHBvbHlnb24gb3IgdGhlIG51bWJlciBvZiBwb2ludHMgaGFzIGNoYW5nZWQuXHJcbiAgICBjb25zdCBsZW5ndGhDaGFuZ2VkOiBib29sZWFuID0gIXRoaXMucG9pbnRzIHx8IHRoaXMucG9pbnRzLmxlbmd0aCAhPT0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBpZiAobGVuZ3RoQ2hhbmdlZCkge1xyXG4gICAgICBsZXQgaTogbnVtYmVyO1xyXG5cclxuICAgICAgY29uc3QgY2FsY1BvaW50czogQXJyYXk8VmVjdG9yPiA9IHRoaXMuX2NhbGNQb2ludHMgPSBbXTtcclxuICAgICAgY29uc3QgZWRnZXM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLl9lZGdlcyA9IFtdO1xyXG4gICAgICBjb25zdCBub3JtYWxzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5fbm9ybWFscyA9IFtdO1xyXG5cclxuICAgICAgLy8gQWxsb2NhdGUgdGhlIHZlY3RvciBhcnJheXMgZm9yIHRoZSBjYWxjdWxhdGVkIHByb3BlcnRpZXNcclxuICAgICAgZm9yIChpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIC8vIFJlbW92ZSBjb25zZWN1dGl2ZSBkdXBsaWNhdGUgcG9pbnRzXHJcbiAgICAgICAgY29uc3QgcDE6IFZlY3RvciA9IHBvaW50c1tpXTtcclxuICAgICAgICBjb25zdCBwMjogVmVjdG9yID0gaSA8IHBvaW50cy5sZW5ndGggLSAxID8gcG9pbnRzW2kgKyAxXSA6IHBvaW50c1swXTtcclxuXHJcbiAgICAgICAgaWYgKHAxICE9PSBwMiAmJiBwMS54ID09PSBwMi54ICYmIHAxLnkgPT09IHAyLnkpIHtcclxuICAgICAgICAgIHBvaW50cy5zcGxpY2UoaSwgMSk7XHJcbiAgICAgICAgICBpIC09IDE7XHJcbiAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNhbGNQb2ludHMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG4gICAgICAgIGVkZ2VzLnB1c2gobmV3IFZlY3RvcigpKTtcclxuICAgICAgICBub3JtYWxzLnB1c2gobmV3IFZlY3RvcigpKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX3BvaW50cyA9IHBvaW50cztcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFNldCB0aGUgY3VycmVudCByb3RhdGlvbiBhbmdsZSBvZiB0aGUgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0gYW5nbGUgVGhlIGN1cnJlbnQgcm90YXRpb24gYW5nbGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHNldEFuZ2xlKGFuZ2xlOiBudW1iZXIpOiBQb2x5Z29uIHtcclxuICAgIHRoaXMuX2FuZ2xlID0gYW5nbGU7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBTZXQgdGhlIGN1cnJlbnQgb2Zmc2V0IHRvIGFwcGx5IHRvIHRoZSBgcG9pbnRzYCBiZWZvcmUgYXBwbHlpbmcgdGhlIGBhbmdsZWAgcm90YXRpb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG9mZnNldCBUaGUgbmV3IG9mZnNldCBWZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1BvbHlnb259IFJldHVybnMgdGhpcyBmb3IgY2hhaW5pbmcuXHJcbiAgICovXHJcbiAgc2V0T2Zmc2V0KG9mZnNldDogVmVjdG9yKTogUG9seWdvbiB7XHJcbiAgICB0aGlzLl9vZmZzZXQgPSBvZmZzZXQ7XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBSb3RhdGVzIHRoaXMgUG9seWdvbiBjb3VudGVyLWNsb2Nrd2lzZSBhcm91bmQgdGhlIG9yaWdpbiBvZiAqaXRzIGxvY2FsIGNvb3JkaW5hdGUgc3lzdGVtKiAoaS5lLiBgcG9zaXRpb25gKS5cclxuICAgKiBcclxuICAgKiBOb3RlOiBUaGlzIGNoYW5nZXMgdGhlICoqb3JpZ2luYWwqKiBwb2ludHMgKHNvIGFueSBgYW5nbGVgIHdpbGwgYmUgYXBwbGllZCBvbiB0b3Agb2YgdGhpcyByb3RhdGlvbikuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IGFuZ2xlIFRoZSBhbmdsZSB0byByb3RhdGUgKGluIHJhZGlhbnMpLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHJvdGF0ZShhbmdsZTogbnVtYmVyKTogUG9seWdvbiB7XHJcbiAgICBjb25zdCBwb2ludHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLnBvaW50cztcclxuICAgIGNvbnN0IGxlbjogbnVtYmVyID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSBwb2ludHNbaV0ucm90YXRlKGFuZ2xlKTtcclxuXHJcbiAgICB0aGlzLl9yZWNhbGMoKTtcclxuXHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIFRyYW5zbGF0ZXMgdGhlIHBvaW50cyBvZiB0aGlzIHBvbHlnb24gYnkgYSBzcGVjaWZpZWQgYW1vdW50IHJlbGF0aXZlIHRvIHRoZSBvcmlnaW4gb2YgKml0cyBvd24gY29vcmRpbmF0ZSBzeXN0ZW0qIChpLmUuIGBwb3NpdGlvbmApLlxyXG4gICAqIFxyXG4gICAqIE5vdGU6IFRoaXMgY2hhbmdlcyB0aGUgKipvcmlnaW5hbCoqIHBvaW50cyAoc28gYW55IGBvZmZzZXRgIHdpbGwgYmUgYXBwbGllZCBvbiB0b3Agb2YgdGhpcyB0cmFuc2xhdGlvbilcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgaG9yaXpvbnRhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB2ZXJ0aWNhbCBhbW91bnQgdG8gdHJhbnNsYXRlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHRyYW5zbGF0ZSh4OiBudW1iZXIsIHk6IG51bWJlcik6IFBvbHlnb24ge1xyXG4gICAgY29uc3QgcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5wb2ludHM7XHJcbiAgICBjb25zdCBsZW46IG51bWJlciA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIHBvaW50c1tpXS54ICs9IHg7XHJcbiAgICAgIHBvaW50c1tpXS55ICs9IHk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fcmVjYWxjKCk7XHJcblxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDb21wdXRlcyB0aGUgY2FsY3VsYXRlZCBjb2xsaXNpb24gUG9seWdvbi5cclxuICAgKiBcclxuICAgKiBUaGlzIGFwcGxpZXMgdGhlIGBhbmdsZWAgYW5kIGBvZmZzZXRgIHRvIHRoZSBvcmlnaW5hbCBwb2ludHMgdGhlbiByZWNhbGN1bGF0ZXMgdGhlIGVkZ2VzIGFuZCBub3JtYWxzIG9mIHRoZSBjb2xsaXNpb24gUG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtQb2x5Z29ufSBSZXR1cm5zIHRoaXMgZm9yIGNoYWluaW5nLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX3JlY2FsYygpOiBQb2x5Z29uIHtcclxuICAgIC8vIENhbGN1bGF0ZWQgcG9pbnRzIC0gdGhpcyBpcyB3aGF0IGlzIHVzZWQgZm9yIHVuZGVybHlpbmcgY29sbGlzaW9ucyBhbmQgdGFrZXMgaW50byBhY2NvdW50XHJcbiAgICAvLyB0aGUgYW5nbGUvb2Zmc2V0IHNldCBvbiB0aGUgcG9seWdvbi5cclxuICAgIGNvbnN0IGNhbGNQb2ludHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLmNhbGNQb2ludHM7XHJcblxyXG4gICAgLy8gVGhlIGVkZ2VzIGhlcmUgYXJlIHRoZSBkaXJlY3Rpb24gb2YgdGhlIGBuYHRoIGVkZ2Ugb2YgdGhlIHBvbHlnb24sIHJlbGF0aXZlIHRvXHJcbiAgICAvLyB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYSBnaXZlbiBlZGdlIGZyb20gdGhlIGVkZ2UgdmFsdWUsIHlvdSBtdXN0XHJcbiAgICAvLyBmaXJzdCB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgIGNvbnN0IGVkZ2VzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5fZWRnZXM7XHJcblxyXG4gICAgLy8gVGhlIG5vcm1hbHMgaGVyZSBhcmUgdGhlIGRpcmVjdGlvbiBvZiB0aGUgbm9ybWFsIGZvciB0aGUgYG5gdGggZWRnZSBvZiB0aGUgcG9seWdvbiwgcmVsYXRpdmVcclxuICAgIC8vIHRvIHRoZSBwb3NpdGlvbiBvZiB0aGUgYG5gdGggcG9pbnQuIElmIHlvdSB3YW50IHRvIGRyYXcgYW4gZWRnZSBub3JtYWwsIHlvdSBtdXN0IGZpcnN0XHJcbiAgICAvLyB0cmFuc2xhdGUgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSBzdGFydGluZyBwb2ludC5cclxuICAgIGNvbnN0IG5vcm1hbHM6IEFycmF5PFZlY3Rvcj4gPSB0aGlzLl9ub3JtYWxzO1xyXG5cclxuICAgIC8vIENvcHkgdGhlIG9yaWdpbmFsIHBvaW50cyBhcnJheSBhbmQgYXBwbHkgdGhlIG9mZnNldC9hbmdsZVxyXG4gICAgY29uc3QgcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5wb2ludHM7XHJcbiAgICBjb25zdCBvZmZzZXQ6IFZlY3RvciA9IHRoaXMub2Zmc2V0O1xyXG4gICAgY29uc3QgYW5nbGU6IG51bWJlciA9IHRoaXMuYW5nbGU7XHJcblxyXG4gICAgY29uc3QgbGVuOiBudW1iZXIgPSBwb2ludHMubGVuZ3RoO1xyXG4gICAgbGV0IGk6IG51bWJlcjtcclxuXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgY2FsY1BvaW50OiBWZWN0b3IgPSBjYWxjUG9pbnRzW2ldLmNvcHkocG9pbnRzW2ldKTtcclxuXHJcbiAgICAgIGNhbGNQb2ludC54ICs9IG9mZnNldC54O1xyXG4gICAgICBjYWxjUG9pbnQueSArPSBvZmZzZXQueTtcclxuXHJcbiAgICAgIGlmIChhbmdsZSAhPT0gMCkgY2FsY1BvaW50LnJvdGF0ZShhbmdsZSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBlZGdlcy9ub3JtYWxzXHJcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgcDE6IFZlY3RvciA9IGNhbGNQb2ludHNbaV07XHJcbiAgICAgIGNvbnN0IHAyOiBWZWN0b3IgPSBpIDwgbGVuIC0gMSA/IGNhbGNQb2ludHNbaSArIDFdIDogY2FsY1BvaW50c1swXTtcclxuXHJcbiAgICAgIGNvbnN0IGU6IFZlY3RvciA9IGVkZ2VzW2ldLmNvcHkocDIpLnN1YihwMSk7XHJcblxyXG4gICAgICBub3JtYWxzW2ldLmNvcHkoZSkucGVycCgpLm5vcm1hbGl6ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ29tcHV0ZSB0aGUgYXhpcy1hbGlnbmVkIGJvdW5kaW5nIGJveC5cclxuICAgKiBcclxuICAgKiBBbnkgY3VycmVudCBzdGF0ZSAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb25zdHJ1Y3RpbmcgdGhlIEFBQkIuXHJcbiAgICogXHJcbiAgICogTm90ZTogUmV0dXJucyBhIF9uZXdfIGBQb2x5Z29uYCBlYWNoIHRpbWUgeW91IGNhbGwgdGhpcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGlzIGZvciBjaGFpbmluZy5cclxuICAgKi9cclxuICBnZXRBQUJCKCk6IFBvbHlnb24ge1xyXG4gICAgY29uc3QgcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gdGhpcy5jYWxjUG9pbnRzO1xyXG4gICAgY29uc3QgbGVuOiBudW1iZXIgPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGxldCB4TWluOiBudW1iZXIgPSBwb2ludHNbMF0ueDtcclxuICAgIGxldCB5TWluOiBudW1iZXIgPSBwb2ludHNbMF0ueTtcclxuXHJcbiAgICBsZXQgeE1heDogbnVtYmVyID0gcG9pbnRzWzBdLng7XHJcbiAgICBsZXQgeU1heDogbnVtYmVyID0gcG9pbnRzWzBdLnk7XHJcblxyXG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMTsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHBvaW50OiBWZWN0b3IgPSBwb2ludHNbaV07XHJcblxyXG4gICAgICBpZiAocG9pbnRbXCJ4XCJdIDwgeE1pbikgeE1pbiA9IHBvaW50W1wieFwiXTtcclxuICAgICAgZWxzZSBpZiAocG9pbnRbXCJ4XCJdID4geE1heCkgeE1heCA9IHBvaW50W1wieFwiXTtcclxuXHJcbiAgICAgIGlmIChwb2ludFtcInlcIl0gPCB5TWluKSB5TWluID0gcG9pbnRbXCJ5XCJdO1xyXG4gICAgICBlbHNlIGlmIChwb2ludFtcInlcIl0gPiB5TWF4KSB5TWF4ID0gcG9pbnRbXCJ5XCJdO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gbmV3IEJveCh0aGlzLl9wb3NpdGlvbi5jbG9uZSgpLmFkZChuZXcgVmVjdG9yKHhNaW4sIHlNaW4pKSwgeE1heCAtIHhNaW4sIHlNYXggLSB5TWluKS50b1BvbHlnb24oKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbXB1dGUgdGhlIGNlbnRyb2lkIChnZW9tZXRyaWMgY2VudGVyKSBvZiB0aGUgUG9seWdvbi5cclxuICAgKiBcclxuICAgKiBBbnkgY3VycmVudCBzdGF0ZSAodHJhbnNsYXRpb25zL3JvdGF0aW9ucykgd2lsbCBiZSBhcHBsaWVkIGJlZm9yZSBjb21wdXRpbmcgdGhlIGNlbnRyb2lkLlxyXG4gICAqIFxyXG4gICAqIFNlZSBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DZW50cm9pZCNDZW50cm9pZF9vZl9hX3BvbHlnb25cclxuICAgKiBcclxuICAgKiBOb3RlOiBSZXR1cm5zIGEgX25ld18gYFZlY3RvcmAgZWFjaCB0aW1lIHlvdSBjYWxsIHRoaXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyBhIFZlY3RvciB0aGF0IGNvbnRhaW5zIHRoZSBjb29yZGluYXRlcyBvZiB0aGUgY2VudHJvaWQuXHJcbiAgICovXHJcbiAgZ2V0Q2VudHJvaWQoKTogVmVjdG9yIHtcclxuICAgIGNvbnN0IHBvaW50czogQXJyYXk8VmVjdG9yPiA9IHRoaXMuY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGxlbjogbnVtYmVyID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBsZXQgY3g6IG51bWJlciA9IDA7XHJcbiAgICBsZXQgY3k6IG51bWJlciA9IDA7XHJcbiAgICBsZXQgYXI6IG51bWJlciA9IDA7XHJcblxyXG4gICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IHAxOiBWZWN0b3IgPSBwb2ludHNbaV07XHJcbiAgICAgIGNvbnN0IHAyOiBWZWN0b3IgPSBpID09PSBsZW4gLSAxID8gcG9pbnRzWzBdIDogcG9pbnRzW2kgKyAxXTsgLy8gTG9vcCBhcm91bmQgaWYgbGFzdCBwb2ludFxyXG5cclxuICAgICAgY29uc3QgYTogbnVtYmVyID0gcDFbXCJ4XCJdICogcDJbXCJ5XCJdIC0gcDJbXCJ4XCJdICogcDFbXCJ5XCJdO1xyXG5cclxuICAgICAgY3ggKz0gKHAxW1wieFwiXSArIHAyW1wieFwiXSkgKiBhO1xyXG4gICAgICBjeSArPSAocDFbXCJ5XCJdICsgcDJbXCJ5XCJdKSAqIGE7XHJcbiAgICAgIGFyICs9IGE7XHJcbiAgICB9XHJcblxyXG4gICAgYXIgPSBhciAqIDM7IC8vIHdlIHdhbnQgMSAvIDYgdGhlIGFyZWEgYW5kIHdlIGN1cnJlbnRseSBoYXZlIDIqYXJlYVxyXG4gICAgY3ggPSBjeCAvIGFyO1xyXG4gICAgY3kgPSBjeSAvIGFyO1xyXG5cclxuICAgIHJldHVybiBuZXcgVmVjdG9yKGN4LCBjeSk7XHJcbiAgfVxyXG59Il19