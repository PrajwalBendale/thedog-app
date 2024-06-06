import Home from "./home";
import DogInfo from "./dogInfo";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container-fluid">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/info/:text" element={<DogInfo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
