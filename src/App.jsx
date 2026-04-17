import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
           <Route index element={<div className="font-bold">Hello</div>} />
        </Route>
      </Routes>
    </Router>
  );
}