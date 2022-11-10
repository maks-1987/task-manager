import React, { useEffect, useState } from 'react';
import CreateBoardForm from '../../components/createBoardForm/CreateBoardForm';
import { Endpoints } from '../../endpoints/endpoints';
import { IPreBoard } from '../../types/types';
import './borderPage.css';

export const tokeMok =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NGNmOTZkMi01OGZjLTRlMGMtOTZkOS05YWM0MjhkNGQ0OTUiLCJsb2dpbiI6InVzZXIwMDEiLCJpYXQiOjE2NTIwMDMyMTF9.EUlvrrs0Hl7wq1o-vkW5eh710CeNmhTfivk8aYkO43I';

export default function BoardsPage() {
  const [board, setBoard] = useState<IPreBoard>({
    id: '',
    title: '',
  });
  const [boards, setBoards] = useState<IPreBoard[]>([]);

  const getBoards = async (token: string) => {
    const response = await fetch(Endpoints.BOARDS, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setBoards(data);
  };
  useEffect(() => {
    return setBoards((boards) => [...boards, board]);
  }, [board]);

  useEffect(() => {
    getBoards(tokeMok);
  }, []);
  console.log(boards);
  return (
    <section className="boards-page">
      <div className="boards-page__container">
        <h1 className="boards-page__title">Boards Page</h1>
        <CreateBoardForm setBoard={setBoard} />
        <section className="boards-page__container_boards-field">
          {boards.length === 0
            ? 'You have not any boards'
            : boards.map((board) => <span key={board.id}>board.title</span>)}
        </section>
      </div>
    </section>
  );
}
