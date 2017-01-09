'use strict';

import {
  AsyncStorage
} from 'react-native';

export const USERNAME_STORAGE_KEY = '@Username:key';

export const NOTIFICATION_DAYS_KEY = '@NotificationDays:key';
export const NOTIFICATION_HOUR_KEY = '@NotificationHour:key';

import { SCRIPT } from './urls.js';

const SCRIPT_URL = SCRIPT;
const SEARCH_USERNAME_FUNC = 'search';
const INSERT_LUNCH_FUNC = 'insert';

export function verifyName(searchedName, func) {
  const query = SCRIPT_URL + composeQueryParameters({
    'user': searchedName,
    'func': SEARCH_USERNAME_FUNC
  });
  fetch(query)
    .then(response => response.json())
    .then(json => {
      if (json.error !== 0) {
        console.log('ERROR', json.message);
      }
      func(json.error === 0);
    })
    .catch(error => console.log('ERROR', error));
}

export function addLunch(name, date, lunch, func) {
  const d = date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear();
  const query = SCRIPT_URL + composeQueryParameters({
    'func': INSERT_LUNCH_FUNC,
    'user': name,
    'date': d,
    'food': lunch
  });
  console.log('query', query);
  fetch(query)
    .then(response => response.json())
    .then(json => {
      if (json.error !== 0) {
        console.log('ERROR', json.message);
      }
      func(json.error === 0);
    })
    .catch(error => console.log('ERROR', error));
}

export function getUserInfo() {
  return getStorageItem(USERNAME_STORAGE_KEY);
}

export function setUserInfo(value) {
  return setStorageItem(USERNAME_STORAGE_KEY, value);
}

export function checkSavedUsername(func) {
  getStorageItem(USERNAME_STORAGE_KEY)
    .then(value => verifyName(value, func))
    .catch(error => console.log('ERROR', error));
}

function composeQueryParameters(data) {
  return Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');
}

export function getStorageItem(key) {
  return AsyncStorage.getItem(key);
}

export function getStorageItems(keys) {
  return AsyncStorage.multiGet(keys);
}

export function setStorageItems(values) {
  return AsyncStorage.multiSet(values);
}

export function setStorageItem(key, value) {
  return AsyncStorage.setItem(key, value);
}

export function getNotificationDays() {
  return AsyncStorage.getItem(NOTIFICATION_DAYS_KEY);
}

export function setNotificationDays(days) {
  return AsyncStorage.setItem(NOTIFICATION_DAYS_KEY, days);
}

export function getNotificationHour() {
  return AsyncStorage.getItem(NOTIFICATION_HOUR_KEY);
}

export function setNotificationHour(hour) {
  return AsyncStorage.setItem(NOTIFICATION_HOUR_KEY, hour);
}

export function getNotificationTime() {
  return AsyncStorage.multiGet([NOTIFICATION_DAYS_KEY, NOTIFICATION_HOUR_KEY]);
}

export function formatTimeParts(timePart) {
  return timePart >= 10 ? timePart : '0' + timePart;
}
