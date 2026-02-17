import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { SpotList } from './pages/SpotList';
import { SpotDetail } from './pages/SpotDetail';
import { ReviewWrite } from './pages/ReviewWrite';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spots" element={<SpotList />} />
        <Route path="/spots/:id" element={<SpotDetail />} />
        <Route path="/spots/:id/review" element={<ReviewWrite />} />
      </Routes>
    </Router>
  );
}

export default App;
