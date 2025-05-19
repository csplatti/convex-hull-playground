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
    let vectorToNextPt = [(lastPt[0] - nextPoint[0]), (lastPt[1]-nextPoint[1])]; // v
    let vectorBetweenLastTwoPts = [(lastLastPt[0]-lastPt[0]), (lastLastPt[1]-lastPt[1])]; // w
    return crossProduct(vectorToNextPt, vectorBetweenLastTwoPts); // <= 0;
}

// MODIFIES: points
// EFFECTS: returns the convex hull of the provided set of points
function grahamScan(points) {
    if (points.length <= 3) {
        return points;
    }

    moveLowestYPtToStart(points);

    let p = points.splice(0, 1)[0]; 

    sortPointsByAngleToHZ(points, p);

    let stack = [p, points[0]]; // JS array can be used as a stack via push and pop methods

    let lastPt;
    let lastLastPt;

    for (let i = 1; i < points.length; i++) {
        lastPt = stack[stack.length - 1];
        lastLastPt = stack[stack.length - 2];
        let nextPoint = points[i];
        let ccwTurnResult = ccwTurnToNextPoint(nextPoint, lastPt, lastLastPt)
        if (ccwTurnResult < 0) {
            stack.push(nextPoint)
            lastPt = stack[stack.length - 1];
            lastLastPt = stack[stack.length - 2];
        } else if (ccwTurnResult === 0) {
            stack.pop();
            stack.push(nextPoint);
        } else {
            while (true) {
                stack.pop();
                lastPt = stack[stack.length - 1];
                lastLastPt = stack[stack.length - 2];
                ccwTurnResult = ccwTurnToNextPoint(nextPoint, lastPt, lastLastPt)
                if (ccwTurnResult < 0) {
                    stack.push(nextPoint);
                    break;
                }
                // } else if (ccwTurnResult === 0) {
                //     if (between(lastLastPt, lastPt, nextPoint)) {
                //         stack.pop();
                //         // stack.push(nextPoint);
                //     } else {
                //         break;
                //     }
                // }
            }
        }
    }

    return stack;
}

// MODIFIES: points
// EFFECTS: returns the convex hull of the provided set of points
function jarvisMarch(points) {
    return points; // TODO: stub
}

export { sum, grahamScan, jarvisMarch, moveLowestYPtToStart, sortPointsByAngleToHZ, ccwTurnToNextPoint };