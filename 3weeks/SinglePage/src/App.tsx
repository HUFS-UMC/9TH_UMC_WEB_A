// src/App.tsx
import { Router } from "./router";
import HomePage from "./pages/HomePage";
import Nav from "./pages/Nav"; // ← pages가 아니라 components에 둔 경우

const routes = [{ path: "/", element: <HomePage /> }];

export default function App() {
  return (
    <div>
      <Nav />               {/* 맨 위에 고정 */}
      <Router routes={routes} />
    </div>
  );
}
