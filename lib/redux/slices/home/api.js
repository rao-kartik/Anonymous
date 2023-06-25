import axios from '@/utils/axios';

const ENDPOINTS = {
  newPost: 'post/new',
  editPost: 'post/edit',
  getAllPost: 'post/all',
  getAllPostUser: 'post/user',
  deletePost: 'post/delete',
  likePost: 'post/like',
  dislikePost: 'post/dislike',
  getAllComments: 'post/comment/all',
  newComment: 'post/comment/new',
  editComment: 'post/comment/edit',
  deleteComment: 'post/comment/delete',
};

export const newPostApi = async (data) => {
  try {
    const response = await axios.post(ENDPOINTS.newPost, data);

    return response;
  } catch (err) {
    throw err;
  }
};

export const editPostApi = async ({ id, data }) => {
  try {
    const response = await axios.patch(`${ENDPOINTS.editPost}/${id}`, data);

    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllPostApi = async () => {
  try {
    const response = await axios.get(ENDPOINTS.getAllPost);

    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllPostUserApi = async () => {
  try {
    const response = await axios.get(ENDPOINTS.getAllPost);

    return response;
  } catch (err) {
    throw err;
  }
};

export const deletePostApi = async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINTS.deletePost}/${id}`);

    return response;
  } catch (err) {
    throw err;
  }
};

export const newCommentApi = async ({ id, data }) => {
  try {
    const response = await axios.post(`${ENDPOINTS.newComment}/${id}`, data);

    return response;
  } catch (err) {
    throw err;
  }
};

export const editCommentApi = async ({ id, data }) => {
  try {
    const response = await axios.patch(`${ENDPOINTS.editComment}/${id}`, data);

    return response;
  } catch (err) {
    throw err;
  }
};

export const getAllCommentsApi = async (id) => {
  try {
    const response = await axios.get(`${ENDPOINTS.getAllComments}/${id}`);

    return response;
  } catch (err) {
    throw err;
  }
};

export const deleteCommentApi = async (id) => {
  try {
    const response = await axios.delete(`${ENDPOINTS.deleteComment}/${id}`);

    return response;
  } catch (err) {
    throw err;
  }
};

export const likeDislikeApi = async ({ postId, status }) => {
  try {
    const response = await axios.post(
      `${status === 'like' ? ENDPOINTS.likePost : ENDPOINTS.dislikePost}/${postId}`
    );

    return response;
  } catch (err) {
    throw err;
  }
};
