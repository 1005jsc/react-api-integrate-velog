import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { UserType } from './DataTypes';

export const initialState: StateType = {
  data: null,
  loading: false,
  error: null,
};

export type StateType = {
  data: UserType[] | null;
  loading: boolean;
  error: any;
};

type ActionType =
  | { type: 'LOADING' }
  | { type: 'SUCCESS'; data: UserType[] | null }
  | { type: 'ERROR'; error: any };

const yoyo = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null,
      };
    case 'SUCCESS':
      return {
        data: action.data,
        loading: false,
        error: null,
      };
    case 'ERROR':
      return {
        data: null,
        loading: true,
        error: action.error,
      };
    default:
      throw new Error(`Wrong action type `);
  }
};

export const useAsync = (callback: () => Promise<UserType[]>, deps = []) => {
  const [state, dispatch] = useReducer(yoyo, initialState);

  const fetchData = async () => {
    dispatch({ type: 'LOADING' });

    try {
      const response = await callback();
      dispatch({ type: 'SUCCESS', data: response });
    } catch (error) {
      if (error instanceof Error) {
        let message = 'Unknown Error';

        message = error.message;
        dispatch({ type: 'ERROR', error: message });
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { state: state, fetchData: fetchData };
};
