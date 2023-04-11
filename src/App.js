import './App.css';
import Canvas from './model/Canvas';

function App() {
  return (
    <Canvas
      width="501"
      height="501"
      color="red"
      image="http://petrlhotsky.wz.cz/falls.jpg"
      grid="3">
    </Canvas>
  )
}

export default App
