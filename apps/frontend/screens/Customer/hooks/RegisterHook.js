import { useEffect, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../gql';
// import { UPLOAD_USER_DATA } from '../gql/index';

/* Hook that handles users forms **/
export function useRegisterForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
  });
  const [passwordInit, setPasswordInit] = useState(true);
  const [validatorInit, setValidatorInit] = useState(true);
  const [emailInit, setEmailInit] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [isPasswordSet, setIsPasswordSet] = useState(false);

  const isValidEmail = (email) => {
    // Simple email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const [formErrors, setFormErrors] = useState({
    password: '',
    validator: '',
    email: '',
  });

  useEffect(() => {
    setEmailInit(false);
    if (formData.email && !isValidEmail(formData.email)) {
      setFormErrors((prevData) => ({ ...prevData, ['email']: 'NV' }));
    } else {
      setFormErrors((prevData) => ({ ...prevData, ['email']: '' }));
    }
  }, [formData.email]);

  useEffect(() => {
    let message = '';

    if (formData.password.length == 0) {
      message = 'Password is required.';
    } else if (formData.password.length < 8) {
      message = 'Password must be at least 8 characters long.';
    } else if (!/\d/.test(formData.password)) {
      message = 'Password must contain at least one number.';
    } else if (!/[A-Z]/.test(formData.password)) {
      message = 'Password must contain at least one uppercase letter.';
    } else {
      setIsPasswordSet(true);
    }
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      ['password']: message,
    }));
    setValidatorInit(true);
  }, [formData.password]);

  const handleFormChange = (name, val) => {
    if (name && name !== 'password' && name !== 'passwordValidator') {
      setFormData((prevData) => ({ ...prevData, [name]: val }));
    } else if (name === 'password') {
      setPasswordInit(false);
      setFormData((prevData) => ({ ...prevData, [name]: val }));
    } else if (name === 'passwordValidator') {
      if (formData.password !== val) {
        setValidatorInit(false);
        setFormErrors((prevData) => ({ ...prevData, ['validator']: 'DNM' }));
      } else {
        setFormErrors((prevData) => ({
          ...prevData,
          ['validator']: '',
        }));
      }
    }
  };
  const canFormBeSubmitted =
    Object.values(formErrors).every((error) => error === '') &&
    Object.values(formData).every((v) => v !== '');

  // const [uploadUserData, { loading, error }] = useMutation(UPLOAD_USER_DATA);

  const submit = useCallback(async () => {
    console.log('data to backend', formData);
    setIsLoading(true);
    // Add your logic to send data to the backend
  }, [formData]); // Dependencies for useCallback

  return {
    handleFormChange,
    passwordError: !passwordInit ? formErrors.password : '',
    emailError: !emailInit ? formErrors.email : '',
    returnPasswordValidator: !passwordInit && !formErrors.password,
    validatorFailed: formErrors.validator && !validatorInit ? true : false,
    canFormBeSubmitted,
    register: submit,
    submitting: isLoading,
  };
}
