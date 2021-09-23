import React, {createContext, useState, useContext, useEffect} from 'react';
import {getObject, removeItem, storeObject, storeString} from '../../util/storage';
import {UserData, authService} from '../../services/authService';

export const USER_DATA_KEY = '@UserData';
export const ACCESS_TOKEN_KEY = '@AccessToken';
export const REFRESH_TOKEN_KEY = '@RefreshToken';

export type UserCredentials = {
  username: string;
  password: string;
};

export type AuthContextData = {
  userData?: UserData;
  loading: boolean;
  login(credentials: UserCredentials): Promise<void>;
  register(userData: UserData, password: string): Promise<void>;
  logout(): void;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({children}) => {
  const [userData, setUserData] = useState<UserData>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      const storedUser: UserData = await getObject(USER_DATA_KEY);
      if (storedUser) {
        setUserData(storedUser);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }

  const register = async (userData: UserData, password: string): Promise<void> => {
    const _userData = await authService.register(userData, password).catch(error => {
      setLoading(false);
      console.log('Error at login', error);
      throw error;
    });

    if(_userData.user){
      await storeObject(USER_DATA_KEY, _userData.user);
      setUserData(_userData.user);
    }
  }

  const login = async (credentials: UserCredentials): Promise<void> => {
    const _userData = await authService.login(credentials).catch(error => {
      setLoading(false);
      console.log('Error at login', error);
      throw error;
    });

    if(_userData.user){
      await storeObject(USER_DATA_KEY, _userData.user);
      setUserData(_userData.user);
    }
  };

  const logout = async () => {
    setUserData(undefined);
    await removeItem(USER_DATA_KEY);
  };

  return (
    <AuthContext.Provider value={{userData, loading, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export {AuthContext, AuthProvider, useAuth};
