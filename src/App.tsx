import AppToolbar from './components/AppToolbar';
import Products from './features/products/Products';

const App = () => (
  <>
    <header>
      <AppToolbar />
    </header>

    <main className="px-4 mobile:px-8 pt-28">
      <Products />
    </main>
  </>
);

export default App;
