function sum(a, b) {
    return a + b;
}

// MODIFIES: arr
// EFFECSTS: swaps values at indeces a and b in arr
function swap(a, b, arr) {
    let temp = arr[a];
    arr[a] = arr[b];
    arr[b] = temp;
}

// MODIFIES: points
// EFFECTS: finds points with lowest y coord, removes from list, and returns that point
function moveLowestYPtToStart(points) {
    for (let i = points.length-1; i > 0; i--) {
        if (points[i][1] < points[i-1][1]) {
            swap(i, i-1, points);
        }
    }
    
    return points;
}

// REQUIRES: points does NOT contain p and contains no duplicate points
// MODIFIES: points;
// EFFECTS: sorts list of points by the angle betwen the horizontal through point p and the line from p
//  to each given point in points
function sortPointsByAngleToHZ(points, p) {
    let pX = p[0];
    let pY = p[1];

    points.sort((a, b) => {
        let ax = a[0] - pX;
        let ay = a[1] - pY;

        let bx = b[0] - pX;
        let by = b[1] - pY;

        return (bx * ay) - (by * ax);
    });
}

// EFFECTS: returns cross product v X w
function crossProduct(v, w) {
    return (v[0]*w[1]) - (w[0]*v[1]);
}

// EFFECTS: returns true if the turn to the next point is ccw, false otherwise
function ccwTurnToNextPoint(nextPoint, lastPt, lastLastPt) {
    // TODO: MAKE SURE THIS WORKS
    let vectorToNextPt = [(lastPt[0] - nextPoint[0]), (lastPt[1]-nextPoint[1])]; // v
    let vectorBetweenLastTwoPts = [(lastLastPt[0]-lastPt[0]), (lastLastPt[1]-lastPt[1])]; // w
    return crossProduct(vectorToNextPt, vectorBetweenLastTwoPts) < 0;
}

// MODIFIES: points
// EFFECTS: returns the convex hull of the provided set of points
function grahamScan(points) {
    moveLowestYPtToStart(points);

    let p = points.splice(0, 1);

    sortPointsByAngleToHZ(points, p);

    let stack = []; // JS array can be used as a stack via push and pop methods

    for (let i = 0; i < points.length; i++) {
        if (ccwTurnToNextPoint(nextPoint, lastPt, lastLastPt)) {

        } else {

        }
    }



    return points; // TODO: stub
}

// MODIFIES: points
// EFFECTS: returns the convex hull of the provided set of points
function jarvisMarch(points) {
    return points; // TODO: stub
}

export { sum, grahamScan, jarvisMarch, moveLowestYPtToStart, sortPointsByAngleToHZ, ccwTurnToNextPoint };