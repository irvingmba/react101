import { Provider } from "react-redux";
import "./App.css";
import StateApp from "./Integration/StateApp";
import store from "./State/StateManagement/Store";

function App() {
  return (
    <Provider store={store}>
      <StateApp />
    </Provider>
  );
}

export default App;
