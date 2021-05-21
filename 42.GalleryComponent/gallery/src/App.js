// import logo from "./logo.svg";
import Gallery from "./View/Gallery";
import getImages from "./Services/getImages";
import { useEffect, useReducer, useState } from "react";
// import useStyles from "./AppStyles";

function reducer(state = {}, action) {
  switch (action.type) {
    case "current": {
      return { ...state, current: action.payload };
    }
    case "previous": {
      return { ...state, previous: action.payload };
    }
    case "next": {
      return { ...state, next: action.payload };
    }
    case "buttons": {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
}
function action(type, payload) {
  return { type, payload };
}

function App() {
  // const classes = useStyles();
  const [page, setPage] = useState(1);
  const [bottom, setBottom] = useState(false);
  const [nextBtn, setNextBtn] = useState(null);
  const [state, dispatch] = useReducer(reducer, { current: {} });

  useEffect(() => {
    async function asyncGetImages() {
      const _resp = await getImages("g1", 10, page);
      const data = _resp.data;
      if (!state.current.images) dispatch({ type: "current", payload: data });
      if (bottom) {
        const prev = await getImages("g1", 10, page - 1);
        const next = await getImages("g1", 10, page + 1);
        const prevData = prev && "data" in prev ? prev.data : {};
        const nextData = next && "data" in next ? next.data : {};
        dispatch(action("buttons", { previous: prevData, next: nextData }));
      }
    }
    asyncGetImages();
  }, [bottom]);

  return (
    <div className={"App"}>
      <Gallery
        data={state.current.images}
        prevBtn={bottom ? "previous" : null}
        nextBtn={bottom ? "next" : null}
        bottomReached={setBottom}
      />
    </div>
  );
}

export default App;
