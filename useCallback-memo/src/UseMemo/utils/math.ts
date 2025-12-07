//소수인지 아닌지를 판단 에라토스테네스의 체를 써도 되지만 그냥 직접구현해보자

export const isPrime = (num: number): boolean => {
  if (num < 2) return false;

  //2부터 num -1까지 나누어 떨어지는 수가 있으면 소수가 아님
  for (let i = 2; i < num; i++) {
    if (num % i === 0) return false;
  }

  return true;
};

//소수를 찾으면 그 소수만 찾으면 배열로 반환하는것을 만들자
export const findPrimeNumbers = (max: number): number[] => {
  const PrimeNumbers = [];

  for (let i = 2; i <= max; i++) {
    if (isPrime(i)) PrimeNumbers.push(i);
  }

  return PrimeNumbers;
};
