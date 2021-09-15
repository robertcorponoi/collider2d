'use strict'

import Vector from './vector';
import Polygon from './polygon';

/**
 * a enum for quick assignment of common origins
 */
export enum BoxOrigin {
  center,
  bottomLeft,
  bottomRight,
  topRigth,
  topLeft,
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
   * The origin point of this box.
   * 
   * @private
   * 
   * @property {Vector}
   */
   private _origin:Vector = new Vector();

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
  constructor(position: Vector = new Vector(), width: number = 0, height: number = 0, origin: Vector | BoxOrigin = BoxOrigin.bottomLeft) {
    this._position = position;
    this._width = width;
    this._height = height;
    this.setOrigin(origin);
    
  }
  
  /**
   * set the origin point of this Box.
   * 
   * @param {Vector | BoxOrigin} newOrigin the custom point of origin or common point of origin.
   */
  setOrigin(newOrigin:Vector | BoxOrigin):void {
    this._origin = (newOrigin instanceof  Vector)?newOrigin:this._getCommonsOrigin(newOrigin);
  }

  /**
   * Returns a Polygon whose edges are the same as this Box.
   * 
   * @returns {Polygon} A new Polygon that represents this Box.
   */
  toPolygon(): Polygon {
    return new Polygon(new Vector(this._position.x, this._position.y), [
      new Vector().sub(this._origin), new Vector(this._width, 0).sub(this._origin),
      new Vector(this._width, this._height).sub(this._origin), new Vector(0, this._height).sub(this._origin)
    ]);
  }
  
  /**
   * Return the common origin point
   * 
   * @param {BoxOrigin} origin Common origin point type
   * @returns {Vector} Common origin point
   */
  protected _getCommonsOrigin(origin:BoxOrigin):Vector {
    let Origins = {
      [BoxOrigin.center]: new Vector(this._width/2,this._height/2),
      [BoxOrigin.bottomLeft]: new Vector(),
      [BoxOrigin.bottomRight]: new Vector(this._width,0),
      [BoxOrigin.topRigth]: new Vector(this._width,this._height),
      [BoxOrigin.topLeft]: new Vector(0,this._height)
    };
    return Origins[origin];
  }
}