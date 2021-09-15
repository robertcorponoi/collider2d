## **Box**

A box represents an axis-aligned bounding box with a width and a height.

| property 	| type          	| description                                                                                 	| default      	|
|----------	|---------------	|---------------------------------------------------------------------------------------------	|--------------	|
| position 	| Vector        	| A vector representing the position of this box.                                              	| vector(0, 0) 	|
| width   	| number        	| The width of this box.                                                                      	| 0            	|
| height   	| number        	| The height of this box.                                                                      	| 0            	|
| origin   	| Vector,BoxOrigin  |  The origin point of this box.                                                                      	| vector(0, 0) |

## **Methods**

### **setOrigin**

Returns a polygon whose edges are the same as this box.

| property 	| type          	| description                                                                                 	| default      	|
|----------	|---------------	|---------------------------------------------------------------------------------------------	|--------------	|
| origin   	| Vector,BoxOrigin | The origin point of this box.                                                                      	| Vector(0,0)            	|


**example:**

```js
const boxCustom = new Box(new Vector(10, 10), 100, 250);
const boxCommon = new Box(new Vector(10, 10), 100, 250);

boxCustom.setOrigin(new Vector(50,0)); // Custom origin point
boxCommon.setOrigin(BoxOrigin.center); // Common origin point
```

### **toPolygon**

Returns a polygon whose edges are the same as this box.

**example:**

```js
const box = new Box(new Vector(5, 10), 100, 250);

box.toPolygon();
```