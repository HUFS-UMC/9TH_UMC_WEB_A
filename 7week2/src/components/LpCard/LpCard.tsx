import { useNavigate } from "react-router-dom";
import { Lp } from "../../types/lp";
import LpCardSkeleton from "./LpCardSkeleton";

interface LpCardProps {
  lp: Lp;
}

const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate(); // 카드를 눌렀을떄 상세페이지로 넘어가게
  return (
    <div 
    onClick={()=>navigate(`/lps/${lp.id}`)}
    className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 p-2">
        <h3 className="text-white text-sm font-semibold">{lp.title}</h3>
      </div>
      <LpCardSkeleton />
    </div>
  );
};

export default LpCard;
