//  change name locally

import React, { useState } from 'react';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

type NameChangeEvent = 'first' | 'last';

type NameData = {
  firstName?: string;
  lastName?: string;
  id: string;
};

type NameChange = 'first' | 'last' | 'both';
// name change hook
export const useCustomerActions = ({ id }) => {
  const navigation = useNavigation();
  const [newNameData, setNameData] = useState<NameData>({
    firstName: null,
    lastName: null,
    id,
  });

  const handleNameFormChange = (change: NameChangeEvent, name: string) => {
    if (change === 'first') {
      setNameData((prevData) => ({ ...prevData, firstName: name }));
    } else if (change === 'last') {
      setNameData((prevData) => ({ ...prevData, lastName: name }));
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

  const canFormBeSubmitted = Object.keys(newNameData)
    .filter((key) => key !== 'id')
    .some((key) => newNameData[key] !== null);

  const changeUserName = async () => {
    // // @ts-ignore
    // navigation.navigate('UserHome');

    // showToast();

    try {
      const response = await fetch(
        'http://localhost:6002/update/customer/names',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newNameData),
        }
      );
      if (!response.ok) {
        // @ts-ignore
        navigation.navigate('AccountInfo', {
          id: newNameData.id,
        });
        badNameChange();
      }
    } catch (error) {
      throw new error();
    }
  };

  return {
    handleName: handleNameFormChange,
    changeName: changeUserName,
    canUpdate: canFormBeSubmitted,
  };
};

// change phone number locally

//  chanage email locally
