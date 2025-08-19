import MyRoutes from "../src/routes/Routes.jsx";
import { BrowserRouter } from "react-router-dom";

function App() {

  return (
    <BrowserRouter>
      <MyRoutes />
    </BrowserRouter>
  )
}

export default App
