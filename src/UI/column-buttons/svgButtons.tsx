import { localeEN } from '../../locales/localeEN';
import { useAppSelector } from '../../redux/hooks';

export const AddTaskSVG = () => {
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="512"
      height="512"
      viewBox="0 0 512 512"
    >
      <title>{localeEN.tooltips.ADD_TASK[languageIndex]}</title>
      <g id="icomoon-ignore"></g>
      <path fill="#000" d="M512 192h-192v-192h-128v192h-192v128h192v192h128v-192h192z"></path>
    </svg>
  );
};

export const DeleteColumnSVG = () => {
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
    >
      <title>{localeEN.tooltips.DELETE_COLUMN[languageIndex]}</title>
      <g id="icomoon-ignore"></g>
      <path
        fill="#000"
        d="M256 832c0 52.992 42.976 96 96 96h320c52.992 0 96-43.008 96-96l64-512h-640l64 512zM608 416h64v416h-64v-416zM480 416h64v416h-64v-416zM352 416h64v416h-64v-416zM816 192h-208c0 0-14.336-64-32-64h-128c-17.696 0-32 64-32 64h-208c-26.528 0-48 21.472-48 48s0 48 0 48h704c0 0 0-21.472 0-48s-21.504-48-48-48z"
      ></path>
    </svg>
  );
};

export const DeleteTaskSVG = () => {
  const { languageIndex } = useAppSelector((state) => state.settingsSlice);
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="1024"
      height="1024"
      viewBox="0 0 1024 1024"
    >
      <title>{localeEN.tooltips.DELETE_TASK[languageIndex]}</title>
      <g id="icomoon-ignore"></g>
      <path
        fill="#000"
        d="M256 832c0 52.992 42.976 96 96 96h320c52.992 0 96-43.008 96-96l64-512h-640l64 512zM608 416h64v416h-64v-416zM480 416h64v416h-64v-416zM352 416h64v416h-64v-416zM816 192h-208c0 0-14.336-64-32-64h-128c-17.696 0-32 64-32 64h-208c-26.528 0-48 21.472-48 48s0 48 0 48h704c0 0 0-21.472 0-48s-21.504-48-48-48z"
      ></path>
    </svg>
  );
};
