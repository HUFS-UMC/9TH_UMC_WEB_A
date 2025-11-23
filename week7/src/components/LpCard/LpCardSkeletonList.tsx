import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardSkeletionListProps {
  count: number;
}

const LpCardSkeletonList = ({ count }: LpCardSkeletionListProps) => {
  return (
    <>
      {new Array(count).fill(0).map((_, idx) => (
        <LpCardSkeleton key={idx} />
      ))}
    </>
  );
};

export default LpCardSkeletonList;
