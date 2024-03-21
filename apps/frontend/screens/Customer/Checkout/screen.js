import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  useRestaurantState,
  selectBasketItems,
  useBasketState,
  selectBasketTotal,
} from '@min-two/business-web';

// import { XCircleIcon } from 'react-native-heroicons/outline';
import Currency from 'react-currency-formatter';

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurantState = useRestaurantState(); // Get the restaurant state from the context

  const basketState = useBasketState(); // Use useBasketState to get the basket state
  const total = selectBasketTotal(basketState); // Pass basket state to selectBasketTotal
  const items = selectBasketItems(basketState); // Pass basket state to selectBasketItems

  console.log(items, 'items');

  // const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  // const basketTotal = useSelector(selectBasketTotal); // Fix here

  // useEffect(() => {
  //   const groupedItems = items.reduce((results, item) => {
  //     (results[item.id] = results[item.id] || []).push(item);
  //     return results;
  //   }, {});
  //   setGroupedItemsInBasket(groupedItems);
  // }, [items]);

  return (
    <View>
      <Text>hello</Text>
    </View>
    // <SafeAreaView className='flex-1 bg-white'>
    //   <View className='flex-1 bg-gray-100'>
    //     <View className='p-5 border-b border-[#4FC8FF] bg-white shadow-xs'>
    //       <View>
    //         <Text className='text-lg font-bold text-center'>Final Look </Text>
    //         <Text className='text-center text-gray-400'>
    //           {restaurant.title}
    //         </Text>
    //       </View>

    //       <TouchableOpacity
    //         onPress={navigation.goBack}
    //         className='rounded-full bg-gray-100 absolute top-3 right-5'
    //       >
    //         <XCircleIcon color='#4FC8FF' height={50} width={50} size={30} />
    //       </TouchableOpacity>
    //     </View>

    //     <View
    //       className='flex-row items-center space-x-4 px-4 py-4 bg-white
    //     my-5'
    //     >
    //       <Image
    //         source={{
    //           uri: 'https://ucarecdn.com/abb0ca9f-fc36-4aac-940a-37d9110595f8/-/resize/601x326/',
    //         }}
    //         className='h-7 w-7 bg-gray-300 p-4 rounded-full'
    //       />
    //       <Text className='flex-1'>Delivey in 20-25 mins</Text>
    //       <TouchableOpacity>
    //         <Text className='text-[#4FC8FF]'>Change</Text>
    //       </TouchableOpacity>
    //     </View>

    //     <ScrollView className='divide-y divide-gray-200'>
    //       {Object.entries(groupedItemsInBasket).map(([key, items]) => (
    //         <View
    //           key={key}
    //           className='flex-row items-center space-x-3 bg-white py-2
    //           px-5'
    //         >
    //           <Text className='text-[#4FC8FF]'>{items.length} x</Text>
    //           <Image
    //             source={{ uri: items[0]?.imageUrl }}
    //             className='h-12 w-12 rounded-full'
    //           />
    //           <Text className='flex-1'>{items[0]?.name}</Text>

    //           <Text className='text-gray-600'>
    //             <Currency quantity={items[0]?.price} currency='USD' />
    //           </Text>
    //           <TouchableOpacity>
    //             <Text
    //               className='text-[#4FC8FF] text-xs'
    //               onPress={() => dispatch(removeFromBasket({ id: key }))}
    //             >
    //               Nevermind
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //       ))}
    //     </ScrollView>

    //     <View className='p-5 bg-white mt-5 space-y-4'>
    //       <View className='flex-row justify-between'>
    //         <Text className='text-gray-400'>Subtotal</Text>
    //         <Text className='text-gray-400'>
    //           <Currency quantity={baksetTotal} currency='USD' />
    //         </Text>
    //       </View>

    //       <View className='flex-row justify-between'>
    //         <Text className='text-gray-400'>Taxes</Text>
    //         <Text className='text-gray-400'>
    //           <Currency quantity={baksetTotal * 0.2} currency='USD' />
    //         </Text>
    //       </View>

    //       <View className='flex-row justify-between'>
    //         <Text> Order Total</Text>
    //         <Text className='font-extrabold'>
    //           <Currency
    //             quantity={baksetTotal + baksetTotal * 0.2}
    //             currency='USD'
    //           />
    //         </Text>
    //       </View>

    //       <TouchableOpacity
    //         onPress={() => navigation.navigate('PreparingOrderScreen')}
    //         className='rounded-full bg-[#4FC8FF] p-4'
    //       >
    //         <Text className='text-center text-white text-lg font-bold'>
    //           Place Order
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </SafeAreaView>
  );
};

export { BasketScreen };
