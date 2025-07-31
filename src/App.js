import "./App.css";
import "./components/TodoList.js";
import TodoList from "./components/TodoList.js";
function App() {
  return (
    <div
      className="App"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#191b1f",
        height: "100vh",
        direction: "rtl",
      }}
    >
      <TodoList />
    </div>
  );
}

export default App;
