import { useEffect, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../gql';

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
    zipCode: 0,
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

  const [testFormData, setFosrmData] = useState({
    firstName: 'd',
    lastName: 'd',
    phoneNumber: 'd',
    email: 'd',
    password: 'd',
    address: 'd',
    city: 'd',
    state: 'd',
    zipCode: 1234,
  });

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
    if (formData.zipCode) {
      const i = parseInt(formData.zipCode);
      setFormData((prevData) => ({ ...prevData, ['zipCode']: i }));
    }
  }, [formData.zipCode]);

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
    Object.values(formData).every((v) => v !== '' && v !== 0);

  console.log(canFormBeSubmitted);
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const submit = useCallback(async () => {
    try {
      await registerUser({
        variables: {
          user: formData,
        },
      });
    } catch (err) {
      console.log('error', err);
    }
  }, [formData, registerUser, setFormData]); // Dependencies for useCallback

  return {
    handleFormChange,
    passwordError: !passwordInit ? formErrors.password : '',
    emailError: !emailInit ? formErrors.email : '',
    returnPasswordValidator: !passwordInit && !formErrors.password,
    validatorFailed: formErrors.validator && !validatorInit ? true : false,
    canFormBeSubmitted,
    register: submit,
    submitting: loading,
  };
}
