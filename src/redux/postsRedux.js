import Axios from 'axios';
/* selectors */
export const getAll = ({ posts }) => posts.data;
export const getPostById = ({ posts }) => posts.currentPost || {};
/* action name creator */
const reducerName = 'posts';
const createActionName = name => `app/${reducerName}/${name}`;
/* action types */
const FETCH_START = createActionName('FETCH_START');
const FETCH_SUCCESS = createActionName('FETCH_SUCCESS');
const FETCH_ERROR = createActionName('FETCH_ERROR');
export const ADD_POST = createActionName('ADD_POST');
export const EDIT_POST = createActionName('EDIT_POST');
/* action creators */
export const fetchStarted = payload => ({ payload, type: FETCH_START });
export const fetchSuccess = payload => ({ payload, type: FETCH_SUCCESS });
export const fetchError = payload => ({ payload, type: FETCH_ERROR });
export const createActionAddPost = payload => ({ payload, type: ADD_POST });
export const createActionEditPost = payload => ({ payload, type: EDIT_POST });
/* thunk creators */
export const fetchPublished = () => {
  return (dispatch, getState) => {
    const { posts } = getState();
    if (posts.data.length === 0 && posts.loading.active === false) {
      dispatch(fetchStarted());
      Axios
        .get('http://localhost:8000/api/posts')
        .then(res => {
          dispatch(fetchSuccess(res.data));
        })
        .catch(err => {
          dispatch(fetchError(err.message || true));
        });
    }
  };
};
export const loadPostById = (id) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .get(`http://localhost:8000/api/posts/${id}`)
      .then(res => {
        dispatch(fetchSuccess(res.data));
      })
      .catch(err => {
        dispatch(fetchError(err.message || true));
      });
  };
};
export const insertPost = (data) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .post(`http://localhost:8000/api/posts`, data)
      .then((res) => {
        console.log('res:', res.data);
        dispatch(createActionAddPost(res.data));
      })
      .catch(err => {
        console.log('Client issue', err);
        dispatch(fetchError(err.message || true));
      });
  };
};

export const updatePost = (id, data) => {
  return (dispatch, getState) => {
    dispatch(fetchStarted());
    Axios
      .put(`http://localhost:8000/api/posts`, {id: id, data: data})
      .then((res) => {
        console.log('resDATA', res.data);
        dispatch(createActionEditPost(res.data));
      })
      .catch((err) => {
        console.log('Client issue');
        dispatch(fetchError(err.message || true));
      });
  };
};

/* reducer */
export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case FETCH_START: {
      return {
        ...statePart,
        loading: {
          active: true,
          error: false,
        },
      };
    }
    case FETCH_SUCCESS: {
      if(Array.isArray(action.payload)) {
        return {
          ...statePart,
          loading: {
            active: false,
            error: false,
          },
          data: action.payload,
        };
      } else {
        return {
          ...statePart,
          loading: {
            active: false,
            error: false,
          },
          currentPost: action.payload,
        };
      }
    }
    case FETCH_ERROR: {
      return {
        ...statePart,
        loading: {
          active: false,
          error: action.payload,
        },
      };
    }
    case ADD_POST:
      return {
        ...statePart,
        data: [...statePart.data, action.payload],
      };
    case EDIT_POST: {
      let posts = statePart.data.map(post => {
        if (post._id === action.payload._id) post = action.payload;
        return post;
      });
      return {
        ...statePart,
        data: posts,
      };
    }
    default:
      return statePart;
  }
};
