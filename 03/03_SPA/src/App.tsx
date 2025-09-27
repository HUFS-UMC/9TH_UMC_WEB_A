import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";

export default function App() {
  return (
    <div className="p-5">
      <Header />
      <Routes>
        <Route path="/min" element={<div>Min 페이지</div>} />
        <Route path="/matthew" element={<div>MATTHEW 페이지</div>} />
        <Route path="/joy" element={<div>JOY 페이지</div>} />
        <Route path="/notfound" element={<div>NOT FOUND 페이지</div>} />
      </Routes>
    </div>
  );
}
