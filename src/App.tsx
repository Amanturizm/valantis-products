import AppToolbar from './components/AppToolbar';
import Products from './features/products/Products';

const App = () => (
  <>
    <header>
      <AppToolbar />
    </header>

    <main className="px-8 mt-24">
      <Products />
    </main>
  </>
);

export default App;
