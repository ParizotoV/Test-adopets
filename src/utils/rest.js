import { useReducer } from 'react';
import axios from 'axios';

export const reducer = (state, action) => {
  if (action.type === 'REQUEST') {
    return {
      ...state,
      loading: true
    }
  }
  if (action.type === 'SUCCESS') {
    return {
      ...state,
      loading: false,
      data: action.data
    }
  }
  if (action.type === 'FAILURE') {
    return {
      ...state,
      loading: false,
      error: action.error,
      code: action.code
    }
  }
  return state
}
const init = baseURL => {
  const usePost = resource => {
    const [data, dispatch] = useReducer(reducer, {
      loading: false,
      data: {}
    })
    const post = async (data) => {
      const config = {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem("token"),
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
      dispatch({ type: 'REQUEST' })
      try {
        const res = await axios.post(baseURL + resource, data, config)
        if (res.data.status === 500 && res.data.code === 500) {
          dispatch({
            type: 'FAILURE',
            error: res.data.message
          })
        } else {
          dispatch({
            type: 'SUCCESS',
            data: res.data.data
          })
        }
        return res.data
      } catch (err) {
        dispatch({
          type: 'FAILURE',
          error: 'unknow error'
        })
      }

    }
    return [data, post]
  }
  return {
    usePost
  }
}

export default init;
