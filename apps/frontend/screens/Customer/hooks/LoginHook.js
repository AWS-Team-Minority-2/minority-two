import { useEffect, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../gql';
import { useNavigation } from '@react-navigation/native';
import { useAuthDispatch, doLogin } from '@min-two/user-iso';

/* Hook that handles users forms **/
export function useLoginForm() {
  const dispatch = useAuthDispatch();
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
