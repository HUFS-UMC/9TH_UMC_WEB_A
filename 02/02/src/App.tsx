import ButtonGroup from "./components/ButtonGroup.tsx";
import { useCount } from "./context/CounterProvider.tsx";

function App() {
  const { count } = useCount();

  return (
    <>
      <h1>{count}</h1>
      <ButtonGroup />
    </>
  );
}

export default App;
