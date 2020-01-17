'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Box = _interopRequireDefault(require("./geometry/Box"));

var _Vector = _interopRequireDefault(require("./geometry/Vector"));

var _Circle = _interopRequireDefault(require("./geometry/Circle"));

var _Polygon = _interopRequireDefault(require("./geometry/Polygon"));

var _CollisionDetails = _interopRequireDefault(require("./details/CollisionDetails"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Collider2D =
/*#__PURE__*/
function () {
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

    _defineProperty(this, "_T_COLLISION_DETAILS", new _CollisionDetails["default"]());

    _defineProperty(this, "_TEST_POINT", new _Box["default"](new _Vector["default"](), 0.000001, 0.000001).toPolygon());

    _defineProperty(this, "_LEFT_VORONOI_REGION", -1);

    _defineProperty(this, "_MIDDLE_VORONOI_REGION", 0);

    _defineProperty(this, "_RIGHT_VORONOI_REGION", 1);

    // Populate T_VECTORS
    for (var i = 0; i < 10; i++) {
      this._T_VECTORS.push(new _Vector["default"]());
    } // Populate T_ARRAYS


    for (var _i = 0; _i < 5; _i++) {
      this._T_ARRAYS.push([]);
    }
  }
  /**
   * Creates a new vector.
   * 
   * @param {number} x The x position of the vector.
   * @param {number} y The y position of the vector.
   * 
   * @returns {Vector} Returns the newly created vector.
   */


  _createClass(Collider2D, [{
    key: "vector",
    value: function vector(x, y) {
      return new _Vector["default"](x, y);
    }
    /**
     * Creates a new circle.
     * 
     * @param {Vector} position A vector specifying the center position of the circle.
     * @param {number} radius The radius of the circle.
     * 
     * @returns {Circle} Returns the newly created circle.
     */

  }, {
    key: "circle",
    value: function circle(position, radius) {
      return new _Circle["default"](position, radius);
    }
    /**
     * Creates a new polygon.
     * 
     * @param {Vector} position A vector representing the origin point of the polygon.
     * @param {Array<Vector>} points An array of vectors that specifies the points of the polygon, in counter-clockwise order.
     * 
     * @returns {Polygon} Returns the newly created plygon.
     */

  }, {
    key: "polygon",
    value: function polygon(position, points) {
      return new _Polygon["default"](position, points);
    }
    /**
     * Creates a new box.
     * 
     * @param {Vector} position A vector representing the position of the box.
     * @param {number} width The width of the box.
     * @param {number} height The height of the box.
     * 
     * @returns {Box} Returns the newly created box.
     */

  }, {
    key: "box",
    value: function box(position, width, height) {
      return new _Box["default"](position, width, height);
    }
    /**
     * Check if a point is inside a circle.
     * 
     * @param {Vector} point The point to test.
     * @param {Circle} circle The circle to test.
     * 
     * @returns {boolean} Returns true if the point is inside the circle or false otherwise.
     */

  }, {
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

exports["default"] = Collider2D;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC50cyJdLCJuYW1lcyI6WyJDb2xsaWRlcjJEIiwiQ29sbGlzaW9uRGV0YWlscyIsIkJveCIsIlZlY3RvciIsInRvUG9seWdvbiIsImkiLCJfVF9WRUNUT1JTIiwicHVzaCIsIl9UX0FSUkFZUyIsIngiLCJ5IiwicG9zaXRpb24iLCJyYWRpdXMiLCJDaXJjbGUiLCJwb2ludHMiLCJQb2x5Z29uIiwid2lkdGgiLCJoZWlnaHQiLCJwb2ludCIsImNpcmNsZSIsImRpZmZlcmVuY2VWIiwicG9wIiwiY29weSIsInN1YiIsIm9mZnNldCIsInJhZGl1c1NxIiwiZGlzdGFuY2VTcSIsImxlbjIiLCJwb2x5Z29uIiwiX1RFU1RfUE9JTlQiLCJfVF9DT0xMSVNJT05fREVUQUlMUyIsImNsZWFyIiwicmVzdWx0IiwidGVzdFBvbHlnb25Qb2x5Z29uIiwiYUluQiIsImEiLCJiIiwiZGV0YWlscyIsImFkZCIsInRvdGFsUmFkaXVzIiwidG90YWxSYWRpdXNTcSIsImRpc3QiLCJNYXRoIiwic3FydCIsIm92ZXJsYXAiLCJvdmVybGFwTiIsIm5vcm1hbGl6ZSIsIm92ZXJsYXBWIiwic2NhbGUiLCJiSW5BIiwiYVBvaW50cyIsImNhbGNQb2ludHMiLCJhTGVuIiwibGVuZ3RoIiwiYlBvaW50cyIsImJMZW4iLCJfaXNTZXBhcmF0aW5nQXhpcyIsIm5vcm1hbHMiLCJjaXJjbGVQb3MiLCJyYWRpdXMyIiwibGVuIiwiZWRnZSIsIm5leHQiLCJwcmV2IiwiZWRnZXMiLCJyZWdpb24iLCJfdm9yb25vaVJlZ2lvbiIsIl9MRUZUX1ZPUk9OT0lfUkVHSU9OIiwicG9pbnQyIiwiX1JJR0hUX1ZPUk9OT0lfUkVHSU9OIiwibm9ybWFsIiwicGVycCIsImRvdCIsImRpc3RBYnMiLCJhYnMiLCJ0ZXN0UG9seWdvbkNpcmNsZSIsImNvbGxpc2lvbkRldGFpbHMiLCJyZXZlcnNlIiwiYVBvcyIsImJQb3MiLCJheGlzIiwicmFuZ2VBIiwicmFuZ2VCIiwib2Zmc2V0ViIsInByb2plY3RlZE9mZnNldCIsIl9mbGF0dGVuUG9pbnRzT24iLCJvcHRpb24xIiwib3B0aW9uMiIsImFic092ZXJsYXAiLCJtaW4iLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJtYXgiLCJsaW5lIiwiZHAiLCJfTUlERExFX1ZPUk9OT0lfUkVHSU9OIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOztBQUNBOztBQUNBOztBQUNBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7OztBQUNuQjs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7Ozs7QUFTQTs7Ozs7OztBQVNBLHdCQUFjO0FBQUE7O0FBQUEsd0NBeERzQixFQXdEdEI7O0FBQUEsdUNBL0M0QixFQStDNUI7O0FBQUEsa0RBdENtQyxJQUFJQyw0QkFBSixFQXNDbkM7O0FBQUEseUNBN0JpQixJQUFJQyxlQUFKLENBQVEsSUFBSUMsa0JBQUosRUFBUixFQUFzQixRQUF0QixFQUFnQyxRQUFoQyxFQUEwQ0MsU0FBMUMsRUE2QmpCOztBQUFBLGtEQXBCeUIsQ0FBQyxDQW9CMUI7O0FBQUEsb0RBWDJCLENBVzNCOztBQUFBLG1EQUYwQixDQUUxQjs7QUFDWjtBQUNBLFNBQUssSUFBSUMsQ0FBUyxHQUFHLENBQXJCLEVBQXdCQSxDQUFDLEdBQUcsRUFBNUIsRUFBZ0NBLENBQUMsRUFBakM7QUFBcUMsV0FBS0MsVUFBTCxDQUFnQkMsSUFBaEIsQ0FBcUIsSUFBSUosa0JBQUosRUFBckI7QUFBckMsS0FGWSxDQUlaOzs7QUFDQSxTQUFLLElBQUlFLEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUcsQ0FBcEIsRUFBdUJBLEVBQUMsRUFBeEI7QUFBNEIsV0FBS0csU0FBTCxDQUFlRCxJQUFmLENBQW9CLEVBQXBCO0FBQTVCO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7OzJCQVFPRSxDLEVBQVdDLEMsRUFBbUI7QUFDbkMsYUFBTyxJQUFJUCxrQkFBSixDQUFXTSxDQUFYLEVBQWNDLENBQWQs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QUFJQyxFQUFFLEdBQUcsQ0FBVCxFQUFZLE9BQU8sS0FBSzNCLG9CQUFaLENBQVosQ0FFQTtBQUZBLFdBR0ssSUFBSTJCLEVBQUUsR0FBR25FLElBQVQsRUFBZSxPQUFPLEtBQUswQyxxQkFBWixDQUFmLENBRUw7QUFGSyxhQUdBLE9BQU8sS0FBSzBCLHNCQUFaO0FBQ04iLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCdcclxuXHJcbmltcG9ydCBCb3ggZnJvbSAnLi9nZW9tZXRyeS9Cb3gnO1xyXG5pbXBvcnQgVmVjdG9yIGZyb20gJy4vZ2VvbWV0cnkvVmVjdG9yJztcclxuaW1wb3J0IENpcmNsZSBmcm9tICcuL2dlb21ldHJ5L0NpcmNsZSc7XHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJy4vZ2VvbWV0cnkvUG9seWdvbic7XHJcbmltcG9ydCBDb2xsaXNpb25EZXRhaWxzIGZyb20gJy4vZGV0YWlscy9Db2xsaXNpb25EZXRhaWxzJztcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENvbGxpZGVyMkQge1xyXG4gIC8qKlxyXG4gICAqIEEgcG9vbCBvZiBgVmVjdG9yIG9iamVjdHMgdGhhdCBhcmUgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWQgYWxsb2NhdGluZyBtZW1vcnkuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PFZlY3Rvcj59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfVF9WRUNUT1JTOiBBcnJheTxWZWN0b3I+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIEEgcG9vbCBvZiBhcnJheXMgb2YgbnVtYmVycyB1c2VkIGluIGNhbGN1bGF0aW9ucyB0byBhdm9pZCBhbGxvY2F0aW5nIG1lbW9yeS5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXk8QXJyYXk8bnVtYmVyPj59XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfVF9BUlJBWVM6IEFycmF5PEFycmF5PG51bWJlcj4+ID0gW107XHJcblxyXG4gIC8qKlxyXG4gICAqIFRlbXBvcmFyeSBjb2xsaXNpb24gZGV0YWlscyBvYmplY3QgdXNlZCBmb3IgaGl0IGRldGVjdGlvbi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7Q29sbGlzaW9uRGV0YWlsc31cclxuICAgKi9cclxuICBwcml2YXRlIF9UX0NPTExJU0lPTl9ERVRBSUxTOiBDb2xsaXNpb25EZXRhaWxzID0gbmV3IENvbGxpc2lvbkRldGFpbHMoKTtcclxuXHJcbiAgLyoqXHJcbiAgICogVGlueSBcInBvaW50XCIgUG9seWdvbiB1c2VkIGZvciBQb2x5Z29uIGhpdCBkZXRlY3Rpb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge1BvbHlnb259XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfVEVTVF9QT0lOVDogUG9seWdvbiA9IG5ldyBCb3gobmV3IFZlY3RvcigpLCAwLjAwMDAwMSwgMC4wMDAwMDEpLnRvUG9seWdvbigpO1xyXG5cclxuICAvKipcclxuICAgKiBDb25zdGFudCB1c2VkIGZvciBsZWZ0IHZvcm9ub2kgcmVnaW9uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfTEVGVF9WT1JPTk9JX1JFR0lPTjogbnVtYmVyID0gLTE7XHJcblxyXG4gIC8qKlxyXG4gICAqIENvbnN0YW50IHVzZWQgZm9yIG1pZGRsZSB2b3Jvbm9pIHJlZ2lvbi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX01JRERMRV9WT1JPTk9JX1JFR0lPTjogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RhbnQgdXNlZCBmb3IgcmlnaHQgdm9yb25vaSByZWdpb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9SSUdIVF9WT1JPTk9JX1JFR0lPTjogbnVtYmVyID0gMTtcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAvLyBQb3B1bGF0ZSBUX1ZFQ1RPUlNcclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCAxMDsgaSsrKSB0aGlzLl9UX1ZFQ1RPUlMucHVzaChuZXcgVmVjdG9yKCkpO1xyXG5cclxuICAgIC8vIFBvcHVsYXRlIFRfQVJSQVlTXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykgdGhpcy5fVF9BUlJBWVMucHVzaChbXSk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDcmVhdGVzIGEgbmV3IHZlY3Rvci5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge251bWJlcn0geCBUaGUgeCBwb3NpdGlvbiBvZiB0aGUgdmVjdG9yLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB5IFRoZSB5IHBvc2l0aW9uIG9mIHRoZSB2ZWN0b3IuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge1ZlY3Rvcn0gUmV0dXJucyB0aGUgbmV3bHkgY3JlYXRlZCB2ZWN0b3IuXHJcbiAgICovXHJcbiAgdmVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyKTogVmVjdG9yIHtcclxuICAgIHJldHVybiBuZXcgVmVjdG9yKHgsIHkpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ3JlYXRlcyBhIG5ldyBjaXJjbGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvc2l0aW9uIEEgdmVjdG9yIHNwZWNpZnlpbmcgdGhlIGNlbnRlciBwb3NpdGlvbiBvZiB0aGUgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSByYWRpdXMgVGhlIHJhZGl1cyBvZiB0aGUgY2lyY2xlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtDaXJjbGV9IFJldHVybnMgdGhlIG5ld2x5IGNyZWF0ZWQgY2lyY2xlLlxyXG4gICAqL1xyXG4gIGNpcmNsZShwb3NpdGlvbjogVmVjdG9yLCByYWRpdXM6IG51bWJlcik6IENpcmNsZSB7XHJcbiAgICByZXR1cm4gbmV3IENpcmNsZShwb3NpdGlvbiwgcmFkaXVzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgcG9seWdvbi5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcG9zaXRpb24gQSB2ZWN0b3IgcmVwcmVzZW50aW5nIHRoZSBvcmlnaW4gcG9pbnQgb2YgdGhlIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBwb2ludHMgQW4gYXJyYXkgb2YgdmVjdG9ycyB0aGF0IHNwZWNpZmllcyB0aGUgcG9pbnRzIG9mIHRoZSBwb2x5Z29uLCBpbiBjb3VudGVyLWNsb2Nrd2lzZSBvcmRlci5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7UG9seWdvbn0gUmV0dXJucyB0aGUgbmV3bHkgY3JlYXRlZCBwbHlnb24uXHJcbiAgICovXHJcbiAgcG9seWdvbihwb3NpdGlvbjogVmVjdG9yLCBwb2ludHM6IEFycmF5PFZlY3Rvcj4pOiBQb2x5Z29uIHtcclxuICAgIHJldHVybiBuZXcgUG9seWdvbihwb3NpdGlvbiwgcG9pbnRzKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENyZWF0ZXMgYSBuZXcgYm94LlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb3NpdGlvbiBBIHZlY3RvciByZXByZXNlbnRpbmcgdGhlIHBvc2l0aW9uIG9mIHRoZSBib3guXHJcbiAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIFRoZSB3aWR0aCBvZiB0aGUgYm94LlxyXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHQgVGhlIGhlaWdodCBvZiB0aGUgYm94LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtCb3h9IFJldHVybnMgdGhlIG5ld2x5IGNyZWF0ZWQgYm94LlxyXG4gICAqL1xyXG4gIGJveChwb3NpdGlvbjogVmVjdG9yLCB3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IEJveCB7XHJcbiAgICByZXR1cm4gbmV3IEJveChwb3NpdGlvbiwgd2lkdGgsIGhlaWdodCk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNpcmNsZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gcG9pbnQgVGhlIHBvaW50IHRvIHRlc3QuXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlIHRvIHRlc3QuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHBvaW50SW5DaXJjbGUocG9pbnQ6IFZlY3RvciwgY2lyY2xlOiBDaXJjbGUpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IGRpZmZlcmVuY2VWOiBWZWN0b3IgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhLmNvcHkocG9pbnQpLnN1YihjaXJjbGUucG9zaXRpb24pLnN1YihjaXJjbGUub2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCByYWRpdXNTcTogbnVtYmVyID0gY2lyY2xlLnJhZGl1cyAqIGNpcmNsZS5yYWRpdXM7XHJcbiAgICBjb25zdCBkaXN0YW5jZVNxOiBudW1iZXIgPSBkaWZmZXJlbmNlVi5sZW4yKCk7XHJcblxyXG4gICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgIC8vIElmIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIGlzIHNtYWxsZXIgdGhhbiB0aGUgcmFkaXVzIHRoZW4gdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgY2lyY2xlLlxyXG4gICAgcmV0dXJuIGRpc3RhbmNlU3EgPD0gcmFkaXVzU3E7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvaW50IGlzIGluc2lkZSBhIGNvbnZleCBwb2x5Z29uLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24gdG8gdGVzdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIHBvbHlnb24gb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHBvaW50SW5Qb2x5Z29uKHBvaW50OiBWZWN0b3IsIHBvbHlnb246IFBvbHlnb24pOiBib29sZWFuIHtcclxuICAgIHRoaXMuX1RFU1RfUE9JTlQucG9zaXRpb24uY29weShwb2ludCk7XHJcbiAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmNsZWFyKCk7XHJcblxyXG4gICAgbGV0IHJlc3VsdDogKGJvb2xlYW4gfCBDb2xsaXNpb25EZXRhaWxzKSA9IHRoaXMudGVzdFBvbHlnb25Qb2x5Z29uKHRoaXMuX1RFU1RfUE9JTlQsIHBvbHlnb24sIHRydWUpO1xyXG5cclxuICAgIGlmIChyZXN1bHQpIHJlc3VsdCA9IHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYUluQjtcclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgdHdvIGNpcmNsZXMgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gYSBUaGUgZmlyc3QgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBiIFRoZSBzZWNvbmQgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RldGFpbHM9ZmFsc2VdIElmIHNldCB0byB0cnVlIGFuZCB0aGVyZSBpcyBhIGNvbGxpc2lvbiwgYW4gb2JqZWN0IGhpZ2hsaWdodGluZyBkZXRhaWxzIGFib3V0IHRoZSBjb2xsaXNpb24gd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIGp1c3QgcmV0dXJuaW5nIHRydWUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGUgY2lyY2xlcyBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHRlc3RDaXJjbGVDaXJjbGUoYTogQ2lyY2xlLCBiOiBDaXJjbGUsIGRldGFpbHM6IGJvb2xlYW4gPSBmYWxzZSk6IChib29sZWFuIHwgQ29sbGlzaW9uRGV0YWlscykge1xyXG4gICAgLy8gQ2hlY2sgaWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlcnMgb2YgdGhlIHR3byBjaXJjbGVzIGlzIGdyZWF0ZXIgdGhhbiB0aGVpciBjb21iaW5lZCByYWRpdXMuXHJcbiAgICBjb25zdCBkaWZmZXJlbmNlVjogVmVjdG9yID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGIucG9zaXRpb24pLmFkZChiLm9mZnNldCkuc3ViKGEucG9zaXRpb24pLnN1YihhLm9mZnNldCk7XHJcblxyXG4gICAgY29uc3QgdG90YWxSYWRpdXM6IG51bWJlciA9IGEucmFkaXVzICsgYi5yYWRpdXM7XHJcbiAgICBjb25zdCB0b3RhbFJhZGl1c1NxOiBudW1iZXIgPSB0b3RhbFJhZGl1cyAqIHRvdGFsUmFkaXVzO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcTogbnVtYmVyID0gZGlmZmVyZW5jZVYubGVuMigpO1xyXG5cclxuICAgIC8vIElmIHRoZSBkaXN0YW5jZSBpcyBiaWdnZXIgdGhhbiB0aGUgY29tYmluZWQgcmFkaXVzLCB0aGV5IGRvbid0IGludGVyc2VjdC5cclxuICAgIGlmIChkaXN0YW5jZVNxID4gdG90YWxSYWRpdXNTcSkge1xyXG4gICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRldGFpbHMpIHtcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5jbGVhcigpO1xyXG5cclxuICAgICAgY29uc3QgZGlzdDogbnVtYmVyID0gTWF0aC5zcXJ0KGRpc3RhbmNlU3EpO1xyXG5cclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5hID0gYTtcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5iID0gYjtcclxuXHJcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcCA9IHRvdGFsUmFkaXVzIC0gZGlzdDtcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwTi5jb3B5KGRpZmZlcmVuY2VWLm5vcm1hbGl6ZSgpKTtcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwVi5jb3B5KGRpZmZlcmVuY2VWKS5zY2FsZSh0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXApO1xyXG5cclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5hSW5CID0gYS5yYWRpdXMgPD0gYi5yYWRpdXMgJiYgZGlzdCA8PSBiLnJhZGl1cyAtIGEucmFkaXVzO1xyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmJJbkEgPSBiLnJhZGl1cyA8PSBhLnJhZGl1cyAmJiBkaXN0IDw9IGEucmFkaXVzIC0gYi5yYWRpdXM7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUztcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVja3Mgd2hldGhlciBwb2x5Z29ucyBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gYSBUaGUgZmlyc3QgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge1BvbHlnb259IGIgVGhlIHNlY29uZCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RldGFpbHM9ZmFsc2VdIElmIHNldCB0byB0cnVlIGFuZCB0aGVyZSBpcyBhIGNvbGxpc2lvbiwgYW4gb2JqZWN0IGhpZ2hsaWdodGluZyBkZXRhaWxzIGFib3V0IHRoZSBjb2xsaXNpb24gd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIGp1c3QgcmV0dXJuaW5nIHRydWUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgdGVzdFBvbHlnb25Qb2x5Z29uKGE6IFBvbHlnb24sIGI6IFBvbHlnb24sIGRldGFpbHM6IGJvb2xlYW4gPSBmYWxzZSk6IChib29sZWFuIHwgQ29sbGlzaW9uRGV0YWlscykge1xyXG4gICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5jbGVhcigpO1xyXG5cclxuICAgIGNvbnN0IGFQb2ludHM6IEFycmF5PFZlY3Rvcj4gPSBhLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBhTGVuOiBudW1iZXIgPSBhUG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBjb25zdCBiUG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gYi5jYWxjUG9pbnRzO1xyXG4gICAgY29uc3QgYkxlbjogbnVtYmVyID0gYlBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgLy8gSWYgYW55IG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQSBpcyBhIHNlcGFyYXRpbmcgYXhpcywgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgZm9yIChsZXQgaTogbnVtYmVyID0gMDsgaSA8IGFMZW47IGkrKykge1xyXG4gICAgICBpZiAodGhpcy5faXNTZXBhcmF0aW5nQXhpcyhhLnBvc2l0aW9uLCBiLnBvc2l0aW9uLCBhUG9pbnRzLCBiUG9pbnRzLCBhLm5vcm1hbHNbaV0sIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMpKSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSWYgYW55IG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQiBpcyBhIHNlcGFyYXRpbmcgYXhpcywgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBiTGVuOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMuX2lzU2VwYXJhdGluZ0F4aXMoYS5wb3NpdGlvbiwgYi5wb3NpdGlvbiwgYVBvaW50cywgYlBvaW50cywgYi5ub3JtYWxzW2ldLCB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIFNpbmNlIG5vbmUgb2YgdGhlIGVkZ2Ugbm9ybWFscyBvZiBBIG9yIEIgYXJlIGEgc2VwYXJhdGluZyBheGlzLCB0aGVyZSBpcyBhbiBpbnRlcnNlY3Rpb25cclxuICAgIC8vIGFuZCB3ZSd2ZSBhbHJlYWR5IGNhbGN1bGF0ZWQgdGhlIHNtYWxsZXN0IG92ZXJsYXAgKGluIGlzU2VwYXJhdGluZ0F4aXMpLiBcclxuICAgIC8vIENhbGN1bGF0ZSB0aGUgZmluYWwgb3ZlcmxhcCB2ZWN0b3IuXHJcbiAgICBpZiAoZGV0YWlscykge1xyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmEgPSBhO1xyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmIgPSBiO1xyXG5cclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwVi5jb3B5KHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcE4pLnNjYWxlKHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcCk7XHJcblxyXG4gICAgICByZXR1cm4gdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9seWdvbiBhbmQgYSBjaXJjbGUgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2RldGFpbHM9ZmFsc2VdIElmIHNldCB0byB0cnVlIGFuZCB0aGVyZSBpcyBhIGNvbGxpc2lvbiwgYW4gb2JqZWN0IGhpZ2hsaWdodGluZyBkZXRhaWxzIGFib3V0IHRoZSBjb2xsaXNpb24gd2lsbCBiZSByZXR1cm5lZCBpbnN0ZWFkIG9mIGp1c3QgcmV0dXJuaW5nIHRydWUuXHJcbiAgICogXHJcbiAgICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgdHJ1ZSBpZiB0aGV5IGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgdGVzdFBvbHlnb25DaXJjbGUocG9seWdvbjogUG9seWdvbiwgY2lyY2xlOiBDaXJjbGUsIGRldGFpbHM6IGJvb2xlYW4gPSBmYWxzZSk6IChib29sZWFuIHwgQ29sbGlzaW9uRGV0YWlscykge1xyXG4gICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5jbGVhcigpO1xyXG5cclxuICAgIC8vIEdldCB0aGUgcG9zaXRpb24gb2YgdGhlIGNpcmNsZSByZWxhdGl2ZSB0byB0aGUgcG9seWdvbi5cclxuICAgIGNvbnN0IGNpcmNsZVBvczogVmVjdG9yID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGNpcmNsZS5wb3NpdGlvbikuYWRkKGNpcmNsZS5vZmZzZXQpLnN1Yihwb2x5Z29uLnBvc2l0aW9uKTtcclxuXHJcbiAgICBjb25zdCByYWRpdXM6IG51bWJlciA9IGNpcmNsZS5yYWRpdXM7XHJcbiAgICBjb25zdCByYWRpdXMyOiBudW1iZXIgPSByYWRpdXMgKiByYWRpdXM7XHJcblxyXG4gICAgY29uc3QgcG9pbnRzOiBBcnJheTxWZWN0b3I+ID0gcG9seWdvbi5jYWxjUG9pbnRzO1xyXG4gICAgY29uc3QgbGVuOiBudW1iZXIgPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGNvbnN0IGVkZ2U6IFZlY3RvciA9IHRoaXMuX1RfVkVDVE9SUy5wb3AoKSE7XHJcbiAgICBjb25zdCBwb2ludDogVmVjdG9yID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpITtcclxuXHJcbiAgICAvLyBGb3IgZWFjaCBlZGdlIGluIHRoZSBwb2x5Z29uOlxyXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICBjb25zdCBuZXh0ID0gaSA9PT0gbGVuIC0gMSA/IDAgOiBpICsgMTtcclxuICAgICAgY29uc3QgcHJldiA9IGkgPT09IDAgPyBsZW4gLSAxIDogaSAtIDE7XHJcblxyXG4gICAgICBsZXQgb3ZlcmxhcCA9IDA7XHJcbiAgICAgIGxldCBvdmVybGFwTiA9IG51bGw7XHJcblxyXG4gICAgICAvLyBHZXQgdGhlIGVkZ2UuXHJcbiAgICAgIGVkZ2UuY29weShwb2x5Z29uLmVkZ2VzW2ldKTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBlZGdlLlxyXG4gICAgICBwb2ludC5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1tpXSk7XHJcblxyXG4gICAgICAvLyBJZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgYW5kIHRoZSBwb2ludCBpcyBiaWdnZXIgdGhhbiB0aGUgcmFkaXVzLCB0aGUgcG9seWdvbiBpcyBkZWZpbml0ZWx5IG5vdCBmdWxseSBpbiB0aGUgY2lyY2xlLlxyXG4gICAgICBpZiAoZGV0YWlscyAmJiBwb2ludC5sZW4yKCkgPiByYWRpdXMyKSB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmFJbkIgPSBmYWxzZTtcclxuXHJcbiAgICAgIC8vIENhbGN1bGF0ZSB3aGljaCBWb3Jvbm9pIHJlZ2lvbiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgaW4uXHJcbiAgICAgIGxldCByZWdpb246IG51bWJlciA9IHRoaXMuX3Zvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQpO1xyXG5cclxuICAgICAgLy8gSWYgaXQncyB0aGUgbGVmdCByZWdpb246XHJcbiAgICAgIGlmIChyZWdpb24gPT09IHRoaXMuX0xFRlRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAvLyBXZSBuZWVkIHRvIG1ha2Ugc3VyZSB3ZSdyZSBpbiB0aGUgUklHSFRfVk9ST05PSV9SRUdJT04gb2YgdGhlIHByZXZpb3VzIGVkZ2UuXHJcbiAgICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbcHJldl0pO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgcHJldmlvdXMgZWRnZVxyXG4gICAgICAgIGNvbnN0IHBvaW50MjogVmVjdG9yID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1twcmV2XSk7XHJcblxyXG4gICAgICAgIHJlZ2lvbiA9IHRoaXMuX3Zvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQyKTtcclxuXHJcbiAgICAgICAgaWYgKHJlZ2lvbiA9PT0gdGhpcy5fUklHSFRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAgIC8vIEl0J3MgaW4gdGhlIHJlZ2lvbiB3ZSB3YW50LiAgQ2hlY2sgaWYgdGhlIGNpcmNsZSBpbnRlcnNlY3RzIHRoZSBwb2ludC5cclxuICAgICAgICAgIGNvbnN0IGRpc3Q6IG51bWJlciA9IHBvaW50LmxlbigpO1xyXG5cclxuICAgICAgICAgIGlmIChkaXN0ID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChlZGdlKTtcclxuICAgICAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG4gICAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xyXG5cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSBlbHNlIGlmIChkZXRhaWxzKSB7XHJcbiAgICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5iSW5BID0gZmFsc2U7XHJcblxyXG4gICAgICAgICAgICBvdmVybGFwTiA9IHBvaW50Lm5vcm1hbGl6ZSgpO1xyXG4gICAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKHBvaW50Mik7XHJcblxyXG4gICAgICAgIC8vIElmIGl0J3MgdGhlIHJpZ2h0IHJlZ2lvbjpcclxuICAgICAgfSBlbHNlIGlmIChyZWdpb24gPT09IHRoaXMuX1JJR0hUX1ZPUk9OT0lfUkVHSU9OKSB7XHJcbiAgICAgICAgLy8gV2UgbmVlZCB0byBtYWtlIHN1cmUgd2UncmUgaW4gdGhlIGxlZnQgcmVnaW9uIG9uIHRoZSBuZXh0IGVkZ2VcclxuICAgICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1tuZXh0XSk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBuZXh0IGVkZ2UuXHJcbiAgICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbbmV4dF0pO1xyXG5cclxuICAgICAgICByZWdpb24gPSB0aGlzLl92b3Jvbm9pUmVnaW9uKGVkZ2UsIHBvaW50KTtcclxuXHJcbiAgICAgICAgaWYgKHJlZ2lvbiA9PT0gdGhpcy5fTEVGVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgICAgLy8gSXQncyBpbiB0aGUgcmVnaW9uIHdlIHdhbnQuICBDaGVjayBpZiB0aGUgY2lyY2xlIGludGVyc2VjdHMgdGhlIHBvaW50LlxyXG4gICAgICAgICAgY29uc3QgZGlzdDogbnVtYmVyID0gcG9pbnQubGVuKCk7XHJcblxyXG4gICAgICAgICAgaWYgKGRpc3QgPiByYWRpdXMpIHtcclxuICAgICAgICAgICAgLy8gTm8gaW50ZXJzZWN0aW9uXHJcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICB9IGVsc2UgaWYgKGRldGFpbHMpIHtcclxuICAgICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgICAgICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmJJbkEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgICAgIG92ZXJsYXBOID0gcG9pbnQubm9ybWFsaXplKCk7XHJcbiAgICAgICAgICAgIG92ZXJsYXAgPSByYWRpdXMgLSBkaXN0O1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBPdGhlcndpc2UsIGl0J3MgdGhlIG1pZGRsZSByZWdpb246XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gTmVlZCB0byBjaGVjayBpZiB0aGUgY2lyY2xlIGlzIGludGVyc2VjdGluZyB0aGUgZWRnZSwgY2hhbmdlIHRoZSBlZGdlIGludG8gaXRzIFwiZWRnZSBub3JtYWxcIi5cclxuICAgICAgICBjb25zdCBub3JtYWw6IFZlY3RvciA9IGVkZ2UucGVycCgpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAvLyBGaW5kIHRoZSBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgZWRnZS5cclxuICAgICAgICBjb25zdCBkaXN0OiBudW1iZXIgPSBwb2ludC5kb3Qobm9ybWFsKTtcclxuICAgICAgICBjb25zdCBkaXN0QWJzOiBudW1iZXIgPSBNYXRoLmFicyhkaXN0KTtcclxuXHJcbiAgICAgICAgLy8gSWYgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSBvZiB0aGUgZWRnZSwgdGhlcmUgaXMgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgICAgIGlmIChkaXN0ID4gMCAmJiBkaXN0QWJzID4gcmFkaXVzKSB7XHJcbiAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGNpcmNsZVBvcyk7XHJcbiAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChub3JtYWwpO1xyXG4gICAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG5cclxuICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9IGVsc2UgaWYgKGRldGFpbHMpIHtcclxuICAgICAgICAgIC8vIEl0IGludGVyc2VjdHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgICAgICAgIG92ZXJsYXBOID0gbm9ybWFsO1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcblxyXG4gICAgICAgICAgLy8gSWYgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCBvciBwYXJ0IG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUsIHRoZSBjaXJjbGUgaXMgbm90IGZ1bGx5IGluc2lkZSB0aGUgcG9seWdvbi5cclxuICAgICAgICAgIGlmIChkaXN0ID49IDAgfHwgb3ZlcmxhcCA8IDIgKiByYWRpdXMpIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYkluQSA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG5cclxuICAgICAgLy8gSWYgdGhpcyBpcyB0aGUgc21hbGxlc3Qgb3ZlcmxhcCB3ZSd2ZSBzZWVuLCBrZWVwIGl0LlxyXG4gICAgICAvLyAob3ZlcmxhcE4gbWF5IGJlIG51bGwgaWYgdGhlIGNpcmNsZSB3YXMgaW4gdGhlIHdyb25nIFZvcm9ub2kgcmVnaW9uKS5cclxuICAgICAgaWYgKG92ZXJsYXBOICYmIGRldGFpbHMgJiYgTWF0aC5hYnMob3ZlcmxhcCkgPCBNYXRoLmFicyh0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXApKSB7XHJcbiAgICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwID0gb3ZlcmxhcDtcclxuICAgICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXBOLmNvcHkob3ZlcmxhcE4pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBmaW5hbCBvdmVybGFwIHZlY3RvciAtIGJhc2VkIG9uIHRoZSBzbWFsbGVzdCBvdmVybGFwLlxyXG4gICAgaWYgKGRldGFpbHMpIHtcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5hID0gcG9seWdvbjtcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5iID0gY2lyY2xlO1xyXG5cclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwVi5jb3B5KHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcE4pLnNjYWxlKHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKGVkZ2UpO1xyXG4gICAgdGhpcy5fVF9WRUNUT1JTLnB1c2gocG9pbnQpO1xyXG5cclxuICAgIGlmIChkZXRhaWxzKSByZXR1cm4gdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUztcclxuXHJcbiAgICByZXR1cm4gdHJ1ZTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgY2lyY2xlIGFuZCBhIHBvbHlnb24gY29sbGlkZS5cclxuICAgKiBcclxuICAgKiAqKk5PVEU6KiogVGhpcyBpcyBzbGlnaHRseSBsZXNzIGVmZmljaWVudCB0aGFuIHBvbHlnb25DaXJjbGUgYXMgaXQganVzdCBydW5zIHBvbHlnb25DaXJjbGUgYW5kIHJldmVyc2VzIGV2ZXJ5dGhpbmdcclxuICAgKiBhdCB0aGUgZW5kLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBjaXJjbGUgVGhlIGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge1BvbHlnb259IHBvbHlnb24gVGhlIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbZGV0YWlscz1mYWxzZV0gSWYgc2V0IHRvIHRydWUgYW5kIHRoZXJlIGlzIGEgY29sbGlzaW9uLCBhbiBvYmplY3QgaGlnaGxpZ2h0aW5nIGRldGFpbHMgYWJvdXQgdGhlIGNvbGxpc2lvbiB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2YganVzdCByZXR1cm5pbmcgdHJ1ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZXkgaW50ZXJzZWN0IG9yIGZhbHNlIG90aGVyd2lzZS5cclxuICAgKi9cclxuICB0ZXN0Q2lyY2xlUG9seWdvbihjaXJjbGU6IENpcmNsZSwgcG9seWdvbjogUG9seWdvbiwgZGV0YWlsczogYm9vbGVhbiA9IGZhbHNlKTogKGJvb2xlYW4gfCBDb2xsaXNpb25EZXRhaWxzKSB7XHJcbiAgICAvLyBUZXN0IHRoZSBwb2x5Z29uIGFnYWluc3QgdGhlIGNpcmNsZS5cclxuICAgIGNvbnN0IHJlc3VsdDogKGJvb2xlYW4gfCBDb2xsaXNpb25EZXRhaWxzKSA9IHRoaXMudGVzdFBvbHlnb25DaXJjbGUocG9seWdvbiwgY2lyY2xlLCBkZXRhaWxzKTtcclxuXHJcbiAgICBpZiAocmVzdWx0ICYmIGRldGFpbHMpIHtcclxuICAgICAgY29uc3QgY29sbGlzaW9uRGV0YWlsczogQ29sbGlzaW9uRGV0YWlscyA9IHJlc3VsdCBhcyBDb2xsaXNpb25EZXRhaWxzO1xyXG5cclxuICAgICAgLy8gU3dhcCBBIGFuZCBCIGluIHRoZSBjb2xsaXNpb24gZGV0YWlscy5cclxuICAgICAgY29uc3QgYSA9IGNvbGxpc2lvbkRldGFpbHMuYTtcclxuICAgICAgY29uc3QgYUluQiA9IGNvbGxpc2lvbkRldGFpbHMuYUluQjtcclxuXHJcbiAgICAgIGNvbGxpc2lvbkRldGFpbHMub3ZlcmxhcE4ucmV2ZXJzZSgpO1xyXG4gICAgICBjb2xsaXNpb25EZXRhaWxzLm92ZXJsYXBWLnJldmVyc2UoKTtcclxuXHJcbiAgICAgIGNvbGxpc2lvbkRldGFpbHMuYSA9IGNvbGxpc2lvbkRldGFpbHMuYjtcclxuICAgICAgY29sbGlzaW9uRGV0YWlscy5iID0gYTtcclxuXHJcbiAgICAgIGNvbGxpc2lvbkRldGFpbHMuYUluQiA9IGNvbGxpc2lvbkRldGFpbHMuYkluQTtcclxuICAgICAgY29sbGlzaW9uRGV0YWlscy5iSW5BID0gYUluQjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gcmVzdWx0O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgd2hldGhlciB0d28gY29udmV4IHBvbHlnb25zIGFyZSBzZXBhcmF0ZWQgYnkgdGhlIHNwZWNpZmllZCBheGlzIChtdXN0IGJlIGEgdW5pdCB2ZWN0b3IpLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGFQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBiUG9zIFRoZSBwb3NpdGlvbiBvZiB0aGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBhUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBiUG9pbnRzIFRoZSBwb2ludHMgaW4gdGhlIHNlY29uZCBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBheGlzIFRoZSBheGlzICh1bml0IHNpemVkKSB0byB0ZXN0IGFnYWluc3QuICBUaGUgcG9pbnRzIG9mIGJvdGggcG9seWdvbnMgd2lsbCBiZSBwcm9qZWN0ZWQgb250byB0aGlzIGF4aXMuXHJcbiAgICogQHBhcmFtIHtDb2xsaXNpb25EZXRhaWxzfSBjb2xsaXNpb25EZXRhaWxzIEEgQ29sbGlzaW9uRGV0YWlscyBvYmplY3QgKG9wdGlvbmFsKSB3aGljaCB3aWxsIGJlIHBvcHVsYXRlZCBpZiB0aGUgYXhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuXHJcbiAgICogXHJcbiAgICogQHJldHVybiB7Ym9vbGVhbn0gdHJ1ZSBpZiBpdCBpcyBhIHNlcGFyYXRpbmcgYXhpcywgZmFsc2Ugb3RoZXJ3aXNlLiAgSWYgZmFsc2UsIGFuZCBhIENvbGxpc2lvbkRldGFpbHMgaXMgcGFzc2VkIGluLCBpbmZvcm1hdGlvbiBhYm91dCBob3cgbXVjaCBvdmVybGFwIGFuZCB0aGUgZGlyZWN0aW9uIG9mIHRoZSBvdmVybGFwIHdpbGwgYmUgcG9wdWxhdGVkLlxyXG4gICAqL1xyXG4gIHByaXZhdGUgX2lzU2VwYXJhdGluZ0F4aXMoYVBvczogVmVjdG9yLCBiUG9zOiBWZWN0b3IsIGFQb2ludHM6IEFycmF5PFZlY3Rvcj4sIGJQb2ludHM6IEFycmF5PFZlY3Rvcj4sIGF4aXM6IFZlY3RvciwgY29sbGlzaW9uRGV0YWlscz86IENvbGxpc2lvbkRldGFpbHMpOiBib29sZWFuIHtcclxuICAgIGNvbnN0IHJhbmdlQTogQXJyYXk8bnVtYmVyPiA9IHRoaXMuX1RfQVJSQVlTLnBvcCgpITtcclxuICAgIGNvbnN0IHJhbmdlQjogQXJyYXk8bnVtYmVyPiA9IHRoaXMuX1RfQVJSQVlTLnBvcCgpITtcclxuXHJcbiAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBvZmZzZXQgYmV0d2VlbiB0aGUgdHdvIHBvbHlnb25zXHJcbiAgICBjb25zdCBvZmZzZXRWOiBWZWN0b3IgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhLmNvcHkoYlBvcykuc3ViKGFQb3MpO1xyXG4gICAgY29uc3QgcHJvamVjdGVkT2Zmc2V0OiBudW1iZXIgPSBvZmZzZXRWLmRvdChheGlzKTtcclxuXHJcbiAgICAvLyBQcm9qZWN0IHRoZSBwb2x5Z29ucyBvbnRvIHRoZSBheGlzLlxyXG4gICAgdGhpcy5fZmxhdHRlblBvaW50c09uKGFQb2ludHMsIGF4aXMsIHJhbmdlQSk7XHJcbiAgICB0aGlzLl9mbGF0dGVuUG9pbnRzT24oYlBvaW50cywgYXhpcywgcmFuZ2VCKTtcclxuXHJcbiAgICAvLyBNb3ZlIEIncyByYW5nZSB0byBpdHMgcG9zaXRpb24gcmVsYXRpdmUgdG8gQS5cclxuICAgIHJhbmdlQlswXSArPSBwcm9qZWN0ZWRPZmZzZXQ7XHJcbiAgICByYW5nZUJbMV0gKz0gcHJvamVjdGVkT2Zmc2V0O1xyXG5cclxuICAgIC8vIENoZWNrIGlmIHRoZXJlIGlzIGEgZ2FwLiBJZiB0aGVyZSBpcywgdGhpcyBpcyBhIHNlcGFyYXRpbmcgYXhpcyBhbmQgd2UgY2FuIHN0b3BcclxuICAgIGlmIChyYW5nZUFbMF0gPiByYW5nZUJbMV0gfHwgcmFuZ2VCWzBdID4gcmFuZ2VBWzFdKSB7XHJcbiAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKG9mZnNldFYpO1xyXG5cclxuICAgICAgdGhpcy5fVF9BUlJBWVMucHVzaChyYW5nZUEpO1xyXG4gICAgICB0aGlzLl9UX0FSUkFZUy5wdXNoKHJhbmdlQik7XHJcblxyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUaGlzIGlzIG5vdCBhIHNlcGFyYXRpbmcgYXhpcy4gSWYgd2UncmUgY2FsY3VsYXRpbmcgY29sbGlzaW9uIGRldGFpbHMsIGNhbGN1bGF0ZSB0aGUgb3ZlcmxhcC5cclxuICAgIGlmIChjb2xsaXNpb25EZXRhaWxzKSB7XHJcbiAgICAgIGxldCBvdmVybGFwID0gMDtcclxuXHJcbiAgICAgIC8vIEEgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEJcclxuICAgICAgaWYgKHJhbmdlQVswXSA8IHJhbmdlQlswXSkge1xyXG4gICAgICAgIGNvbGxpc2lvbkRldGFpbHMuYUluQiA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBBIGVuZHMgYmVmb3JlIEIgZG9lcy4gV2UgaGF2ZSB0byBwdWxsIEEgb3V0IG9mIEJcclxuICAgICAgICBpZiAocmFuZ2VBWzFdIDwgcmFuZ2VCWzFdKSB7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG5cclxuICAgICAgICAgIGNvbGxpc2lvbkRldGFpbHMuYkluQSA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gQiBpcyBmdWxseSBpbnNpZGUgQS4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xyXG5cclxuICAgICAgICAgIG92ZXJsYXAgPSBvcHRpb24xIDwgb3B0aW9uMiA/IG9wdGlvbjEgOiAtb3B0aW9uMjtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQiBzdGFydHMgZnVydGhlciBsZWZ0IHRoYW4gQVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbGxpc2lvbkRldGFpbHMuYkluQSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBCIGVuZHMgYmVmb3JlIEEgZW5kcy4gV2UgaGF2ZSB0byBwdXNoIEEgb3V0IG9mIEJcclxuICAgICAgICBpZiAocmFuZ2VBWzFdID4gcmFuZ2VCWzFdKSB7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFuZ2VBWzBdIC0gcmFuZ2VCWzFdO1xyXG5cclxuICAgICAgICAgIGNvbGxpc2lvbkRldGFpbHMuYUluQiA9IGZhbHNlO1xyXG4gICAgICAgICAgLy8gQSBpcyBmdWxseSBpbnNpZGUgQi4gIFBpY2sgdGhlIHNob3J0ZXN0IHdheSBvdXQuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGNvbnN0IG9wdGlvbjEgPSByYW5nZUFbMV0gLSByYW5nZUJbMF07XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24yID0gcmFuZ2VCWzFdIC0gcmFuZ2VBWzBdO1xyXG5cclxuICAgICAgICAgIG92ZXJsYXAgPSBvcHRpb24xIDwgb3B0aW9uMiA/IG9wdGlvbjEgOiAtb3B0aW9uMjtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIC8vIElmIHRoaXMgaXMgdGhlIHNtYWxsZXN0IGFtb3VudCBvZiBvdmVybGFwIHdlJ3ZlIHNlZW4gc28gZmFyLCBzZXQgaXQgYXMgdGhlIG1pbmltdW0gb3ZlcmxhcC5cclxuICAgICAgY29uc3QgYWJzT3ZlcmxhcCA9IE1hdGguYWJzKG92ZXJsYXApO1xyXG5cclxuICAgICAgaWYgKGFic092ZXJsYXAgPCBjb2xsaXNpb25EZXRhaWxzLm92ZXJsYXApIHtcclxuICAgICAgICBjb2xsaXNpb25EZXRhaWxzLm92ZXJsYXAgPSBhYnNPdmVybGFwO1xyXG4gICAgICAgIGNvbGxpc2lvbkRldGFpbHMub3ZlcmxhcE4uY29weShheGlzKTtcclxuXHJcbiAgICAgICAgaWYgKG92ZXJsYXAgPCAwKSBjb2xsaXNpb25EZXRhaWxzLm92ZXJsYXBOLnJldmVyc2UoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKG9mZnNldFYpO1xyXG5cclxuICAgIHRoaXMuX1RfQVJSQVlTLnB1c2gocmFuZ2VBKTtcclxuICAgIHRoaXMuX1RfQVJSQVlTLnB1c2gocmFuZ2VCKTtcclxuXHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBGbGF0dGVucyB0aGUgc3BlY2lmaWVkIGFycmF5IG9mIHBvaW50cyBvbnRvIGEgdW5pdCB2ZWN0b3IgYXhpcyByZXN1bHRpbmcgaW4gYSBvbmUgZGltZW5zaW9uc2xcclxuICAgKiByYW5nZSBvZiB0aGUgbWluaW11bSBhbmQgbWF4aW11bSB2YWx1ZSBvbiB0aGF0IGF4aXMuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IHBvaW50cyBUaGUgcG9pbnRzIHRvIGZsYXR0ZW4uXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IG5vcm1hbCBUaGUgdW5pdCB2ZWN0b3IgYXhpcyB0byBmbGF0dGVuIG9uLlxyXG4gICAqIEBwYXJhbSB7QXJyYXk8bnVtYmVyPn0gcmVzdWx0IEFuIGFycmF5LiBBZnRlciBjYWxsaW5nIHRoaXMgZnVuY3Rpb24sIHJlc3VsdFswXSB3aWxsIGJlIHRoZSBtaW5pbXVtIHZhbHVlLCByZXN1bHRbMV0gd2lsbCBiZSB0aGUgbWF4aW11bSB2YWx1ZS5cclxuICAgKi9cclxuICBwcml2YXRlIF9mbGF0dGVuUG9pbnRzT24ocG9pbnRzOiBBcnJheTxWZWN0b3I+LCBub3JtYWw6IFZlY3RvciwgcmVzdWx0OiBBcnJheTxudW1iZXI+KSB7XHJcbiAgICBsZXQgbWluOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgbGV0IG1heDogbnVtYmVyID0gLU51bWJlci5NQVhfVkFMVUU7XHJcblxyXG4gICAgY29uc3QgbGVuOiBudW1iZXIgPSBwb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGZvciAobGV0IGk6IG51bWJlciA9IDA7IGkgPCBsZW47IGkrKykge1xyXG4gICAgICAvLyBUaGUgbWFnbml0dWRlIG9mIHRoZSBwcm9qZWN0aW9uIG9mIHRoZSBwb2ludCBvbnRvIHRoZSBub3JtYWwuXHJcbiAgICAgIGNvbnN0IGRvdDogbnVtYmVyID0gcG9pbnRzW2ldLmRvdChub3JtYWwpO1xyXG5cclxuICAgICAgaWYgKGRvdCA8IG1pbikgbWluID0gZG90O1xyXG4gICAgICBpZiAoZG90ID4gbWF4KSBtYXggPSBkb3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdWx0WzBdID0gbWluO1xyXG4gICAgcmVzdWx0WzFdID0gbWF4O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyB3aGljaCBWb3Jvbm9pIHJlZ2lvbiBhIHBvaW50IGlzIG9uIGEgbGluZSBzZWdtZW50LlxyXG4gICAqIFxyXG4gICAqIEl0IGlzIGFzc3VtZWQgdGhhdCBib3RoIHRoZSBsaW5lIGFuZCB0aGUgcG9pbnQgYXJlIHJlbGF0aXZlIHRvIGAoMCwwKWBcclxuICAgKiBcclxuICAgKiAgICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICAgKiAgICAgICgtMSkgIFtTXS0tLS0tLS0tLS0tLS0tW0VdICAoMSlcclxuICAgKiAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBsaW5lIFRoZSBsaW5lIHNlZ21lbnQuXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvaW50IFRoZSBwb2ludC5cclxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IExFRlRfVk9ST05PSV9SRUdJT04gKC0xKSBpZiBpdCBpcyB0aGUgbGVmdCByZWdpb24sXHJcbiAgICogICAgICAgICAgICAgICAgICBNSURETEVfVk9ST05PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLFxyXG4gICAqICAgICAgICAgICAgICAgICAgUklHSFRfVk9ST05PSV9SRUdJT04gKDEpIGlmIGl0IGlzIHRoZSByaWdodCByZWdpb24uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdm9yb25vaVJlZ2lvbihsaW5lOiBWZWN0b3IsIHBvaW50OiBWZWN0b3IpOiBudW1iZXIge1xyXG4gICAgY29uc3QgbGVuMjogbnVtYmVyID0gbGluZS5sZW4yKCk7XHJcbiAgICBjb25zdCBkcDogbnVtYmVyID0gcG9pbnQuZG90KGxpbmUpO1xyXG5cclxuICAgIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIHN0YXJ0IG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGUgbGVmdCB2b3Jvbm9pIHJlZ2lvbi5cclxuICAgIGlmIChkcCA8IDApIHJldHVybiB0aGlzLl9MRUZUX1ZPUk9OT0lfUkVHSU9OO1xyXG5cclxuICAgIC8vIElmIHRoZSBwb2ludCBpcyBiZXlvbmQgdGhlIGVuZCBvZiB0aGUgbGluZSwgaXQgaXMgaW4gdGhlIHJpZ2h0IHZvcm9ub2kgcmVnaW9uLlxyXG4gICAgZWxzZSBpZiAoZHAgPiBsZW4yKSByZXR1cm4gdGhpcy5fUklHSFRfVk9ST05PSV9SRUdJT047XHJcblxyXG4gICAgLy8gT3RoZXJ3aXNlLCBpdCdzIGluIHRoZSBtaWRkbGUgb25lLlxyXG4gICAgZWxzZSByZXR1cm4gdGhpcy5fTUlERExFX1ZPUk9OT0lfUkVHSU9OO1xyXG4gIH1cclxufSJdfQ==