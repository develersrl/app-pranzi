import PushNotification from 'react-native-push-notification';

import I18n from 'react-native-i18n';

export default class NotificationManager {

  static clearNotifications() {
    PushNotification.cancelAllLocalNotifications();
  }

  static setNotification(date) {
    console.log(date);
    PushNotification.localNotificationSchedule({
      title: 'App Pranzi',
      message: I18n.t('notificationText'),
      repeatType: 'week',
      date: date,
    });
  }

  static setNotifications(dates) {
    dates.forEach((date) => {
      NotificationManager.setNotification(date);
    });
  }

  static resetNotifications(dates) {
    NotificationManager.clearNotifications();
    NotificationManager.setNotifications(dates);
  }
}
