import ButtonGroup from "./components/ButtonGroup";
import { useCount } from "./context/CounterProvider";

function App() {
  // const context = useContext(CounterContext);
  // const context = useCount();
  const { count } = useCount();

  return (
    <>
      <h1>{count}</h1>
      <ButtonGroup
      // CounterProvider.tsx > context가 없는 경우의 에러 처리함.
      // handleIncrement={context.handleIncrement}
      // handleDecrement={context.handleDecrement}
      />
    </>
  );
}

export default App;
