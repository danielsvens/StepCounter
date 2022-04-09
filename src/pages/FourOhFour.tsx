import { Box, Typography } from "@mui/material";
import { OOPS } from "../constants";

const FourOhFour: React.FunctionComponent = () => {
  const styles = {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    marginTop: "10%",
  };

  const emoji: string = OOPS[Math.floor(Math.random() * OOPS.length)];

  return (
    <Box style={styles}>
      <Typography variant="h3">
        Oops.. this page could not be found {emoji}
      </Typography>
    </Box>
  );
};

export default FourOhFour;
