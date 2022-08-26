export const readFromLocalStorage = (key: string) => {
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : false;
  } catch (error) {
    console.warn(`Error reading localStorage key “${key}”:`, error);
    return false;
  }
};

export const setLocalStorageItem = (key: string, value: string | number) => {
  if (typeof window == "undefined") {
    console.warn(
      `Tried setting localStorage key “${key}” even though environment is not a client`
    );
  }

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`Error setting localStorage key “${key}”:`, error);
  }
};
