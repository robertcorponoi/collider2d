'use strict'

const chai = require('chai');
const { Vector, Box, Circle, Polygon, Collider2d } = require('../index');

const collider2d = new Collider2d();

describe('Vector Scaling', () => {
  it('should scale by zero properly', () => {
    const v1 = new Vector(5, 5);

    v1.scale(10, 10);
    chai.expect(v1.x).to.equal(50);
    chai.expect(v1.y).to.equal(50);

    v1.scale(0, 1);
    chai.expect(v1.x).to.equal(0);
    chai.expect(v1.y).to.equal(50);

    v1.scale(1, 0);
    chai.expect(v1.x).to.equal(0);
    chai.expect(v1.y).to.equal(0);
  });
});

describe("Polygon Centroids", () => {
  it("should calculate the correct value for a square", () => {
    const polygon = new Polygon(
      new Vector(0, 0), [
      new Vector(0, 0),
      new Vector(40, 0),
      new Vector(40, 40),
      new Vector(0, 40)
    ]);

    const c = polygon.getCentroid();

    chai.expect(c.x).to.equal(20);
    chai.expect(c.y).to.equal(20);
  });

  it("should calculate the correct value for a triangle", () => {
    const polygon = new Polygon(
      new Vector(0, 0), [
      new Vector(0, 0),
      new Vector(100, 0),
      new Vector(50, 99)
    ]);

    const c = polygon.getCentroid();

    chai.expect(c.x).to.equal(50);
    chai.expect(c.y).to.equal(33);
  });
});

describe("Collision", () => {
  it("testCircleCircle", () => {
    const circle1 = new Circle(new Vector(0, 0), 20);
    const circle2 = new Circle(new Vector(30, 0), 20);
    // const response = collider2d.response();

    // Test collision = true - without details.
    const collided = collider2d.testCircleCircle(circle1, circle2);
    chai.expect(collided).to.be.true;

    // Test collision = true - with details.
    const collidedDetails = collider2d.testCircleCircle(circle1, circle2, true);
    chai.expect(collidedDetails).to.not.be.false;
    chai.expect(collidedDetails.overlap).to.equal(10);
    chai.expect(collidedDetails.overlapV.x).to.equal(10);
    chai.expect(collidedDetails.overlapV.y).to.equal(0);

    // Test collision = false - without details - after changing offset.
    circle1.offset = new Vector(-10, -10);
    const collidedAfterOffsetChange = collider2d.testCircleCircle(circle1, circle2);
    chai.expect(collidedAfterOffsetChange).to.be.false;

    // let collided = collider2d.testCircleCircle(circle1, circle2, response);
    // let collided = collider2d.testCircleCircle(circle1, circle2, true);

    // chai.expect(collided).to.not.be.null;
    // chai.expect(response.overlap).to.equal(10);
    // chai.expect(response.overlapV.x).to.equal(10) && chai.expect(response.overlapV.y).to.equal(0);

    // circle1.offset = new Vector(-10, -10);

    // collided = collider2d.testCircleCircle(circle1, circle2, response);

    // chai.expect(collided).to.be.false;
  });

  it("testPolygonCircle", () => {
    const circle = new Circle(new Vector(50, 50), 20);

    const polygon = new Polygon(new Vector(0, 0), [
      new Vector(0, 0),
      new Vector(40, 0),
      new Vector(40, 40),
      new Vector(0, 40)
    ]);

    // Test collision = true - no details
    const collided = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.true;

    // Test collision = true - details
    const collidedDetails = collider2d.testPolygonCircle(polygon, circle, true);
    chai.expect(collidedDetails.overlap.toFixed(2)).to.equal('5.86');
    chai.expect(collidedDetails.overlapV.x.toFixed(2)).to.equal('4.14') && chai.expect(collidedDetails.overlapV.y.toFixed(2)).to.equal('4.14');

    // Test collision = false - no details - after offset change
    circle.offset = new Vector(10, 10);

    const collidedAfterOffsetChange = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterOffsetChange).to.be.false;
  });

  it('testPolygonCircle - line - not collide', () => {
    const circle = new Circle(new Vector(50, 50), 20);
    const polygon = new Box(new Vector(1000, 1000), 100, 0).toPolygon();

    // Test collision = false - no details
    const collided = collider2d.testPolygonCircle(polygon, circle);

    chai.expect(collided).to.be.false;
  });

  it('testPolygonCircle - line - collide', () => {
    const circle = new Circle(new Vector(50, 50), 20);
    const polygon = new Box(new Vector(50, 50), 100, 0).toPolygon();

    // Test collision = true - no details
    const collided = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.true;

    // Test collision = true - with details
    const collidedDetails = collider2d.testPolygonCircle(polygon, circle, true);
    chai.expect(collidedDetails.overlap.toFixed(2)).to.equal('20.00');
  });

  it("testPolygonPolygon", () => {
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

    // Test collision = true - no details
    const collided = collider2d.testPolygonPolygon(polygon1, polygon2);
    chai.expect(collided).to.be.true;

    // Test collision = true - with details
    const collidedDetails = collider2d.testPolygonPolygon(polygon1, polygon2, true);
    chai.expect(collidedDetails.overlap).to.equal(10);
    chai.expect(collidedDetails.overlapV.x).to.equal(10);
    chai.expect(collidedDetails.overlapV.y).to.equal(0);
  });
});

