'use strict'

import Box from './geometry/box';
import Vector from './geometry/vector';
import Circle from './geometry/circle';
import Polygon from './geometry/polygon';
import CollisionDetails from './collision_details';

export default class Collider2D {
  /**
   * A pool of `Vector objects that are used in calculations to avoid allocating memory.
   * 
   * @private
   * 
   * @property {Array<Vector>}
   */
  private _T_VECTORS: Array<Vector> = [];

  /**
   * A pool of arrays of numbers used in calculations to avoid allocating memory.
   * 
   * @private
   * 
   * @property {Array<Array<number>>}
   */
  private _T_ARRAYS: Array<Array<number>> = [];

  /**
   * Temporary collision details object used for hit detection.
   * 
   * @private
   * 
   * @property {CollisionDetails}
   */
  private _T_COLLISION_DETAILS = new CollisionDetails();

  /**
   * Tiny "point" Polygon used for Polygon hit detection.
   * 
   * @private
   * 
   * @property {Polygon}
   */
  private _TEST_POINT = new Box(new Vector(), 0.000001, 0.000001).toPolygon();

  /**
   * Constant used for left voronoi region.
   * 
   * @private
   * 
   * @property {number}
   */
  private _LEFT_VORONOI_REGION = -1;

  /**
   * Constant used for middle voronoi region.
   * 
   * @private
   * 
   * @property {number}
   */
  private _MIDDLE_VORONOI_REGION = 0;

  /**
   * Constant used for right voronoi region.
   * 
   * @private
   * 
   * @property {number}
   */
  private _RIGHT_VORONOI_REGION = 1;

  constructor() {
    // Populate T_VECTORS
    for (let i = 0; i < 10; i++) this._T_VECTORS.push(new Vector());

    // Populate T_ARRAYS
    for (let i = 0; i < 5; i++) this._T_ARRAYS.push([]);
  }

