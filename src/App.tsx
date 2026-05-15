import { AppRouter } from './routes';
import { FilterProvider } from './shared/context/FilterContext';
import { FavoritesProvider } from './shared/context/FavoritesContext';

function App() {
  return (
    <div className="app-container">
      <FavoritesProvider>
        <FilterProvider>
          <AppRouter />
        </FilterProvider>
      </FavoritesProvider>
    </div>
  );
}

export default App;