import { Button } from "@material-ui/core";
import { string } from "prop-types";

export default function ChangePageBtn({ text }) {
  return text ? <Button variant={"contained"} color={"primary"}>{text}</Button> : null;
}

ChangePageBtn.propTypes = { text: string };
