import React, { useEffect } from "react";

//Router
import { withRouter, useHistory } from "react-router-dom";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBoards,
  createNewBoardAct,
  deleteBoardAct,
} from "../store/actions/boardSliceActions";
import {
  closeModalAddBoard,
  openModalAddBoard,
} from "../store/slices/boardsSlice";

//Components
import BoardList from "../Components/BoardList";
import Modal from "../Components/Modal";

const BoardsContainer = ({ history }) => {
  const dispatch = useDispatch();
  const historyRouter = useHistory();

  useEffect(() => {
    dispatch(getAllBoards(getPathParam(history.location.pathname)));
  }, []);

  const boards = useSelector((state) => state.boards.boardsList);
  const userID = useSelector((state) => state.auth.user)._id;

  const getPathParam = (path) => path.split("/")[2];

  const onSubmitModalCreateBoard = (values) => {
    const payload = {
      id: userID,
      title: values,
    };
    dispatch(createNewBoardAct(payload));
  };

  const onCloseModalHandler = () => dispatch(closeModalAddBoard());
  const onOpenModalHandler = () => dispatch(openModalAddBoard());
  const onDeleteBoard = (boardId) => dispatch(deleteBoardAct(boardId));
  const onSelectBoard = (boardId) => historyRouter.push(`/board/${boardId}`);

  return (
    <>
      <div className="w-full">
        <div className="grid bg-lightBlue h-screen place-items-center grid-cols-1 md:grid-cols-2">
          <div className="h-full w-full flex items-center justify-center">
            {boards.length > 0 ? (
              <BoardList
                items={[...boards]}
                onDelete={(id) => onDeleteBoard(id)}
                onSelect={(id) => onSelectBoard(id)}
              />
            ) : (
              <div>
                <p className="text-white text-2xl">
                  You don't have any boards{" "}
                </p>
              </div>
            )}
          </div>
          <div className="h-full w-full flex items-center justify-center">
            <div className="w-2/4 rounded-lg cursor-pointer hover:bg-lightblue bg-lightGrey text-lightBlue">
              <div
                onClick={onOpenModalHandler}
                className="flex flex-col sm:flex-row md:flex-row shadow-xl rounded-lg border-2 w-full px-3 py-2 hover:bg-lightblue"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span className="ml-5 font-bold">Add Board</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        onClose={onCloseModalHandler}
        onSubmit={onSubmitModalCreateBoard}
      />
    </>
  );
};

export default withRouter(BoardsContainer);
