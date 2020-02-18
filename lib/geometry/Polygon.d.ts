import Vector from './Vector';
/**
 * Represents a *convex* polygon with any number of points (specified in counter-clockwise order).
 *
 * Note: Do _not_ manually change the `points`, `angle`, or `offset` properties. Use the provided  setters.
 * Otherwise the calculated properties will not be updated correctly.
 *
 * The `pos` property can be changed directly.
 */
export default class Polygon {
    /**
     * A vector representing the origin of this polygon (all other points are relative to this one).
     *
     * @private
     *
     * @property {Vector}
     */
    private _position;
    /**
     * An array of vectors representing the points in the polygon, in counter-clockwise order.
     *
     * @private
     *
     * @property {Array<Vector>}
     */
    private _points;
    /**
     * The angle of this polygon.
     *
     * @private
     *
     * @property {number}
     */
    private _angle;
    /**
     * The offset of this polygon.
     *
     * @private
     *
     * @property {Vector}
     */
    private _offset;
    /**
     * The calculated points of this polygon.
     *
     * @private
     *
     * @property {Array<Vector>}
     */
    private _calcPoints;
    /**
     * The edges of this polygon.
     *
     * @private
     *
     * @property {Array<Vector>}
     */
    private _edges;
    /**
     * The normals of this polygon.
     *
     * @private
     *
     * @property {Array<Vector>}
     */
    private _normals;
    /**
     * Create a new polygon, passing in a position vector, and an array of points (represented by vectors
     * relative to the position vector). If no position is passed in, the position of the polygon will be `(0,0)`.
     *
     * @param {Vector} [position=Vector] A vector representing the origin of the polygon (all other points are relative to this one)
     * @param {Array<Vector>} [points=[]] An array of vectors representing the points in the polygon, in counter-clockwise order.
     */
    constructor(position?: Vector, points?: Array<Vector>);
    /**
     * Returns the position of this polygon.
     *
     * @returns {Vector}
     */
    get position(): Vector;
    /**
     * **Note:** Not sure if this will be kept or not but for now it's disabled.
     *
     * Sets a new position for this polygon and recalculates the points.
     *
     * @param {Vector} position A Vector representing the new position of this polygon.
     */
    /**
     * Returns the points of this polygon.
     *
     * @returns {Array<Vector>}
     */
    get points(): Array<Vector>;
    /**
     * Returns the calculated points of this polygon.
     *
     * @returns {Array<Vector>}
     */
    get calcPoints(): Array<Vector>;
    /**
     * Returns the offset of this polygon.
     *
     * @returns {Vector}
     */
    get offset(): Vector;
    /**
     * Returns the angle of this polygon.
     *
     * @returns {number}
     */
    get angle(): number;
    /**
     * Returns the edges of this polygon.
     *
     * @returns {Array<Vector>}
     */
    get edges(): Array<Vector>;
    /**
     * Returns the normals of this polygon.
     *
     * @returns {Array<Vector>}
     */
    get normals(): Array<Vector>;
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
    setPoints(points: Array<Vector>): Polygon;
    /**
     * Set the current rotation angle of the polygon.
     *
     * @param {number} angle The current rotation angle (in radians).
     *
     * @returns {Polygon} Returns this for chaining.
     */
    setAngle(angle: number): Polygon;
    /**
     * Set the current offset to apply to the `points` before applying the `angle` rotation.
     *
     * @param {Vector} offset The new offset Vector.
     *
     * @returns {Polygon} Returns this for chaining.
     */
    setOffset(offset: Vector): Polygon;
    /**
     * Rotates this Polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `position`).
     *
     * Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).
     *
     * @param {number} angle The angle to rotate (in radians).
     *
     * @returns {Polygon} Returns this for chaining.
     */
    rotate(angle: number): Polygon;
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
    translate(x: number, y: number): Polygon;
    /**
     * Computes the calculated collision Polygon.
     *
     * This applies the `angle` and `offset` to the original points then recalculates the edges and normals of the collision Polygon.
     *
     * @private
     *
     * @returns {Polygon} Returns this for chaining.
     */
    private _recalc;
    /**
     * Compute the axis-aligned bounding box.
     *
     * Any current state (translations/rotations) will be applied before constructing the AABB.
     *
     * Note: Returns a _new_ `Polygon` each time you call this.
     *
     * @returns {Polygon} Returns this for chaining.
     */
    getAABB(): Polygon;
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
    getCentroid(): Vector;
}
