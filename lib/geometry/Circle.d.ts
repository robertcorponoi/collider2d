import Vector from './Vector';
import Polygon from './Polygon';
/**
 * Represents a circle with a position and a radius.
 *
 * Creates a new Circle, optionally passing in a position and/or radius. If no position is given, the Circle will be at `(0,0)`.
 *
 * If no radius is provided the circle will have a radius of `0`.
 */
export default class Circle {
    /**
     * A Vector representing the center point of this circle.
     *
     * @private
     *
     * @property {Vector}
     */
    private _position;
    /**
     * The radius of this circle.
     *
     * @private
     *
     * @property {number}
     */
    private _radius;
    /**
     * A Vector representing the offset of this circle.
     *
     * @private
     *
     * @property {Vector}
     */
    private _offset;
    /**
     * @param {Vector} position A Vector representing the center of this Circle.
     * @param {number} radius The radius of this Circle.
     */
    constructor(position?: Vector, radius?: number);
    /**
     * Returns the position of this circle.
     *
     * @returns {Vector}
     */
    get position(): Vector;
    /**
     * Returns the radius of this circle.
     *
     * @returns {number}
     */
    get radius(): number;
    /**
     * Returns the offset of this circle.
     *
     * @returns {Vector}
     */
    get offset(): Vector;
    /**
     * Set a new offset for this circle.
     *
     * @param {Vector} offset The new offset for this circle.
     */
    set offset(offset: Vector);
    /**
     * Translate the center of the cirlc.e
     *
     * @param {Vector} position A Vector representing the new center of this circle.
     */
    translate(x: number, y: number): void;
    /**
     * Compute the axis-aligned bounding box (AABB) of this Circle.
     *
     * Note: Returns a new `Polygon` each time this is called.
     *
     * @returns {Polygon} Returns the AABB of this circle.
     */
    getAABB(): Polygon;
    /**
     * Set the current offset to apply to the radius.
     *
     * @param {Vector} offset The new offset Vector.
     *
     * @returns {Circle} Returns this for chaining.
     */
    setOffset(offset: Vector): Circle;
}