describe("No collision", () => {
  it("testPolygonPolygon", () => {
    const box1 = new Box(new Vector(0, 0), 20, 20).toPolygon();
    const box2 = new Box(new Vector(100, 100), 20, 20).toPolygon();

    // Test collision = false - no details
    const collided = collider2d.testPolygonPolygon(box1, box2);

    chai.expect(collided).to.be.false;
  });
});

describe("Point Collisions", () => {
  it("pointInCircle", () => {
    const circle = new Circle(new Vector(100, 100), 20);

    // Test collision = false
    const collisionFalse = collider2d.pointInCircle(new Vector(0, 0), circle)
    chai.expect(collisionFalse).to.be.false;

    // Test collision = true
    const collisionTrue = collider2d.pointInCircle(new Vector(110, 110), circle);
    chai.expect(collisionTrue).to.be.true;

    // Test collision = false - after offset changed.
    circle.offset = new Vector(-10, -10);

    const collisionAfterOffsetChange = collider2d.pointInCircle(new Vector(110, 110), circle);
    chai.expect(collisionAfterOffsetChange).to.be.false;
  });

  it("pointInPolygon", () => {
    const triangle = new Polygon(new Vector(30, 0), [
      new Vector(0, 0),
      new Vector(30, 0),
      new Vector(0, 30)
    ]);

    // Test collision = false
    const collisionFalse = collider2d.pointInPolygon(new Vector(0, 0), triangle);
    chai.expect(collisionFalse).to.be.false;

    // Test collision = true
    const collisionTrue = collider2d.pointInPolygon(new Vector(35, 5), triangle);
    chai.expect(collisionTrue).to.be.true;
  });

  it("pointInPolygon (small)", () => {
    const v1 = new Vector(1, 1.1);

    const p1 = new Polygon(new Vector(0, 0), [
      new Vector(2, 1),
      new Vector(2, 2),
      new Vector(1, 3),
      new Vector(0, 2),
      new Vector(0, 1),
      new Vector(1, 0)
    ]);

    // Test collision = true
    const collision = collider2d.pointInPolygon(v1, p1);
    chai.expect(collision).to.be.true;
  });
});

