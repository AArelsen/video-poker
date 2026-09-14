import {Route, Routes} from 'react-router';
import { Navigation } from './components/Navigation/Navigation';
import { GamePage } from './pages/GamePage';
import { PlayersPage } from './pages/PlayersPage';
import { RulesPage } from './pages/RulesPage';
import './App.css';

function App () {
  return(
    <div className="app">
      <Navigation />
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/players" element={<PlayersPage />} />
        <Route path= "rules" element={<RulesPage />}/>        
      </Routes>
    </div>
  );
}
export default App;