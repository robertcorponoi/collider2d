<h1 align="center">Collider2D</h1>

<p align="center">A 2D collision checker for modern JavaScript games.<p>

<div align="center">

  [![NPM version](https://img.shields.io/npm/v/collider2d.svg?style=flat)](https://www.npmjs.com/package/collider2d)
  [![Known Vulnerabilities](https://snyk.io/test/github/robertcorponoi/collider2d/badge.svg)](https://snyk.io/test/github/robertcorponoi/collider2d)
  ![npm](https://img.shields.io/npm/dt/collider2d)
  [![NPM downloads](https://img.shields.io/npm/dm/collider2d.svg?style=flat)](https://www.npmjs.com/package/collider2d)
  <a href="https://badge.fury.io/js/collider2d"><img src="https://img.shields.io/github/issues/robertcorponoi/collider2d.svg" alt="issues" height="18"></a>
  <a href="https://badge.fury.io/js/collider2d"><img src="https://img.shields.io/github/license/robertcorponoi/collider2d.svg" alt="license" height="18"></a>
  [![Gitter](https://badges.gitter.im/gitterHQ/gitter.svg)](https://gitter.im/robertcorponoi)

</div>

**Table of Contents**

- [Geometry](#geometry)
  - [Vector](#vector)
  - [Circle](#circle)
  - [Box](#box)
  	- [BoxOrigin](#BoxOrigin)
  - [Polygon](#polygon)
- [Collisions](#collisions)
  - [pointInCircle](#pointInCircle)
  - [pointInPolygon](#pointInPolygon)
  - [testPolygonPolygon](#testPolygonPolygon)
  - [testPolygonCircle](#testPolygonCircle)
  - [testCircleCircle](#testCircleCircle)
  - [testCirclePolygon](#testCirclePolygon)

## **Prologue**

Note, this project uses https://github.com/jriecken/sat-js as a foundation and builds on it. I will actively send updates that I find useful to the original repository as I find it to be a great resource still.

If you find collider2d useful please check out the original repository and give credit to the author.

## **Install**

To install collider2d, use:

```bash
$ npm install collider2d
```

## **Initialization**

If you're using collider2d in a browser environment, you can use the `collider2d.js` file found in the root directory or just a reference to the package if you're using webpack.

**browser**

```js
// Non-webpack environment:
import { Vector, Box, Circle, Polygon, Collider2d } from '../node_modules/collider2d/collider2d.js';

// Webpack/other bundler environment:
import { Vector, Box, Circle, Polygon, Collider2d } from 'collider2d';
```

and in a Node environment, you can imply require the module:

**node**

```js
const { Vector, Box, BoxOrigin, Circle, Polygon, Collider2d } = require('collider2d');
```

The `Vector`, `Box`, `Circle`, and `Polygon` classes are used to create the shapes to test and then the `Collider2d` class is used to test collisions using the created shapes. Just like with the geometry classes, you'll need to create a new instance of the class to use the collision tests. In the examples below you'll see:

```js
const collision = collider2d.testPolygonPolygon();
```

This implies that an instance of the `Collider2d` is created beforehand like so:

```js
const collider2d = new Collider2d();
```

## **Geometry**

collider2d revolves around points and shapes, more specifically vectors, circles, and polygons.

## **Vector**

A vector is a point in 2D space that has a x and y position.

| property 	| type   	| description                   	| default 	|
|----------	|--------	|-------------------------------	|---------	|
| x        	| number 	| The x position of the vector. 	| 0       	|
| y        	| number 	| The y position of the vector. 	| 0       	|

**example:**

```js
const vec1 = new Vector(10, 25);
```

To see the full list of properties and methods for circles, check out the [vector documentation](docs/vector.md).

## **Circle**

A circle consists of a center position and a radius.

| property 	| type   	| description                                     	| default      	|
|----------	|--------	|-------------------------------------------------	|--------------	|
| position 	| Vector 	| A vector representing the center of the circle. 	| vector(0, 0) 	|
| radius   	| number 	| The radius of the circle.                       	| 0            	|

**example:**

```js
const circle = new Circle(new Vector(5, 5), 10);
```

To see the full list of properties and methods for circles, check out the [circles documentation](docs/circle.md).

## **Polygon**

A polygon consists of a convex shape with any number of points (specified in a counter-clockwise order).

| property 	| type          	| description                                                                                 	| default      	|
|----------	|---------------	|---------------------------------------------------------------------------------------------	|--------------	|
| position 	| Vector        	| A vector representing the origin of the polygon (all other points are relative to this one). 	| vector(0, 0) 	|
| points   	| Array<Vector> 	| An array of vectors representing the points of the polygon, in counter-clockwise order.     	| 0            	|

**example:**

```js
const polygon = new Polygon(new Vector(0, 0), [
  new Vector(0, 0),
  new Vector(40, 0),
  new Vector(40, 40),
  new Vector(0, 40)
]);
```

To see the full list of properties and methods for polygons, check out the [polygon documentation](docs/polygon.md).

## **Box**

A box represents an axis-aligned bounding box with a width and a height.

| property 	| type          	| description                                                                                 	| default      	|
|----------	|---------------	|---------------------------------------------------------------------------------------------	|--------------	|
| position 	| Vector        	| A vector representing the position of this box.                                              	| vector(0, 0) 	|
| width   	| number        	| The width of this box.                                                                      	| 0            	|
| height   	| number        	| The height of this box.                                                                      	| 0            	|
| origin   	| Vector,BoxOrigin  |  The origin point of this box.                                                                      	| vector(0, 0) |

**example:**

```js
const box = new Box(new Vector(5, 10), 100, 250,new Vector(50,0));
```

To see the full list of properties and methods for boxes, check out the [box documentation](docs/box.md).

### **BoxOrigin**

a list of common origin points (center,bottomLeft,bottomRight,topRigth,topLeft) for the box collider

**example:**

```js
const box = new Box(new Vector(5, 10), 100, 250,BoxOrigin.center);
```

## **Collisions**

There are three different types of collisions: point, circle, and polygon collisions.

Some collisions (testCircleCircle, testPolygonPolygon, testPolygonCircle, testCirclePolygon) have a `details` parameter that can be used to return extra details about the collision, if there is one.

The structure of the collision details object looks like:

| property 	| type                  	| description                                                                                         	| default 	|
|----------	|-----------------------	|-----------------------------------------------------------------------------------------------------	|---------	|
| a        	| Vector,Circle,Polygon 	| The first collision object                                                                          	|         	|
| b        	| Vector,Circle,Polygon 	| The second collision object                                                                         	|         	|
| overlapN 	| Vector                	| A unit vector representing the direction and magnitude of the overlap.                              	|         	|
| overlapV 	| Vector                	| A vector representing the minimum change necessary to extract the first object from the second one. 	|         	|
| overlap  	| number                	| The amount that is overlapping.                                                                     	|         	|
| aInB     	| boolean               	| Returns true if the first collision object is completely in the second collision object.            	|         	|
| bInA     	| boolean               	| Returns true if the second collision object is completely in the first collision object.            	|         	|

Note that if you pass in true for the detail parameter and there is a collision, there will not be a boolean returned but the collision details object instead. If there is no collision then it will still return false.

## **Point Collisions**

### **pointInCircle**

Checks to see if a point is inside of a circle.

Returns true if the point is in the circle or false otherwise.

| property 	| type   	| description         	| default 	|
|----------	|--------	|---------------------	|---------	|
| point    	| Vector 	| The point to test.  	|         	|
| circle   	| Circle 	| The circle to test. 	|         	|

**example:**

```js
const circle = new Circle(new Vector(100, 100), 20);

const collision = collider2d.pointInCircle(new Vector(110, 110), circle); // true
```

### **pointInPolygon**

Checks to see if a point is inside of a convex polygon.

Returns true if the point is in the polygon or false otherwise.

| property 	| type   	| description         	| default 	|
|----------	|--------	|---------------------	|---------	|
| point    	| Vector 	| The point to test.  	|         	|
| polygon  	| Polygon	| The polygon to test. 	|         	|

**example:**

```js
const triangle = new Polygon(new Vector(30, 0), [
  new Vector(0, 0),
  new Vector(30, 0),
  new Vector(0, 30)
]);

const collision = collider2d.pointInPolygon(new Vector(35, 5), triangle); // true
```

## **Polygon Collisions**

### **testPolygonPolygon**

Checks whether polygons collide.

Returns true if the circles collide or false otherwise. If details is set to true and a collision occurs then a collision details object will be returned instead of true.

| property 	| type    	| description                                                                                                                                 	| default 	|
|----------	|---------	|---------------------------------------------------------------------------------------------------------------------------------------------	|---------	|
| a        	| Polygon 	| The first polygon.                                                                                                                          	|         	|
| b        	| Polygon 	| The second polygon.                                                                                                                         	|         	|
| details  	| boolean 	| If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true 	|         	|

**example:**

```js
const polygon1 = new Polygon(new Vector(0, 0), [
  new Vector(0, 0),
  new Vector(40, 0),
  new Vector(40, 40),
  new Vector(0, 40)
]);

const polygon2 = new Polygon(new Vector(30, 0), [
  new Vector(0, 0),
  new Vector(30, 0),
  new Vector(0, 30)
]);

// No details
const collided = collider2d.testPolygonPolygon(polygon1, polygon2); // true

// Details
const collidedDetails = collider2d.testPolygonPolygon(polygon1, polygon2, true);
console.log(collidedDetails.overlap); // 10
```

### **testPolygonCircle**

Check if a polygon and a circle collide.

Returns true if the circles collide or false otherwise. If details is set to true and a collision occurs then a collision details object will be returned instead of true.

| property 	| type    	| description                                                                                                                                 	| default 	|
|----------	|---------	|---------------------------------------------------------------------------------------------------------------------------------------------	|---------	|
| polygon  	| Polygon 	| The polygon to check.                                                                                                                       	|         	|
| circle   	| Circle  	| The circle to check.                                                                                                                        	|         	|
| details  	| boolean 	| If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true 	|         	|

**example:**

```js
const circle = new Circle(new Vector(50, 50), 20);

const polygon = new Polygon(new Vector(0, 0), [
  new Vector(0, 0),
  new Vector(40, 0),
  new Vector(40, 40),
  new Vector(0, 40)
]);

// No details
const collided = collider2d.testPolygonCircle(polygon, circle); // true

// Details
const collidedDetails = collider2d.testPolygonCircle(polygon, circle, true);
console.log(collidedDetails.overlap.toFixed(2)); // 5.86
```

## **Circle Collisions**

### **testCircleCircle**

Check if two circles collide.

Returns true if the circles collide or false otherwise. If details is set to true and a collision occurs then a collision details object will be returned instead of true.

| property 	| type    	| description                                                                                                                                 	| default 	|
|----------	|---------	|---------------------------------------------------------------------------------------------------------------------------------------------	|---------	|
| a        	| Circle  	| The first circle.                                                                                                                           	|         	|
| b        	| Circle  	| The second circle.                                                                                                                          	|         	|
| details  	| boolean 	| If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true 	|         	|

**example:**

```js
const circle1 = new Circle(new Vector(0, 0), 20);
const circle2 = new Circle(new Vector(30, 0), 20);

// No details
const collided = collider2d.testCircleCircle(circle1, circle2); // true

// Details
const collidedDetails = collider2d.testCircleCircle(circle1, circle2, true);
console.log(collidedDetails.overlap); // 10
```

### **testCirclePolygon**

Check if a circle and a polygon collide.

**NOTE:** This is slightly less efficient than polygonCircle as it just runs polygonCircle and reverses everything at the end.

Returns true if the circles collide or false otherwise. If details is set to true and a collision occurs then a collision details object will be returned instead of true.

| property 	| type    	| description                                                                                                                                 	| default 	|
|----------	|---------	|---------------------------------------------------------------------------------------------------------------------------------------------	|---------	|
| circle   	| Circle  	| The circle to check.                                                                                                                        	|         	|
| polygon  	| Polygon 	| The polygon to check.                                                                                                                       	|         	|
| details  	| boolean 	| If set to true and there is a collision, an object highlighting details about the collision will be returned instead of just returning true 	|         	|

**example:**

```js
const circle = new Circle(new Vector(50, 50), 20);

const polygon = new Polygon(new Vector(0, 0), [
  new Vector(0, 0),
  new Vector(40, 0),
  new Vector(40, 40),
  new Vector(0, 40)
]);

// No details
const collided = collider2d.testCirclePolygon(circle, polygon); // true

// Details
const collidedDetails = collider2d.testCirclePolygon(circle, polygon, true);
```

## **Tests**

To run the tests available for collider2d use:

```bash
$ npm run test
```

## **License**

MIT