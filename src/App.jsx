import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<div className="p-8">Helo world</div>} />
      </Routes>
    </Router>
  );
}