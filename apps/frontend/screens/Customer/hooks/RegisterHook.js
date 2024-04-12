import { useEffect, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../gql';
import { useNavigation } from '@react-navigation/native';
import { useScreenDispatch, changeScreen } from '@min-two/screen-iso';
import { doLogin, useAuthDispatch } from '@min-two/user-iso';

/* Hook that handles users forms **/
export function useRegisterForm() {
  const navigation = useNavigation();
  const dispatch = useAuthDispatch();
  const screenDispatch = useScreenDispatch();

  // Use this form to register the user
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
  // Init is required because we only want the form to error after bad input
  const [passwordInit, setPasswordInit] = useState(true);
  const [validatorInit, setValidatorInit] = useState(true);
  const [emailInit, setEmailInit] = useState(true);
  const [isPasswordSet, setIsPasswordSet] = useState(false);

  const isValidEmail = (email) => {
    // Simple email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  // Handle the error messages, most are not returned to the UI
  const [formErrors, setFormErrors] = useState({
    password: '',
    validator: '',
    email: '',
  });

  // handle email chanages
  useEffect(() => {
    // if input then set init to false
    setEmailInit(false);
    // if we have email but not valid update the error to 'NV'
    if (formData.email && !isValidEmail(formData.email)) {
      setFormErrors((prevData) => ({ ...prevData, ['email']: 'NV' }));
    } else {
      // else clear the error
      setFormErrors((prevData) => ({ ...prevData, ['email']: '' }));
    }
  }, [formData.email]);

  // in the backend the zipCode must be a number, however input is from the user is a string.
  // This breaks the backend, so we create this useEffect to update the zipCode field
  useEffect(() => {
    if (formData.zipCode) {
      const i = parseInt(formData.zipCode);
      setFormData((prevData) => ({ ...prevData, ['zipCode']: i }));
    }
  }, [formData.zipCode]);

  // Handle password errors
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

  // handle when input is entered into any field
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

  // if there are no errors and each form is field, then true else false
  const canFormBeSubmitted =
    Object.values(formErrors).every((error) => error === '') &&
    Object.values(formData).every((v) => v !== '' && v !== 0);

  //  talk to the database with a mutation in graphql
  const [registerUser, { loading, error }] = useMutation(REGISTER_USER);

  const addUserToStorage = async (user) => {
    try {
      // Adding the item to AsyncStorage
      await AsyncStorage.setItem('user', user);
      // Setting the state to indicate that item is added
    } catch (error) {
      console.log('Error adding user: ', error);
    }
  };

  // try to send the data to the backend
  const submit = useCallback(async () => {
    try {
      const { data } = await registerUser({
        variables: {
          user: formData,
        },
      });

      if (data) {
        doLogin(dispatch, data.RegisterUser);
        addUserToStorage(JSON.stringify(data.RegisterUser));
        changeScreen(screenDispatch, 'UserHome');

        navigation.navigate('UserHome');
      }
    } catch (error) {
      // Handle errors
      throw new Error('Network Failed for registration');
    }
  }, [formData, registerUser]);

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
