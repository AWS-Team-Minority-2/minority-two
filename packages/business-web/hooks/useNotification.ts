import { useEffect, useState, useCallback } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { UPLOAD_NOTIFICATION } from '../mutations/index';
import { NotificationBase } from '@min-two/user-iso';

type Contents = NotificationBase & { userId: string };

export function useNotifications() {
  const [registerNotifications, { loading, error }] =
    useMutation(UPLOAD_NOTIFICATION);

  const upload = useCallback(async (contents: Contents) => {
    console.log(contents, 'kkkk');
    // try {
    //   const { data } = await registerNotifications({
    //     variables: {
    //       // details: {
    //       //   image_url: contents.imageUrl,
    //       //   name: contents.name,
    //       //   type: contents.type,
    //       //   user_id: contents.userId, //
    //       // },
    //     },
    //   });
    //   if (data) {
    //     //   changeScreen(dispatch, 'UserHome');
    //     //   navigation.navigate('UserHome');
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }, []);

  return {
    uploadNotification: upload,
  };
}
