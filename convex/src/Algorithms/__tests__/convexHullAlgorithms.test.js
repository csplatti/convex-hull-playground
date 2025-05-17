import { sum, grahamScan, jarvisMarch, moveLowestYPtToStart, sortPointsByAngleToHZ, ccwTurnToNextPoint } from "../convexHullAlgorithms.js";

describe("sum function", () => {
    test("Properly adds two numbers", () => {
        expect(sum(1, 2)).toBe(3);
    });
});

describe("moveLowestYPtToStart function", () => {
    test("moves the lowest point to the first index", () => {
        const points = [
            [1, 2],
            [3, 4],
            [0, 1],
            [2, 3],
        ];
        const expectedPoints = [
            [0, 1],
            [1, 2],
            [3, 4],
            [2, 3],
        ];

        let result = moveLowestYPtToStart(points)
        console.log("Expected: " + JSON.stringify(expectedPoints));
        console.log("Actual: " + JSON.stringify(result));
        console.log("--------------------------------------");

        expect(result).toEqual(expectedPoints);
    });

    test("handles already sorted points", () => {
        const points = [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
        ];
        const expectedPoints = [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4],
        ];

        let result = moveLowestYPtToStart(points)

        console.log("Expected: " + JSON.stringify(expectedPoints));
        console.log("Actual: " + JSON.stringify(result));
        console.log("--------------------------------------");

        expect(result).toEqual(expectedPoints);
    });

    test("handles multiple points with the same lowest y-coordinate", () => {
        const points = [
            [1, 1],
            [0, 1],
            [2, 2],
            [3, 3],
        ];
        const expectedPoints = [
            [1, 1],
            [0, 1],
            [2, 2],
            [3, 3],
        ]; // The first occurrence of the lowest y-coordinate is moved to index 0

        let result = moveLowestYPtToStart(points)
        console.log("Expected: " + JSON.stringify(expectedPoints));
        console.log("Actual: " + JSON.stringify(result));
        console.log("--------------------------------------");

        expect(result).toEqual(expectedPoints);
    });

    test("handles a single point", () => {
        const points = [[1, 1]];
        const expectedPoints = [[1, 1]];

        let result = moveLowestYPtToStart(points)
        console.log("Expected: " + JSON.stringify(expectedPoints));
        console.log("Actual: " + JSON.stringify(result));
        console.log("--------------------------------------");

        expect(result).toEqual(expectedPoints);
    });

    test("handles an empty list", () => {
        const points = [];
        const expectedPoints = [];

        let result = moveLowestYPtToStart(points)
        console.log("Expected: " + JSON.stringify(expectedPoints));
        console.log("Actual: " + JSON.stringify(result));
        console.log("--------------------------------------");
        expect(result).toEqual(expectedPoints);
    });
});

describe("sortPointsByAngleToHZ function", () => {
    test("sorts points by angle relative to a horizontal line through the reference point", () => {
        let points = [
            [3, 5],
            [1, 4],
            [4, 6],
        ];
        const referencePoint = [2, 2];
        const expectedPoints = [
            [4, 6],
            [3, 5],
            [1, 4],
        ]; // Sorted by angle relative to the horizontal line through [2, 2]

        sortPointsByAngleToHZ(points, referencePoint);

        expect(points).toEqual(expectedPoints);
    });

    test("handles points with the same angle", () => {
        const points = [
            [3, 5],
            [4, 6],
            [2, 4],
        ];
        const referencePoint = [1, 1];
        const expectedPoints = [
            [4, 6],
            [3, 5],
            [2, 4],
        ]; // Points with the same angle remain in their relative order

        sortPointsByAngleToHZ(points, referencePoint);

        expect(points).toEqual(expectedPoints);
    });

    test("handles a single point in the list", () => {
        const points = [[3, 5]];
        const referencePoint = [1, 1];
        const expectedPoints = [[3, 5]];

        sortPointsByAngleToHZ(points, referencePoint);

        expect(points).toEqual(expectedPoints);
    });

    test("handles an empty list", () => {
        const points = [];
        const referencePoint = [1, 1];
        const expectedPoints = [];

        sortPointsByAngleToHZ(points, referencePoint);

        expect(points).toEqual(expectedPoints);
    });

    test("handles points directly above, below, left, and right of the reference point", () => {
        const points = [
            [2, 3], // Above
            [2, 5], // Further above
            [1, 4], // Left
            [3, 4], // Right
        ];
        const referencePoint = [2, 1];
        const expectedPoints = [
            [3, 4], // Right
            [2, 3], // Above
            [2, 5], // Further above
            [1, 4], // Left
        ]; // Sorted by angle relative to the horizontal line through [2, 1]

        sortPointsByAngleToHZ(points, referencePoint);

        expect(points).toEqual(expectedPoints);
    });
});

describe("ccwTurnToNextPoint function", () => {
    test("returns true for a counterclockwise turn", () => {
        const lastLastPoint = [0, 0];
        const lastPoint = [1, 0];
        const nextPoint = [1, 1];
        expect(ccwTurnToNextPoint(nextPoint, lastPoint, lastLastPoint)).toBe(true);
    });

    test("returns false for a clockwise turn", () => {
        const lastLastPoint = [0, 0];
        const lastPoint = [1, 0];
        const nextPoint = [1, -1];
        expect(ccwTurnToNextPoint(nextPoint, lastPoint, lastLastPoint)).toBe(false);
    });

    test("returns false for collinear points", () => {
        const lastLastPoint = [0, 0];
        const lastPoint = [1, 1];
        const nextPoint = [2, 2];
        expect(ccwTurnToNextPoint(nextPoint, lastPoint, lastLastPoint)).toBe(false);
    });

    test("handles points with negative coordinates", () => {
        const lastLastPoint = [-1, -1];
        const lastPoint = [0, 0];
        const nextPoint = [-1, 1];
        expect(ccwTurnToNextPoint(nextPoint, lastPoint, lastLastPoint)).toBe(true);
    });

    test("handles points forming a straight vertical line", () => {
        const lastLastPoint = [0, 0];
        const lastPoint = [0, 1];
        const nextPoint = [0, 2];
        expect(ccwTurnToNextPoint(nextPoint, lastPoint, lastLastPoint)).toBe(false);
    });

    test("handles points forming a straight horizontal line", () => {
        const lastLastPoint = [0, 0];
        const lastPoint = [1, 0];
        const nextPoint = [2, 0];
        expect(ccwTurnToNextPoint(nextPoint, lastPoint, lastLastPoint)).toBe(false);
    });
});

/*
describe("grahamScan function", () => {
    test("returns correct convex hull for a set of points", () => {
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

    test("handles a single point", () => {
        const points = [[1, 1]];
        const expectedHull = [[1, 1]];
        expect(grahamScan(points)).toEqual(expectedHull);
    });

    test("handles collinear points", () => {
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

    test("handles points forming a square", () => {
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
});

describe("jarvisMarch function", () => {
    test("returns correct convex hull for a set of points", () => {
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

    test("handles a single point", () => {
        const points = [[1, 1]];
        const expectedHull = [[1, 1]];
        expect(jarvisMarch(points)).toEqual(expectedHull);
    });

    test("handles collinear points", () => {
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

    test("handles points forming a square", () => {
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
});
*/