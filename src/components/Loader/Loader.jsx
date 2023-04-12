import { createPortal } from 'react-dom';
import { Watch } from 'react-loader-spinner';
import css from './Loader.module.css';

const spinnerRoot = document.querySelector('#spinner-root');

export const Loader = () => {
  return createPortal(
    <div className={css.backdrop}>
      <div className={css.spinner}>
        <Watch
          height="80"
          width="80"
          radius="48"
          color="#3f51b5"
          ariaLabel="watch-loading"
          wrapperStyle=""
          wrapperClassName=""
          visible={true}
        />
      </div>
    </div>,
    spinnerRoot
  );
};
