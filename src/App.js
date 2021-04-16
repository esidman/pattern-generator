import "./App.css";
import Header from "./Components/Header";
import DrawingTools from "./Components/DrawingTools";
import CanvasContainer from "./Components/CanvasContainer";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="body-container">
        <DrawingTools />
        <CanvasContainer />
      </div>
    </div>
  );
}

export default App;
