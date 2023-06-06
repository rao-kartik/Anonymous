import axios from '../../utils/axios';

const ENDPOINTS = {
  newPost: 'post/new',
  editPost: 'post/edit',
  getAllPost: 'post/all',
  getAllPostUser: 'post/user',
  deletePost: 'post/delete',
  likePost: 'post/like',
  dislikePost: 'post/dislike',
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
    const response = await axios.delete(`${ENDPOINTS.editPost}/${id}`);

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
