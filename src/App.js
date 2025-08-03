import { orange } from "@mui/material/colors";
import "./App.css";
import "./components/TodoList.js";
import TodoList from "./components/TodoList.js";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme({
  typography: {
    fontFamily:[
      "Alexandria"
    ]
  }
});
function App() {
  return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
  );
}

export default App;
