export const useLocalStorage = (key: string) => {
  const setItem = (value: unknown) => {
    try {
      if (typeof value === "string") {
        window.localStorage.setItem(key, value); // ✅ 문자열은 그대로 저장// !!! 그동안 토큰에 따옴표가 들어가서 승인이 안났음~~~~~
      } else {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getItem = () => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return null;
      try {
        return JSON.parse(item);
      } catch {
        return item; // ✅ JSON이 아니면 그냥 문자열 반환
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  };

  return { setItem, getItem, removeItem };
};
