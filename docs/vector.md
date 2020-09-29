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

## **Getters**

### **x**

Returns the x value of the vector.

### **y**

Returns the y value of the vector.

## **Methods**

### **copy**

Copies another vector's values into this vector.

| property 	| type   	| description                                                   	| default 	|
|----------	|--------	|---------------------------------------------------------------	|---------	|
| other    	| Vector 	| The other vector whose values should be copied into this one. 	|         	|

**example:**

```js
const vec1 = new Vector(10, 10);

const vec2 = new Vector(15, 20);

vec1.copy(vec2); // vec1 is now at (10, 10)
```

### **clone**

Returns a new vector with the same coordinates as this one.

**example:**

```js
const vec1 = new Vector(10, 10);

const vec2 = vec1.clone(); // vec2 is at (10, 10)
```

### **perp**

Change this vector to be perpendicular to what is was before. This effectively rotates it 90 degrees in a clockwise direction.

**example:**

```js
const vec1 = new Vector(5, 10);

vec1.perp(); // vec1 is now (10, -5)
```

### **rotate**

Rotate this vector counter-clockwise by the specified angle (in radians).

| property 	| type   	| description                               	| default 	|
|----------	|--------	|-------------------------------------------	|---------	|
| angle    	| number 	| The angle to rotate rotate by, in radians 	|         	|

**example:**

```js
const vec1 = new Vector(5, 10);

vec1.rotate(45);
```

### **reverse**

Reverse the vector.

**example:**

```js
const vec1 = new Vector(5, 10);

vec1.reverse(); // vec1 is now (-5, -10)
```

### **normalize**

Make this vecotr have a length of 1.

**example:**

```js
const vec1 = new Vector(5, 10);

vec1.normalize();
```

### **add**

Add another vector to this one.

| property 	| type   	| description                                                   	| default 	|
|----------	|--------	|---------------------------------------------------------------	|---------	|
| other    	| Vector 	| The other vector to add to this one.                          	|         	|

**example:**

```js
const vec1 = new Vector(5, 10);
const vec2 = new Vector(10, 20);

vec1.add(vec2); // vec1 is now (15, 30)
```

### **sub**

Subtract another vector from this one.

| property 	| type   	| description                                                   	| default 	|
|----------	|--------	|---------------------------------------------------------------	|---------	|
| other    	| Vector 	| The other vector to subtract from this one.                    	|         	|

**example:**

```js
const vec1 = new Vector(15, 35);
const vec2 = new Vector(10, 20);

vec1.sub(vec2); // vec1 is now (5, 15)
```

### **scale**

Scale this vector.

An independent scaling factor can be provided for each axis, or a single scaling factor will scale both `x` and `y`.

| property 	| type   	| description                           	| default 	|
|----------	|--------	|---------------------------------------	|---------	|
| x        	| number 	| The scaling factor in the x direction 	|         	|
| y        	| number 	| The scaling factor in the y direction 	| x       	|

**example:**

```js
const vec1 = new Vector(15, 35);

vec1.scale(2, 5); // vec1 is now (30, 175)
```

### **project**

Project this vector onto another vector.

| property 	| type   	| description                                                   	| default 	|
|----------	|--------	|---------------------------------------------------------------	|---------	|
| other    	| Vector 	| The vector to project onto                                    	|         	|

**example:**

```js
const vec1 = new Vector(5, 5);
const vec2 = new Vector(2, 5);

vec1.project(vec2);
```

### **projectN**

Project this Vector onto a Vector of unit length.

This is slightly more efficient than `project` when dealing with unit vectors.

| property 	| type   	| description                                                   	| default 	|
|----------	|--------	|---------------------------------------------------------------	|---------	|
| other    	| Vector 	| The unit vector to project onto                                	|         	|

**example:**

```js
const vec1 = new Vector(5, 5);
const vec2 = new Vector(2, 5);

vec1.projectN(vec2);
```

### **reflect**

Reflect this Vector on an arbitrary axis.

| property 	| type   	| description                                                   	| default 	|
|----------	|--------	|---------------------------------------------------------------	|---------	|
| axis    	| Vector 	| The vector representing the axis to reflect on.                	|         	|

**example:**

```js
const vec1 = new Vector(5, 5);

const axis = new Vector(0, 1);

vec1.reflect(axis);
```

### **reflectN**

Reflect this Vector on an arbitrary axis.

This is slightly more efficient than `reflect` when dealing with an axis that is a unit vector.

| property 	| type   	| description                                                   	| default 	|
|----------	|--------	|---------------------------------------------------------------	|---------	|
| axis    	| Vector 	| The vector representing the axis to reflect on.                	|         	|

**example:**

```js
const vec1 = new Vector(5, 5);

const axis = new Vector(0, 1);

vec1.reflectN(axis);
```

### **dot**

Get the dot product of this vector and another.

| property 	| type   	| description                                                   	| default 	|
|----------	|--------	|---------------------------------------------------------------	|---------	|
| other    	| Vector 	| The vector to dot this one against.                           	|         	|

**example:**

```js
const vec1 = new Vector(5, 5);
const vec2 = new Vector(10, 25);

vec1.dot(vec2); // 175
```

### **len2**

Get the squared length of this Vector.

**example:**

```js
const vec1 = new Vector(3, 4);

vec1.len2(); // 25
```

### **len**

Get the length of this vector.

**example:**

```js
const vec1 = new Vector(3, 4);

vec1.len(); // 5
```