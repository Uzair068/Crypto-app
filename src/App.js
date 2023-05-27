import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './components/Header';
import Home from './components/Home';
import Coins from './components/Coins';
import Exchanges from './components/Exchanges';
import CoinDetails from './components/CoinDetails';

function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/coins' element={<Coins/>}/>
      <Route path='/exchange' element={<Exchanges/>}/>
      <Route path='/coin/:id' element={<CoinDetails/>}/>
    </Routes>
    </BrowserRouter>
      
    </>
  );
}

export default App;
