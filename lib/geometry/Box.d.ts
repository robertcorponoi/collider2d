import Vector from './Vector';
import Polygon from './Polygon';
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
     * Creates a new Box, with the specified position, width, and height.
     *
     * If no position is given, the position will be `(0, 0)`. If no width or height are given, they will be set to `0`.
     *
     * @param {Vector} [position=new Vector()] The position of this box as a Vector.
     * @param {number} [width=0] The width of this box.
     * @param {number} [height=0] The height of this box.
     */
    constructor(position?: Vector, width?: number, height?: number);
    /**
     * Returns a Polygon whose edges are the same as this Box.
     *
     * @returns {Polygon} A new Polygon that represents this Box.
     */
    toPolygon(): Polygon;
}
