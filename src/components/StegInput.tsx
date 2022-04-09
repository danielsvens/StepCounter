import { Grid, TextField, MenuItem, Button, styled } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { useState } from "react";
import { Moment } from "moment";
import { StepInput } from '../types'

const styles = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  marginTop: "1rem",
};

const innerBox = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  marginTop: "1rem",
};

const defaultValues: StepInput = {
  name: "",
  steps: 0,
  date: "",
};

interface Names {
  name: string;
}

const names: Names[] = [
  {
    name: "Roya",
  },
  {
    name: "Daniel",
  },
];

const StyledButton = styled(Button)(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: "white",
  textTransform: "none",
  paddingLeft: "2ch",
  paddingRight: "2ch",
  marginTop: "1rem",
}));

interface StegInputProps {
  setData: (data: StepInput) => void;
}

const StegInput: React.FC<StegInputProps> = ({ setData }) => {
  const [formValues, setFormValues] = useState(defaultValues);
  const [pickedDate, setPickedDate] = useState<Moment | null>(null);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: !isNaN(value) ? Number(value) : value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formValues.name != "") {
      formValues.date = pickedDate?.format("DD-MM-YYYY") || '';
      setData(formValues);
    }
  };

  return (
    <Grid container spacing={2} style={innerBox}>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12} style={{ padding: "1rem" }}>
          <TextField
            id="outlined-select-currency"
            select
            name="name"
            label="Namn"
            type="text"
            value={formValues.name}
            onChange={handleInputChange}
            style={{ width: "25ch" }}
          >
            {names.map((n, index) => (
              <MenuItem key={index} value={n.name}>
                {n.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} style={{ padding: "1rem" }}>
          <TextField
            id="steg"
            name="steps"
            label="Steg"
            type="number"
            value={formValues.steps}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: "1rem" }}>
          <DatePicker
            label="Välj ett datum"
            value={pickedDate}
            onChange={(newValue) => {
              setPickedDate(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Grid>
        <Grid item xs={12} style={styles}>
          <StyledButton sx={{ boxShadow: 1 }} type="submit">Lägg till</StyledButton>
        </Grid>
      </form>
    </Grid>
  );
};

export default StegInput;
