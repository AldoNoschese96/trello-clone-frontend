import React, { useState } from "react";

//Component
import Form from "./Form";

const Item = ({ text, id, onEditCard, onDeleteCard }) => {
  const [isShowingEditCard, setShowingEditCard] = useState(false);

  const showFormHandler = (e) => setShowingEditCard(true);

  return (
    <div className="w-100" onClick={(e) => showFormHandler(e)}>
      {!isShowingEditCard ? (
        <div className="rounded-sm bg-white w-full px-2 shadow-md ">
          <div className="py-3">
            <p>{text}</p>
          </div>
        </div>
      ) : (
        <Form
          inputType="textarea"
          inputPlaceholder={"Enter a title for this card"}
          onClose={(e) => {
            e.stopPropagation();
            setShowingEditCard(false);
          }}
          onSubmit={(value, e) => {
            e.stopPropagation();
            onEditCard(value, id);
            setShowingEditCard(false);
          }}
          onDeleteCard={(e) => {
            e.stopPropagation();
            onDeleteCard(id);
            setShowingEditCard(false);
          }}
          textarea={true}
          paddingX={0}
          buttonText={"Edit"}
          defaultValue={text}
          enableDeleteCard={true}
        />
      )}
    </div>
  );
};

export default Item;
