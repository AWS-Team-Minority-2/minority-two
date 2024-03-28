import AsyncStorage from '@react-native-async-storage/async-storage';
import { Cart } from './locals';

export const addCartStateGlobal = async ({ carts }) => {
  try {
    // Adding the item to AsyncStorage
    await AsyncStorage.setItem('carts', JSON.stringify(carts));
    // Setting the state to indicate that item is added
  } catch (error) {
    throw new Error('Error adding cart');
  }
};
