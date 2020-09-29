'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _box = _interopRequireDefault(require("./geometry/box"));

var _vector = _interopRequireDefault(require("./geometry/vector"));

var _collision_details = _interopRequireDefault(require("./collision_details"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

    _defineProperty(this, "_T_COLLISION_DETAILS", new _collision_details["default"]());

    _defineProperty(this, "_TEST_POINT", new _box["default"](new _vector["default"](), 0.000001, 0.000001).toPolygon());

    _defineProperty(this, "_LEFT_VORONOI_REGION", -1);

    _defineProperty(this, "_MIDDLE_VORONOI_REGION", 0);

    _defineProperty(this, "_RIGHT_VORONOI_REGION", 1);

    // Populate T_VECTORS
    for (var i = 0; i < 10; i++) {
      this._T_VECTORS.push(new _vector["default"]());
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

exports["default"] = Collider2D;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jb2xsaWRlcjJkLnRzIl0sIm5hbWVzIjpbIkNvbGxpZGVyMkQiLCJDb2xsaXNpb25EZXRhaWxzIiwiQm94IiwiVmVjdG9yIiwidG9Qb2x5Z29uIiwiaSIsIl9UX1ZFQ1RPUlMiLCJwdXNoIiwiX1RfQVJSQVlTIiwicG9pbnQiLCJjaXJjbGUiLCJkaWZmZXJlbmNlViIsInBvcCIsImNvcHkiLCJzdWIiLCJwb3NpdGlvbiIsIm9mZnNldCIsInJhZGl1c1NxIiwicmFkaXVzIiwiZGlzdGFuY2VTcSIsImxlbjIiLCJwb2x5Z29uIiwiX1RFU1RfUE9JTlQiLCJfVF9DT0xMSVNJT05fREVUQUlMUyIsImNsZWFyIiwicmVzdWx0IiwidGVzdFBvbHlnb25Qb2x5Z29uIiwiYUluQiIsImEiLCJiIiwiZGV0YWlscyIsImFkZCIsInRvdGFsUmFkaXVzIiwidG90YWxSYWRpdXNTcSIsImRpc3QiLCJNYXRoIiwic3FydCIsIm92ZXJsYXAiLCJvdmVybGFwTiIsIm5vcm1hbGl6ZSIsIm92ZXJsYXBWIiwic2NhbGUiLCJiSW5BIiwiYVBvaW50cyIsImNhbGNQb2ludHMiLCJhTGVuIiwibGVuZ3RoIiwiYlBvaW50cyIsImJMZW4iLCJfaXNTZXBhcmF0aW5nQXhpcyIsIm5vcm1hbHMiLCJjaXJjbGVQb3MiLCJyYWRpdXMyIiwicG9pbnRzIiwibGVuIiwiZWRnZSIsIm5leHQiLCJwcmV2IiwiZWRnZXMiLCJyZWdpb24iLCJfdm9yb25vaVJlZ2lvbiIsIl9MRUZUX1ZPUk9OT0lfUkVHSU9OIiwicG9pbnQyIiwiX1JJR0hUX1ZPUk9OT0lfUkVHSU9OIiwibm9ybWFsIiwicGVycCIsImRvdCIsImRpc3RBYnMiLCJhYnMiLCJ0ZXN0UG9seWdvbkNpcmNsZSIsImNvbGxpc2lvbkRldGFpbHMiLCJyZXZlcnNlIiwiYVBvcyIsImJQb3MiLCJheGlzIiwicmFuZ2VBIiwicmFuZ2VCIiwib2Zmc2V0ViIsInByb2plY3RlZE9mZnNldCIsIl9mbGF0dGVuUG9pbnRzT24iLCJvcHRpb24xIiwib3B0aW9uMiIsImFic092ZXJsYXAiLCJtaW4iLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJtYXgiLCJsaW5lIiwiZHAiLCJfTUlERExFX1ZPUk9OT0lfUkVHSU9OIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQUVBOztBQUNBOztBQUdBOzs7Ozs7Ozs7Ozs7SUFFcUJBLFU7QUFDbkI7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7O0FBU0E7Ozs7Ozs7QUFTQSx3QkFBYztBQUFBOztBQUFBLHdDQXhEc0IsRUF3RHRCOztBQUFBLHVDQS9DNEIsRUErQzVCOztBQUFBLGtEQXRDaUIsSUFBSUMsNkJBQUosRUFzQ2pCOztBQUFBLHlDQTdCUSxJQUFJQyxlQUFKLENBQVEsSUFBSUMsa0JBQUosRUFBUixFQUFzQixRQUF0QixFQUFnQyxRQUFoQyxFQUEwQ0MsU0FBMUMsRUE2QlI7O0FBQUEsa0RBcEJpQixDQUFDLENBb0JsQjs7QUFBQSxvREFYbUIsQ0FXbkI7O0FBQUEsbURBRmtCLENBRWxCOztBQUNaO0FBQ0EsU0FBSyxJQUFJQyxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHLEVBQXBCLEVBQXdCQSxDQUFDLEVBQXpCO0FBQTZCLFdBQUtDLFVBQUwsQ0FBZ0JDLElBQWhCLENBQXFCLElBQUlKLGtCQUFKLEVBQXJCO0FBQTdCLEtBRlksQ0FJWjs7O0FBQ0EsU0FBSyxJQUFJRSxFQUFDLEdBQUcsQ0FBYixFQUFnQkEsRUFBQyxHQUFHLENBQXBCLEVBQXVCQSxFQUFDLEVBQXhCO0FBQTRCLFdBQUtHLFNBQUwsQ0FBZUQsSUFBZixDQUFvQixFQUFwQjtBQUE1QjtBQUNEO0FBRUQ7Ozs7Ozs7Ozs7OztrQ0FRY0UsSyxFQUFlQyxNLEVBQXlCO0FBQ3BELFVBQU1DLFdBQVcsR0FBRyxLQUFLTCxVQUFMLENBQWdCTSxHQUFoQixHQUF1QkMsSUFBdkIsQ0FBNEJKLEtBQTVCLEVBQW1DSyxHQUFuQyxDQUF1Q0osTUFBTSxDQUFD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QUFkLENBQVo7QUFFQSxZQUFJRSxHQUFHLEdBQUdpQixHQUFWLEVBQWVBLEdBQUcsR0FBR2pCLEdBQU47QUFDZixZQUFJQSxHQUFHLEdBQUdvQixHQUFWLEVBQWVBLEdBQUcsR0FBR3BCLEdBQU47QUFDaEI7O0FBRUR6QyxNQUFBQSxNQUFNLENBQUMsQ0FBRCxDQUFOLEdBQVkwRCxHQUFaO0FBQ0ExRCxNQUFBQSxNQUFNLENBQUMsQ0FBRCxDQUFOLEdBQVk2RCxHQUFaO0FBQ0Q7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O21DQWV1QkMsSSxFQUFjOUUsSyxFQUF1QjtBQUMxRCxVQUFNVyxJQUFJLEdBQUdtRSxJQUFJLENBQUNuRSxJQUFMLEVBQWI7QUFDQSxVQUFNb0UsRUFBRSxHQUFHL0UsS0FBSyxDQUFDeUQsR0FBTixDQUFVcUIsSUFBVixDQUFYLENBRjBELENBSTFEOztBQUNBLFVBQUlDLEVBQUUsR0FBRyxDQUFULEVBQVksT0FBTyxLQUFLM0Isb0JBQVosQ0FBWixDQUVBO0FBRkEsV0FHSyxJQUFJMkIsRUFBRSxHQUFHcEUsSUFBVCxFQUFlLE9BQU8sS0FBSzJDLHFCQUFaLENBQWYsQ0FFTDtBQUZLLGFBR0EsT0FBTyxLQUFLMEIsc0JBQVo7QUFDTiIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0J1xyXG5cclxuaW1wb3J0IEJveCBmcm9tICcuL2dlb21ldHJ5L2JveCc7XHJcbmltcG9ydCBWZWN0b3IgZnJvbSAnLi9nZW9tZXRyeS92ZWN0b3InO1xyXG5pbXBvcnQgQ2lyY2xlIGZyb20gJy4vZ2VvbWV0cnkvY2lyY2xlJztcclxuaW1wb3J0IFBvbHlnb24gZnJvbSAnLi9nZW9tZXRyeS9wb2x5Z29uJztcclxuaW1wb3J0IENvbGxpc2lvbkRldGFpbHMgZnJvbSAnLi9jb2xsaXNpb25fZGV0YWlscyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xsaWRlcjJEIHtcclxuICAvKipcclxuICAgKiBBIHBvb2wgb2YgYFZlY3RvciBvYmplY3RzIHRoYXQgYXJlIHVzZWQgaW4gY2FsY3VsYXRpb25zIHRvIGF2b2lkIGFsbG9jYXRpbmcgbWVtb3J5LlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtBcnJheTxWZWN0b3I+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX1RfVkVDVE9SUzogQXJyYXk8VmVjdG9yPiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBBIHBvb2wgb2YgYXJyYXlzIG9mIG51bWJlcnMgdXNlZCBpbiBjYWxjdWxhdGlvbnMgdG8gYXZvaWQgYWxsb2NhdGluZyBtZW1vcnkuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0FycmF5PEFycmF5PG51bWJlcj4+fVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX1RfQVJSQVlTOiBBcnJheTxBcnJheTxudW1iZXI+PiA9IFtdO1xyXG5cclxuICAvKipcclxuICAgKiBUZW1wb3JhcnkgY29sbGlzaW9uIGRldGFpbHMgb2JqZWN0IHVzZWQgZm9yIGhpdCBkZXRlY3Rpb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge0NvbGxpc2lvbkRldGFpbHN9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfVF9DT0xMSVNJT05fREVUQUlMUyA9IG5ldyBDb2xsaXNpb25EZXRhaWxzKCk7XHJcblxyXG4gIC8qKlxyXG4gICAqIFRpbnkgXCJwb2ludFwiIFBvbHlnb24gdXNlZCBmb3IgUG9seWdvbiBoaXQgZGV0ZWN0aW9uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtQb2x5Z29ufVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX1RFU1RfUE9JTlQgPSBuZXcgQm94KG5ldyBWZWN0b3IoKSwgMC4wMDAwMDEsIDAuMDAwMDAxKS50b1BvbHlnb24oKTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RhbnQgdXNlZCBmb3IgbGVmdCB2b3Jvbm9pIHJlZ2lvbi5cclxuICAgKiBcclxuICAgKiBAcHJpdmF0ZVxyXG4gICAqIFxyXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfVxyXG4gICAqL1xyXG4gIHByaXZhdGUgX0xFRlRfVk9ST05PSV9SRUdJT04gPSAtMTtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RhbnQgdXNlZCBmb3IgbWlkZGxlIHZvcm9ub2kgcmVnaW9uLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfTUlERExFX1ZPUk9OT0lfUkVHSU9OID0gMDtcclxuXHJcbiAgLyoqXHJcbiAgICogQ29uc3RhbnQgdXNlZCBmb3IgcmlnaHQgdm9yb25vaSByZWdpb24uXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcHJvcGVydHkge251bWJlcn1cclxuICAgKi9cclxuICBwcml2YXRlIF9SSUdIVF9WT1JPTk9JX1JFR0lPTiA9IDE7XHJcblxyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgLy8gUG9wdWxhdGUgVF9WRUNUT1JTXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDEwOyBpKyspIHRoaXMuX1RfVkVDVE9SUy5wdXNoKG5ldyBWZWN0b3IoKSk7XHJcblxyXG4gICAgLy8gUG9wdWxhdGUgVF9BUlJBWVNcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB0aGlzLl9UX0FSUkFZUy5wdXNoKFtdKTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9pbnQgaXMgaW5zaWRlIGEgY2lyY2xlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBwb2ludCBUaGUgcG9pbnQgdG8gdGVzdC5cclxuICAgKiBAcGFyYW0ge0NpcmNsZX0gY2lyY2xlIFRoZSBjaXJjbGUgdG8gdGVzdC5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBwb2ludCBpcyBpbnNpZGUgdGhlIGNpcmNsZSBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcG9pbnRJbkNpcmNsZShwb2ludDogVmVjdG9yLCBjaXJjbGU6IENpcmNsZSk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgZGlmZmVyZW5jZVYgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhLmNvcHkocG9pbnQpLnN1YihjaXJjbGUucG9zaXRpb24pLnN1YihjaXJjbGUub2Zmc2V0KTtcclxuXHJcbiAgICBjb25zdCByYWRpdXNTcSA9IGNpcmNsZS5yYWRpdXMgKiBjaXJjbGUucmFkaXVzO1xyXG4gICAgY29uc3QgZGlzdGFuY2VTcSA9IGRpZmZlcmVuY2VWLmxlbjIoKTtcclxuXHJcbiAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcblxyXG4gICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gaXMgc21hbGxlciB0aGFuIHRoZSByYWRpdXMgdGhlbiB0aGUgcG9pbnQgaXMgaW5zaWRlIHRoZSBjaXJjbGUuXHJcbiAgICByZXR1cm4gZGlzdGFuY2VTcSA8PSByYWRpdXNTcTtcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIENoZWNrIGlmIGEgcG9pbnQgaXMgaW5zaWRlIGEgY29udmV4IHBvbHlnb24uXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvaW50IFRoZSBwb2ludCB0byB0ZXN0LlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbiB0byB0ZXN0LlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgcG9seWdvbiBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgcG9pbnRJblBvbHlnb24ocG9pbnQ6IFZlY3RvciwgcG9seWdvbjogUG9seWdvbik6IGJvb2xlYW4ge1xyXG4gICAgdGhpcy5fVEVTVF9QT0lOVC5wb3NpdGlvbi5jb3B5KHBvaW50KTtcclxuICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuY2xlYXIoKTtcclxuXHJcbiAgICBsZXQgcmVzdWx0OiAoYm9vbGVhbiB8IENvbGxpc2lvbkRldGFpbHMpID0gdGhpcy50ZXN0UG9seWdvblBvbHlnb24odGhpcy5fVEVTVF9QT0lOVCwgcG9seWdvbiwgdHJ1ZSk7XHJcblxyXG4gICAgaWYgKHJlc3VsdCkgcmVzdWx0ID0gdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5hSW5CO1xyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiB0d28gY2lyY2xlcyBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBhIFRoZSBmaXJzdCBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGIgVGhlIHNlY29uZCBjaXJjbGUuXHJcbiAgICogQHBhcmFtIHtib29sZWFufSBbZGV0YWlscz1mYWxzZV0gSWYgc2V0IHRvIHRydWUgYW5kIHRoZXJlIGlzIGEgY29sbGlzaW9uLCBhbiBvYmplY3QgaGlnaGxpZ2h0aW5nIGRldGFpbHMgYWJvdXQgdGhlIGNvbGxpc2lvbiB3aWxsIGJlIHJldHVybmVkIGluc3RlYWQgb2YganVzdCByZXR1cm5pbmcgdHJ1ZS5cclxuICAgKiBcclxuICAgKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyB0cnVlIGlmIHRoZSBjaXJjbGVzIGludGVyc2VjdCBvciBmYWxzZSBvdGhlcndpc2UuXHJcbiAgICovXHJcbiAgdGVzdENpcmNsZUNpcmNsZShhOiBDaXJjbGUsIGI6IENpcmNsZSwgZGV0YWlsczogYm9vbGVhbiA9IGZhbHNlKTogKGJvb2xlYW4gfCBDb2xsaXNpb25EZXRhaWxzKSB7XHJcbiAgICAvLyBDaGVjayBpZiB0aGUgZGlzdGFuY2UgYmV0d2VlbiB0aGUgY2VudGVycyBvZiB0aGUgdHdvIGNpcmNsZXMgaXMgZ3JlYXRlciB0aGFuIHRoZWlyIGNvbWJpbmVkIHJhZGl1cy5cclxuICAgIGNvbnN0IGRpZmZlcmVuY2VWID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGIucG9zaXRpb24pLmFkZChiLm9mZnNldCkuc3ViKGEucG9zaXRpb24pLnN1YihhLm9mZnNldCk7XHJcblxyXG4gICAgY29uc3QgdG90YWxSYWRpdXMgPSBhLnJhZGl1cyArIGIucmFkaXVzO1xyXG4gICAgY29uc3QgdG90YWxSYWRpdXNTcSA9IHRvdGFsUmFkaXVzICogdG90YWxSYWRpdXM7XHJcbiAgICBjb25zdCBkaXN0YW5jZVNxID0gZGlmZmVyZW5jZVYubGVuMigpO1xyXG5cclxuICAgIC8vIElmIHRoZSBkaXN0YW5jZSBpcyBiaWdnZXIgdGhhbiB0aGUgY29tYmluZWQgcmFkaXVzLCB0aGV5IGRvbid0IGludGVyc2VjdC5cclxuICAgIGlmIChkaXN0YW5jZVNxID4gdG90YWxSYWRpdXNTcSkge1xyXG4gICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChkaWZmZXJlbmNlVik7XHJcblxyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGRldGFpbHMpIHtcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5jbGVhcigpO1xyXG5cclxuICAgICAgY29uc3QgZGlzdCA9IE1hdGguc3FydChkaXN0YW5jZVNxKTtcclxuXHJcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYSA9IGE7XHJcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYiA9IGI7XHJcblxyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXAgPSB0b3RhbFJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcE4uY29weShkaWZmZXJlbmNlVi5ub3JtYWxpemUoKSk7XHJcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcFYuY29weShkaWZmZXJlbmNlVikuc2NhbGUodGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwKTtcclxuXHJcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYUluQiA9IGEucmFkaXVzIDw9IGIucmFkaXVzICYmIGRpc3QgPD0gYi5yYWRpdXMgLSBhLnJhZGl1cztcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5iSW5BID0gYi5yYWRpdXMgPD0gYS5yYWRpdXMgJiYgZGlzdCA8PSBhLnJhZGl1cyAtIGIucmFkaXVzO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFM7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goZGlmZmVyZW5jZVYpO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2tzIHdoZXRoZXIgcG9seWdvbnMgY29sbGlkZS5cclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1BvbHlnb259IGEgVGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBiIFRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZXRhaWxzPWZhbHNlXSBJZiBzZXQgdG8gdHJ1ZSBhbmQgdGhlcmUgaXMgYSBjb2xsaXNpb24sIGFuIG9iamVjdCBoaWdobGlnaHRpbmcgZGV0YWlscyBhYm91dCB0aGUgY29sbGlzaW9uIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZiBqdXN0IHJldHVybmluZyB0cnVlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHRlc3RQb2x5Z29uUG9seWdvbihhOiBQb2x5Z29uLCBiOiBQb2x5Z29uLCBkZXRhaWxzOiBib29sZWFuID0gZmFsc2UpOiAoYm9vbGVhbiB8IENvbGxpc2lvbkRldGFpbHMpIHtcclxuICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuY2xlYXIoKTtcclxuXHJcbiAgICBjb25zdCBhUG9pbnRzID0gYS5jYWxjUG9pbnRzO1xyXG4gICAgY29uc3QgYUxlbiA9IGFQb2ludHMubGVuZ3RoO1xyXG5cclxuICAgIGNvbnN0IGJQb2ludHMgPSBiLmNhbGNQb2ludHM7XHJcbiAgICBjb25zdCBiTGVuID0gYlBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgLy8gSWYgYW55IG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQSBpcyBhIHNlcGFyYXRpbmcgYXhpcywgbm8gaW50ZXJzZWN0aW9uLlxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhTGVuOyBpKyspIHtcclxuICAgICAgaWYgKHRoaXMuX2lzU2VwYXJhdGluZ0F4aXMoYS5wb3NpdGlvbiwgYi5wb3NpdGlvbiwgYVBvaW50cywgYlBvaW50cywgYS5ub3JtYWxzW2ldLCB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTKSkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIElmIGFueSBvZiB0aGUgZWRnZSBub3JtYWxzIG9mIEIgaXMgYSBzZXBhcmF0aW5nIGF4aXMsIG5vIGludGVyc2VjdGlvbi5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYkxlbjsgaSsrKSB7XHJcbiAgICAgIGlmICh0aGlzLl9pc1NlcGFyYXRpbmdBeGlzKGEucG9zaXRpb24sIGIucG9zaXRpb24sIGFQb2ludHMsIGJQb2ludHMsIGIubm9ybWFsc1tpXSwgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUykpIHtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBTaW5jZSBub25lIG9mIHRoZSBlZGdlIG5vcm1hbHMgb2YgQSBvciBCIGFyZSBhIHNlcGFyYXRpbmcgYXhpcywgdGhlcmUgaXMgYW4gaW50ZXJzZWN0aW9uXHJcbiAgICAvLyBhbmQgd2UndmUgYWxyZWFkeSBjYWxjdWxhdGVkIHRoZSBzbWFsbGVzdCBvdmVybGFwIChpbiBpc1NlcGFyYXRpbmdBeGlzKS4gXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yLlxyXG4gICAgaWYgKGRldGFpbHMpIHtcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5hID0gYTtcclxuICAgICAgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5iID0gYjtcclxuXHJcbiAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcFYuY29weSh0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXBOKS5zY2FsZSh0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXApO1xyXG5cclxuICAgICAgcmV0dXJuIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayBpZiBhIHBvbHlnb24gYW5kIGEgY2lyY2xlIGNvbGxpZGUuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtQb2x5Z29ufSBwb2x5Z29uIFRoZSBwb2x5Z29uLlxyXG4gICAqIEBwYXJhbSB7Q2lyY2xlfSBjaXJjbGUgVGhlIGNpcmNsZS5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZXRhaWxzPWZhbHNlXSBJZiBzZXQgdG8gdHJ1ZSBhbmQgdGhlcmUgaXMgYSBjb2xsaXNpb24sIGFuIG9iamVjdCBoaWdobGlnaHRpbmcgZGV0YWlscyBhYm91dCB0aGUgY29sbGlzaW9uIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZiBqdXN0IHJldHVybmluZyB0cnVlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHRlc3RQb2x5Z29uQ2lyY2xlKHBvbHlnb246IFBvbHlnb24sIGNpcmNsZTogQ2lyY2xlLCBkZXRhaWxzOiBib29sZWFuID0gZmFsc2UpOiAoYm9vbGVhbiB8IENvbGxpc2lvbkRldGFpbHMpIHtcclxuICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuY2xlYXIoKTtcclxuXHJcbiAgICAvLyBHZXQgdGhlIHBvc2l0aW9uIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdG8gdGhlIHBvbHlnb24uXHJcbiAgICBjb25zdCBjaXJjbGVQb3MgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhLmNvcHkoY2lyY2xlLnBvc2l0aW9uKS5hZGQoY2lyY2xlLm9mZnNldCkuc3ViKHBvbHlnb24ucG9zaXRpb24pO1xyXG5cclxuICAgIGNvbnN0IHJhZGl1cyA9IGNpcmNsZS5yYWRpdXM7XHJcbiAgICBjb25zdCByYWRpdXMyID0gcmFkaXVzICogcmFkaXVzO1xyXG5cclxuICAgIGNvbnN0IHBvaW50cyA9IHBvbHlnb24uY2FsY1BvaW50cztcclxuICAgIGNvbnN0IGxlbiA9IHBvaW50cy5sZW5ndGg7XHJcblxyXG4gICAgY29uc3QgZWRnZSA9IHRoaXMuX1RfVkVDVE9SUy5wb3AoKSE7XHJcbiAgICBjb25zdCBwb2ludCA9IHRoaXMuX1RfVkVDVE9SUy5wb3AoKSE7XHJcblxyXG4gICAgLy8gRm9yIGVhY2ggZWRnZSBpbiB0aGUgcG9seWdvbjpcclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcclxuICAgICAgY29uc3QgbmV4dCA9IGkgPT09IGxlbiAtIDEgPyAwIDogaSArIDE7XHJcbiAgICAgIGNvbnN0IHByZXYgPSBpID09PSAwID8gbGVuIC0gMSA6IGkgLSAxO1xyXG5cclxuICAgICAgbGV0IG92ZXJsYXAgPSAwO1xyXG4gICAgICBsZXQgb3ZlcmxhcE4gPSBudWxsO1xyXG5cclxuICAgICAgLy8gR2V0IHRoZSBlZGdlLlxyXG4gICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1tpXSk7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgZWRnZS5cclxuICAgICAgcG9pbnQuY29weShjaXJjbGVQb3MpLnN1Yihwb2ludHNbaV0pO1xyXG5cclxuICAgICAgLy8gSWYgdGhlIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgcG9pbnQgaXMgYmlnZ2VyIHRoYW4gdGhlIHJhZGl1cywgdGhlIHBvbHlnb24gaXMgZGVmaW5pdGVseSBub3QgZnVsbHkgaW4gdGhlIGNpcmNsZS5cclxuICAgICAgaWYgKGRldGFpbHMgJiYgcG9pbnQubGVuMigpID4gcmFkaXVzMikgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5hSW5CID0gZmFsc2U7XHJcblxyXG4gICAgICAvLyBDYWxjdWxhdGUgd2hpY2ggVm9yb25vaSByZWdpb24gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGlzIGluLlxyXG4gICAgICBsZXQgcmVnaW9uID0gdGhpcy5fdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludCk7XHJcblxyXG4gICAgICAvLyBJZiBpdCdzIHRoZSBsZWZ0IHJlZ2lvbjpcclxuICAgICAgaWYgKHJlZ2lvbiA9PT0gdGhpcy5fTEVGVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlJ3JlIGluIHRoZSBSSUdIVF9WT1JPTk9JX1JFR0lPTiBvZiB0aGUgcHJldmlvdXMgZWRnZS5cclxuICAgICAgICBlZGdlLmNvcHkocG9seWdvbi5lZGdlc1twcmV2XSk7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGF0ZSB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgcmVsYXRpdmUgdGhlIHN0YXJ0aW5nIHBvaW50IG9mIHRoZSBwcmV2aW91cyBlZGdlXHJcbiAgICAgICAgY29uc3QgcG9pbnQyID0gdGhpcy5fVF9WRUNUT1JTLnBvcCgpIS5jb3B5KGNpcmNsZVBvcykuc3ViKHBvaW50c1twcmV2XSk7XHJcblxyXG4gICAgICAgIHJlZ2lvbiA9IHRoaXMuX3Zvcm9ub2lSZWdpb24oZWRnZSwgcG9pbnQyKTtcclxuXHJcbiAgICAgICAgaWYgKHJlZ2lvbiA9PT0gdGhpcy5fUklHSFRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAgIC8vIEl0J3MgaW4gdGhlIHJlZ2lvbiB3ZSB3YW50LiAgQ2hlY2sgaWYgdGhlIGNpcmNsZSBpbnRlcnNlY3RzIHRoZSBwb2ludC5cclxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5sZW4oKTtcclxuXHJcbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xyXG4gICAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKHBvaW50KTtcclxuICAgICAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2gocG9pbnQyKTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZGV0YWlscykge1xyXG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYkluQSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChwb2ludDIpO1xyXG5cclxuICAgICAgICAvLyBJZiBpdCdzIHRoZSByaWdodCByZWdpb246XHJcbiAgICAgIH0gZWxzZSBpZiAocmVnaW9uID09PSB0aGlzLl9SSUdIVF9WT1JPTk9JX1JFR0lPTikge1xyXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlJ3JlIGluIHRoZSBsZWZ0IHJlZ2lvbiBvbiB0aGUgbmV4dCBlZGdlXHJcbiAgICAgICAgZWRnZS5jb3B5KHBvbHlnb24uZWRnZXNbbmV4dF0pO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIHJlbGF0aXZlIHRvIHRoZSBzdGFydGluZyBwb2ludCBvZiB0aGUgbmV4dCBlZGdlLlxyXG4gICAgICAgIHBvaW50LmNvcHkoY2lyY2xlUG9zKS5zdWIocG9pbnRzW25leHRdKTtcclxuXHJcbiAgICAgICAgcmVnaW9uID0gdGhpcy5fdm9yb25vaVJlZ2lvbihlZGdlLCBwb2ludCk7XHJcblxyXG4gICAgICAgIGlmIChyZWdpb24gPT09IHRoaXMuX0xFRlRfVk9ST05PSV9SRUdJT04pIHtcclxuICAgICAgICAgIC8vIEl0J3MgaW4gdGhlIHJlZ2lvbiB3ZSB3YW50LiAgQ2hlY2sgaWYgdGhlIGNpcmNsZSBpbnRlcnNlY3RzIHRoZSBwb2ludC5cclxuICAgICAgICAgIGNvbnN0IGRpc3QgPSBwb2ludC5sZW4oKTtcclxuXHJcbiAgICAgICAgICBpZiAoZGlzdCA+IHJhZGl1cykge1xyXG4gICAgICAgICAgICAvLyBObyBpbnRlcnNlY3Rpb25cclxuICAgICAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKHBvaW50KTtcclxuXHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0gZWxzZSBpZiAoZGV0YWlscykge1xyXG4gICAgICAgICAgICAvLyBJdCBpbnRlcnNlY3RzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICAgICAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMuYkluQSA9IGZhbHNlO1xyXG5cclxuICAgICAgICAgICAgb3ZlcmxhcE4gPSBwb2ludC5ub3JtYWxpemUoKTtcclxuICAgICAgICAgICAgb3ZlcmxhcCA9IHJhZGl1cyAtIGRpc3Q7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIE90aGVyd2lzZSwgaXQncyB0aGUgbWlkZGxlIHJlZ2lvbjpcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBOZWVkIHRvIGNoZWNrIGlmIHRoZSBjaXJjbGUgaXMgaW50ZXJzZWN0aW5nIHRoZSBlZGdlLCBjaGFuZ2UgdGhlIGVkZ2UgaW50byBpdHMgXCJlZGdlIG5vcm1hbFwiLlxyXG4gICAgICAgIGNvbnN0IG5vcm1hbCA9IGVkZ2UucGVycCgpLm5vcm1hbGl6ZSgpO1xyXG5cclxuICAgICAgICAvLyBGaW5kIHRoZSBwZXJwZW5kaWN1bGFyIGRpc3RhbmNlIGJldHdlZW4gdGhlIGNlbnRlciBvZiB0aGUgY2lyY2xlIGFuZCB0aGUgZWRnZS5cclxuICAgICAgICBjb25zdCBkaXN0ID0gcG9pbnQuZG90KG5vcm1hbCk7XHJcbiAgICAgICAgY29uc3QgZGlzdEFicyA9IE1hdGguYWJzKGRpc3QpO1xyXG5cclxuICAgICAgICAvLyBJZiB0aGUgY2lyY2xlIGlzIG9uIHRoZSBvdXRzaWRlIG9mIHRoZSBlZGdlLCB0aGVyZSBpcyBubyBpbnRlcnNlY3Rpb24uXHJcbiAgICAgICAgaWYgKGRpc3QgPiAwICYmIGRpc3RBYnMgPiByYWRpdXMpIHtcclxuICAgICAgICAgIC8vIE5vIGludGVyc2VjdGlvblxyXG4gICAgICAgICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goY2lyY2xlUG9zKTtcclxuICAgICAgICAgIHRoaXMuX1RfVkVDVE9SUy5wdXNoKG5vcm1hbCk7XHJcbiAgICAgICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoZGV0YWlscykge1xyXG4gICAgICAgICAgLy8gSXQgaW50ZXJzZWN0cywgY2FsY3VsYXRlIHRoZSBvdmVybGFwLlxyXG4gICAgICAgICAgb3ZlcmxhcE4gPSBub3JtYWw7XHJcbiAgICAgICAgICBvdmVybGFwID0gcmFkaXVzIC0gZGlzdDtcclxuXHJcbiAgICAgICAgICAvLyBJZiB0aGUgY2VudGVyIG9mIHRoZSBjaXJjbGUgaXMgb24gdGhlIG91dHNpZGUgb2YgdGhlIGVkZ2UsIG9yIHBhcnQgb2YgdGhlIGNpcmNsZSBpcyBvbiB0aGUgb3V0c2lkZSwgdGhlIGNpcmNsZSBpcyBub3QgZnVsbHkgaW5zaWRlIHRoZSBwb2x5Z29uLlxyXG4gICAgICAgICAgaWYgKGRpc3QgPj0gMCB8fCBvdmVybGFwIDwgMiAqIHJhZGl1cykgdGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5iSW5BID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBvdmVybGFwIHdlJ3ZlIHNlZW4sIGtlZXAgaXQuXHJcbiAgICAgIC8vIChvdmVybGFwTiBtYXkgYmUgbnVsbCBpZiB0aGUgY2lyY2xlIHdhcyBpbiB0aGUgd3JvbmcgVm9yb25vaSByZWdpb24pLlxyXG4gICAgICBpZiAob3ZlcmxhcE4gJiYgZGV0YWlscyAmJiBNYXRoLmFicyhvdmVybGFwKSA8IE1hdGguYWJzKHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcCkpIHtcclxuICAgICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXAgPSBvdmVybGFwO1xyXG4gICAgICAgIHRoaXMuX1RfQ09MTElTSU9OX0RFVEFJTFMub3ZlcmxhcE4uY29weShvdmVybGFwTik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBDYWxjdWxhdGUgdGhlIGZpbmFsIG92ZXJsYXAgdmVjdG9yIC0gYmFzZWQgb24gdGhlIHNtYWxsZXN0IG92ZXJsYXAuXHJcbiAgICBpZiAoZGV0YWlscykge1xyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmEgPSBwb2x5Z29uO1xyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLmIgPSBjaXJjbGU7XHJcblxyXG4gICAgICB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTLm92ZXJsYXBWLmNvcHkodGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwTikuc2NhbGUodGhpcy5fVF9DT0xMSVNJT05fREVUQUlMUy5vdmVybGFwKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChjaXJjbGVQb3MpO1xyXG4gICAgdGhpcy5fVF9WRUNUT1JTLnB1c2goZWRnZSk7XHJcbiAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChwb2ludCk7XHJcblxyXG4gICAgaWYgKGRldGFpbHMpIHJldHVybiB0aGlzLl9UX0NPTExJU0lPTl9ERVRBSUxTO1xyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2hlY2sgaWYgYSBjaXJjbGUgYW5kIGEgcG9seWdvbiBjb2xsaWRlLlxyXG4gICAqIFxyXG4gICAqICoqTk9URToqKiBUaGlzIGlzIHNsaWdodGx5IGxlc3MgZWZmaWNpZW50IHRoYW4gcG9seWdvbkNpcmNsZSBhcyBpdCBqdXN0IHJ1bnMgcG9seWdvbkNpcmNsZSBhbmQgcmV2ZXJzZXMgZXZlcnl0aGluZ1xyXG4gICAqIGF0IHRoZSBlbmQuXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtDaXJjbGV9IGNpcmNsZSBUaGUgY2lyY2xlLlxyXG4gICAqIEBwYXJhbSB7UG9seWdvbn0gcG9seWdvbiBUaGUgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtkZXRhaWxzPWZhbHNlXSBJZiBzZXQgdG8gdHJ1ZSBhbmQgdGhlcmUgaXMgYSBjb2xsaXNpb24sIGFuIG9iamVjdCBoaWdobGlnaHRpbmcgZGV0YWlscyBhYm91dCB0aGUgY29sbGlzaW9uIHdpbGwgYmUgcmV0dXJuZWQgaW5zdGVhZCBvZiBqdXN0IHJldHVybmluZyB0cnVlLlxyXG4gICAqIFxyXG4gICAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIHRydWUgaWYgdGhleSBpbnRlcnNlY3Qgb3IgZmFsc2Ugb3RoZXJ3aXNlLlxyXG4gICAqL1xyXG4gIHRlc3RDaXJjbGVQb2x5Z29uKGNpcmNsZTogQ2lyY2xlLCBwb2x5Z29uOiBQb2x5Z29uLCBkZXRhaWxzOiBib29sZWFuID0gZmFsc2UpOiAoYm9vbGVhbiB8IENvbGxpc2lvbkRldGFpbHMpIHtcclxuICAgIC8vIFRlc3QgdGhlIHBvbHlnb24gYWdhaW5zdCB0aGUgY2lyY2xlLlxyXG4gICAgY29uc3QgcmVzdWx0OiAoYm9vbGVhbiB8IENvbGxpc2lvbkRldGFpbHMpID0gdGhpcy50ZXN0UG9seWdvbkNpcmNsZShwb2x5Z29uLCBjaXJjbGUsIGRldGFpbHMpO1xyXG5cclxuICAgIGlmIChyZXN1bHQgJiYgZGV0YWlscykge1xyXG4gICAgICBjb25zdCBjb2xsaXNpb25EZXRhaWxzID0gcmVzdWx0IGFzIENvbGxpc2lvbkRldGFpbHM7XHJcblxyXG4gICAgICAvLyBTd2FwIEEgYW5kIEIgaW4gdGhlIGNvbGxpc2lvbiBkZXRhaWxzLlxyXG4gICAgICBjb25zdCBhID0gY29sbGlzaW9uRGV0YWlscy5hO1xyXG4gICAgICBjb25zdCBhSW5CID0gY29sbGlzaW9uRGV0YWlscy5hSW5CO1xyXG5cclxuICAgICAgY29sbGlzaW9uRGV0YWlscy5vdmVybGFwTi5yZXZlcnNlKCk7XHJcbiAgICAgIGNvbGxpc2lvbkRldGFpbHMub3ZlcmxhcFYucmV2ZXJzZSgpO1xyXG5cclxuICAgICAgY29sbGlzaW9uRGV0YWlscy5hID0gY29sbGlzaW9uRGV0YWlscy5iO1xyXG4gICAgICBjb2xsaXNpb25EZXRhaWxzLmIgPSBhO1xyXG5cclxuICAgICAgY29sbGlzaW9uRGV0YWlscy5hSW5CID0gY29sbGlzaW9uRGV0YWlscy5iSW5BO1xyXG4gICAgICBjb2xsaXNpb25EZXRhaWxzLmJJbkEgPSBhSW5CO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHQ7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBDaGVjayB3aGV0aGVyIHR3byBjb252ZXggcG9seWdvbnMgYXJlIHNlcGFyYXRlZCBieSB0aGUgc3BlY2lmaWVkIGF4aXMgKG11c3QgYmUgYSB1bml0IHZlY3RvcikuXHJcbiAgICogXHJcbiAgICogQHByaXZhdGVcclxuICAgKiBcclxuICAgKiBAcGFyYW0ge1ZlY3Rvcn0gYVBvcyBUaGUgcG9zaXRpb24gb2YgdGhlIGZpcnN0IHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGJQb3MgVGhlIHBvc2l0aW9uIG9mIHRoZSBzZWNvbmQgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IGFQb2ludHMgVGhlIHBvaW50cyBpbiB0aGUgZmlyc3QgcG9seWdvbi5cclxuICAgKiBAcGFyYW0ge0FycmF5PFZlY3Rvcj59IGJQb2ludHMgVGhlIHBvaW50cyBpbiB0aGUgc2Vjb25kIHBvbHlnb24uXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IGF4aXMgVGhlIGF4aXMgKHVuaXQgc2l6ZWQpIHRvIHRlc3QgYWdhaW5zdC4gIFRoZSBwb2ludHMgb2YgYm90aCBwb2x5Z29ucyB3aWxsIGJlIHByb2plY3RlZCBvbnRvIHRoaXMgYXhpcy5cclxuICAgKiBAcGFyYW0ge0NvbGxpc2lvbkRldGFpbHN9IGNvbGxpc2lvbkRldGFpbHMgQSBDb2xsaXNpb25EZXRhaWxzIG9iamVjdCAob3B0aW9uYWwpIHdoaWNoIHdpbGwgYmUgcG9wdWxhdGVkIGlmIHRoZSBheGlzIGlzIG5vdCBhIHNlcGFyYXRpbmcgYXhpcy5cclxuICAgKiBcclxuICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIGl0IGlzIGEgc2VwYXJhdGluZyBheGlzLCBmYWxzZSBvdGhlcndpc2UuICBJZiBmYWxzZSwgYW5kIGEgQ29sbGlzaW9uRGV0YWlscyBpcyBwYXNzZWQgaW4sIGluZm9ybWF0aW9uIGFib3V0IGhvdyBtdWNoIG92ZXJsYXAgYW5kIHRoZSBkaXJlY3Rpb24gb2YgdGhlIG92ZXJsYXAgd2lsbCBiZSBwb3B1bGF0ZWQuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfaXNTZXBhcmF0aW5nQXhpcyhhUG9zOiBWZWN0b3IsIGJQb3M6IFZlY3RvciwgYVBvaW50czogQXJyYXk8VmVjdG9yPiwgYlBvaW50czogQXJyYXk8VmVjdG9yPiwgYXhpczogVmVjdG9yLCBjb2xsaXNpb25EZXRhaWxzPzogQ29sbGlzaW9uRGV0YWlscyk6IGJvb2xlYW4ge1xyXG4gICAgY29uc3QgcmFuZ2VBID0gdGhpcy5fVF9BUlJBWVMucG9wKCkhO1xyXG4gICAgY29uc3QgcmFuZ2VCID0gdGhpcy5fVF9BUlJBWVMucG9wKCkhO1xyXG5cclxuICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIG9mZnNldCBiZXR3ZWVuIHRoZSB0d28gcG9seWdvbnNcclxuICAgIGNvbnN0IG9mZnNldFYgPSB0aGlzLl9UX1ZFQ1RPUlMucG9wKCkhLmNvcHkoYlBvcykuc3ViKGFQb3MpO1xyXG4gICAgY29uc3QgcHJvamVjdGVkT2Zmc2V0ID0gb2Zmc2V0Vi5kb3QoYXhpcyk7XHJcblxyXG4gICAgLy8gUHJvamVjdCB0aGUgcG9seWdvbnMgb250byB0aGUgYXhpcy5cclxuICAgIHRoaXMuX2ZsYXR0ZW5Qb2ludHNPbihhUG9pbnRzLCBheGlzLCByYW5nZUEpO1xyXG4gICAgdGhpcy5fZmxhdHRlblBvaW50c09uKGJQb2ludHMsIGF4aXMsIHJhbmdlQik7XHJcblxyXG4gICAgLy8gTW92ZSBCJ3MgcmFuZ2UgdG8gaXRzIHBvc2l0aW9uIHJlbGF0aXZlIHRvIEEuXHJcbiAgICByYW5nZUJbMF0gKz0gcHJvamVjdGVkT2Zmc2V0O1xyXG4gICAgcmFuZ2VCWzFdICs9IHByb2plY3RlZE9mZnNldDtcclxuXHJcbiAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhIGdhcC4gSWYgdGhlcmUgaXMsIHRoaXMgaXMgYSBzZXBhcmF0aW5nIGF4aXMgYW5kIHdlIGNhbiBzdG9wXHJcbiAgICBpZiAocmFuZ2VBWzBdID4gcmFuZ2VCWzFdIHx8IHJhbmdlQlswXSA+IHJhbmdlQVsxXSkge1xyXG4gICAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuXHJcbiAgICAgIHRoaXMuX1RfQVJSQVlTLnB1c2gocmFuZ2VBKTtcclxuICAgICAgdGhpcy5fVF9BUlJBWVMucHVzaChyYW5nZUIpO1xyXG5cclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gVGhpcyBpcyBub3QgYSBzZXBhcmF0aW5nIGF4aXMuIElmIHdlJ3JlIGNhbGN1bGF0aW5nIGNvbGxpc2lvbiBkZXRhaWxzLCBjYWxjdWxhdGUgdGhlIG92ZXJsYXAuXHJcbiAgICBpZiAoY29sbGlzaW9uRGV0YWlscykge1xyXG4gICAgICBsZXQgb3ZlcmxhcCA9IDA7XHJcblxyXG4gICAgICAvLyBBIHN0YXJ0cyBmdXJ0aGVyIGxlZnQgdGhhbiBCXHJcbiAgICAgIGlmIChyYW5nZUFbMF0gPCByYW5nZUJbMF0pIHtcclxuICAgICAgICBjb2xsaXNpb25EZXRhaWxzLmFJbkIgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQSBlbmRzIGJlZm9yZSBCIGRvZXMuIFdlIGhhdmUgdG8gcHVsbCBBIG91dCBvZiBCXHJcbiAgICAgICAgaWYgKHJhbmdlQVsxXSA8IHJhbmdlQlsxXSkge1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhbmdlQVsxXSAtIHJhbmdlQlswXTtcclxuXHJcbiAgICAgICAgICBjb2xsaXNpb25EZXRhaWxzLmJJbkEgPSBmYWxzZTtcclxuICAgICAgICAgIC8vIEIgaXMgZnVsbHkgaW5zaWRlIEEuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24xID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMiA9IHJhbmdlQlsxXSAtIHJhbmdlQVswXTtcclxuXHJcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIEIgc3RhcnRzIGZ1cnRoZXIgbGVmdCB0aGFuIEFcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb2xsaXNpb25EZXRhaWxzLmJJbkEgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQiBlbmRzIGJlZm9yZSBBIGVuZHMuIFdlIGhhdmUgdG8gcHVzaCBBIG91dCBvZiBCXHJcbiAgICAgICAgaWYgKHJhbmdlQVsxXSA+IHJhbmdlQlsxXSkge1xyXG4gICAgICAgICAgb3ZlcmxhcCA9IHJhbmdlQVswXSAtIHJhbmdlQlsxXTtcclxuXHJcbiAgICAgICAgICBjb2xsaXNpb25EZXRhaWxzLmFJbkIgPSBmYWxzZTtcclxuICAgICAgICAgIC8vIEEgaXMgZnVsbHkgaW5zaWRlIEIuICBQaWNrIHRoZSBzaG9ydGVzdCB3YXkgb3V0LlxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICBjb25zdCBvcHRpb24xID0gcmFuZ2VBWzFdIC0gcmFuZ2VCWzBdO1xyXG4gICAgICAgICAgY29uc3Qgb3B0aW9uMiA9IHJhbmdlQlsxXSAtIHJhbmdlQVswXTtcclxuXHJcbiAgICAgICAgICBvdmVybGFwID0gb3B0aW9uMSA8IG9wdGlvbjIgPyBvcHRpb24xIDogLW9wdGlvbjI7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBJZiB0aGlzIGlzIHRoZSBzbWFsbGVzdCBhbW91bnQgb2Ygb3ZlcmxhcCB3ZSd2ZSBzZWVuIHNvIGZhciwgc2V0IGl0IGFzIHRoZSBtaW5pbXVtIG92ZXJsYXAuXHJcbiAgICAgIGNvbnN0IGFic092ZXJsYXAgPSBNYXRoLmFicyhvdmVybGFwKTtcclxuXHJcbiAgICAgIGlmIChhYnNPdmVybGFwIDwgY29sbGlzaW9uRGV0YWlscy5vdmVybGFwKSB7XHJcbiAgICAgICAgY29sbGlzaW9uRGV0YWlscy5vdmVybGFwID0gYWJzT3ZlcmxhcDtcclxuICAgICAgICBjb2xsaXNpb25EZXRhaWxzLm92ZXJsYXBOLmNvcHkoYXhpcyk7XHJcblxyXG4gICAgICAgIGlmIChvdmVybGFwIDwgMCkgY29sbGlzaW9uRGV0YWlscy5vdmVybGFwTi5yZXZlcnNlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aGlzLl9UX1ZFQ1RPUlMucHVzaChvZmZzZXRWKTtcclxuXHJcbiAgICB0aGlzLl9UX0FSUkFZUy5wdXNoKHJhbmdlQSk7XHJcbiAgICB0aGlzLl9UX0FSUkFZUy5wdXNoKHJhbmdlQik7XHJcblxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogRmxhdHRlbnMgdGhlIHNwZWNpZmllZCBhcnJheSBvZiBwb2ludHMgb250byBhIHVuaXQgdmVjdG9yIGF4aXMgcmVzdWx0aW5nIGluIGEgb25lIGRpbWVuc2lvbnNsXHJcbiAgICogcmFuZ2Ugb2YgdGhlIG1pbmltdW0gYW5kIG1heGltdW0gdmFsdWUgb24gdGhhdCBheGlzLlxyXG4gICAqIFxyXG4gICAqIEBwcml2YXRlXHJcbiAgICogXHJcbiAgICogQHBhcmFtIHtBcnJheTxWZWN0b3I+fSBwb2ludHMgVGhlIHBvaW50cyB0byBmbGF0dGVuLlxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBub3JtYWwgVGhlIHVuaXQgdmVjdG9yIGF4aXMgdG8gZmxhdHRlbiBvbi5cclxuICAgKiBAcGFyYW0ge0FycmF5PG51bWJlcj59IHJlc3VsdCBBbiBhcnJheS4gQWZ0ZXIgY2FsbGluZyB0aGlzIGZ1bmN0aW9uLCByZXN1bHRbMF0gd2lsbCBiZSB0aGUgbWluaW11bSB2YWx1ZSwgcmVzdWx0WzFdIHdpbGwgYmUgdGhlIG1heGltdW0gdmFsdWUuXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfZmxhdHRlblBvaW50c09uKHBvaW50czogQXJyYXk8VmVjdG9yPiwgbm9ybWFsOiBWZWN0b3IsIHJlc3VsdDogQXJyYXk8bnVtYmVyPikge1xyXG4gICAgbGV0IG1pbiA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICBsZXQgbWF4ID0gLU51bWJlci5NQVhfVkFMVUU7XHJcblxyXG4gICAgY29uc3QgbGVuID0gcG9pbnRzLmxlbmd0aDtcclxuXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XHJcbiAgICAgIC8vIFRoZSBtYWduaXR1ZGUgb2YgdGhlIHByb2plY3Rpb24gb2YgdGhlIHBvaW50IG9udG8gdGhlIG5vcm1hbC5cclxuICAgICAgY29uc3QgZG90ID0gcG9pbnRzW2ldLmRvdChub3JtYWwpO1xyXG5cclxuICAgICAgaWYgKGRvdCA8IG1pbikgbWluID0gZG90O1xyXG4gICAgICBpZiAoZG90ID4gbWF4KSBtYXggPSBkb3Q7XHJcbiAgICB9XHJcblxyXG4gICAgcmVzdWx0WzBdID0gbWluO1xyXG4gICAgcmVzdWx0WzFdID0gbWF4O1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQ2FsY3VsYXRlcyB3aGljaCBWb3Jvbm9pIHJlZ2lvbiBhIHBvaW50IGlzIG9uIGEgbGluZSBzZWdtZW50LlxyXG4gICAqIFxyXG4gICAqIEl0IGlzIGFzc3VtZWQgdGhhdCBib3RoIHRoZSBsaW5lIGFuZCB0aGUgcG9pbnQgYXJlIHJlbGF0aXZlIHRvIGAoMCwwKWBcclxuICAgKiBcclxuICAgKiAgICAgICAgICAgICB8ICAgICAgICgwKSAgICAgIHxcclxuICAgKiAgICAgICgtMSkgIFtTXS0tLS0tLS0tLS0tLS0tW0VdICAoMSlcclxuICAgKiAgICAgICAgICAgIHwgICAgICAgKDApICAgICAgfFxyXG4gICAqIFxyXG4gICAqIEBwYXJhbSB7VmVjdG9yfSBsaW5lIFRoZSBsaW5lIHNlZ21lbnQuXHJcbiAgICogQHBhcmFtIHtWZWN0b3J9IHBvaW50IFRoZSBwb2ludC5cclxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IExFRlRfVk9ST05PSV9SRUdJT04gKC0xKSBpZiBpdCBpcyB0aGUgbGVmdCByZWdpb24sXHJcbiAgICogICAgICAgICAgICAgICAgICBNSURETEVfVk9ST05PSV9SRUdJT04gKDApIGlmIGl0IGlzIHRoZSBtaWRkbGUgcmVnaW9uLFxyXG4gICAqICAgICAgICAgICAgICAgICAgUklHSFRfVk9ST05PSV9SRUdJT04gKDEpIGlmIGl0IGlzIHRoZSByaWdodCByZWdpb24uXHJcbiAgICovXHJcbiAgcHJpdmF0ZSBfdm9yb25vaVJlZ2lvbihsaW5lOiBWZWN0b3IsIHBvaW50OiBWZWN0b3IpOiBudW1iZXIge1xyXG4gICAgY29uc3QgbGVuMiA9IGxpbmUubGVuMigpO1xyXG4gICAgY29uc3QgZHAgPSBwb2ludC5kb3QobGluZSk7XHJcblxyXG4gICAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgc3RhcnQgb2YgdGhlIGxpbmUsIGl0IGlzIGluIHRoZSBsZWZ0IHZvcm9ub2kgcmVnaW9uLlxyXG4gICAgaWYgKGRwIDwgMCkgcmV0dXJuIHRoaXMuX0xFRlRfVk9ST05PSV9SRUdJT047XHJcblxyXG4gICAgLy8gSWYgdGhlIHBvaW50IGlzIGJleW9uZCB0aGUgZW5kIG9mIHRoZSBsaW5lLCBpdCBpcyBpbiB0aGUgcmlnaHQgdm9yb25vaSByZWdpb24uXHJcbiAgICBlbHNlIGlmIChkcCA+IGxlbjIpIHJldHVybiB0aGlzLl9SSUdIVF9WT1JPTk9JX1JFR0lPTjtcclxuXHJcbiAgICAvLyBPdGhlcndpc2UsIGl0J3MgaW4gdGhlIG1pZGRsZSBvbmUuXHJcbiAgICBlbHNlIHJldHVybiB0aGlzLl9NSURETEVfVk9ST05PSV9SRUdJT047XHJcbiAgfVxyXG59Il19