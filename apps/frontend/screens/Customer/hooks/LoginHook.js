import { useEffect, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../gql';
import { useNavigation } from '@react-navigation/native';
import { useAuthDispatch, doLogin } from '@min-two/user-iso';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';
import AsyncStorage from '@react-native-async-storage/async-storage';

/* Hook that handles users forms **/
export function useLoginForm() {
  const dispatch = useAuthDispatch();
  const screenDispatch = useScreenDispatch();
  const navigation = useNavigation();
  const [loginFailed, setLoginFailed] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleFormChange = (name, val) => {
    setFormData((prevData) => ({ ...prevData, [name]: val }));
    setLoginFailed(false);
  };

  const [loginUser, { loading, error }] = useMutation(LOGIN_USER);

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
    const vaild = checkIfFormValid();
    if (vaild) {
      setLoginFailed(false);
      try {
        const { data } = await loginUser({
          variables: {
            details: {
              email: formData.email,
              password: formData.password,
            },
          },
        });
        if (data.LoginUser.id) {
          doLogin(dispatch, data.LoginUser);
          addUserToStorage(JSON.stringify(data.LoginUser));
          changeScreen(screenDispatch, 'UserHome');

          navigation.navigate('UserHome');
        } else {
          setLoginFailed(true);
        }
      } catch (error) {
        // Handle errors
        setLoginFailed(true);
        throw new Error('Network Failed for login');
      }
    } else {
      setLoginFailed(true);
    }
  }, [formData, setFormData, loginFailed, setLoginFailed]);

  // check if form is vaild
  const checkIfFormValid = () => {
    if (!formData.email || !formData.password) {
      return false;
    } else {
      return true;
    }
  };

  return {
    login: submit,
    handleFormChange,
    loginFailed,
  };
}
