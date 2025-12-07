import "./App.css";
import CartList from "./components/CartList";
import Navbar from "./components/Navbar";
import store from "./store/store";
import PriceBox from "./components/PriceBox";
import { Provider } from "react-redux";

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