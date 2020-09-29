## **Box**

A box represents an axis-aligned bounding box with a width and a height.

| property 	| type          	| description                                                                                 	| default      	|
|----------	|---------------	|---------------------------------------------------------------------------------------------	|--------------	|
| position 	| Vector        	| A vector representing the position of this box.                                              	| vector(0, 0) 	|
| width   	| number        	| The width of this box.                                                                      	| 0            	|
| height   	| number        	| The height of this box.                                                                      	| 0            	|

## **Methods**

### **toPolygon**

Returns a polygon whose edges are the same as this box.

**example:**

```js
const box = new Box(new Vector(5, 10), 100, 250);

box.toPolygon();
```