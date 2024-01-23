import { View, Image, Text } from 'react-native';
import React from 'react';
import Appstyles from './sass/Homescreen.scss';

const Homescreen = () => {
  return (
    <>
      <View style={Appstyles.container}>
        <Image source={require('./bg.png')} style={Appstyles.image} />
      </View>
      <View style={Appstyles.overlay}>
        <Text>dev line</Text>
      </View>
    </>
  );
};

export { Homescreen };
