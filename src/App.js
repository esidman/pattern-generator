import "./App.css";
import Header from "./Components/Header";
import DrawingTools from "./Components/DrawingTools";
import CanvasContainer from "./Components/CanvasContainer";

function App() {
  return (
    <div className="App">
      <Header />
      <DrawingTools />
      <CanvasContainer />
    </div>
  );
}

export default App;
