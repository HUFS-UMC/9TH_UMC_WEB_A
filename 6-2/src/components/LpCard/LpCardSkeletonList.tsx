import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardSkeletionListProps {
  count: number;
}

const LpCardSkeletonList = ({ count }: LpCardSkeletionListProps) => {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => ( //데이터를 대신할 “더미 배열”을 하나 만들어서 map()으로 돌리는것
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
};

export default LpCardSkeletonList;

