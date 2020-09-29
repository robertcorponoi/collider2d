'use strict'

/**
 * Represents a vector in two dimensions with `x` and `y` properties.
 * 
 * Create a new Vector, optionally passing in the `x` and `y` coordinates. If a coordinate is not specified, it will be set to `0`.
 */
export default class Vector {
  /**
   * The x coordinate of this vector.
   * 
   * @private
   * 
   * @property {number}
   */
  private _x: number = 0;

  /**
   * The y coordinate of this vector.
   * 
   * @private
   * 
   * @property {number}
   */
  private _y: number = 0;

  /**
   * @param {number} [x=0] The x coordinate of this vector.
   * @param {number} [y=0] The y coordinate of this vector.
   */
  constructor(x: number = 0, y: number = 0) {
    this._x = x;

    this._y = y;
  }

  /**
   * Returns the x value of this vector.
   * 
   * @returns {number}
   */
  get x(): number { return this._x; }

  /**
   * Returns the y value of this vector.
   * 
   * @returns {number}
   */
  get y(): number { return this._y; }

  /**
   * Sets a new x value for this vector.
   * 
   * @param {number} x The new x value for this vector.
   */
  set x(x: number) { this._x = x; }

  /**
   * Sets a new y value for this vector.
   * 
   * @param {number} y The new y value for this vector.
   */
  set y(y: number) { this._y = y; }

  /**
   * Copy the values of another Vector into this one.
   * 
   * @param {Vector} other The other Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  copy(other: Vector): Vector {
    this._x = other.x;
    this._y = other.y;

    return this;
  }

  /**
   * Create a new Vector with the same coordinates as the one.
   * 
   * @returns {Vector} The new cloned Vector.
   */
  clone(): Vector {
    return new Vector(this.x, this.y);
  }

  /**
   * Change this Vector to be perpendicular to what it was before.
   * 
   * Effectively this rotates it 90 degrees in a clockwise direction.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  perp(): Vector {
    const x: number = this.x;

    this._x = this.y;
    this._y = -x;

    return this;
  }

  /**
   * Rotate this Vector (counter-clockwise) by the specified angle (in radians).
   * 
   * @param {number} angle The angle to rotate (in radians).
   * 
   * @returns {Vector} Returns this for chaining.
   */
  rotate(angle: number): Vector {
    const x: number = this.x;
    const y: number = this.y;

    this._x = x * Math.cos(angle) - y * Math.sin(angle);
    this._y = x * Math.sin(angle) + y * Math.cos(angle);

    return this;
  }

  /**
   * Reverse this Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  reverse(): Vector {
    this._x = -this.x;
    this._y = -this.y;

    return this;
  }

  /**
   * Normalize this vector (make it have a length of `1`).
   * 
   * @returns {Vector} Returns this for chaining.
   */
  normalize(): Vector {
    const d: number = this.len();

    if (d > 0) {
      this._x = this.x / d;
      this._y = this.y / d;
    }

    return this;
  }

  /**
   * Add another Vector to this one.
   * 
   * @param {Vector} other The other Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  add(other: Vector): Vector {
    this._x += other.x;
    this._y += other.y;

    return this;
  }

  /**
   * Subtract another Vector from this one.
   * 
   * @param {Vector} other The other Vector.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  sub(other: Vector): Vector {
    this._x -= other.x;
    this._y -= other.y;

    return this;
  }

  /**
   * Scale this Vector.
   * 
   * An independent scaling factor can be provided for each axis, or a single scaling factor will scale both `x` and `y`.
   * 
   * @param {number} x The scaling factor in the x direction.
   * @param {number} [y] The scaling factor in the y direction.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  scale(x: number, y?: number): Vector {
    this._x *= x;
    this._y *= typeof y != 'undefined' ? y : x;

    return this;
  }

  /**
   * Project this Vector onto another Vector.
   * 
   * @param {Vector} other The Vector to project onto.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  project(other: Vector): Vector {
    const amt: number = this.dot(other) / other.len2();

    this._x = amt * other.x;
    this._y = amt * other.y;

    return this;
  }

  /**
   * Project this Vector onto a Vector of unit length.
   * 
   * This is slightly more efficient than `project` when dealing with unit vectors.
   * 
   * @param {Vector} other The unit vector to project onto.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  projectN(other: Vector): Vector {
    const amt: number = this.dot(other);

    this._x = amt * other.x;
    this._y = amt * other.y;

    return this;
  }

  /**
   * Reflect this Vector on an arbitrary axis.
   * 
   * @param {Vector} axis The Vector representing the axis.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  reflect(axis: Vector): Vector {
    const x: number = this.x;
    const y: number = this.y;

    this.project(axis).scale(2);

    this._x -= x;
    this._y -= y;

    return this;
  }

  /**
   * Reflect this Vector on an arbitrary axis.
   * 
   * This is slightly more efficient than `reflect` when dealing with an axis that is a unit vector.
   * 
   * @param {Vector} axis The Vector representing the axis.
   * 
   * @returns {Vector} Returns this for chaining.
   */
  reflectN(axis: Vector): Vector {
    const x: number = this.x;
    const y: number = this.y;

    this.projectN(axis).scale(2);

    this._x -= x;
    this._y -= y;

    return this;
  }

  /**
   * Get the dot product of this Vector and another.
   * 
   * @param {Vector} other The Vector to dot this one against.
   * 
   * @returns {number} Returns the dot product of this vector.
   */
  dot(other: Vector): number {
    return this.x * other.x + this.y * other.y;
  }

  /**
   * Get the squared length of this Vector.
   * 
   * @returns {number} Returns the squared length of this vector.
   */
  len2(): number {
    return this.dot(this);
  }

  /**
   * Get the length of this Vector.
   * 
   * @returns {number} Returns the length of this vector.
   */
  len(): number {
    return Math.sqrt(this.len2());
  }
}