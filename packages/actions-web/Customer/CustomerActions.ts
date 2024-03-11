//  change name locally

import React, { useCallback, useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useAuthDispatch, doLogin } from '@min-two/user-iso';
import AsyncStorage from '@react-native-async-storage/async-storage';

type NameChangeEvent = 'first' | 'last';

type NameData = {
  firstName?: string;
  lastName?: string;
};

type NameChange = 'first' | 'last' | 'both';
// name change hook
export const useCustomerActions = ({ id }) => {
  const [initialUser, setInitialUser] = useState(true);
  const dispatch = useAuthDispatch();

  const navigation = useNavigation();
  const [newNameData, setNameData] = useState<NameData>({
    firstName: null,
    lastName: null,
  });
  const [user, setUser] = useState({});

  const addUserToStorage = async (user) => {
    try {
      // Adding the item to AsyncStorage
      await AsyncStorage.setItem('user', user);
      // Setting the state to indicate that item is added
    } catch (error) {
      console.log('Error adding user: ', error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        setUser(JSON.parse(value));
      } catch (error) {
        throw new Error('Error getting user');
      }
    };
    getUser();
  }, []);

  //  @ts-ignore

  const handleNameFormChange = (change: NameChangeEvent, name: string) => {
    if (change === 'first') {
      setNameData((prevData) => ({ ...prevData, firstName: name }));
      if (name === '') {
        setNameData((prevData) => ({ ...prevData, firstName: null }));
      }
    } else if (change === 'last') {
      setNameData((prevData) => ({ ...prevData, lastName: name }));
      if (name === '') {
        setNameData((prevData) => ({ ...prevData, lastName: null }));
      }
    }
  };

  const goodNameChange = () => {
    Toast.show({
      type: 'success',
      text1: 'Success',
      text2: 'Your name has been updated',
      position: 'bottom',
      bottomOffset: 120,
    });
  };

  const badNameChange = () => {
    Toast.show({
      type: 'error',
      text1: 'Oh No!',
      text2: 'Something went wrong, please try again',
      position: 'bottom',
      bottomOffset: 120,
    });
  };

  const [nameChangeEvent, setNameChangeEvent] = useState<NameChange>(null);
  const canFormBeSubmitted = Object.keys(newNameData).some(
    (key) => newNameData[key] !== null
  );

  useEffect(() => {
    if (newNameData.firstName !== null && newNameData.lastName !== null) {
      setNameChangeEvent('both');
    } else if (newNameData.firstName !== null) {
      setNameChangeEvent('first');
    } else if (newNameData.lastName !== null) {
      setNameChangeEvent('last');
    } else {
      setNameChangeEvent(null);
    }
  }, [newNameData]);

  const updateAuthandStorage = () => {
    if (nameChangeEvent == 'first') {
      setUser((prevData) => ({
        ...prevData,
        userMetadata: {
          // @ts-ignore
          ...prevData.userMetadata,
          firstname: newNameData.firstName,
        },
      }));
    } else if (nameChangeEvent == 'last') {
      setUser((prevData) => ({
        ...prevData,
        userMetadata: {
          // @ts-ignore
          ...prevData.userMetadata,
          lastname: newNameData.lastName,
        },
      }));
    } else {
      setUser((prevData) => ({
        ...prevData,
        userMetadata: {
          // @ts-ignore
          ...prevData.userMetadata,
          firstname: newNameData.firstName,
          lastname: newNameData.lastName,
        },
      }));
    }
    setInitialUser(false);
  };

  useEffect(() => {
    if (initialUser) {
    } else {
      addUserToStorage(JSON.stringify(user));
      // @ts-ignore
      doLogin(dispatch, user);
    }
  }, [user, initialUser]);

  // useEffect(() => {
  //   setNameChangeEvent(nameChangeEvent);
  // }, [nameChangeEvent]);

  const changeUserName = async (event: NameChange) => {
    try {
      const response = await fetch(
        'http://localhost:6002/update/customer/names',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: newNameData,
            id,
            event,
          }),
        }
      );

      if (!response.ok) {
        // @ts-ignore
        navigation.navigate('AccountInfo', {
          id,
        });
        badNameChange();
      } else {
        updateAuthandStorage();
        goodNameChange();
        // @ts-ignore
        navigation.navigate('UserHome');
      }
    } catch (error) {
      throw new error();
    }
  };

  const [newPhoneNumber, setNewPhoneNumber] = useState<string>('');

  const handlePhoneNumberChange = (number) => {
    setNewPhoneNumber(number);
  };

  useEffect(() => {
    console.log(newPhoneNumber, 'number from hook');
    console.log(isValidPhoneNumberFormat);
  }, [newPhoneNumber]);

  const requestPhoneNumberChange = () => {
    console.log('hi');
  };

  const isValidPhoneNumberFormat = /^\d{3}-\d{3}-\d{4}$/.test(newPhoneNumber);

  const checkIfVailablePhoneNumber = () => {
    return isValidPhoneNumberFormat;
  };

  return {
    handleName: handleNameFormChange,
    changeName: changeUserName,
    canUpdate: canFormBeSubmitted,
    nameChangeType: nameChangeEvent,
    // FIXME: update export name
    data: newNameData,
    handlePhoneNumberChange,
    changePhoneNumber: requestPhoneNumberChange,
    numberData: newPhoneNumber,
    isNumberValid: checkIfVailablePhoneNumber,
  };
};
