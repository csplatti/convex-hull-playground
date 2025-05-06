import './App.css';
import FullScreenPanel from './FullScreenPanel/FullScreenPanel';
import { useEffect } from 'react';

function App() {
    useEffect(() => {
        document.title = "Convex Hull Demo";
    }, []);

  return <FullScreenPanel />;
}

export default App;
