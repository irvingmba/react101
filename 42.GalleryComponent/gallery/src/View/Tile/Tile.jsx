import { GridListTile } from "@material-ui/core";
import { string, number } from "prop-types";

function Tile({
  src = "https://i.pinimg.com/originals/dd/e2/c0/dde2c055c5275fb38fd39d9d2ebdf287.jpg",
  width = 200,
  height = 200,
}) {
  const widthProp = width / height;
  const heightProp = height / width;
  console.log(widthProp, heightProp);
  return (
    <GridListTile cols={widthProp >= 2 ? 2 : 1} rows={heightProp >= 2 ? 2 : 1}>
      <img src={src} alt={""} />
    </GridListTile>
  );
}

Tile.propTypes = {
  src: string.isRequired,
  width: number.isRequired,
  height: number.isRequired,
};

export default Tile;
