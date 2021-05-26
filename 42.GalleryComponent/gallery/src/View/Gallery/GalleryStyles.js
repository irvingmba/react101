import { makeStyles } from "@material-ui/core/styles";

export const galColumns = 3;

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
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)",
    display: "grid",
    gridTemplateColumns: `repeat(auto-fit, minmax(calc(100%/${galColumns}), 1fr))`,
    gridTemplateRows: `auto`,
    gridAutoFlow: "dense"
  },
  doubleColTile: {
    gridColumn: "span 2",
  },
  doubleRowTile: {
    gridRow: "span 2",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

export default useStyles;
