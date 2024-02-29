import { useAppDispatch, useAppSelector } from '../app/hook';
import { setCurrentPage } from '../features/products/productsSlice';
import arrowRightIcon from '../assets/images/arrow-right.svg';

const AppToolbar = () => {
  const dispatch = useAppDispatch();
  const { currentPage } = useAppSelector((state) => state.products);

  return (
    <div className="flex justify-between px-8 py-4 bg-blue-700 text-white fixed top-0 w-full z-10">
      <h1 className="text-2xl">Valantis Products</h1>

      <div className="flex items-center gap-2">
        <img
          className={`w-6 h-6 rotate-180 cursor-${currentPage === 0 ? 'not-allowed' : 'pointer'}`}
          src={arrowRightIcon}
          onClick={() => currentPage !== 0 && dispatch(setCurrentPage('prev'))}
          alt="arrow-right-icon"
        />
        <h2 className="text-2xl">Page {currentPage + 1}</h2>
        <img
          className="w-6 h-6 cursor-pointer"
          src={arrowRightIcon}
          onClick={() => dispatch(setCurrentPage('next'))}
          alt="arrow-right-icon"
        />
      </div>
    </div>
  );
};

export default AppToolbar;
