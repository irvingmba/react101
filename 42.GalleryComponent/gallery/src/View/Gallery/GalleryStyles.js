import { makeStyles } from "@material-ui/core/styles";

const columns = 4;
const cellSizePer = 100 / columns;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    // height: 450,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
  },
  tile: {
    maxWidth: (cellSizePer * 2).toString() + "%",
  },
  image: {
    width: "100%",
    height: "auto",
  },
}));

export default useStyles;
