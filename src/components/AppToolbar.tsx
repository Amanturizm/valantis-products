import { useAppDispatch, useAppSelector } from '../app/hook';
import { setCurrentPage } from '../features/products/productsSlice';
import Preloader from './UI/Preloader/Preloader';
import arrowRightIcon from '../assets/images/arrow-right.svg';

const AppToolbar = () => {
  const dispatch = useAppDispatch();
  const { currentPage, productsLoading } = useAppSelector((state) => state.products);

  return (
    <div className="flex justify-between p-4 mobile:px-8 bg-blue-700 text-white fixed top-0 w-full z-10">
      <h1 className="text-xl sm:text-2xl">Valantis Products</h1>

      <div className="flex items-center gap-1 sm:gap-2">
        {productsLoading && <Preloader />}

        <img
          className={`w-4 h-4 rotate-180`}
          style={{ cursor: productsLoading || currentPage === 0 ? 'not-allowed' : 'pointer' }}
          src={arrowRightIcon}
          onClick={() => !productsLoading && currentPage !== 0 && dispatch(setCurrentPage('prev'))}
          alt="arrow-right-icon"
        />
        <h2 className="text-base sm:text-xl">Page {currentPage + 1}</h2>
        <img
          className={`w-4 h-4`}
          style={{ cursor: productsLoading ? 'not-allowed' : 'pointer' }}
          src={arrowRightIcon}
          onClick={() => !productsLoading && dispatch(setCurrentPage('next'))}
          alt="arrow-right-icon"
        />
      </div>
    </div>
  );
};

export default AppToolbar;
