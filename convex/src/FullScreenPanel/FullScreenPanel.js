import './FullScreenPanel.css';
import SidePanel from './SidePanel';
import Canvas from './Canvas';

function FullScreenPanel() {
    return (
        <div class="FullScreenPanel">
            <SidePanel />
            <Canvas />
        </div>
    );
}

export default FullScreenPanel;