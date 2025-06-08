import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes";

function App() {
  return (
    <Router>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
