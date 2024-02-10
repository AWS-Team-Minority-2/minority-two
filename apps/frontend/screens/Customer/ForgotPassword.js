import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { SafeAreaView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import styles from './sass/ForgotPassword.scss';



const ForgotPassword = () => {
    const navigation = useNavigation();
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (text) => {
        setInputValue(text);
    }
  return (
    <SafeAreaView style={styles.forgotPasswordLayout}>
        <View style={styles.forgotPasswordAdjustment}>
            <View style={styles.forgotPasswordContainer}>
                <TouchableOpacity
                style={styles.leftIcon}
                onPress={() => navigation.navigate('CustomerLogin')}
                >
                    <Feather name='chevron-left' size={33} color='black' />
                </TouchableOpacity>
                <View >
                    <Text style={styles.forgotPasswordText}>Forgot Password</Text>
                    <Text style={styles.subforgotPasswordText}>Enter the email address or phone number with your account and we'll send an email with confirmation to reset your password. </Text>
                    <Text style={styles.buttonHeader}>Email Address or Phone Number</Text>
                </View>
                <View>
                    <TextInput style={
                        styles.inputContainer}
                                    
                        placeholder='customer@gmail.com'
                        onChangeText={(newText) => handleInputChange(newText)}
                        value={inputValue}

                        />

                    <TouchableOpacity style={styles.button}>

                    <Text style={styles.buttonText}>Send Code</Text>
                    
                    </TouchableOpacity>

                </View>

            
            </View>
        </View>
        
    </SafeAreaView>

  );
};

export { ForgotPassword };
