function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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
    set:
    /**
     * Sets a new x value for this vector.
     * 
     * @param {number} x The new x value for this vector.
     */
    function set(x) {
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
    /**
     * Copy the values of another Vector into this one.
     * 
     * @param {Vector} other The other Vector.
     * 
     * @returns {Vector} Returns this for chaining.
     */

  }, {
    key: "copy",
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
  }]);

  return Vector;
}();

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
   * An Array of the points of this polygon as numbers instead of Vectors.
   * 
   * @private
   * 
   * @property {Array<number>}
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
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector();
    var points = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Polygon);

    _defineProperty(this, "_position", new Vector());

    _defineProperty(this, "_points", []);

    _defineProperty(this, "_pointsGeneric", []);

    _defineProperty(this, "_angle", 0);

    _defineProperty(this, "_offset", new Vector());

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
     * Returns the points of this polygon as numbers instead of Vectors.
     * 
     * @returns {Array<number>}
     */

  }, {
    key: "pointsGeneric",
    get: function get() {
      return this._pointsGeneric;
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

  }, {
    key: "setPoints",
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
          var p2 = i < points.length - 1 ? points[i + 1] : points[0]; // Push the points to the generic points Array.

          this._pointsGeneric.push(points[i].x, points[i].y);

          if (p1 !== p2 && p1.x === p2.x && p1.y === p2.y) {
            points.splice(i, 1);
            i -= 1;
            continue;
          }

          calcPoints.push(new Vector());
          edges.push(new Vector());
          normals.push(new Vector());
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

      return new Polygon(this._position.clone().add(new Vector(xMin, yMin)), [new Vector(), new Vector(xMax - xMin, 0), new Vector(xMax - xMin, yMax - yMin), new Vector(0, yMax - yMin)]);
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
      return new Vector(cx, cy);
    }
  }]);

  return Polygon;
}();

/**
 * a enum for quick assignment of common origins
 */

var BoxOrigin;
/**
 * A box represents an axis-aligned box with a width and height.
 */

(function (BoxOrigin) {
  BoxOrigin[BoxOrigin["center"] = 0] = "center";
  BoxOrigin[BoxOrigin["bottomLeft"] = 1] = "bottomLeft";
  BoxOrigin[BoxOrigin["bottomRight"] = 2] = "bottomRight";
  BoxOrigin[BoxOrigin["topRigth"] = 3] = "topRigth";
  BoxOrigin[BoxOrigin["topLeft"] = 4] = "topLeft";
})(BoxOrigin || (BoxOrigin = {}));

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
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector();
    var width = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var height = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var origin = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : BoxOrigin.bottomLeft;

    _classCallCheck(this, Box);

    _defineProperty(this, "_position", new Vector());

    _defineProperty(this, "_width", 0);

    _defineProperty(this, "_height", 0);

    _defineProperty(this, "_origin", new Vector());

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
      this._origin = newOrigin instanceof Vector ? newOrigin : this._getCommonsOrigin(newOrigin);
    }
    /**
     * Returns a Polygon whose edges are the same as this Box.
     * 
     * @returns {Polygon} A new Polygon that represents this Box.
     */

  }, {
    key: "toPolygon",
    value: function toPolygon() {
      return new Polygon(new Vector(this._position.x, this._position.y), [new Vector().sub(this._origin), new Vector(this._width, 0).sub(this._origin), new Vector(this._width, this._height).sub(this._origin), new Vector(0, this._height).sub(this._origin)]);
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

      var Origins = (_Origins = {}, _defineProperty(_Origins, BoxOrigin.center, new Vector(this._width / 2, this._height / 2)), _defineProperty(_Origins, BoxOrigin.bottomLeft, new Vector()), _defineProperty(_Origins, BoxOrigin.bottomRight, new Vector(this._width, 0)), _defineProperty(_Origins, BoxOrigin.topRigth, new Vector(this._width, this._height)), _defineProperty(_Origins, BoxOrigin.topLeft, new Vector(0, this._height)), _Origins);
      return Origins[origin];
    }
  }]);

  return Box;
}();

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
    var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vector();
    var radius = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

    _classCallCheck(this, Circle);

    _defineProperty(this, "_position", new Vector());

    _defineProperty(this, "_radius", 0);

    _defineProperty(this, "_offset", new Vector());

    this._position = position;
    this._radius = radius;
  }
  /**
   * Returns the position of this circle.
   * 
   * @returns {Vector}
   */


  _createClass(Circle, [{
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
    /**
     * Translate the center of the cirlc.e
     * 
     * @param {Vector} position A Vector representing the new center of this circle.
     */

  }, {
    key: "translate",
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
      var corner = this._position.clone().add(this._offset).sub(new Vector(this._radius, this._radius));

      return new Box(corner, this._radius * 2, this._radius * 2).toPolygon();
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
  }]);

  return Circle;
}();

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

    _defineProperty(this, "overlapN", new Vector());

    _defineProperty(this, "overlapV", new Vector());

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

