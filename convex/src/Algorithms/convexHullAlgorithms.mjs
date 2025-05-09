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

function getAverageXCoord(pts) {
    let sum = 0;

    pts.forEach((p) => {
        sum += p[0];
    });

    return sum / pts.length;

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

function getLeftMostPointIndex(hull) {
    let l = 0;

    for (let i = 1; i < hull.length; i++) {
        if (hull[i][0] < hull[l][0]) {
            l = i;
        }
    }

    return l;
}

function getRightMostPointIndex(hull) {
    let r = 0;

    for (let i = 1; i < hull.length; i++) {
        if (hull[i][0] > hull[r][0]) {
            r = i;
        }
    }

    return r;
}

function getLeftHull(h1, h2) {
    let l1 = getLeftMostPointIndex(h1);
    let l2 = getLeftMostPointIndex(h2);

    if (h1[l1][0] < h2[l2][0]) {
        return h1;
    } else {
        return h2;
    }
}

function getRightHull(h1, h2) {
    let r1 = getRightMostPointIndex(h1);
    let r2 = getRightMostPointIndex(h2);

    if (h1[r1][0] > h2[r2][0]) {
        return h1;
    } else {
        return h2;
    }
}

function calculatePointOnLineThroughPts(p1, p2, x) {
    console.log(p1, p2);
    let m = (p1[1] - p2[1]) / (p1[0]-p2[0]);
    let f = (x) => m * (x - p1[0]) + p1[1];

    return f(x);
}

function removeFromArray(item, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            arr.splice(i, 1);
            break;
        }
    }
}

// function getUpperTangent(leftHull, rightHull, xAvg) {
//     let lHullPtr = getLeftMostPointIndex(rightHull);
//     let rHullPtr = getRightMostPointIndex(leftHull);

//     console.log("left hull ptr", lHullPtr);

//     let lHullPtrDump = [];
//     let rHullPtrDump = [];

//     let lastAMoveDecrease = false;
//     let lastBMoveDecrease = false;

//     let currentYij = calculatePointOnLineThroughPts(leftHull[lHullPtr], rightHull[rHullPtr], xAvg);

//     while (!lastAMoveDecrease && !lastBMoveDecrease) {
//         let tempRHullPtr = (rHullPtr + 1) % rightHull.length;
//         let newYijB = calculatePointOnLineThroughPts(leftHull[lHullPtr], rightHull[tempRHullPtr], xAvg);
//         if (newYijB > currentYij) {
//             rHullPtr = tempRHullPtr;
//             currentYij = newYijB;
//             lastBMoveDecrease = false;

//             if (rHullPtrDump.includes(tempRHullPtr)) {
//                 removeFromArray(tempRHullPtr, rHullPtrDump);
//             }
//         } else if (newYijB === currentYij) {
//             alert("You have found a case where this algorithm does not work!");
//         } else {
//             if (!rHullPtrDump.includes(tempRHullPtr)) {
//                 rHullPtrDump.push(tempRHullPtr);
//             }
//             lastBMoveDecrease = true;
//         }

//         let tempLHullPtr = (lHullPtr - 1) % lHullPtr.length;
//         console.log(tempLHullPtr, leftHull[tempLHullPtr]);
//         let newYijA = calculatePointOnLineThroughPts(leftHull[tempLHullPtr], rightHull[tempRHullPtr]);
//         if (newYijA > currentYij) {
//             lHullPtr = tempLHullPtr;
//             currentYij = newYijA;
//             lastAMoveDecrease = false;
//             if (lHullPtrDump.includes(tempLHullPtr)) {
//                 removeFromArray(tempLHullPtr, lHullPtrDump);
//             }
//         } else if (newYijA === currentYij) {
//             alert("You have found a case where this algorithm does not work!");
//         } else {
//             lastAMoveDecrease = true;
//             if (!lHullPtrDump.includes(tempLHullPtr)) {
//                 lHullPtrDump.push(tempLHullPtr);
//             }
//         }
//     }

//     return [lHullPtrDump, rHullPtrDump];
// }

// function getLowerTangent(leftHull, rightHull, xAvg) {
//     let lHullPtr = getLeftMostPointIndex(rightHull);
//     let rHullPtr = getRightMostPointIndex(leftHull);

//     let lHullPtrDump = [];
//     let rHullPtrDump = [];

//     let lastAMoveDecrease = false;
//     let lastBMoveDecrease = false;

//     let currentYij = calculatePointOnLineThroughPts(leftHull[lHullPtr], rightHull[rHullPtr], xAvg);

//     while (!lastAMoveDecrease && !lastBMoveDecrease) {
//         let tempRHullPtr = (rHullPtr - 1) % rightHull.length;
//         let newYijB = calculatePointOnLineThroughPts(leftHull[lHullPtr], rightHull[tempRHullPtr], xAvg);
//         if (newYijB < currentYij) {
//             rHullPtr = tempRHullPtr;
//             currentYij = newYijB;
//             lastBMoveDecrease = false;

//             if (rHullPtrDump.includes(tempRHullPtr)) {
//                 removeFromArray(tempRHullPtr, rHullPtrDump);
//             }
//         } else if (newYijB === currentYij) {
//             alert("You have found a case where this algorithm does not work!");
//         } else {
//             if (!rHullPtrDump.includes(tempRHullPtr)) {
//                 rHullPtrDump.push(tempRHullPtr);
//             }
//             lastBMoveDecrease = true;
//         }

//         let tempLHullPtr = (lHullPtr + 1) % lHullPtr.length;
//         let newYijA = calculatePointOnLineThroughPts(leftHull[tempLHullPtr], rightHull[tempRHullPtr]);
//         if (newYijA < currentYij) {
//             lHullPtr = tempLHullPtr;
//             currentYij = newYijA;
//             lastAMoveDecrease = false;
//             if (lHullPtrDump.includes(tempLHullPtr)) {
//                 removeFromArray(tempLHullPtr, lHullPtrDump);
//             }
//         } else {
//             lastAMoveDecrease = true;
//             if (!lHullPtrDump.includes(tempLHullPtr)) {
//                 lHullPtrDump.push(tempLHullPtr);
//             }
//         }
//     }

//     return [lHullPtrDump, rHullPtrDump];
// }

function combineHulls(hull1, hull2) {
    // let xAvg = getAverageXCoord([...hull1, ...hull2]);

    // let lHull = getLeftHull(hull1, hull2);
    // let rHull = getRightHull(hull1, hull2);

    // let upperTangentOutput = getUpperTangent(lHull, rHull, xAvg);
    // let lowerTangentOutput = getLowerTangent(lHull, rHull, xAvg);

    // let lHullPointDump = [...upperTangentOutput[0], ...lowerTangentOutput[0]];
    // let rHullPointDump = [...upperTangentOutput[1], ...lowerTangentOutput[1]];

    // lHullPointDump.forEach((i) => {
    //     lHull.splice(i, 1);
    // });

    // rHullPointDump.forEach((i) => {
    //     rHull.splice(i, 1);
    // });

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