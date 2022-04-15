import { Box, styled, Typography } from "@mui/material";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterMoment from "@mui/lab/AdapterMoment";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import StegInput from "../components/StegInput";
import SumCounter from "../components/SumCounter";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { Step, StepInput } from "../types";

const tableContainerStyle = {
  justifyContent: "center",
  alignItems: "center",
  display: "block",
  maxWidth: 800,
  maxHeight: 320,
  overflow: 'overlay',
  border: '1px solid #212121',
};

const topStyle = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  marginTop: "3%",
};

const tableBoxStyle = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  marginTop: "2%"
};

const tableRowStyle = {
  paddingLeft: "1rem",
  minWidth: 261,
};

const tableBody = {
  overflow: 'none'
};

const Overview: React.FunctionComponent = () => {
  const [tableDataList, setTableDataList] = useState<Step[]>([]);
  const [getAllSteps] = useLazyQuery(getAllStepsQuery, {
    errorPolicy: "all",
    fetchPolicy: "cache-and-network",
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      setTableDataList(data.listAllSteps);
    },
  });

  const [createStep] = useMutation(createStepMutation, {
    onError: (error) => {
      console.log(error);
    },
    onCompleted: (data) => {
      const newList: Step[] = tableDataList.concat(data);
      setTableDataList(newList);
    },
  });

  function createData(data: StepInput) {
    createStep({ variables: { input: data } });
  }

  useEffect(() => {
    getAllSteps();
  }, []);

  useEffect(() => {
    getAllSteps();
  }, [tableDataList]);

  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Box style={topStyle}>
          <Typography variant="h3">Steg Räknaren</Typography>
        </Box>
        <Box>
          <StegInput setData={(data) => createData(data)} />
        </Box>
        <Box>
          <SumCounter tableData={tableDataList} />
        </Box>
        <Box style={tableBoxStyle}>
          <TableContainer component={Paper} style={tableContainerStyle} sx={{ boxShadow: 3 }}>
            <Table stickyHeader={true}>
              <TableHead style={tableBody}>
                <TableRow style={tableRowStyle}>
                  <TableCell style={tableRowStyle}>Namn</TableCell>
                  <TableCell component="th" scope="row" style={tableRowStyle}>
                    Datum
                  </TableCell>
                  <TableCell style={tableRowStyle} align="right">
                    Steg
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody style={tableBody}>
                {tableDataList.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row" style={tableRowStyle}>
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row" style={tableRowStyle}>
                      {row.date}
                    </TableCell>
                    <TableCell style={tableRowStyle} align="right">
                      {row.steps}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </LocalizationProvider>
    </div>
  );
};

const getAllStepsQuery = gql`
  query listRows {
    listAllSteps {
      name
      date
      steps
    }
  }
`;

const createStepMutation = gql`
  mutation createSteps($input: StepInput) {
    createSteps(input: $input) {
      name
      date
      steps
    }
  }
`;

export default Overview;
