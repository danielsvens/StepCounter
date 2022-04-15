import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { Step } from "../types";

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
    const names: string[] = Array.from(
      new Set(tableData.map((item) => item.name))
    );

    const result: Result[] = names.map((name) => ({
      name: name,
      sum: calculateSum(name),
    }));

    const leader: Result = result.reduce((prev, current) =>
      prev.sum > current.sum ? prev : current
    );

    setLeader(leader.name);
  };

  const calculateSum = (name: string): number => {
    return tableData
      .filter((item) => item.name == name)
      .reduce((sum, current) => Number(sum) + Number(current.steps), 0);
  };

  useEffect(() => {
    calculateData();
  }, [tableData]);

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
