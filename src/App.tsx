import { Route, Routes } from 'react-router-dom';
import './App.css';
import CountryDtls from './CountryDtls';
import CountryList from './CountryList';
import { AppStateProvider } from './hooks/useAppState';
function App() {
  return (
    <AppStateProvider>
      <Routes>
        <Route path="/" element={<CountryList />} />
        <Route path="/:id" element={<CountryDtls />} />
      </Routes>
    </AppStateProvider>
  );
}

export default App;
