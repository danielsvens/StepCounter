import { Box, Typography } from "@mui/material";
import { table } from "console";
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
  const [players, setPlayers] = useState<Result[]>([]);
  const [leader, setLeader] = useState<String>("");

  const calculateData = () => {
    if(tableData.length == 0){
      return;
    }

    const names: string[] = Array.from(
      new Set(tableData.map((item) => item.name))
    );

    const players: Result[] = names.map((name) => ({
      name: name,
      sum: calculateSum(name),
    }));

    const leader: Result = players.reduce((prev, current) =>
      prev.sum > current.sum ? prev : current
    );

    setPlayers(players);
    setLeader(leader.name);
  };

  const calculateSum = (name: string): number => {
    return tableData
      .filter((item) => item.name === name)
      .reduce((sum, current) => Number(sum) + Number(current.steps), 0);
  };

  const findDifference = (players: Result[] | []): Number => {
    if (leader === "") {
      return 0;
    }

    if (players.length === 1) {
      return Number(players[0].sum)
    }

    const secondSteps: Result = players
      .filter((item) => item.name !== leader)
      .reduce((prev, current) => (prev.sum > current.sum ? prev : current));

    const leaderSteps: Result | undefined = players.find((item) => item.name === leader);

    return Math.abs(Number(secondSteps.sum) - Number(leaderSteps?.sum));
  };

  useEffect(() => {
    calculateData();
  }, [tableData]);

  return (
    <Box style={styles}>
      <Typography variant="h5">
        {leader} leder med {findDifference(players)} steg
      </Typography>
    </Box>
  );
};

export default SumCounter;
