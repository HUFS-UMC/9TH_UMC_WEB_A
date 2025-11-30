import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store from "./store/store";
import PriceBox from "./components/PriceBox";

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <PriceBox />
    </Provider>
  );
}

export default App;

//Provider :리액트는 각 컴포넌트가 독립 ->provider를 통해서 이 store를 모든 컴포넌트에서 쓰도록 허락”하는 과정이
