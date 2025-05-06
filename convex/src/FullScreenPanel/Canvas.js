import './FullScreenPanel.css';
import { useState, useRef, useEffect } from 'react';
import * as d3 from "d3";

function Canvas() {
    const [points, setPoints] = useState([]);
    const svgRef = useRef();
    const POINT_COLOR = "#FE7743";
    const POINT_RADIUS = 5;

    const hullPoints = [
        [100, 100],
        [150, 25],
        [200, 100],
        [150, 175]
    ];

    function handleCanvasClick(e) {
        const rect = e.target.getBoundingClientRect();
        console.log(e.clientX - rect.left, e.clientY - rect.top);
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPoints(prev => [...prev, [x, y]]);
        console.log(points);
    }

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); // clear before redrawing

        svg.selectAll("*").remove(); // clear
        svg.selectAll("circle")
            .data(points)
            .enter()
            .append("circle")
            .attr("cx", d => d[0])
            .attr("cy", d => d[1])
            .attr("r", POINT_RADIUS)
            .attr("fill", POINT_COLOR);

        svg.append("polygon")
        .attr("points", hullPoints.map(d => d.join(",")).join(" "))
        .attr("fill", "rgba(0, 150, 255, 0.3)")
        .attr("stroke", "blue")
        .attr("stroke-width", 2);

    }, [points, hullPoints]);

    return (
        <div class="Canvas" onClick={handleCanvasClick}>
            <svg
                ref={svgRef}
                width="100%"
                height="100%"
                style={{ border: "1px solid #ccc" }}
            />
        </div>
    );
}

export default Canvas;