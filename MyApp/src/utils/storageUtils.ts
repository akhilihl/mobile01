// Requires: npm install react-native-encrypted-storage
// Then run: cd android && ./gradlew clean  (or pod install for iOS)
import EncryptedStorage from 'react-native-encrypted-storage';

type StorageResult<T = undefined> =
  | { status: 'success'; data?: T; message?: string }
  | { status: 'fail'; message: unknown };

export const StoreValue = async (
  data: unknown,
  key: string,
): Promise<StorageResult> => {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(data));
    return { status: 'success', message: 'stored successfully' };
  } catch (error) {
    return { status: 'fail', message: error };
  }
};

export const GetValue = async <T = unknown>(
  key: string,
): Promise<StorageResult<T>> => {
  try {
    const session = await EncryptedStorage.getItem(key);
    if (session !== null && session !== undefined) {
      return { status: 'success', data: JSON.parse(session) as T };
    }
    return { status: 'fail', message: 'item not found' };
  } catch (error) {
    return { status: 'fail', message: error };
  }
};

export const DeleteValue = async (key: string): Promise<StorageResult> => {
  try {
    await EncryptedStorage.removeItem(key);
    return { status: 'success' };
  } catch (error) {
    return { status: 'fail', message: error };
  }
};

export const ClearStorage = async (): Promise<StorageResult> => {
  try {
    await EncryptedStorage.clear();
    return { status: 'success' };
  } catch (error) {
    return { status: 'fail', message: error };
  }
};
