import type { Cast } from "../types/moviedetail";

interface Props {
  actor: Cast;
}

const ActorCard = ({ actor }: Props) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={
          actor.profile_path
            ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
            : "https://via.placeholder.com/150x225?text=No+Image"
        }
        alt={actor.name}
        className="w-24 h-24 rounded-full object-cover"
      />
      <p className="mt-2 font-bold text-center">{actor.name}</p>
      <p className="text-sm text-gray-400 text-center line-clamp-1">{actor.character}</p>
    </div>
  );
};

export default ActorCard;
