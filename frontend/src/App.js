import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Collection } from './components/Collection';
import { CartContainer } from './components/CartContainer';

function App() {
  localStorage.setItem('UserID', 5);
  localStorage.setItem('Name', 'Saturn King');
  return (
    <Router>
      <div className="ms-10">
        <Routes>
          <Route exact path="/" element={<Collection />} />
          <Route
            path="/viewcart"
            element={<CartContainer class="justify-content-center" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
