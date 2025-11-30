import { useReducer, useState, type ChangeEvent } from "react";

interface IState {
  department: string;
  error: string | null;
}

interface IAction {
  type: "CHANGE_DEPARTMENT" | "RESET";
  payload?: string;
}

function reducer(state: IState, action: IAction): IState {
  const { type, payload } = action;

  switch (type) {
    case "CHANGE_DEPARTMENT": {
      const newDepartment = payload;
      const hasError = newDepartment !== "카드메이커";
      return {
        ...state,
        department: hasError ? state.department : newDepartment,
        error: hasError ? "카드메이커만 지원 가능합니다." : null,
      };
    }
    default:
      return state;
  }
}

export default function UseReducerCompany() {
  const [state, dispatch] = useReducer(reducer, {
    department: "Software Developer",
    error: null,
  });

  const [department, setDepartment] = useState("");

  const handleChangeDepartment = (e: ChangeEvent<HTMLInputElement>) => {
    setDepartment(e.target.value);
  };

  return (
    <div>
      <h1>{state.department}</h1>
      {state.error && <p className="text-red-500 font-2xl">{state.error}</p>}
      <input
        className="w-[600px] border mt-10 p-4 rounded-md"
        placeholder="변경하고 싶은 직무 입력"
        value={department}
        onChange={handleChangeDepartment}
      />
      <button
        onClick={() =>
          dispatch({ type: "CHANGE_DEPARTMENT", payload: department })
        }
      >
        직무 변경
      </button>
    </div>
  );
}
