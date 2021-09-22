import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Get an object form async storage
 * @param key of the object
 * @returns deserialzed object
 */
export async function getObject(key: string) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    if (jsonValue){
      return JSON.parse(jsonValue);
    } else {
      return null;
    }
  } catch (e) {
    console.error('Error at getting the object from storage', e);
    throw(e);
  }
};

/**
 * Get string from async storage
 * @param key of the string
 * @returns stored string
 */
export async function getString(key: string) {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.error('Error at getting the string from storage', e);
    throw(e);
  }
};

/**
 * Store an object to async storage
 * @param key of the object to store
 * @param object to store
 */
export async function storeObject(key: string, object: any) {
  try {
    const jsonValue = JSON.stringify(object);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error at saving the object in storage', e);
    throw(e);
  }
};

/**
 * Store string to async storage
 * @param key of the string to store
 * @param value string to store
 */
export async function storeString (key: string, value: string) {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error('Error at saving the string in storage', e);
    throw(e);
  }
};

/**
 * Remove an item from async storage
 * @param key of the item to remove
 */
export async function removeItem(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.error('Error at removing the item in storage', e);
    throw(e);
  }
};

/**
 * Clear all the key values from async storage
 */
export async function clearAll() {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    console.error('Error at clearing the storage', e);
    throw(e);
  }
};
