import axios from 'axios';
import { createContext, useContext, useReducer } from 'react';
import { UserType } from './DataTypes';
import { initialState, useAsync } from './userAsync';

// 타입들을 잘 맞물리게 정해줘야 useReducer에 오류가 뜨지 않는다

const UserStateContext = createContext(initialState);
const UserRefetchContext = createContext<(() => Promise<void>) | null>(null);

async function getUsers() {
  const response = await axios.get(
    'https://jsonplaceholder.typicode.com/users'
  );
  return response.data;
}

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { state, fetchData: refetch } = useAsync(getUsers, []);
  return (
    <UserStateContext.Provider value={state}>
      <UserRefetchContext.Provider value={refetch}>
        {children}
      </UserRefetchContext.Provider>
    </UserStateContext.Provider>
  );
};

export const useUserState = () => {
  const context = useContext(UserStateContext);
  if (!context) {
    throw new Error(
      '현재 컴포넌트가 UserStateProvider안에있는게 맞는가 확인해봐야 될것 같은 디요?~~'
    );
  }
  return context;
};
export const useUserRefetch = () => {
  const context = useContext(UserRefetchContext);
  if (!context) {
    throw new Error(
      '현재 컴포넌트가 UserRefetchProvider안에있는게 맞는가 확인해봐야 될것 같은 디요?~~'
    );
  }
  return context;
};
