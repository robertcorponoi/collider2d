## **Circle**

A circle consists of a center position and a radius.

| property 	| type   	| description                                     	| default      	|
|----------	|--------	|-------------------------------------------------	|--------------	|
| position 	| Vector 	| A vector representing the center of the circle. 	| vector(0, 0) 	|
| radius   	| number 	| The radius of the circle.                       	| 0            	|

**example:**

```js
const circle = c2d.circle(c2d.vector(5, 5), 10);
```

## **Getters**

**position**

Returns the position of the circle.

**radius**

Returns the radius of the circle.

**offset**

Returns a vector representing the offset of the circle.

### Setters
-----------

**offset**

Sets a new offset for the circle.

| property 	| type   	| description                    	| default 	|
|----------	|--------	|--------------------------------	|---------	|
| offset   	| Vector 	| The new offset for this circle 	|         	|

**example:**

```js
const circle = c2d.circle(c2d.vector(2, 5), 10);

circle.offset = c2d.vector(3, 3);
```

## **Methods**

**getAABB**

Compute the axis-aligned bounding box (AABB) of this Circle.

Note: Returns a new `Polygon` each time this is called.

```js
const circle = c2d.circle(c2d.vector(2, 5), 10);

const boundingBox = circle.getAABB();
```