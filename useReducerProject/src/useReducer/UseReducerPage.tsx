import { useReducer, useState } from "react";

// state에 대한 interface
interface IState {
  counter: number;
}

interface IAction {
  type: "INCREASE" | "DECREASE" | "RESET_TO_ZERO";
  payload?: number;
}

function reducer(state: IState, action: IAction): IState {
  const { type } = action;
  switch (type) {
    case "INCREASE":
      return { ...state, counter: state.counter + 1 };
    case "DECREASE":
      return { ...state, counter: state.counter - 1 };
    case "RESET_TO_ZERO":
      return { ...state, counter: 0 };
    default:
      return state;
  }
}

export default function UseReducerPage() {
  // 1. useState를 사용하여 count 상태 관리
  const [count, setcount] = useState(0);

  // 2. useReducer를 사용하여 count 상태 관리
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  const handleIncrese = () => {
    setcount(count + 1);
  };
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h2 className="text-3xl">useState</h2>
        <h2>useState훅 사용: {count}</h2>
        <button onClick={handleIncrese}>Increase</button>
      </div>
      <div>
        <h2 className="text-3xl">useReducer</h2>
        <h2>useReducer훅 사용: {state.counter}</h2>
        <button onClick={() => dispatch({ type: `INCREASE`, payload: 3 })}>
          Increase
        </button>
        <button onClick={() => dispatch({ type: `DECREASE`, payload: 3 })}>
          Decrease
        </button>
        <button onClick={() => dispatch({ type: `RESET_TO_ZERO`, payload: 3 })}>
          Reset to Zero
        </button>
      </div>
    </div>
  );
}
