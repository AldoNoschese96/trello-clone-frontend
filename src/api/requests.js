import axiosClient from "./axiosClient/axiosClient";

export const login = async (object) => {
  try {
    const { data } = await axiosClient.post("/users/signin", object);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const signUp = async (object) => {
  try {
    const { data } = await axiosClient.post("/users/signup", object);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getBoardsByUser = async (userId) => {
  try {
    const { data } = await axiosClient.get(`/boards/allby/${userId}`);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createNewBoard = async (userId, title) => {
  try {
    const { data } = await axiosClient.post(`/boards/new/${userId}`, title);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteBoard = async (boardId) => {
  try {
    const { data } = await axiosClient.delete(`/boards/delete/${boardId}`);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createList = async (object) => {
  try {
    const { data } = await axiosClient.post(`/lists/new`, object);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const deletelist = async (listId) => {
  try {
    const { data } = await axiosClient.delete(`/lists/deletewithid/${listId}`);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const getAllListByBoard = async (boardId) => {
  try {
    const { data } = await axiosClient.get(`/lists/allby/${boardId}`);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const editList = async (value, listId) => {
  try {
    const { data } = await axiosClient.put(`/lists/edit/${listId}`, {
      title: value,
    });
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const createCard = async (value, listId) => {
  try {
    const { data } = await axiosClient.post(`/cards/new/${listId}`, value);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const editCard = async (value, cardId) => {
  try {
    const { data } = await axiosClient.put(`/cards/edit/${cardId}`, {
      content: value,
    });
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const deleteCard = async (cardId) => {
  try {
    const { data } = await axiosClient.delete(`/cards/deleteby/${cardId}`);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};

export const moveCard = async (payload) => {
  try {
    const { data } = await axiosClient.put(`/cards/moveto`, payload);
    return data;
  } catch (e) {
    throw new Error(e);
  }
};
