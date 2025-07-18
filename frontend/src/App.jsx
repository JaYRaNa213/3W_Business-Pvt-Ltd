// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import ClaimHistoryPage from "./pages/ClaimHistoryPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history/:userId" element={<ClaimHistoryPage />} />
      </Routes>
    </Router>
  );
}

export default App;
