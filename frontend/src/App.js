import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Homepage from './pages/Homepage';
import Buoy from './pages/buoy';
import Menu from './components/Navigation';

function App() {
  return (
    <>
      <BrowserRouter>
        <header>Buoy Data Finder</header>

        <main>
          <section>
            <Routes>
              <Route path = "/" element = { <Homepage /> }/>
              <Route path = "/buoyDisplay" element = { <Buoy />}/>
            </Routes>
          </section>
        </main>
      <Menu/>
      </BrowserRouter>
    </>
  );
}

export default App;