var Collider2D = /*#__PURE__*/function () {
  /**
   * A pool of `Vector objects that are used in calculations to avoid allocating memory.
   * 
   * @private
   * 
   * @property {Array<Vector>}
   */

  /**
   * A pool of arrays of numbers used in calculations to avoid allocating memory.
   * 
   * @private
   * 
   * @property {Array<Array<number>>}
   */

  /**
   * Temporary collision details object used for hit detection.
   * 
   * @private
   * 
   * @property {CollisionDetails}
   */

  /**
   * Tiny "point" Polygon used for Polygon hit detection.
   * 
   * @private
   * 
   * @property {Polygon}
   */

  /**
   * Constant used for left voronoi region.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * Constant used for middle voronoi region.
   * 
   * @private
   * 
   * @property {number}
   */

  /**
   * Constant used for right voronoi region.
   * 
   * @private
   * 
   * @property {number}
   */
  function Collider2D() {
    _classCallCheck(this, Collider2D);

    _defineProperty(this, "_T_VECTORS", []);

    _defineProperty(this, "_T_ARRAYS", []);

    _defineProperty(this, "_T_COLLISION_DETAILS", new CollisionDetails());

    _defineProperty(this, "_TEST_POINT", new Box(new Vector(), 0.000001, 0.000001).toPolygon());

    _defineProperty(this, "_LEFT_VORONOI_REGION", -1);

    _defineProperty(this, "_MIDDLE_VORONOI_REGION", 0);

    _defineProperty(this, "_RIGHT_VORONOI_REGION", 1);

    // Populate T_VECTORS
    for (var i = 0; i < 10; i++) {
      this._T_VECTORS.push(new Vector());
    } // Populate T_ARRAYS


    for (var _i = 0; _i < 5; _i++) {
      this._T_ARRAYS.push([]);
    }
  }
  /**
   * Check if a point is inside a circle.
   * 
   * @param {Vector} point The point to test.
   * @param {Circle} circle The circle to test.
   * 
   * @returns {boolean} Returns true if the point is inside the circle or false otherwise.
   */


  _createClass(Collider2D, [{
    key: "pointInCircle",
    value: function pointInCircle(point, circle) {
      var differenceV = this._T_VECTORS.pop().copy(point).sub(circle.position).sub(circle.offset);

      var radiusSq = circle.radius * circle.radius;
      var distanceSq = differenceV.len2();

      this._T_VECTORS.push(differenceV); // If the distance between is smaller than the radius then the point is inside the circle.


      return distanceSq <= radiusSq;
    }
    /**
     * Check if a point is inside a convex polygon.
     * 
     * @param {Vector} point The point to test.
     * @param {Polygon} polygon The polygon to test.
     * 
     * @returns {boolean} Returns true if the point is inside the polygon or false otherwise.
     */

  }, {
    key: "pointInPolygon",
    value: function pointInPolygon(point, polygon) {
      this._TEST_POINT.position.copy(point);

      this._T_COLLISION_DETAILS.clear();

      var result = this.testPolygonPolygon(this._TEST_POINT, polygon, true);
      if (result) result = this._T_COLLISION_DETAILS.aInB;
      return result;
    }
    /**
     * Check if two circles collide.
     * 
     * @param {Circle} a The first circle.
     * @param {Circle} b The second circle.
     * @param {boolean} [details=false] If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true.
     * 
     * @returns {boolean} Returns true if the circles intersect or false otherwise.
     */

  }, {
    key: "testCircleCircle",
    value: function testCircleCircle(a, b) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      // Check if the distance between the centers of the two circles is greater than their combined radius.
      var differenceV = this._T_VECTORS.pop().copy(b.position).add(b.offset).sub(a.position).sub(a.offset);

      var totalRadius = a.radius + b.radius;
      var totalRadiusSq = totalRadius * totalRadius;
      var distanceSq = differenceV.len2(); // If the distance is bigger than the combined radius, they don't intersect.

      if (distanceSq > totalRadiusSq) {
        this._T_VECTORS.push(differenceV);

        return false;
      }

      if (details) {
        this._T_COLLISION_DETAILS.clear();

        var dist = Math.sqrt(distanceSq);
        this._T_COLLISION_DETAILS.a = a;
        this._T_COLLISION_DETAILS.b = b;
        this._T_COLLISION_DETAILS.overlap = totalRadius - dist;

        this._T_COLLISION_DETAILS.overlapN.copy(differenceV.normalize());

        this._T_COLLISION_DETAILS.overlapV.copy(differenceV).scale(this._T_COLLISION_DETAILS.overlap);

        this._T_COLLISION_DETAILS.aInB = a.radius <= b.radius && dist <= b.radius - a.radius;
        this._T_COLLISION_DETAILS.bInA = b.radius <= a.radius && dist <= a.radius - b.radius;
        return this._T_COLLISION_DETAILS;
      }

      this._T_VECTORS.push(differenceV);

      return true;
    }
    /**
     * Checks whether polygons collide.
     * 
     * @param {Polygon} a The first polygon.
     * @param {Polygon} b The second polygon.
     * @param {boolean} [details=false] If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true.
     * 
     * @returns {boolean} Returns true if they intersect or false otherwise.
     */

  }, {
    key: "testPolygonPolygon",
    value: function testPolygonPolygon(a, b) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this._T_COLLISION_DETAILS.clear();

      var aPoints = a.calcPoints;
      var aLen = aPoints.length;
      var bPoints = b.calcPoints;
      var bLen = bPoints.length; // If any of the edge normals of A is a separating axis, no intersection.

      for (var i = 0; i < aLen; i++) {
        if (this._isSeparatingAxis(a.position, b.position, aPoints, bPoints, a.normals[i], this._T_COLLISION_DETAILS)) {
          return false;
        }
      } // If any of the edge normals of B is a separating axis, no intersection.


      for (var _i2 = 0; _i2 < bLen; _i2++) {
        if (this._isSeparatingAxis(a.position, b.position, aPoints, bPoints, b.normals[_i2], this._T_COLLISION_DETAILS)) {
          return false;
        }
      } // Since none of the edge normals of A or B are a separating axis, there is an intersection
      // and we've already calculated the smallest overlap (in isSeparatingAxis). 
      // Calculate the final overlap vector.


      if (details) {
        this._T_COLLISION_DETAILS.a = a;
        this._T_COLLISION_DETAILS.b = b;

        this._T_COLLISION_DETAILS.overlapV.copy(this._T_COLLISION_DETAILS.overlapN).scale(this._T_COLLISION_DETAILS.overlap);

        return this._T_COLLISION_DETAILS;
      }

      return true;
    }
    /**
     * Check if a polygon and a circle collide.
     * 
     * @param {Polygon} polygon The polygon.
     * @param {Circle} circle The circle.
     * @param {boolean} [details=false] If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true.
     * 
     * @returns {boolean} Returns true if they intersect or false otherwise.
     */

  }, {
    key: "testPolygonCircle",
    value: function testPolygonCircle(polygon, circle) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this._T_COLLISION_DETAILS.clear(); // Get the position of the circle relative to the polygon.


      var circlePos = this._T_VECTORS.pop().copy(circle.position).add(circle.offset).sub(polygon.position);

      var radius = circle.radius;
      var radius2 = radius * radius;
      var points = polygon.calcPoints;
      var len = points.length;

      var edge = this._T_VECTORS.pop();

      var point = this._T_VECTORS.pop(); // For each edge in the polygon:


      for (var i = 0; i < len; i++) {
        var next = i === len - 1 ? 0 : i + 1;
        var prev = i === 0 ? len - 1 : i - 1;
        var overlap = 0;
        var overlapN = null; // Get the edge.

        edge.copy(polygon.edges[i]); // Calculate the center of the circle relative to the starting point of the edge.

        point.copy(circlePos).sub(points[i]); // If the distance between the center of the circle and the point is bigger than the radius, the polygon is definitely not fully in the circle.

        if (details && point.len2() > radius2) this._T_COLLISION_DETAILS.aInB = false; // Calculate which Voronoi region the center of the circle is in.

        var region = this._voronoiRegion(edge, point); // If it's the left region:


        if (region === this._LEFT_VORONOI_REGION) {
          // We need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
          edge.copy(polygon.edges[prev]); // Calculate the center of the circle relative the starting point of the previous edge

          var point2 = this._T_VECTORS.pop().copy(circlePos).sub(points[prev]);

          region = this._voronoiRegion(edge, point2);

          if (region === this._RIGHT_VORONOI_REGION) {
            // It's in the region we want.  Check if the circle intersects the point.
            var dist = point.len();

            if (dist > radius) {
              // No intersection
              this._T_VECTORS.push(circlePos);

              this._T_VECTORS.push(edge);

              this._T_VECTORS.push(point);

              this._T_VECTORS.push(point2);

              return false;
            } else if (details) {
              // It intersects, calculate the overlap.
              this._T_COLLISION_DETAILS.bInA = false;
              overlapN = point.normalize();
              overlap = radius - dist;
            }
          }

          this._T_VECTORS.push(point2); // If it's the right region:

        } else if (region === this._RIGHT_VORONOI_REGION) {
          // We need to make sure we're in the left region on the next edge
          edge.copy(polygon.edges[next]); // Calculate the center of the circle relative to the starting point of the next edge.

          point.copy(circlePos).sub(points[next]);
          region = this._voronoiRegion(edge, point);

          if (region === this._LEFT_VORONOI_REGION) {
            // It's in the region we want.  Check if the circle intersects the point.
            var _dist = point.len();

            if (_dist > radius) {
              // No intersection
              this._T_VECTORS.push(circlePos);

              this._T_VECTORS.push(edge);

              this._T_VECTORS.push(point);

              return false;
            } else if (details) {
              // It intersects, calculate the overlap.
              this._T_COLLISION_DETAILS.bInA = false;
              overlapN = point.normalize();
              overlap = radius - _dist;
            }
          } // Otherwise, it's the middle region:

        } else {
          // Need to check if the circle is intersecting the edge, change the edge into its "edge normal".
          var normal = edge.perp().normalize(); // Find the perpendicular distance between the center of the circle and the edge.

          var _dist2 = point.dot(normal);

          var distAbs = Math.abs(_dist2); // If the circle is on the outside of the edge, there is no intersection.

          if (_dist2 > 0 && distAbs > radius) {
            // No intersection
            this._T_VECTORS.push(circlePos);

            this._T_VECTORS.push(normal);

            this._T_VECTORS.push(point);

            return false;
          } else if (details) {
            // It intersects, calculate the overlap.
            overlapN = normal;
            overlap = radius - _dist2; // If the center of the circle is on the outside of the edge, or part of the circle is on the outside, the circle is not fully inside the polygon.

            if (_dist2 >= 0 || overlap < 2 * radius) this._T_COLLISION_DETAILS.bInA = false;
          }
        } // If this is the smallest overlap we've seen, keep it.
        // (overlapN may be null if the circle was in the wrong Voronoi region).


        if (overlapN && details && Math.abs(overlap) < Math.abs(this._T_COLLISION_DETAILS.overlap)) {
          this._T_COLLISION_DETAILS.overlap = overlap;

          this._T_COLLISION_DETAILS.overlapN.copy(overlapN);
        }
      } // Calculate the final overlap vector - based on the smallest overlap.


      if (details) {
        this._T_COLLISION_DETAILS.a = polygon;
        this._T_COLLISION_DETAILS.b = circle;

        this._T_COLLISION_DETAILS.overlapV.copy(this._T_COLLISION_DETAILS.overlapN).scale(this._T_COLLISION_DETAILS.overlap);
      }

      this._T_VECTORS.push(circlePos);

      this._T_VECTORS.push(edge);

      this._T_VECTORS.push(point);

      if (details) return this._T_COLLISION_DETAILS;
      return true;
    }
    /**
     * Check if a circle and a polygon collide.
     * 
     * **NOTE:** This is slightly less efficient than polygonCircle as it just runs polygonCircle and reverses everything
     * at the end.
     * 
     * @param {Circle} circle The circle.
     * @param {Polygon} polygon The polygon.
     * @param {boolean} [details=false] If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true.
     * 
     * @returns {boolean} Returns true if they intersect or false otherwise.
     */

  }, {
    key: "testCirclePolygon",
    value: function testCirclePolygon(circle, polygon) {
      var details = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      // Test the polygon against the circle.
      var result = this.testPolygonCircle(polygon, circle, details);

      if (result && details) {
        var collisionDetails = result; // Swap A and B in the collision details.

        var a = collisionDetails.a;
        var aInB = collisionDetails.aInB;
        collisionDetails.overlapN.reverse();
        collisionDetails.overlapV.reverse();
        collisionDetails.a = collisionDetails.b;
        collisionDetails.b = a;
        collisionDetails.aInB = collisionDetails.bInA;
        collisionDetails.bInA = aInB;
      }

      return result;
    }
    /**
     * Check whether two convex polygons are separated by the specified axis (must be a unit vector).
     * 
     * @private
     * 
     * @param {Vector} aPos The position of the first polygon.
     * @param {Vector} bPos The position of the second polygon.
     * @param {Array<Vector>} aPoints The points in the first polygon.
     * @param {Array<Vector>} bPoints The points in the second polygon.
     * @param {Vector} axis The axis (unit sized) to test against.  The points of both polygons will be projected onto this axis.
     * @param {CollisionDetails} collisionDetails A CollisionDetails object (optional) which will be populated if the axis is not a separating axis.
     * 
     * @return {boolean} true if it is a separating axis, false otherwise.  If false, and a CollisionDetails is passed in, information about how much overlap and the direction of the overlap will be populated.
     */

  }, {
    key: "_isSeparatingAxis",
    value: function _isSeparatingAxis(aPos, bPos, aPoints, bPoints, axis, collisionDetails) {
      var rangeA = this._T_ARRAYS.pop();

      var rangeB = this._T_ARRAYS.pop(); // The magnitude of the offset between the two polygons


      var offsetV = this._T_VECTORS.pop().copy(bPos).sub(aPos);

      var projectedOffset = offsetV.dot(axis); // Project the polygons onto the axis.

      this._flattenPointsOn(aPoints, axis, rangeA);

      this._flattenPointsOn(bPoints, axis, rangeB); // Move B's range to its position relative to A.


      rangeB[0] += projectedOffset;
      rangeB[1] += projectedOffset; // Check if there is a gap. If there is, this is a separating axis and we can stop

      if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
        this._T_VECTORS.push(offsetV);

        this._T_ARRAYS.push(rangeA);

        this._T_ARRAYS.push(rangeB);

        return true;
      } // This is not a separating axis. If we're calculating collision details, calculate the overlap.


      if (collisionDetails) {
        var overlap = 0; // A starts further left than B

        if (rangeA[0] < rangeB[0]) {
          collisionDetails.aInB = false; // A ends before B does. We have to pull A out of B

          if (rangeA[1] < rangeB[1]) {
            overlap = rangeA[1] - rangeB[0];
            collisionDetails.bInA = false; // B is fully inside A.  Pick the shortest way out.
          } else {
            var option1 = rangeA[1] - rangeB[0];
            var option2 = rangeB[1] - rangeA[0];
            overlap = option1 < option2 ? option1 : -option2;
          } // B starts further left than A

        } else {
          collisionDetails.bInA = false; // B ends before A ends. We have to push A out of B

          if (rangeA[1] > rangeB[1]) {
            overlap = rangeA[0] - rangeB[1];
            collisionDetails.aInB = false; // A is fully inside B.  Pick the shortest way out.
          } else {
            var _option = rangeA[1] - rangeB[0];

            var _option2 = rangeB[1] - rangeA[0];

            overlap = _option < _option2 ? _option : -_option2;
          }
        } // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.


        var absOverlap = Math.abs(overlap);

        if (absOverlap < collisionDetails.overlap) {
          collisionDetails.overlap = absOverlap;
          collisionDetails.overlapN.copy(axis);
          if (overlap < 0) collisionDetails.overlapN.reverse();
        }
      }

      this._T_VECTORS.push(offsetV);

      this._T_ARRAYS.push(rangeA);

      this._T_ARRAYS.push(rangeB);

      return false;
    }
    /**
     * Flattens the specified array of points onto a unit vector axis resulting in a one dimensionsl
     * range of the minimum and maximum value on that axis.
     * 
     * @private
     * 
     * @param {Array<Vector>} points The points to flatten.
     * @param {Vector} normal The unit vector axis to flatten on.
     * @param {Array<number>} result An array. After calling this function, result[0] will be the minimum value, result[1] will be the maximum value.
     */

  }, {
    key: "_flattenPointsOn",
    value: function _flattenPointsOn(points, normal, result) {
      var min = Number.MAX_VALUE;
      var max = -Number.MAX_VALUE;
      var len = points.length;

      for (var i = 0; i < len; i++) {
        // The magnitude of the projection of the point onto the normal.
        var dot = points[i].dot(normal);
        if (dot < min) min = dot;
        if (dot > max) max = dot;
      }

      result[0] = min;
      result[1] = max;
    }
    /**
     * Calculates which Voronoi region a point is on a line segment.
     * 
     * It is assumed that both the line and the point are relative to `(0,0)`
     * 
     *             |       (0)      |
     *      (-1)  [S]--------------[E]  (1)
     *            |       (0)      |
     * 
     * @param {Vector} line The line segment.
     * @param {Vector} point The point.
     * @return {number} LEFT_VORONOI_REGION (-1) if it is the left region,
     *                  MIDDLE_VORONOI_REGION (0) if it is the middle region,
     *                  RIGHT_VORONOI_REGION (1) if it is the right region.
     */

  }, {
    key: "_voronoiRegion",
    value: function _voronoiRegion(line, point) {
      var len2 = line.len2();
      var dp = point.dot(line); // If the point is beyond the start of the line, it is in the left voronoi region.

      if (dp < 0) return this._LEFT_VORONOI_REGION; // If the point is beyond the end of the line, it is in the right voronoi region.
      else if (dp > len2) return this._RIGHT_VORONOI_REGION; // Otherwise, it's in the middle one.
        else return this._MIDDLE_VORONOI_REGION;
    }
  }]);

  return Collider2D;
}();

export { Box, BoxOrigin, Circle, Collider2D as Collider2d, Polygon, Vector };