  /**
   * Check if a point is inside a circle.
   * 
   * @param {Vector} point The point to test.
   * @param {Circle} circle The circle to test.
   * 
   * @returns {boolean} Returns true if the point is inside the circle or false otherwise.
   */
  pointInCircle(point: Vector, circle: Circle): boolean {
    const differenceV = this._T_VECTORS.pop()!.copy(point).sub(circle.position).sub(circle.offset);

    const radiusSq = circle.radius * circle.radius;
    const distanceSq = differenceV.len2();

    this._T_VECTORS.push(differenceV);

    // If the distance between is smaller than the radius then the point is inside the circle.
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
  pointInPolygon(point: Vector, polygon: Polygon): boolean {
    this._TEST_POINT.position.copy(point);
    this._T_COLLISION_DETAILS.clear();

    let result: (boolean | CollisionDetails) = this.testPolygonPolygon(this._TEST_POINT, polygon, true);

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
  testCircleCircle(a: Circle, b: Circle, details: boolean = false): (boolean | CollisionDetails) {
    // Check if the distance between the centers of the two circles is greater than their combined radius.
    const differenceV = this._T_VECTORS.pop()!.copy(b.position).add(b.offset).sub(a.position).sub(a.offset);

    const totalRadius = a.radius + b.radius;
    const totalRadiusSq = totalRadius * totalRadius;
    const distanceSq = differenceV.len2();

    // If the distance is bigger than the combined radius, they don't intersect.
    if (distanceSq > totalRadiusSq) {
      this._T_VECTORS.push(differenceV);

      return false;
    }

    if (details) {
      this._T_COLLISION_DETAILS.clear();

      const dist = Math.sqrt(distanceSq);

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
  testPolygonPolygon(a: Polygon, b: Polygon, details: boolean = false): (boolean | CollisionDetails) {
    this._T_COLLISION_DETAILS.clear();

    const aPoints = a.calcPoints;
    const aLen = aPoints.length;

    const bPoints = b.calcPoints;
    const bLen = bPoints.length;

    // If any of the edge normals of A is a separating axis, no intersection.
    for (let i = 0; i < aLen; i++) {
      if (this._isSeparatingAxis(a.position, b.position, aPoints, bPoints, a.normals[i], this._T_COLLISION_DETAILS)) {
        return false;
      }
    }

    // If any of the edge normals of B is a separating axis, no intersection.
    for (let i = 0; i < bLen; i++) {
      if (this._isSeparatingAxis(a.position, b.position, aPoints, bPoints, b.normals[i], this._T_COLLISION_DETAILS)) {
        return false;
      }
    }

    // Since none of the edge normals of A or B are a separating axis, there is an intersection
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
  testPolygonCircle(polygon: Polygon, circle: Circle, details: boolean = false): (boolean | CollisionDetails) {
    this._T_COLLISION_DETAILS.clear();

    // Get the position of the circle relative to the polygon.
    const circlePos = this._T_VECTORS.pop()!.copy(circle.position).add(circle.offset).sub(polygon.position);

    const radius = circle.radius;
    const radius2 = radius * radius;

    const points = polygon.calcPoints;
    const len = points.length;

    const edge = this._T_VECTORS.pop()!;
    const point = this._T_VECTORS.pop()!;

    // For each edge in the polygon:
    for (var i = 0; i < len; i++) {
      const next = i === len - 1 ? 0 : i + 1;
      const prev = i === 0 ? len - 1 : i - 1;

      let overlap = 0;
      let overlapN = null;

      // Get the edge.
      edge.copy(polygon.edges[i]);

      // Calculate the center of the circle relative to the starting point of the edge.
      point.copy(circlePos).sub(points[i]);

      // If the distance between the center of the circle and the point is bigger than the radius, the polygon is definitely not fully in the circle.
      if (details && point.len2() > radius2) this._T_COLLISION_DETAILS.aInB = false;

      // Calculate which Voronoi region the center of the circle is in.
      let region = this._voronoiRegion(edge, point);

      // If it's the left region:
      if (region === this._LEFT_VORONOI_REGION) {
        // We need to make sure we're in the RIGHT_VORONOI_REGION of the previous edge.
        edge.copy(polygon.edges[prev]);

        // Calculate the center of the circle relative the starting point of the previous edge
        const point2 = this._T_VECTORS.pop()!.copy(circlePos).sub(points[prev]);

        region = this._voronoiRegion(edge, point2);

        if (region === this._RIGHT_VORONOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          const dist = point.len();

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

        this._T_VECTORS.push(point2);

        // If it's the right region:
      } else if (region === this._RIGHT_VORONOI_REGION) {
        // We need to make sure we're in the left region on the next edge
        edge.copy(polygon.edges[next]);

        // Calculate the center of the circle relative to the starting point of the next edge.
        point.copy(circlePos).sub(points[next]);

        region = this._voronoiRegion(edge, point);

        if (region === this._LEFT_VORONOI_REGION) {
          // It's in the region we want.  Check if the circle intersects the point.
          const dist = point.len();

          if (dist > radius) {
            // No intersection
            this._T_VECTORS.push(circlePos);
            this._T_VECTORS.push(edge);
            this._T_VECTORS.push(point);

            return false;
          } else if (details) {
            // It intersects, calculate the overlap.
            this._T_COLLISION_DETAILS.bInA = false;

            overlapN = point.normalize();
            overlap = radius - dist;
          }
        }
        // Otherwise, it's the middle region:
      } else {
        // Need to check if the circle is intersecting the edge, change the edge into its "edge normal".
        const normal = edge.perp().normalize();

        // Find the perpendicular distance between the center of the circle and the edge.
        const dist = point.dot(normal);
        const distAbs = Math.abs(dist);

        // If the circle is on the outside of the edge, there is no intersection.
        if (dist > 0 && distAbs > radius) {
          // No intersection
          this._T_VECTORS.push(circlePos);
          this._T_VECTORS.push(normal);
          this._T_VECTORS.push(point);

          return false;
        } else if (details) {
          // It intersects, calculate the overlap.
          overlapN = normal;
          overlap = radius - dist;

          // If the center of the circle is on the outside of the edge, or part of the circle is on the outside, the circle is not fully inside the polygon.
          if (dist >= 0 || overlap < 2 * radius) this._T_COLLISION_DETAILS.bInA = false;
        }
      }

      // If this is the smallest overlap we've seen, keep it.
      // (overlapN may be null if the circle was in the wrong Voronoi region).
      if (overlapN && details && Math.abs(overlap) < Math.abs(this._T_COLLISION_DETAILS.overlap)) {
        this._T_COLLISION_DETAILS.overlap = overlap;
        this._T_COLLISION_DETAILS.overlapN.copy(overlapN);
      }
    }

    // Calculate the final overlap vector - based on the smallest overlap.
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
  testCirclePolygon(circle: Circle, polygon: Polygon, details: boolean = false): (boolean | CollisionDetails) {
    // Test the polygon against the circle.
    const result: (boolean | CollisionDetails) = this.testPolygonCircle(polygon, circle, details);

    if (result && details) {
      const collisionDetails = result as CollisionDetails;

      // Swap A and B in the collision details.
      const a = collisionDetails.a;
      const aInB = collisionDetails.aInB;

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
  private _isSeparatingAxis(aPos: Vector, bPos: Vector, aPoints: Array<Vector>, bPoints: Array<Vector>, axis: Vector, collisionDetails?: CollisionDetails): boolean {
    const rangeA = this._T_ARRAYS.pop()!;
    const rangeB = this._T_ARRAYS.pop()!;

    // The magnitude of the offset between the two polygons
    const offsetV = this._T_VECTORS.pop()!.copy(bPos).sub(aPos);
    const projectedOffset = offsetV.dot(axis);

    // Project the polygons onto the axis.
    this._flattenPointsOn(aPoints, axis, rangeA);
    this._flattenPointsOn(bPoints, axis, rangeB);

    // Move B's range to its position relative to A.
    rangeB[0] += projectedOffset;
    rangeB[1] += projectedOffset;

    // Check if there is a gap. If there is, this is a separating axis and we can stop
    if (rangeA[0] > rangeB[1] || rangeB[0] > rangeA[1]) {
      this._T_VECTORS.push(offsetV);

      this._T_ARRAYS.push(rangeA);
      this._T_ARRAYS.push(rangeB);

      return true;
    }

    // This is not a separating axis. If we're calculating collision details, calculate the overlap.
    if (collisionDetails) {
      let overlap = 0;

      // A starts further left than B
      if (rangeA[0] < rangeB[0]) {
        collisionDetails.aInB = false;

        // A ends before B does. We have to pull A out of B
        if (rangeA[1] < rangeB[1]) {
          overlap = rangeA[1] - rangeB[0];

          collisionDetails.bInA = false;
          // B is fully inside A.  Pick the shortest way out.
        } else {
          const option1 = rangeA[1] - rangeB[0];
          const option2 = rangeB[1] - rangeA[0];

          overlap = option1 < option2 ? option1 : -option2;
        }
        // B starts further left than A
      } else {
        collisionDetails.bInA = false;

        // B ends before A ends. We have to push A out of B
        if (rangeA[1] > rangeB[1]) {
          overlap = rangeA[0] - rangeB[1];

          collisionDetails.aInB = false;
          // A is fully inside B.  Pick the shortest way out.
        } else {
          const option1 = rangeA[1] - rangeB[0];
          const option2 = rangeB[1] - rangeA[0];

          overlap = option1 < option2 ? option1 : -option2;
        }
      }

      // If this is the smallest amount of overlap we've seen so far, set it as the minimum overlap.
      const absOverlap = Math.abs(overlap);

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
  private _flattenPointsOn(points: Array<Vector>, normal: Vector, result: Array<number>) {
    let min = Number.MAX_VALUE;
    let max = -Number.MAX_VALUE;

    const len = points.length;

    for (let i = 0; i < len; i++) {
      // The magnitude of the projection of the point onto the normal.
      const dot = points[i].dot(normal);

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
  private _voronoiRegion(line: Vector, point: Vector): number {
    const len2 = line.len2();
    const dp = point.dot(line);

    // If the point is beyond the start of the line, it is in the left voronoi region.
    if (dp < 0) return this._LEFT_VORONOI_REGION;

    // If the point is beyond the end of the line, it is in the right voronoi region.
    else if (dp > len2) return this._RIGHT_VORONOI_REGION;

    // Otherwise, it's in the middle one.
    else return this._MIDDLE_VORONOI_REGION;
  }
}