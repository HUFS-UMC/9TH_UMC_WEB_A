import type { Cast } from "../types/moviedetail";

interface Props {
  director: Cast;
}

const DirectorCard = ({ director }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={
          director.profile_path
            ? `https://image.tmdb.org/t/p/w185${director.profile_path}`
            : "https://via.placeholder.com/150x225?text=No+Image"
        }
        alt={director.name}
        className="w-24 h-24 rounded-full object-cover"
      />
      <p className="mt-2 font-bold text-center">{director.name}</p>
      <p className="text-sm text-gray-400 text-center">Director</p>
    </div>
  );
};

export default DirectorCard;
