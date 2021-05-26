import { GridList, GridListTile } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import { default as useStyles } from "./GalleryStyles";
import { arrayOf, shape, string, number } from "prop-types";

function Gallery({ data = [], pages = 0, page = 0, handlePage = null }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList
        cellHeight={"auto"}
        className={classes.gridList}
        cols={1}
        aria-label={"Picture gallery"}
      >
        {data && data.length
          ? data.map((img, index) => {
              const { src, width, height } = img;
              const widthProp = width / height;
              const heightProp = height / width;
              return (
                <GridListTile
                  key={src + index}
                  cols={1}
                  rows={1}
                  className={
                    widthProp >= 2
                      ? classes.doubleColTile
                      : heightProp >= 2
                      ? classes.doubleRowTile
                      : null
                  }
                >
                  <img className={classes.image} src={src} alt={""} />
                </GridListTile>
              );
            })
          : null}
      </GridList>
      <Pagination
        count={pages}
        variant="outlined"
        color="primary"
        page={page}
        onChange={handlePage}
      />
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
  pages: number,
  page: number,
};

export default Gallery;
