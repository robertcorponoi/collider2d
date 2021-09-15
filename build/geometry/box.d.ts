import Vector from './vector';
import Polygon from './polygon';
/**
 * a enum for quick assignment of common origins
 */
export declare enum BoxOrigin {
    center = 0,
    bottomLeft = 1,
    bottomRight = 2,
    topRigth = 3,
    topLeft = 4
}
/**
 * A box represents an axis-aligned box with a width and height.
 */
export default class Box {
    /**
     * The position of this box as a Vector.
     *
     * @private
     *
     * @property {Vector}
     */
    private _position;
    /**
     * The width of this box.
     *
     * @private
     *
     * @property {number}
     */
    private _width;
    /**
     * The height of this box.
     *
     * @private
     *
     * @property {number}
     */
    private _height;
    /**
     * The origin point of this box.
     *
     * @private
     *
     * @property {Vector}
     */
    private _origin;
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
    constructor(position?: Vector, width?: number, height?: number, origin?: Vector | BoxOrigin);
    /**
     * set the origin point of this Box.
     *
     * @param {Vector | BoxOrigin} newOrigin the custom point of origin or common point of origin.
     */
    setOrigin(newOrigin: Vector | BoxOrigin): void;
    /**
     * Returns a Polygon whose edges are the same as this Box.
     *
     * @returns {Polygon} A new Polygon that represents this Box.
     */
    toPolygon(): Polygon;
    /**
     * Return the common origin point
     *
     * @param {BoxOrigin} origin Common origin point type
     * @returns {Vector} Common origin point
     */
    protected _getCommonsOrigin(origin: BoxOrigin): Vector;
}
