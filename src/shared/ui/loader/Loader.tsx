import { List } from "react-content-loader";

const Loader = () => (
  <>
    <List
    //   style={{ width: "888px", height: "368px" }}
      style={{ width: "100%", height: "auto" }}
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    />
    <List
      style={{ width: "888px", height: "368px" }}
      speed={2}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    />
  </>
);

export default Loader;