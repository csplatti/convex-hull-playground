import { sum, grahamScan, jarvisMarch } from "./convexHullAlgorithms.js";

test("Properly adds two numbers", () => {
  expect(sum(1, 2)).toBe(3);
});
test("grahamScan returns correct convex hull for a set of points", () => {
    const points = [
        [0, 0],
        [1, 1],
        [2, 2],
        [2, 0],
        [2, 4],
        [3, 3],
        [0, 4],
    ];
    const expectedHull = [
        [0, 0],
        [2, 0],
        [3, 3],
        [2, 4],
        [0, 4],
    ]; // Expected convex hull (stubbed for now)
    expect(grahamScan(points)).toEqual(expectedHull);
});

test("jarvisMarch returns correct convex hull for a set of points", () => {
    const points = [
        [0, 0],
        [1, 1],
        [2, 2],
        [2, 0],
        [2, 4],
        [3, 3],
        [0, 4],
    ];
    const expectedHull = [
        [0, 0],
        [2, 0],
        [3, 3],
        [2, 4],
        [0, 4],
    ]; // Expected convex hull (stubbed for now)
    expect(jarvisMarch(points)).toEqual(expectedHull);
});

test("grahamScan handles a single point", () => {
    const points = [[1, 1]];
    const expectedHull = [[1, 1]];
    expect(grahamScan(points)).toEqual(expectedHull);
});

test("grahamScan handles collinear points", () => {
    const points = [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
    ];
    const expectedHull = [
        [0, 0],
        [3, 3],
    ]; // Only the endpoints of the line
    expect(grahamScan(points)).toEqual(expectedHull);
});

test("jarvisMarch handles a single point", () => {
    const points = [[1, 1]];
    const expectedHull = [[1, 1]];
    expect(jarvisMarch(points)).toEqual(expectedHull);
});

test("jarvisMarch handles collinear points", () => {
    const points = [
        [0, 0],
        [1, 1],
        [2, 2],
        [3, 3],
    ];
    const expectedHull = [
        [0, 0],
        [3, 3],
    ]; // Only the endpoints of the line
    expect(jarvisMarch(points)).toEqual(expectedHull);
});

test("grahamScan handles points forming a square", () => {
    const points = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
    ];
    const expectedHull = [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
    ]; // Convex hull of the square
    expect(grahamScan(points)).toEqual(expectedHull);
});

test("jarvisMarch handles points forming a square", () => {
    const points = [
        [0, 0],
        [0, 1],
        [1, 0],
        [1, 1],
    ];
    const expectedHull = [
        [0, 0],
        [1, 0],
        [1, 1],
        [0, 1],
    ]; // Convex hull of the square
    expect(jarvisMarch(points)).toEqual(expectedHull);
});
