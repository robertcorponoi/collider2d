'use strict'

const chai = require('chai');
const Collider2D = require('../index');

const c2d = new Collider2D();

describe('Vector Scaling', () => {
  it('should scale by zero properly', () => {
    const v1 = c2d.vector(5, 5);

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
    const polygon = c2d.polygon(
      c2d.vector(0, 0), [
      c2d.vector(0, 0),
      c2d.vector(40, 0),
      c2d.vector(40, 40),
      c2d.vector(0, 40)
    ]);

    const c = polygon.getCentroid();

    chai.expect(c.x).to.equal(20);
    chai.expect(c.y).to.equal(20);
  });

  it("should calculate the correct value for a triangle", () => {
    const polygon = c2d.polygon(
      c2d.vector(0, 0), [
      c2d.vector(0, 0),
      c2d.vector(100, 0),
      c2d.vector(50, 99)
    ]);

    const c = polygon.getCentroid();

    chai.expect(c.x).to.equal(50);
    chai.expect(c.y).to.equal(33);
  });
});

describe("Collision", () => {
  it("testCircleCircle", () => {
    const circle1 = c2d.circle(c2d.vector(0, 0), 20);
    const circle2 = c2d.circle(c2d.vector(30, 0), 20);
    // const response = c2d.response();

    // Test collision = true - without details.
    const collided = c2d.testCircleCircle(circle1, circle2);
    chai.expect(collided).to.be.true;

    // Test collision = true - with details.
    const collidedDetails = c2d.testCircleCircle(circle1, circle2, true);
    chai.expect(collidedDetails).to.not.be.false;
    chai.expect(collidedDetails.overlap).to.equal(10);
    chai.expect(collidedDetails.overlapV.x).to.equal(10);
    chai.expect(collidedDetails.overlapV.y).to.equal(0);

    // Test collision = false - without details - after changing offset.
    circle1.offset = c2d.vector(-10, -10);
    const collidedAfterOffsetChange = c2d.testCircleCircle(circle1, circle2);
    chai.expect(collidedAfterOffsetChange).to.be.false;

    // let collided = c2d.testCircleCircle(circle1, circle2, response);
    // let collided = c2d.testCircleCircle(circle1, circle2, true);

    // chai.expect(collided).to.not.be.null;
    // chai.expect(response.overlap).to.equal(10);
    // chai.expect(response.overlapV.x).to.equal(10) && chai.expect(response.overlapV.y).to.equal(0);

    // circle1.offset = c2d.vector(-10, -10);

    // collided = c2d.testCircleCircle(circle1, circle2, response);

    // chai.expect(collided).to.be.false;
  });

  it("testPolygonCircle", () => {
    const circle = c2d.circle(c2d.vector(50, 50), 20);

    const polygon = c2d.polygon(c2d.vector(0, 0), [
      c2d.vector(0, 0),
      c2d.vector(40, 0),
      c2d.vector(40, 40),
      c2d.vector(0, 40)
    ]);

    // Test collision = true - no details
    const collided = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.true;

    // Test collision = true - details
    const collidedDetails = c2d.testPolygonCircle(polygon, circle, true);
    chai.expect(collidedDetails.overlap.toFixed(2)).to.equal('5.86');
    chai.expect(collidedDetails.overlapV.x.toFixed(2)).to.equal('4.14') && chai.expect(collidedDetails.overlapV.y.toFixed(2)).to.equal('4.14');

    // Test collision = false - no details - after offset change
    circle.offset = c2d.vector(10, 10);

    const collidedAfterOffsetChange = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterOffsetChange).to.be.false;
  });

  it('testPolygonCircle - line - not collide', () => {
    const circle = c2d.circle(c2d.vector(50, 50), 20);
    const polygon = c2d.box(c2d.vector(1000, 1000), 100, 0).toPolygon();

    // Test collision = false - no details
    const collided = c2d.testPolygonCircle(polygon, circle);

    chai.expect(collided).to.be.false;
  });

  it('testPolygonCircle - line - collide', () => {
    const circle = c2d.circle(c2d.vector(50, 50), 20);
    const polygon = c2d.box(c2d.vector(50, 50), 100, 0).toPolygon();

    // Test collision = true - no details
    const collided = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.true;

    // Test collision = true - with details
    const collidedDetails = c2d.testPolygonCircle(polygon, circle, true);
    chai.expect(collidedDetails.overlap.toFixed(2)).to.equal('20.00');
  });

  it("testPolygonPolygon", () => {
    const polygon1 = c2d.polygon(c2d.vector(0, 0), [
      c2d.vector(0, 0),
      c2d.vector(40, 0),
      c2d.vector(40, 40),
      c2d.vector(0, 40)
    ]);

    const polygon2 = c2d.polygon(c2d.vector(30, 0), [
      c2d.vector(0, 0),
      c2d.vector(30, 0),
      c2d.vector(0, 30)
    ]);

    // Test collision = true - no details
    const collided = c2d.testPolygonPolygon(polygon1, polygon2);
    chai.expect(collided).to.be.true;

    // Test collision = true - with details
    const collidedDetails = c2d.testPolygonPolygon(polygon1, polygon2, true);
    chai.expect(collidedDetails.overlap).to.equal(10);
    chai.expect(collidedDetails.overlapV.x).to.equal(10);
    chai.expect(collidedDetails.overlapV.y).to.equal(0);
  });
});

