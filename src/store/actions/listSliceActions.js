import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createCard,
  createList,
  deleteCard,
  deletelist,
  editCard,
  editList,
  getAllListByBoard,
  moveCard,
} from "../../api/requests";

export const createNewList = createAsyncThunk(
  "lists/createNewList",
  async (object) => {
    const response = await createList(object);
    return response;
  }
);

export const deleteListAct = createAsyncThunk(
  "lists/deleteList",
  async (id) => {
    const response = await deletelist(id);
    return response;
  }
);

export const getAllLists = createAsyncThunk(
  "lists/getAllLists",
  async (boardId) => {
    const response = await getAllListByBoard(boardId);
    return response;
  }
);

export const editListAct = createAsyncThunk(
  "lists/editList",
  async (payload) => {
    const response = await editList(payload.value, payload.id);
    return response;
  }
);

export const createNewCard = createAsyncThunk(
  "lists/createCard",
  async (payload) => {
    const response = await createCard(payload.cardToCreate, payload.id);
    return response;
  }
);

export const editACard = createAsyncThunk("lists/editCard", async (payload) => {
  const response = await editCard(payload.content, payload.cardId);
  return response;
});

export const deleteACard = createAsyncThunk(
  "lists/deleteCard",
  async (payload) => {
    const response = await deleteCard(payload.cardId);
    return response;
  }
);

export const moveCardAct = createAsyncThunk(
  "lists/moveCard",
  async (payload) => {
    const response = await moveCard(payload);
    return response;
  }
);
