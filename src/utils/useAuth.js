import { useReducer } from 'react';

import {
  reducer
} from './rest';

import axios from 'axios';

const sessionRequest = async() => {
  const res = await axios.post("https://test.adopets.app/v1/auth/session-request", { "system_api_key": "505763d6-4202-4b05-9efc-93b366939bcf" })
  return res.data.data;
}

export const useAuth = resource => {
  const [data, dispatch] = useReducer(reducer, {
    loading: false,
    data: {}
  })
  const auth = async (data) => {
    const key = await sessionRequest();
    const config = {
      headers: {
        'Authorization': 'Bearer ' + key.access_key,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    }
    dispatch({ type: 'REQUEST' })
    try {
      const res = await axios.post(resource, data, config)
      if (res.data.status === 500 && res.data.code === 500) {
        dispatch({
          type: 'FAILURE',
          error: res.data.message
        })
      } else {
        dispatch({
          type: 'SUCCESS',
          data: res.data
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
  return [data, auth]
}