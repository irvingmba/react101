import { GridList, GridListTile } from "@material-ui/core";
import useStyles from "./GalleryStyles";

function Gallery(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
          <GridList cellHeight={160} className={classes.gridList} cols={3}>
            {tileData.map((tile) => (
              <GridListTile key={tile.img} cols={tile.cols || 1}>
                <img src={tile.img} alt={tile.title} />
              </GridListTile>
            ))}
          </GridList>
        </div>
      );
};