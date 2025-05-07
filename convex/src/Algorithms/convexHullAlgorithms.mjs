function getQuadrant(p) {
    let x = p[0];
    let y = p[1];

    if (x >= 0 && y >= 0) {
        return 1;
    } else if (x <= 0 && y >= 0) {
        return 2;
    } else if (x <= 0 && y <= 0) {
        return 3;
    } else {
        return 4;
    }
}

function findMidpoint(points) {
    let avgCoord = [0, 0];
    points.forEach((p) => {
        avgCoord[0] += p[0];
        avgCoord[1] += p[1];
    })

    let l = points.length;

    avgCoord[0] /= l;
    avgCoord[1] /= l;
    return avgCoord;
}

function comparePoints(p1, p2, mid) {
    let p = [p1[0]-mid[0], p1[1]-mid[1]];
    let q = [p2[0]-mid[0], p2[1]-mid[1]];

    let pQuadrant = getQuadrant(p);
    let qQuadrant = getQuadrant(q);

    if (pQuadrant !== qQuadrant) {
        return pQuadrant - qQuadrant;
    } else {
        let pAngle = Math.atan2(p[0], p[1]);
        let qAngle = Math.atan2(q[0], q[1]);

        return pAngle - qAngle;
    }
}

function sortAntiClockwise(points) {
    let mid = findMidpoint(points);
    return points.sort((p, q) => comparePoints(p, q, mid));
}

function combineHulls(hull1, hull2) {
    return [...hull1, ...hull2];
}

function divideConquerConvexHull(points) {
    if (points.length <= 2) {
        return sortAntiClockwise(points);
    } else {
        let firstHalfPoints = points.slice(0, Math.floor(points.length/2));
        let secondHalfPoints = points.slice(Math.floor(points.length/2), points.length);

        let firstHalfHull = divideConquerConvexHull(firstHalfPoints);
        let secondHalfHull = divideConquerConvexHull(secondHalfPoints);
        return combineHulls(firstHalfHull, secondHalfHull);
    }
}

export default divideConquerConvexHull;