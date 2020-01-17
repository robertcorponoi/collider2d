'use strict'

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
  private _position: Vector = new Vector();

  /**
   * The width of this box.
   * 
   * @private
   * 
   * @property {number}
   */
  private _width: number = 0;

  /**
   * The height of this box.
   * 
   * @private
   * 
   * @property {number}
   */
  private _height: number = 0;

  /**
   * Creates a new Box, with the specified position, width, and height.
   * 
   * If no position is given, the position will be `(0, 0)`. If no width or height are given, they will be set to `0`.
   * 
   * @param {Vector} [position=new Vector()] The position of this box as a Vector.
   * @param {number} [width=0] The width of this box.
   * @param {number} [height=0] The height of this box.
   */
  constructor(position: Vector = new Vector(), width: number = 0, height: number = 0) {
    this._position = position;

    this._width = width;

    this._height = height;
  }

  /**
   * Returns a Polygon whose edges are the same as this Box.
   * 
   * @returns {Polygon} A new Polygon that represents this Box.
   */
  toPolygon(): Polygon {
    return new Polygon(new Vector(this._position.x, this._position.y), [
      new Vector(), new Vector(this._width, 0),
      new Vector(this._width, this._height), new Vector(0, this._height)
    ]);
  }
}