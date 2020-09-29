'use strict'

import Box from './box';
import Vector from './vector';
import Polygon from './polygon';

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
  private _position: Vector = new Vector();

  /**
   * The radius of this circle.
   * 
   * @private
   * 
   * @property {number}
   */
  private _radius: number = 0;

  /**
   * A Vector representing the offset of this circle.
   * 
   * @private
   * 
   * @property {Vector}
   */
  private _offset: Vector = new Vector();

  /**
   * @param {Vector} position A Vector representing the center of this Circle.
   * @param {number} radius The radius of this Circle. 
   */
  constructor(position: Vector = new Vector(), radius: number = 0) {
    this._position = position;

    this._radius = radius;
  }

  /**
   * Returns the position of this circle.
   * 
   * @returns {Vector}
   */
  get position(): Vector { return this._position; }

  /**
   * Returns the radius of this circle.
   * 
   * @returns {number}
   */
  get radius(): number { return this._radius; }

  /**
   * Returns the offset of this circle.
   * 
   * @returns {Vector}
   */
  get offset(): Vector { return this._offset; }

  /**
   * Set a new offset for this circle.
   * 
   * @param {Vector} offset The new offset for this circle.
   */
  set offset(offset: Vector) { this._offset = offset; }

  /**
   * Translate the center of the cirlc.e
   * 
   * @param {Vector} position A Vector representing the new center of this circle.
   */
  translate(x: number, y: number) {
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
  getAABB(): Polygon {
    const corner = this._position.clone().add(this._offset).sub(new Vector(this._radius, this._radius));
    return new Box(corner, this._radius * 2, this._radius * 2).toPolygon();
  }

  /**
   * Set the current offset to apply to the radius.
   * 
   * @param {Vector} offset The new offset Vector.
   * 
   * @returns {Circle} Returns this for chaining.
   */
  setOffset(offset: Vector): Circle {
    this._offset = offset;
    return this;
  }
}