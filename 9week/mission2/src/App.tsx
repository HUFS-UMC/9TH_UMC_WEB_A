import { Provider } from "react-redux";
import CartList from "./components/CartList";
import NavBar from "./components/NavBar";
import store from "./store/store";
import PriceBox from "./components/PriceBox";
import Modal from "./components/Modal";  // ★ 추가

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <CartList />
      <PriceBox />
      <Modal /> {/* ★ 모달은 Provider 안/root 아래 */}
    </Provider>
  );
}

export default App;
