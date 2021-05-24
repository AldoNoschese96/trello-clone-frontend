import React, { useState, useEffect } from "react";

//Components
import List from "../Components/List";
import Form from "../Components/Form";
import AddListButton from "../Components/AddListButton";

//Redux
import { useDispatch, useSelector } from "react-redux";
import {
  deleteListAct,
  createNewList,
  getAllLists,
  moveCardAct,
} from "../store/actions/listSliceActions";
import {
  onMoveCardBetweenLists,
  onMoveCardInList,
} from "../store/slices/listsSlice";
import { useHistory, withRouter } from "react-router";

//Drag And Drop
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const ListsContainer = ({ param }) => {
  const historyRouter = useHistory();
  const dispatch = useDispatch();

  const [isShowingAddListForm, setIsShowingAddListForm] = useState(false);

  const listsArray = useSelector((state) => state.lists.lists);

  useEffect(() => {
    dispatch(getAllLists(param));
  }, []);

  const createNewListHandler = (title, isCopy = false) => {
    const getBoardId = getPathParam(historyRouter.location.pathname);
    const newList = {
      title,
      cards: [],
      isCopy,
      isListOf: getBoardId,
    };
    dispatch(createNewList(newList));
  };

  const getPathParam = (path) => path.split("/")[2];

  const duplicateListHandler = (listToDuplicate) => {
    const duplicated = { ...listToDuplicate, isCopy: true };
    delete duplicated._id;
    delete duplicated.__v;
    dispatch(createNewList(duplicated));
  };

  const deleteListHandler = (id) => dispatch(deleteListAct(id));

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(
        listsArray[sInd].cards,
        source.index,
        destination.index
      );
      dispatch(onMoveCardInList({ listId: sInd, cards: items }));
    } else {
      const result = move(
        listsArray[sInd].cards,
        listsArray[dInd].cards,
        source,
        destination
      );
      const payload = {
        fromListId: listsArray[sInd]._id,
        toListId: listsArray[dInd]._id,
        cardId: listsArray[sInd].cards[source.index]._id,
      };
      dispatch(
        onMoveCardBetweenLists({
          fromId: sInd,
          destId: dInd,
          fromListCards: result[sInd],
          destListCards: result[dInd],
        })
      );

      dispatch(moveCardAct(payload));
    }
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);

    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className=" flex h-screen bg-lightBlue pt-5 px-3 overflow-x-scroll">
        <div className="flex flex-row">
          {listsArray.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <div>
                    <List
                      dispatch={dispatch}
                      listTitle={el.title}
                      items={el.cards}
                      key={el._id}
                      id={el._id}
                      onDuplicate={() => duplicateListHandler(el)}
                      onDelete={(id) => deleteListHandler(id)}
                    />
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
          <div>
            {isShowingAddListForm ? (
              <Form
                inputPlaceholder={"Enter a title for this list"}
                onClose={() => setIsShowingAddListForm(false)}
                onSubmit={(value) => createNewListHandler(value)}
              />
            ) : (
              <AddListButton onClick={() => setIsShowingAddListForm(true)} />
            )}
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default withRouter(ListsContainer);
