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
    private _T_VECTORS;
    /**
     * A pool of arrays of numbers used in calculations to avoid allocating memory.
     *
     * @private
     *
     * @property {Array<Array<number>>}
     */
    private _T_ARRAYS;
    /**
     * Temporary collision details object used for hit detection.
     *
     * @private
     *
     * @property {CollisionDetails}
     */
    private _T_COLLISION_DETAILS;
    /**
     * Tiny "point" Polygon used for Polygon hit detection.
     *
     * @private
     *
     * @property {Polygon}
     */
    private _TEST_POINT;
    /**
     * Constant used for left voronoi region.
     *
     * @private
     *
     * @property {number}
     */
    private _LEFT_VORONOI_REGION;
    /**
     * Constant used for middle voronoi region.
     *
     * @private
     *
     * @property {number}
     */
    private _MIDDLE_VORONOI_REGION;
    /**
     * Constant used for right voronoi region.
     *
     * @private
     *
     * @property {number}
     */
    private _RIGHT_VORONOI_REGION;
    constructor();
    /**
     * Check if a point is inside a circle.
     *
     * @param {Vector} point The point to test.
     * @param {Circle} circle The circle to test.
     *
     * @returns {boolean} Returns true if the point is inside the circle or false otherwise.
     */
    pointInCircle(point: Vector, circle: Circle): boolean;
    /**
     * Check if a point is inside a convex polygon.
     *
     * @param {Vector} point The point to test.
     * @param {Polygon} polygon The polygon to test.
     *
     * @returns {boolean} Returns true if the point is inside the polygon or false otherwise.
     */
    pointInPolygon(point: Vector, polygon: Polygon): boolean;
    /**
     * Check if two circles collide.
     *
     * @param {Circle} a The first circle.
     * @param {Circle} b The second circle.
     * @param {boolean} [details=false] If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true.
     *
     * @returns {boolean} Returns true if the circles intersect or false otherwise.
     */
    testCircleCircle(a: Circle, b: Circle, details?: boolean): (boolean | CollisionDetails);
    /**
     * Checks whether polygons collide.
     *
     * @param {Polygon} a The first polygon.
     * @param {Polygon} b The second polygon.
     * @param {boolean} [details=false] If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true.
     *
     * @returns {boolean} Returns true if they intersect or false otherwise.
     */
    testPolygonPolygon(a: Polygon, b: Polygon, details?: boolean): (boolean | CollisionDetails);
    /**
     * Check if a polygon and a circle collide.
     *
     * @param {Polygon} polygon The polygon.
     * @param {Circle} circle The circle.
     * @param {boolean} [details=false] If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true.
     *
     * @returns {boolean} Returns true if they intersect or false otherwise.
     */
    testPolygonCircle(polygon: Polygon, circle: Circle, details?: boolean): (boolean | CollisionDetails);
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
    testCirclePolygon(circle: Circle, polygon: Polygon, details?: boolean): (boolean | CollisionDetails);
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
    private _isSeparatingAxis;
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
    private _flattenPointsOn;
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
    private _voronoiRegion;
}
