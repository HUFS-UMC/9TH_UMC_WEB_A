// localStorage 관련 커스텀 훅
export const useLocalStorage = (key: string) => {
  // 값 저장
  const setItem = (value: unknown) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value)); // ★ 수정: 들여쓰기 정리
    } catch (error) {
      console.log(error);
    }
  };

  const getItem = () => {
    try {
      const item: string | null = window.localStorage.getItem(key);
    } catch (e) {
      console.log(e);
    }
  };

  const removeItem = () => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  };
  return { setItem, getItem, removeItem };
};
