import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Collection } from './components/Collection';
import { CartContainer } from './components/CartContainer';

function App() {
  return (
    <Router>
      <div className="ms-10">
        <Routes>
          <Route exact path="/" element={<Collection />} />
          <Route
            exact
            path="/viewcart"
            element={<CartContainer class="justify-content-center" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
