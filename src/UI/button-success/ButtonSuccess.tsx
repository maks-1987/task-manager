import React, { useState } from 'react';
import { localeEN } from '../../locales/localeEN';
import { useAppSelector } from '../../redux/hooks';
import './buttonSuccess.css';

interface IProp {
  isValid?: boolean;
}

export default function ButtonSuccess(props: IProp) {
  const { isValid } = props;
  const isCreateBoard = useAppSelector((state) => state.modalSlice.isCreateBoard);
  const isCreateColumn = useAppSelector((state) => state.modalSlice.isCreateColumn);
  const [toolTip, setToolTip] = useState<string>('');
  const showToolTip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    !isValid && isCreateBoard
      ? setToolTip(localeEN.tooTipContent.ADD_BOARD_TOOLTIP_MESSAGE[state.languageIndex])
      : !isValid && isCreateColumn
      ? setToolTip(localeEN.tooTipContent.ADD_COLUMN_TOOLTIP_MESSAGE[state.languageIndex])
      : null;
  };
  const hideToolTip = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    !isValid && setToolTip('');
  };
  const state = useAppSelector((store) => store.settingsSlise);
  return (
    <>
      <button
        disabled={!isValid}
        className="create-board-form__add-board-button"
        onMouseOver={(e: React.MouseEvent<HTMLButtonElement>) => showToolTip(e)}
        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => hideToolTip(e)}
        title={localeEN.tooltips.CONFIRM_MESSAGE[state.languageIndex]}
      >
        <div className="create-board-form__add-board-button_tooltip">{toolTip}</div>
        <svg
          className="add-board-button__yes"
          fill="#000000"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 50"
          width="40px"
          height="40px"
        >
          <path d="M 42.875 8.625 C 42.84375 8.632813 42.8125 8.644531 42.78125 8.65625 C 42.519531 8.722656 42.292969 8.890625 42.15625 9.125 L 21.71875 40.8125 L 7.65625 28.125 C 7.410156 27.8125 7 27.675781 6.613281 27.777344 C 6.226563 27.878906 5.941406 28.203125 5.882813 28.597656 C 5.824219 28.992188 6.003906 29.382813 6.34375 29.59375 L 21.25 43.09375 C 21.46875 43.285156 21.761719 43.371094 22.050781 43.328125 C 22.339844 43.285156 22.59375 43.121094 22.75 42.875 L 43.84375 10.1875 C 44.074219 9.859375 44.085938 9.425781 43.875 9.085938 C 43.664063 8.746094 43.269531 8.566406 42.875 8.625 Z" />
        </svg>
      </button>
    </>
  );
}
