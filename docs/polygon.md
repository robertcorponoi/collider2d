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

## **Getters**

### **position**

Returns the position of the polygon.

### **points**

Returns the points of the polygon.

### **calcPoints**

Returns an array of vectors of the calculated points of the polygon.

### **offset**

Returns a vector representing the offset of the polygon.

### **angle**

Returns the angle of the polygon, in radians.

### **edges**

Returns an array of vectors representing the edges of the polygon.

### **normals**

Returns an array of vectors representing the normals of the polygon.

## **Methods**

### **setPoints**

Set the points of the polygon. Any consecutive duplicate points will be combined.

Note: The points are counter-clockwise *with respect to the coordinate system*. If you directly draw the points on a screen that has the origin at the top-left corner it will _appear_ visually that the points are being specified clockwise. This is just because of the inversion of the Y-axis when being displayed.

This is called automatically when a polygon is initialized.

| property 	| type          	| description                                                                                 	| default      	|
|----------	|---------------	|---------------------------------------------------------------------------------------------	|--------------	|
| points   	| Array<Vector> 	| An array of vectors representing the points of the polygon, in counter-clockwise order.     	|             	|

**example:**

```js
const polygon = new Polygon(new Vector(0, 0), [
  new Vector(0, 0),
  new Vector(40, 0),
  new Vector(40, 40),
  new Vector(0, 40)
]);

polygon.setPoints([
  new Vector(0, 0),
  new Vector(80, 0),
  new Vector(80, 80),
  new Vector(0, 80)
);
```

### **setAngle**

Sets the current rotation angle of the polygon.

| property 	| type          	| description                                                                             	| default      	|
|----------	|---------------	|-----------------------------------------------------------------------------------------	|--------------	|
| angle    	| number        	| The current rotation angle, in radians.                                                 	|             	|

**example:**

```js
const polygon = new Polygon(new Vector(0, 0), [
  new Vector(0, 0),
  new Vector(40, 0),
  new Vector(40, 40),
  new Vector(0, 40)
]);

polygon.setAngle(45);
```

### **setOffset**

et the current offset to apply to the `points` before applying the `angle` rotation.

| property 	| type          	| description                                                                             	| default      	|
|----------	|---------------	|-----------------------------------------------------------------------------------------	|--------------	|
| offset   	| Vector        	| The vector representing the offset                                                      	|             	|

**example:**

```js
const polygon = new Polygon(new Vector(0, 0), [
  new Vector(0, 0),
  new Vector(40, 0),
  new Vector(40, 40),
  new Vector(0, 40)
]);

polygon.setOffset(new Vector(2, 5));
```

### **rotate**

Rotates this Polygon counter-clockwise around the origin of *its local coordinate system* (i.e. `position`)

Note: This changes the **original** points (so any `angle` will be applied on top of this rotation).

| property 	| type          	| description                                                                             	| default      	|
|----------	|---------------	|-----------------------------------------------------------------------------------------	|--------------	|
| angle    	| number        	| The rangle to rotate, in radians                                                        	|             	|

**example:**

```js
const polygon = new Polygon(new Vector(0, 0), [
  new Vector(0, 0),
  new Vector(40, 0),
  new Vector(40, 40),
  new Vector(0, 40)
]);

polygon.rotate(45);
```

### **translate**

Translates the points of this polygon by a specified amount relative to the origin of *its own coordinate system* (i.e. `position`).

Note: This changes the **original** points (so any `offset` will be applied on top of this translation)

| property 	| type   	| description                         	| default 	|
|----------	|--------	|-------------------------------------	|---------	|
| x        	| number 	| The horizontal amount to translate. 	|         	|
| y        	| number 	| The vertical amount to translate.   	|         	|

**example:**

```js
const polygon = new Polygon(new Vector(0, 0), [
  new Vector(0, 0),
  new Vector(40, 0),
  new Vector(40, 40),
  new Vector(0, 40)
]);

polygon.translate(5, 10);
```

### **getAABB**

Compute the axis-aligned bounding box.

Any current state (translations/rotations) will be applied before constructing the AABB.

Note: Returns a _new_ `Polygon` each time you call this.

**example:**

```js
const polygon = new Polygon(new Vector(0, 0), [
  new Vector(0, 0),
  new Vector(40, 0),
  new Vector(40, 40),
  new Vector(0, 40)
]);

const polygonBoundingBox = polygon.getAABB();
```

### **getCentroid**

Compute the centroid (geometric center) of the Polygon.

Any current state (translations/rotations) will be applied before computing the centroid.

See https://en.wikipedia.org/wiki/Centroid#Centroid_of_a_polygon

Note: Returns a _new_ `Vector` each time you call this.

**example:**

```js
const polygon = new Polygon(new Vector(0, 0), [
  new Vector(0, 0),
  new Vector(40, 0),
  new Vector(40, 40),
  new Vector(0, 40)
]);

const centroid = polygon.getCentroid();
```