import { useEffect, useState, useCallback } from 'react';
import { LOGIN_ADMIN } from '../gql';
import { useMutation } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

/* Hook that handles users forms **/
export function useAdmin() {
  const navigation = useNavigation();
  const [loginFailed, setLoginFailed] = useState(false);

  const [formData, setFormData] = useState({
    adminCode: '',
  });

  const handleFormChange = (val) => {
    setFormData((prevData) => ({ ...prevData, adminCode: val }));
    setLoginFailed(false);
  };

  //   const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

  const checkIfCodeVaild = () => {
    if (formData.adminCode.length != 5) {
      return false;
    } else {
      return true;
    }
  };

  const [loginAdmin, { loading, error }] = useMutation(LOGIN_ADMIN);

  const addUserToStorage = async (user) => {
    try {
      // Adding the item to AsyncStorage
      await AsyncStorage.setItem('user', user);
      // Setting the state to indicate that item is added
    } catch (error) {
      console.log('Error adding user: ', error);
    }
  };

  const submit = useCallback(async () => {
    const isVal = checkIfCodeVaild();
    if (!isVal) {
      setLoginFailed(true);
      return;
    } else {
      try {
        const { data } = await loginAdmin({
          variables: {
            adminCode: formData.adminCode,
          },
        });
        if (data) {
          addUserToStorage(data.LoginAdmin.name);
          navigation.navigate('AdminPortal');
        } else {
          setLoginFailed(true);
        }
      } catch (error) {
        setLoginFailed(true);
        throw new Error('Failed to login admin');
      }
    }
  }, [formData, loginAdmin, setLoginFailed]);

  return {
    login: submit,
    handleFormChange,
    loginFailed,
  };
}
