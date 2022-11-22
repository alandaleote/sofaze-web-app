import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
  inputLabel: {
    margin: theme.spacing(1),
    top: "-1.2rem",
    left: "-1.2rem",
  },
  select: {
    background: "white",
  },
}));

export default function SelectedCategories(props) {
  const categories = [
    { id: "Alimentação", text: "Alimentação" },
    { id: "Tranporte", text: "Transporte" },
    { id: "Contas Pagas", text: "Contas Pagas" },
  ];

  const classes = useStyles();
  const [category, setCategory] = useState(categories[0].id);

  const handleChange = (event) => {
    const name = event.target.name;
    setCategory(name);
  };

  const handleClick = (event) => {
    setCategory(event.target.value);
  };

  console.log(category);

  return (
    <div>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel className={classes.inputLabel}>Categorias</InputLabel>
        <Select
          fullWidth
          className={classes.select}
          native
          value={category}
          onChange={handleChange}
        >
          {categories.length > 0 &&
            categories?.map((category, index) => {
              return (
                <option
                  key={index}
                  value={category?.id}
                  name={category.text}
                  onClick={handleClick}
                >
                  {category.text}
                </option>
              );
            })}
        </Select>
      </FormControl>
    </div>
  );
}
