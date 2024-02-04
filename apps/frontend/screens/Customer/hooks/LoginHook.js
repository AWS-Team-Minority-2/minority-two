import { useEffect, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';

import { useNavigation } from '@react-navigation/native';

/* Hook that handles users forms **/
export function useLoginForm() {
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

  const submit = useCallback(async () => {
    const vaild = checkIfFormValid();
    if (vaild) {
      console.log(formData, 'data');
    } else {
      setLoginFailed(true);
    }
  }, []);

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
