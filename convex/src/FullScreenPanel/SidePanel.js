import './FullScreenPanel.css';
import './SidePanel.js';

function SidePanel() {
    return (
        <div class="SidePanel">
            <h1 class="SidePanelTitle">Convex Hull Playground</h1>
            <p class="SidePanelText">Click on canvas to add points. The Convex Hull will be calculated and displayed.</p>
        </div>
    );
}

export default SidePanel;