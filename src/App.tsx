import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import VotingPage from "./pages/VotingPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redireciona de / para /votacao */}
        <Route path="/" element={<Navigate to="/votacao" />} />
        <Route path="/votacao" element={<VotingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
