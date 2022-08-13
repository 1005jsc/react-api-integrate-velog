import axios from 'axios';
import { useEffect, useReducer } from 'react';

const initialState = {
  users: '',
  loading: false,
  error: null,
};

const yoyo = (state, action) => {
  switch (action.type) {
    case 'LOADING':
      return {
        users: '',
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
        users: '',
        loading: true,
        error: action.error,
      };
    default:
      throw new Error(`Wrong action type ${action.type}`);
  }
};

export const Users2 = () => {
  const [state, dispatch] = useReducer(yoyo, initialState);

  const fetchUsers = async () => {
    dispatch({ type: 'LOADING' });

    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/users'
      );
      dispatch({ type: 'DONE', users: response.data });

      // console.log(response);
    } catch (error) {
      dispatch({ type: 'ERROR', error: error });
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const { users, loading, error } = state;

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