describe("No collision", () => {
  it("testPolygonPolygon", () => {
    const box1 = c2d.box(c2d.vector(0, 0), 20, 20).toPolygon();
    const box2 = c2d.box(c2d.vector(100, 100), 20, 20).toPolygon();

    // Test collision = false - no details
    const collided = c2d.testPolygonPolygon(box1, box2);

    chai.expect(collided).to.be.false;
  });
});

describe("Point Collisions", () => {
  it("pointInCircle", () => {
    const circle = c2d.circle(c2d.vector(100, 100), 20);

    // Test collision = false
    const collisionFalse = c2d.pointInCircle(c2d.vector(0, 0), circle)
    chai.expect(collisionFalse).to.be.false;

    // Test collision = true
    const collisionTrue = c2d.pointInCircle(c2d.vector(110, 110), circle);
    chai.expect(collisionTrue).to.be.true;

    // Test collision = false - after offset changed.
    circle.offset = c2d.vector(-10, -10);

    const collisionAfterOffsetChange = c2d.pointInCircle(c2d.vector(110, 110), circle);
    chai.expect(collisionAfterOffsetChange).to.be.false;
  });

  it("pointInPolygon", () => {
    const triangle = c2d.polygon(c2d.vector(30, 0), [
      c2d.vector(0, 0),
      c2d.vector(30, 0),
      c2d.vector(0, 30)
    ]);

    // Test collision = false
    const collisionFalse = c2d.pointInPolygon(c2d.vector(0, 0), triangle);
    chai.expect(collisionFalse).to.be.false;

    // Test collision = true
    const collisionTrue = c2d.pointInPolygon(c2d.vector(35, 5), triangle);
    chai.expect(collisionTrue).to.be.true;
  });

  it("pointInPolygon (small)", () => {
    const v1 = c2d.vector(1, 1.1);

    const p1 = c2d.polygon(c2d.vector(0, 0), [
      c2d.vector(2, 1),
      c2d.vector(2, 2),
      c2d.vector(1, 3),
      c2d.vector(0, 2),
      c2d.vector(0, 1),
      c2d.vector(1, 0)
    ]);

    // Test collision = true
    const collision = c2d.pointInPolygon(v1, p1);
    chai.expect(collision).to.be.true;
  });
});

