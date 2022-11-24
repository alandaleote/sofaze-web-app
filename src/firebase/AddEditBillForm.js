import { useState } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

export default function AddEditBillForm({ handleAddBill }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createDate, setCreateDate] = useState(new Date().toISOString().split("T")[0]);
  const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
  const [isChecked, setIsChecked] = useState("");
  const [checkedDate, setCheckedDate] = useState(new Date().toISOString().split("T")[0]);
  const [user, setUser] = useState("");

  return <Box component="form" autoComplete="off">
    <Stack spacing={5} sx={{ width: "100%" }}>
      <Typography component="h3" variant="h5" textAlign="center">
        Adicionar Conta
      </Typography>
      <TextField
        id="title"
        label="Título:"
        required
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        id="description"
        label="Descrição:"
        multiline
        required
        maxRows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        id="duedate"
        type="date"
        label="Data de Vencimento:"
        required
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <TextField
        type="file"
      />
      <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ marginTop: 5 }}
      >
        Salvar
      </Button>
    </Stack>
  </Box>
}
