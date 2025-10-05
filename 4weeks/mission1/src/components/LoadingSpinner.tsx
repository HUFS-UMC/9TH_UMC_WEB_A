export const LoadingSpinner = () => {
  return (
    <div
      className="size-12 animate-spin rounded-full border-6 border-t-transparent border-[red]
   "
      role="status"
    >
      <span className="sr-only">로딩중...</span> 
      {/* 스크린 뷰어에 의존해야 하는사람들을 위함 */}
    </div>
  );
};

// size-12 = w-12 h-12
