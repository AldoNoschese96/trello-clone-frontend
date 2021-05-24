import React, { useState } from "react";

//Components
import AddCardButton from "../Components/AddCardButton";
import Form from "../Components/Form";
import Item from "./Item";
import Dropdown from "./Dropdown";

//Actions
import {
  editListAct,
  createNewCard,
  editACard,
  deleteACard,
} from "../store/actions/listSliceActions";

//Drag And Drop
import { Draggable } from "react-beautiful-dnd";

const List = ({
  listTitle = "Prova",
  items = [],
  id,
  onDuplicate,
  onDelete,
  dispatch,
}) => {
  const [isShowingAddCardForm, setIsShowingAddCardForm] = useState(false);
  const [isShowingEditTitleListForm, setIsShowingEditTitleListForm] =
    useState(false);

  const editListTitleHandler = (value, e) => {
    e.stopPropagation();
    dispatch(editListAct({ value, id }));
    setIsShowingEditTitleListForm(false);
  };
  const createCardHandler = (value, id) => {
    const cardToCreate = {
      content: value,
    };

    dispatch(createNewCard({ cardToCreate, id }));
    setIsShowingAddCardForm(false);
  };

  const onEditCardHandler = (content, cardId) => {
    const listId = id;
    dispatch(editACard({ content, cardId, listId }));
  };

  const onDeleteCardHandler = (cardId) => {
    dispatch(deleteACard({ cardId, listId: id }));
  };

  const getStyle = (style, snapshot) => {
    if (!snapshot.isDropAnimating) {
      return style;
    }
    const { moveTo, curve, duration } = snapshot.dropAnimation;
    const translate = `translate(${moveTo.x}px, ${moveTo.y - 1}px)`;
    const rotate = "rotate(0turn)";
    return {
      ...style,
      transform: `${translate} ${rotate}`,
      transition: `all ${curve} ${duration}s`,
    };
  };

  return (
    <div className="w-80 min-w-80 py-2 px-3 mx-2 bg-lightGrey rounded-sm">
      <div className="flex justify-between">
        <div className="w-full">
          {!isShowingEditTitleListForm ? (
            <span className="font-bold">{listTitle}</span>
          ) : (
            <Form
              inputPlaceholder={"Edit a title for this card"}
              onClose={() => setIsShowingEditTitleListForm(false)}
              onSubmit={(value, e) => editListTitleHandler(value, e)}
              paddingX={0}
              defaultValue={listTitle}
              buttonText={"Edit"}
            />
          )}
        </div>
        <div className="flex justify-end">
          <Dropdown
            onDelete={() => onDelete(id)}
            onEdit={() => setIsShowingEditTitleListForm(true)}
            onDuplicate={() => onDuplicate()}
          />
        </div>
      </div>
      <div className="py-3">
        <p className="text-gray-400 text-sm">{items.length} cards</p>
      </div>
      <div className="grid grid-cols-1 gap-y-3 ">
        {items &&
          items.map((item, index) => (
            <Draggable key={item._id} draggableId={item._id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  style={getStyle(provided.draggableProps.style, snapshot)}
                >
                  <Item
                    text={item.content}
                    id={item._id}
                    onDeleteCard={(cardId) => onDeleteCardHandler(cardId)}
                    onEditCard={(value, id, cb) => onEditCardHandler(value, id)}
                  />
                </div>
              )}
            </Draggable>
          ))}
      </div>
      {isShowingAddCardForm ? (
        <Form
          inputType="textarea"
          inputPlaceholder={"Enter a title for this card"}
          onClose={() => setIsShowingAddCardForm(false)}
          onSubmit={(value) => createCardHandler(value, id)}
          textarea={true}
          paddingX={0}
        />
      ) : (
        <AddCardButton onClick={() => setIsShowingAddCardForm(true)} />
      )}
    </div>
  );
};

export default List;
