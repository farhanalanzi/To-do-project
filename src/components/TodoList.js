import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider, { dividerClasses } from "@mui/material/Divider";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import FormatAlignJustifyIcon from "@mui/icons-material/FormatAlignJustify";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import Todo from "./Todo";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
//others
import { TodosContext } from "../contexts/todosContext";
import { useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

//Components

export default function TodoList() {
  const value = useContext(TodosContext);
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("All");

  // FILTERATION ARRAYS

  const completedTodos = todos.filter((t) => {
    return t.isCompleted;
  });
  const notCompletedTodos = todos.filter((t) => {
    return !t.isCompleted;
  });

  let todosToBeRenderd = todos;

  if (displayedTodosType == "completed") {
    todosToBeRenderd = completedTodos;
  } else if (displayedTodosType == "non-completed") {
    todosToBeRenderd = notCompletedTodos;
  } else {
    todosToBeRenderd = todos;
  }

  const todosJSX = todosToBeRenderd.map((t) => {
    return <Todo key={t.id} todo={t} />;
  });

  useEffect(() => {
    console.log("calling use effect");
    const storageTodos = JSON.parse(localStorage.getItem("todos")) ?? [];
    setTodos(storageTodos);
  }, []);

  function changeDisplayedType(e) {
    setDisplayedTodosType(e.target.value);
  }

  function handleAddClick() {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      details: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
  }

  return (
    <Container maxWidth="sm">
      <Card
        sx={{ minWidth: 275 }}
        style={{
          maxHeight: "80vh",
          overflow: "scroll",
        }}
      >
        <CardContent>
          <Typography variant="h2" style={{ fontWeight: "bold" }}>
            مهامي
          </Typography>
          <Divider />
          {/* FILTER BUTTONS */}
          <ToggleButtonGroup
            style={{ direction: "ltr", marginTop: "30px" }}
            value={displayedTodosType}
            exclusive
            onChange={changeDisplayedType}
            aria-label="text alignment"
            color="primary"
          >
            <ToggleButton value="non-completed">غير منجز</ToggleButton>
            <ToggleButton value="completed">المنجز</ToggleButton>
            <ToggleButton value="all">الكل</ToggleButton>
          </ToggleButtonGroup>

          {/* === FILTER BUTTONS ===  */}

          {/* All TODOS */}
          {todosJSX}

          {/*  === All TODOS  ===== */}

          {/* Input + add button */}
          <Grid container style={{ marginTop: "20px" }} spacing={2}>
            <Grid
              item
              size={8}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              style={{ background: "" }}
            >
              <TextField
                style={{ width: "100%" }}
                id="outlined-basic"
                label="عنوان المهمه"
                variant="outlined"
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                }}
              />
            </Grid>

            <Grid
              item
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
              style={{ background: "orange" }}
            >
              <Button
                style={{ width: "100%", height: "100%" }}
                variant="contained"
                onClick={() => {
                  handleAddClick();
                }}
                disabled={titleInput.length == 0}
              >
                إضافة
              </Button>
            </Grid>
          </Grid>

          {/*==== Input + add button ===*/}
        </CardContent>
      </Card>
    </Container>
  );
}
