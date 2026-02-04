import { Routes, Route } from 'react-router-dom';
// Using the full path to the file inside the folder
import HomePage from './pages/HomePage/HomePage';
import PetPage from './pages/PetPage/PetPage';
import PetSelection from './pages/PetSelection/PetSelection';
import { PetProvider } from './context/PetContext';

function App() {
  return (

    <PetProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/select" element={<PetSelection />} />
        <Route path="/pet" element={<PetPage />} />
      </Routes>

    </PetProvider>
  );
}

export default App;