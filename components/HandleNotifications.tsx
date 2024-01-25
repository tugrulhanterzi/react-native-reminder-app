import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import { Alert } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});

const HandleNotifications = () => {
  const navigation = useNavigation();

  useEffect(() => {
    async function configurePushNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (finalStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        Alert.alert(
          "İzin gerekli",
          "Hatırlatıcıların zamanı geldiğinde uyarılmak için yerel bildirimler gereklidir."
        );
        return;
      }
    }

    configurePushNotifications();
  }, []);

  useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("RESPONSE", response);
        const reminderId =
          response.notification.request.content.data.reminderId;
        if (reminderId) {
          // @ts-ignore
          navigation.navigate("ModifyReminder", { reminderId });
        }
      }
    );

    return () => subscription.remove();
  });

  return <React.Fragment />;
};

export default HandleNotifications;