describe('Collision - After moving from initial position', () => {
  it("testCircleCircle - should not detect a collision after a circle is moved from collision range", () => {
    const circle1 = new Circle(new Vector(0, 0), 20);
    const circle2 = new Circle(new Vector(10, 0), 20);

    // Test collision = true - without details.
    const collided = collider2d.testCircleCircle(circle1, circle2);
    chai.expect(collided).to.be.true;

    circle2.translate(40, 50);

    // Test collision = false - moved from collision range.
    const collidedAfterMove = collider2d.testCircleCircle(circle1, circle2);
    chai.expect(collidedAfterMove).to.be.false;
  });

  it("testCircleCircle - should detect a collision after a circle is moved to collision range", () => {
    const circle1 = new Circle(new Vector(0, 0), 20);
    const circle2 = new Circle(new Vector(10, 100), 20);

    // Test collision = false.
    const collided = collider2d.testCircleCircle(circle1, circle2);
    chai.expect(collided).to.be.false;

    circle2.translate(-5, -90);

    // Test collision = true - moved to collision range.
    const collidedAfterMove = collider2d.testCircleCircle(circle1, circle2);
    chai.expect(collidedAfterMove).to.be.true;
  });

  it("testPolygonCircle - should not detect a collision after the polygon is moved - (x, y) greater", () => {
    const circle = new Circle(new Vector(50, 50), 20);

    const polygon = new Polygon(new Vector(10, 10), [
      new Vector(0, 0),
      new Vector(40, 0),
      new Vector(40, 40),
      new Vector(0, 40)
    ]);

    // Test collision = true - no details
    const collided = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.true;

    polygon.translate(200, 300);

    // Test collision = false - after moving polygon to (200, 300);
    const collidedAfterMoving = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.false;
  });

  it("testPolygonCircle - should not detect a collision after the polygon is moved - (x, y) less", () => {
    const circle = new Circle(new Vector(50, 50), 20);

    const polygon = new Polygon(new Vector(10, 10), [
      new Vector(0, 0),
      new Vector(40, 0),
      new Vector(40, 40),
      new Vector(0, 40)
    ]);

    // Test collision = true - no details
    const collided = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.true;

    polygon.translate(-200, -150);

    // Test collision = false - after moving polygon to (-200, -150);
    const collidedAfterMoving = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.false;
  });

  it("testPolygonCircle - should detect a collision after the polygon is moved - (x, y) greater", () => {
    const circle = new Circle(new Vector(50, 50), 20);

    const polygon = new Polygon(new Vector(-150, -125), [
      new Vector(0, 0),
      new Vector(40, 0),
      new Vector(40, 40),
      new Vector(0, 40)
    ]);

    // Test collision = false
    const collided = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.false;

    polygon.translate(180, 150);

    // Test collision = true - after moving polygon to (30, 25);
    const collidedAfterMoving = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.true;
  });

  it("testPolygonCircle - should detect a collision after the polygon is moved - (x, y) less", () => {
    const circle = new Circle(new Vector(50, 50), 20);

    const polygon = new Polygon(new Vector(200, 300), [
      new Vector(0, 0),
      new Vector(40, 0),
      new Vector(40, 40),
      new Vector(0, 40)
    ]);

    // Test collision = false
    const collided = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.false;

    polygon.translate(-170, -275);

    // Test collision = true - after moving polygon to (30, 25);
    const collidedAfterMoving = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.true;
  });

  it("testPolygonCircle - should not detect a collision after the circle is moved", () => {
    const circle = new Circle(new Vector(50, 50), 20);

    const polygon = new Polygon(new Vector(25, 25), [
      new Vector(0, 0),
      new Vector(40, 0),
      new Vector(40, 40),
      new Vector(0, 40)
    ]);

    // Test collision = false
    const collided = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.true;

    circle.translate(200, 300);

    // Test collision = true - after moving polygon to (30, 25);
    const collidedAfterMoving = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.false;
  });

  it("testPolygonCircle - should detect a collision after the circle is moved", () => {
    const circle = new Circle(new Vector(200, 150), 20);

    const polygon = new Polygon(new Vector(0, 0), [
      new Vector(0, 0),
      new Vector(40, 0),
      new Vector(40, 40),
      new Vector(0, 40)
    ]);

    // Test collision = false
    const collided = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.false;

    circle.translate(-150, -100);

    // Test collision = true - after moving circle to (50, 50).
    const collidedAfterMoving = collider2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.true;
  });

  it("testPolygonPolygon - should not detect a collision after the polygon is moved - (x, y) greater", () => {
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

    // Test collision = true.
    const collided = collider2d.testPolygonPolygon(polygon1, polygon2);
    chai.expect(collided).to.be.true;

    // Test collision = false - after moving polygon.
    polygon2.translate(90, 150);

    const collidedAfterMoving = collider2d.testPolygonPolygon(polygon1, polygon2);
    chai.expect(collidedAfterMoving).to.be.false;
  });

  it("testPolygonPolygon - should not detect a collision after the polygon is moved - (x, y) less", () => {
    const polygon1 = new Polygon(new Vector(0, 0), [
      new Vector(0, 0),
      new Vector(40, 0),
      new Vector(40, 40),
      new Vector(0, 40)
    ]);

    const polygon2 = new Polygon(new Vector(140, 150), [
      new Vector(0, 0),
      new Vector(30, 0),
      new Vector(0, 30)
    ]);

    // Test collision = false
    const collided = collider2d.testPolygonPolygon(polygon1, polygon2);
    chai.expect(collided).to.be.false;

    // Test collision = true - after moving polygon.
    polygon2.translate(-110, -150);

    const collidedAfterMoving = collider2d.testPolygonPolygon(polygon1, polygon2);
    chai.expect(collidedAfterMoving).to.be.true;
  });
});