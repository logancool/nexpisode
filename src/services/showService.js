import { get, post, del } from 'aws-amplify/api';

const API_NAME = 'nexpisodeAPI';

export const getUserShows = async (userId) => {
  try {
    const response = await get({
      apiName: API_NAME,
      path: `/shows/${userId}`,
    });
    return response.response;
  } catch (error) {
    console.error('Error fetching user shows:', error);
    return [];
  }
};

export const addShowToList = async (userId, showData) => {
  try {
    const response = await post({
      apiName: API_NAME,
      path: `/shows/${userId}`,
      options: {
        body: showData,
      },
    });
    return response.response;
  } catch (error) {
    console.error('Error adding show:', error);
    throw error;
  }
};

export const removeShowFromList = async (userId, showId) => {
  try {
    const response = await del({
      apiName: API_NAME,
      path: `/shows/${userId}/${showId}`,
    });
    return response.response;
  } catch (error) {
    console.error('Error removing show:', error);
    throw error;
  }
};
