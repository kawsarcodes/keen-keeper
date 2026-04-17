import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import FriendDetail from './pages/FriendDetail';
import Home from './pages/Home';
import Timeline from './pages/Timeline';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
           <Route index element={<Home />} />
           <Route path="friend/:id" element={<FriendDetail />} />
           <Route path="timeline" element={<Timeline />} />
        </Route>
      </Routes>
    </Router>
  );
}