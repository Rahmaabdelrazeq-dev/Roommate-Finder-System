import { AppRouter } from './routes';
import { FilterProvider } from './shared/context/FilterContext';

function App() {
  return (
    <div className="app-container">
      <FilterProvider>
        <AppRouter />
      </FilterProvider>
    </div>
  );
}

export default App;