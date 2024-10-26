import './App.css';
import Nvidia from './Nvidia';
import { AnimatedBackground } from 'animated-backgrounds';
function App() {
  return (
    <div className="App">
        <AnimatedBackground animationName="quantumField" />
      <Nvidia/>
    </div>
  );
}

export default App;