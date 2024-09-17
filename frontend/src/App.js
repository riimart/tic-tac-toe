import { BrowserRouter, Routes, Route } from "react-router-dom";

// pages & components
import Home from "./pages/Home";
import NewGame from "./pages/NewGame";
import TicTacToe from "./pages/TicTacToe";

function App() {
  return (
    <div className="App">
      <div className="pages">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new-game" element={<NewGame />} />
            <Route path="/game/:matchId" element={<TicTacToe />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
