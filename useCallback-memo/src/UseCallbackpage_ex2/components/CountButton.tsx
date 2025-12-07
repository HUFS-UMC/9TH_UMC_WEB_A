interface ICountButton {
  onClick: (count: number) => void;
}
//props타입 검사 역할
//CountButton은 반드시 onClick이라는 props를 받아야 하고,
// 그 타입은 (number를 받고, 아무것도 반환하지 않는 함수) 형태여야 해.

//부모 리렌더링 → 자식도 리렌더링 부모가 리렌더되면 기본적으로 자식 컴포넌트도 다시 실행됨.
const CountButton = ({ onClick }: ICountButton) => {
  console.log("CountButton rendred"); //CountButton이 렌더링될 때마다 무조건 콘솔에 찍힘.
  return (
    <button className="border p-2 rounded-lg " onClick={() => onClick(10)}>
      카운트증가
    </button>
  );
};

export default CountButton;

//실행방식
// UseCallbackpage.tsx(부모) : <CountButton onClick={handleIncreaseCount} />
//CountButton 컴포넌트를 실행하자.그리고 props로 onClick이라는 이름으로 handleIncreaseCount 함수를 전달하자
//
