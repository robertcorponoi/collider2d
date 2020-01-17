'use strict'

import Vector from '../geometry/Vector';
import Circle from '../geometry/Circle';
import Polygon from '../geometry/Polygon';

/**
 * An object representing the result of an intersection containing:
 * - The two objects participating in the intersection
 * - The vector representing the minimum change necessary to extract the first object from the second one (as well as a unit vector in that direction and the magnitude of the overlap)
 * - Whether the first object is entirely inside the second, and vice versa.
 */
export default class CollisionDetails {
  /**
   * The first collision object.
   * 
   * @property {Circle|Polygon}
   */
  a!: (Circle|Polygon);

  /**
   * The second collision object.
   * 
   * @property {Circle|Polygon}
   */
  b!: (Circle|Polygon);

  /**
   * A unit vector representing the direction and magnitude of the overlap.
   * 
   * @property {Vector}
   */
  overlapN: Vector = new Vector();

  /**
   * A vector representing the minimum change necessary to extract the first object from the second one.
   * 
   * @property {Vector}
   */
  overlapV: Vector = new Vector();

  /**
   * The amount that is overlapping.
   * 
   * @property {number}
   */
  overlap: number = Number.MAX_VALUE;

  /**
   * Returns true if the first collision object is completely in the second collision object.
   * 
   * @property {boolean}
   */
  aInB: boolean = true;

  /**
   * Returns true if the second collision object is completely in the first collision object.
   * 
   * @property {boolean}
   */
  bInA: boolean = true;

  constructor() {
    this.clear();
  }

  /**
   * Set some values of the response back to their defaults.
   * 
   * Call this between tests if you are going to reuse a single CollisionDetails object for multiple intersection tests (recommended as it will avoid allcating extra memory)
   * 
   * @returns {CollisionDetails} Returns this for chaining.
   */
  clear(): CollisionDetails {
    this.aInB = true;
    this.bInA = true;

    this.overlap = Number.MAX_VALUE;

    return this;
  }
}