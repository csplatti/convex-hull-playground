import './FullScreenPanel.css';
import SidePanel from './SidePanel.js';
import Canvas from './Canvas.js';

function FullScreenPanel() {
    return (
        <div class="FullScreenPanel">
            <SidePanel />
            <Canvas />
        </div>
    );
}

export default FullScreenPanel;