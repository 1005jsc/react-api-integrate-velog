import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { UserType } from './DataTypes';

const initialState: StateType = {
  users: null,
  loading: false,
  error: null,
};

type StateType = {
  users: UserType[] | null;
  loading: boolean;
  error: any;
};

type ActionType =
  | { type: 'LOADING' }
  | { type: 'DONE'; users: UserType[] | null }
  | { type: 'ERROR'; error: string };

const yoyo = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case 'LOADING':
      return {
        users: null,
        loading: true,
        error: null,
      };
    case 'DONE':
      return {
        users: action.users,
        loading: false,
        error: null,
      };
    case 'ERROR':
      return {
        users: null,
        loading: true,
        error: action.error,
      };
    default:
      throw new Error(`Wrong action type `);
  }
};

export const Users3 = () => {
  const [state, dispatch] = useReducer(yoyo, initialState);

  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' });

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      dispatch({ type: 'DONE', users: response.data });

      //   console.log(response);
    } catch (error) {
      if (error instanceof Error) {
        let message = 'Unknown Error';

        message = error.message;
        // console.log(typeof message);
        // message 의 타입이 string이라고 나옴
        dispatch({ type: 'ERROR', error: message });
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { users, loading, error } = state;

  console.log(state);
  console.log(users);
  console.log(loading);
  console.log(error);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!users) return null;

  return (
    <>
      <>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username} ({user.name})
            </li>
          ))}
        </ul>
        <button onClick={fetchUsers}>다시 불러오기</button>
      </>
    </>
  );
};
