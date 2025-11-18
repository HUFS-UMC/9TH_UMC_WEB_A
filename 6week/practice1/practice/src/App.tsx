import './App.css';
import WelcomeData from './components/useDataDisplay'; // ✅ default export로 불러오기

export function App() {
  return <WelcomeData />; // ✅ 대문자 그대로
}

export default App;