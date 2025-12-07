//소수인지 아닌지를 판단 에라토스테네스의 체를 써도 되지만 그냥 직접구현해보자
// <‘소수 판별 함수의 표준 최적화 버전’>
export const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  if (num === 2) return true;
  if (num % 2 === 0) return false; // 짝수는 소수가 아님

  //2부터 num -1까지 나누어 떨어지는 수가 있으면 소수가 아님
  for (let i = 3; i * i <= num; i++) {
    //합성수면 두 약수 a,b가 존재한다.
    //(a,b)
    // a * b = num, 소수조건: 두 약수 중 하나는 반드시 sqrt(num)(루트 num)이하에 존재한다.
    //ex) n = 49
    //(1,49), (7,7)
    //7*7= 49에서 7이상은 검토할 필요가 없다.
    //i * i= num 인순간은 중단해도 결과가 동일하다.
    if (num % i === 0) return false;
  }

  return true;
};

//소수를 찾으면 그 소수만 찾으면 배열로 반환하는것을 만들자
//모든 숫자를 소수라 가정하고 소수가 아닌걸 제거하는것
export const findPrimeNumbers = (max: number): number[] => {
  const sieve = Array(max + 1).fill(true);
  sieve[0] = sieve[1] = false; // 0과 1은 소수가 아님.

  for (let i = 2; i * i <= max; i++) {
    if (sieve[i]) {
      for (let j = i * i; j <= max; j += i) {
        // ← 여기만 수정
        sieve[j] = false;
      }
    }
  }

  return sieve
    .map((isPrime, i) => (isPrime ? i : null))
    .filter((v): v is number => v !== null); // ← 여기만 수정
};
