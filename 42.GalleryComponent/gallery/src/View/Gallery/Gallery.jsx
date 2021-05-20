import { GridList, GridListTile } from "@material-ui/core";
import useStyles from "./GalleryStyles";
import { arrayOf, shape, string, number } from "prop-types";

function Gallery({ data = [] }) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <GridList
        cellHeight={"auto"}
        className={classes.gridList}
        cols={2}
        aria-label={"Picture gallery"}
      >
        {data.map((img, index) => {
          const { src, width, height } = img;
          const widthProp = width / height;
          const heightProp = height / width;
          return (
            <GridListTile
              key={src + index}
              cols={widthProp >= 2 ? 2 : 1}
              rows={heightProp >= 2 ? 2 : 1}
            >
              <img className={classes.image} src={src} alt={""} />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
}

Gallery.propTypes = {
  data: arrayOf(
    shape({
      src: string,
      width: number,
      height: number,
    })
  ),
};

export default Gallery;
