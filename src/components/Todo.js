import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";

import IconButton from "@mui/material/IconButton";

export default function TodoList() {
  return (
    <>
      {" "}
      <Card
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
              <Typography variant="h5" sx={{ textAlign: "right" }}>
                المهمه الاولى
              </Typography>
            </Grid>
            {/* Action buttons */}
            <Grid size={4} display="flex" justifyContent="space-around" alignItems="center">
              <IconButton aria-label="delete" style={{color:"#8bc34a", background:"white", border:"solid #8bc34a 3px"}}>
                <CheckIcon />
              </IconButton>
                  <IconButton aria-label="delete" style={{color:"#8bc34a", background:"white", border:"solid #8bc34a 3px"}}>
                <CheckIcon />
              </IconButton>
                  <IconButton aria-label="delete" style={{color:"#8bc34a", background:"white", border:"solid #8bc34a 3px"}}>
                <CheckIcon />
              </IconButton>
            </Grid>
            {/* ====Action buttons ==== */}
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}
