import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout';
import Home from './pages/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
           <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}