import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { StepInput, Step } from '../types';

interface PlayerValuesProps {
  tableData: Step[];
}

interface Result {
  name: string;
  sum: number;
}

const styles = {
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  marginTop: "2rem",
};

const SumCounter: React.FC<PlayerValuesProps> = ({ tableData }) => {
  const [danielResult, setDanielResult] = useState<Result>({} as Result);
  const [royaResult, setRoyaResult] = useState<Result>({} as Result);
  const [leader, setLeader] = useState<String>();

  const calculateData = () => {
    const royaResult: Result = {
      name: "Roya",
      sum: calculateSum("Roya"),
    };

    const danielResult: Result = {
      name: "Daniel",
      sum: calculateSum("Daniel"),
    };

    setDanielResult(danielResult);
    setRoyaResult(royaResult);
  };

  useEffect(() => {
    calculateData();
  }, [tableData]);

  useEffect(() => {
    if (danielResult.sum < royaResult.sum) {
      setLeader(royaResult.name);
    }
  }, [royaResult]);

  useEffect(() => {
    if (danielResult.sum > royaResult.sum) {
      setLeader(danielResult.name);
    }
  }, [danielResult]);

  const calculateSum = (name: string): number => {
    return tableData
      .filter((item) => item.name == name)
      .reduce((sum, current) => Number(sum) + Number(current.steps), 0);
  };

  return (
    <Box style={styles}>
      <Typography variant="h5">
        {leader} leder med{" "}
        {Math.abs(Number(danielResult.sum) - Number(royaResult.sum))} steg
      </Typography>
    </Box>
  );
};

export default SumCounter;
