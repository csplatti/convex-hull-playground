function sum(a, b) {
    return a + b;
}

// MODIFIES: points
// EFFECTS: finds points with lowest y coord, removes from list, and returns that point
function getLowestYPoint(points) {
    return [0, 1]; // TODO: stub
}

// MODIFIES: points
// EFFECTS: returns the convex hull of the provided set of points
function grahamScan(points) {
    let lowest = getLowestYPoint(points);

    return arr; // TODO: stub
}

// MODIFIES: points
// EFFECTS: returns the convex hull of the provided set of points
function jarvisMarch(points) {
    return points; // TODO: stub
}

export { sum, grahamScan, jarvisMarch };