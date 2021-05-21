import { Button, GridList, GridListTile } from "@material-ui/core";
import useStyles from "./GalleryStyles";
import { arrayOf, shape, string, number, func } from "prop-types";
import { useEffect } from "react";

function Gallery({
  data = [],
  prevBtn = null,
  nextBtn = null,
  bottomReached = null,
  prevBtnClick = null,
  nextBtnClick = null
}) {
  const classes = useStyles();


  function handleScroll(event) {
    const scrollTop = event.srcElement.scrollingElement.scrollTop;
    const scrollTopMax = event.srcElement.scrollingElement.scrollTopMax;
    if (scrollTop === scrollTopMax) {
      console.log("bottom reached");
      if(bottomReached && typeof bottomReached === "function") bottomReached(true);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return function clear() {
      window.removeEventListener("scroll", handleScroll);
    };
  });

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
      {prevBtn ? (
        <Button variant={"contained"} color={"primary"} onClick={prevBtnClick}>
          {prevBtn}
        </Button>
      ) : null}
      {nextBtn ? (
        <Button variant={"contained"} color={"primary"} onClick={nextBtnClick}>
          {nextBtn}
        </Button>
      ) : null}
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
  prevBtn: string,
  nextBtn: string,
  bottomReached: func,
  prevBtnClick: func,
  nextBtnClick: func
};

export default Gallery;
