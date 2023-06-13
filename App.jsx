import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import "./App.scss";
 
export default function App() {
  // Any .tsx or .jsx files in /pages will become a route
  // See documentation for <Routes /> for more info
  const pages = import.meta.globEager("./pages/**/!(*.test.[jt]sx)*.([jt]sx)");

  return (
      <BrowserRouter>
            <Routes pages={pages} />
      </BrowserRouter>
  );
}
