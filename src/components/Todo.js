import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

import CheckIcon from "@mui/icons-material/Check";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

import IconButton from "@mui/material/IconButton";
import { v4 as uuidv4 } from "uuid";

import { useContext, useState } from "react";
import { TodosContext } from "../contexts/todosContext";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function TodoList({ todo, handleCheck }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [updatedTodo, setUpdatedTodo] = useState({
    title: todo.title,
    details: todo.details,
  });

  const { todos, setTodos } = useContext(TodosContext);

  // EVENT HANDLERS
  function handleCheckClick() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        t.isCompleted = !t.isCompleted;
      }
      return t;
    });
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleDeleteClick() {
    setShowDeleteDialog(true);
  }

  function handleDeleteDialogClose() {
    setShowDeleteDialog(false);
  }

  function handleUpdateClick() {
    setShowUpdateDialog(true);
  }

  function handleUpdateClose() {
    setShowUpdateDialog(false);
  }

  function handleDeleteConfirm() {
    const updatedTodos = todos.filter((t) => {
      return t.id != todo.id;
    });

    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }

  function handleUpdateConfirm() {
    const updatedTodos = todos.map((t) => {
      if (t.id == todo.id) {
        return { ...t, title: updatedTodo.title, details: updatedTodo.details };
      } else {
        return t;
      }
    });
    setTodos(updatedTodos);
    setShowUpdateDialog(false);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  // == EVENT HANDLERS ==

  return (
    <>
      {/* DELETE MODEL */}

      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleDeleteDialogClose}
        open={showDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          "هل انت متاكد من رغبتك في حذف المهمه "
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            لايمكنك التراجع بعد الحذف
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>إغلاق</Button>
          <Button autoFocus onClick={handleDeleteConfirm}>
            نعم , قم بالحذف
          </Button>
        </DialogActions>
      </Dialog>
      {/* == DELETE MODEL == */}

      {/* UPDATE DIALOG  */}

      <Dialog
        style={{ direction: "rtl" }}
        onClose={handleUpdateClose}
        open={showUpdateDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="عنوان المهمة "
              fullWidth
              variant="standard"
              value={updatedTodo.title}
              onChange={(e) => {
                setUpdatedTodo({ ...updatedTodo, title: e.target.value });
              }}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="email"
              label="التفاصيل  "
              fullWidth
              variant="standard"
              value={updatedTodo.details}
              onChange={(e) => {
                setUpdatedTodo({ ...updatedTodo, details: e.target.value });
              }}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdateClose}>إغلاق</Button>
          <Button autoFocus onClick={handleUpdateConfirm}>
            تأكيد
          </Button>
        </DialogActions>
      </Dialog>

      {/*  === UPDATE DIALOG ===  */}

      <Card
        className="todoCard"
        sx={{
          minWidth: 275,
          background: "#283593",
          color: "white",
          marginTop: 5,
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid size={8}>
              <Typography
                variant="h5"
                sx={{
                  textAlign: "right",
                  textDecoration: todo.isCompleted ? "line-through" : "none",
                }}
              >
                {todo.title}
              </Typography>

              <Typography variant="h6" sx={{ textAlign: "right" }}>
                {" "}
                {todo.details}{" "}
              </Typography>
            </Grid>
            {/* Action buttons */}
            <Grid
              size={4}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              {/* CHECK Icon button */}

              <IconButton
                onClick={() => {
                  handleCheckClick();
                }}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: todo.isCompleted ? "white" : "#8bc34a",
                  background: todo.isCompleted ? "#8bc34a" : "white",
                  border: "solid #8bc34a 3px",
                }}
              >
                <CheckIcon />
              </IconButton>

              {/* == CHECK Icon button=== */}

              <IconButton
                onClick={handleUpdateClick}
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#17769aa",
                  background: "white",
                  border: "solid #17769aa 3px",
                }}
              >
                <EditOutlinedIcon />
              </IconButton>
              {/*=== Update button === */}
              {/* DELETE BUTTON */}
              <IconButton
                className="iconButton"
                aria-label="delete"
                style={{
                  color: "#b23c17",
                  background: "white",
                  border: "solid #b23c17 3px",
                }}
                onClick={handleDeleteClick}
              >
                <DeleteOutlineOutlinedIcon />
              </IconButton>
              {/* DELETE BUTTON */}
            </Grid>
            {/* ====Action buttons ==== */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
