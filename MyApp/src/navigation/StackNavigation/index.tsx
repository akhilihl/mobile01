// Main navigator — checks stored session and routes to AuthStack or UserStack
// Requires: npm install react-native-encrypted-storage
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import Loader from '../../components/loader/Loader';
import { setUser } from '../../redux/reducers/userReducer';
import { setToken } from '../../redux/reducers/tokenReducer';
import { GetValue } from '../../utils/storageUtils';
import AuthStack from './authStack/AuthStack';
import UserStack from './userStack/UserStack';
import { AppDispatch } from '../../redux/store/store';

const StackNavigator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [initializing, setInitializing] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const onAuthStateChanged = async () => {
    try {
      const tokenResult = await GetValue<string>('accessToken');
      const userResult = await GetValue<Record<string, unknown>>('user');

      if (tokenResult.status === 'success' && tokenResult.data) {
        dispatch(setToken(tokenResult.data));
        if (userResult.status === 'success' && userResult.data) {
          dispatch(setUser(userResult.data));
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      setIsLoggedIn(false);
    } finally {
      setInitializing(false);
    }
  };

  useEffect(() => {
    onAuthStateChanged();
  }, []);

  if (initializing) {
    return <Loader />;
  }

  return isLoggedIn ? (
    <UserStack onAuthState={onAuthStateChanged} />
  ) : (
    <AuthStack onAuthState={onAuthStateChanged} />
  );
};

export default StackNavigator;