describe('Collision - After moving from initial position', () => {
  it("testCircleCircle - should not detect a collision after a circle is moved from collision range", () => {
    const circle1 = c2d.circle(c2d.vector(0, 0), 20);
    const circle2 = c2d.circle(c2d.vector(10, 0), 20);

    // Test collision = true - without details.
    const collided = c2d.testCircleCircle(circle1, circle2);
    chai.expect(collided).to.be.true;

    circle2.translate(40, 50);

    // Test collision = false - moved from collision range.
    const collidedAfterMove = c2d.testCircleCircle(circle1, circle2);
    chai.expect(collidedAfterMove).to.be.false;
  });

  it("testCircleCircle - should detect a collision after a circle is moved to collision range", () => {
    const circle1 = c2d.circle(c2d.vector(0, 0), 20);
    const circle2 = c2d.circle(c2d.vector(10, 100), 20);

    // Test collision = false.
    const collided = c2d.testCircleCircle(circle1, circle2);
    chai.expect(collided).to.be.false;

    circle2.translate(-5, -90);

    // Test collision = true - moved to collision range.
    const collidedAfterMove = c2d.testCircleCircle(circle1, circle2);
    chai.expect(collidedAfterMove).to.be.true;
  });

  it("testPolygonCircle - should not detect a collision after the polygon is moved - (x, y) greater", () => {
    const circle = c2d.circle(c2d.vector(50, 50), 20);

    const polygon = c2d.polygon(c2d.vector(10, 10), [
      c2d.vector(0, 0),
      c2d.vector(40, 0),
      c2d.vector(40, 40),
      c2d.vector(0, 40)
    ]);

    // Test collision = true - no details
    const collided = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.true;

    polygon.translate(200, 300);

    // Test collision = false - after moving polygon to (200, 300);
    const collidedAfterMoving = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.false;
  });

  it("testPolygonCircle - should not detect a collision after the polygon is moved - (x, y) less", () => {
    const circle = c2d.circle(c2d.vector(50, 50), 20);

    const polygon = c2d.polygon(c2d.vector(10, 10), [
      c2d.vector(0, 0),
      c2d.vector(40, 0),
      c2d.vector(40, 40),
      c2d.vector(0, 40)
    ]);

    // Test collision = true - no details
    const collided = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.true;

    polygon.translate(-200, -150);

    // Test collision = false - after moving polygon to (-200, -150);
    const collidedAfterMoving = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.false;
  });

  it("testPolygonCircle - should detect a collision after the polygon is moved - (x, y) greater", () => {
    const circle = c2d.circle(c2d.vector(50, 50), 20);

    const polygon = c2d.polygon(c2d.vector(-150, -125), [
      c2d.vector(0, 0),
      c2d.vector(40, 0),
      c2d.vector(40, 40),
      c2d.vector(0, 40)
    ]);

    // Test collision = false
    const collided = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.false;

    polygon.translate(180, 150);

    // Test collision = true - after moving polygon to (30, 25);
    const collidedAfterMoving = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.true;
  });

  it("testPolygonCircle - should detect a collision after the polygon is moved - (x, y) less", () => {
    const circle = c2d.circle(c2d.vector(50, 50), 20);

    const polygon = c2d.polygon(c2d.vector(200, 300), [
      c2d.vector(0, 0),
      c2d.vector(40, 0),
      c2d.vector(40, 40),
      c2d.vector(0, 40)
    ]);

    // Test collision = false
    const collided = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.false;

    polygon.translate(-170, -275);

    // Test collision = true - after moving polygon to (30, 25);
    const collidedAfterMoving = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.true;
  });

  it("testPolygonCircle - should not detect a collision after the circle is moved", () => {
    const circle = c2d.circle(c2d.vector(50, 50), 20);

    const polygon = c2d.polygon(c2d.vector(25, 25), [
      c2d.vector(0, 0),
      c2d.vector(40, 0),
      c2d.vector(40, 40),
      c2d.vector(0, 40)
    ]);

    // Test collision = false
    const collided = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.true;

    circle.translate(200, 300);

    // Test collision = true - after moving polygon to (30, 25);
    const collidedAfterMoving = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.false;
  });

  it("testPolygonCircle - should detect a collision after the circle is moved", () => {
    const circle = c2d.circle(c2d.vector(200, 150), 20);

    const polygon = c2d.polygon(c2d.vector(0, 0), [
      c2d.vector(0, 0),
      c2d.vector(40, 0),
      c2d.vector(40, 40),
      c2d.vector(0, 40)
    ]);

    // Test collision = false
    const collided = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collided).to.be.false;

    circle.translate(-150, -100);

    // Test collision = true - after moving circle to (50, 50).
    const collidedAfterMoving = c2d.testPolygonCircle(polygon, circle);
    chai.expect(collidedAfterMoving).to.be.true;
  });

  it("testPolygonPolygon - should not detect a collision after the polygon is moved - (x, y) greater", () => {
    const polygon1 = c2d.polygon(c2d.vector(0, 0), [
      c2d.vector(0, 0),
      c2d.vector(40, 0),
      c2d.vector(40, 40),
      c2d.vector(0, 40)
    ]);

    const polygon2 = c2d.polygon(c2d.vector(30, 0), [
      c2d.vector(0, 0),
      c2d.vector(30, 0),
      c2d.vector(0, 30)
    ]);

    // Test collision = true.
    const collided = c2d.testPolygonPolygon(polygon1, polygon2);
    chai.expect(collided).to.be.true;

    // Test collision = false - after moving polygon.
    polygon2.translate(90, 150);

    const collidedAfterMoving = c2d.testPolygonPolygon(polygon1, polygon2);
    chai.expect(collidedAfterMoving).to.be.false;
  });

  it("testPolygonPolygon - should not detect a collision after the polygon is moved - (x, y) less", () => {
    const polygon1 = c2d.polygon(c2d.vector(0, 0), [
      c2d.vector(0, 0),
      c2d.vector(40, 0),
      c2d.vector(40, 40),
      c2d.vector(0, 40)
    ]);

    const polygon2 = c2d.polygon(c2d.vector(140, 150), [
      c2d.vector(0, 0),
      c2d.vector(30, 0),
      c2d.vector(0, 30)
    ]);

    // Test collision = false
    const collided = c2d.testPolygonPolygon(polygon1, polygon2);
    chai.expect(collided).to.be.false;

    // Test collision = true - after moving polygon.
    polygon2.translate(-110, -150);

    const collidedAfterMoving = c2d.testPolygonPolygon(polygon1, polygon2);
    chai.expect(collidedAfterMoving).to.be.true;
  });
});