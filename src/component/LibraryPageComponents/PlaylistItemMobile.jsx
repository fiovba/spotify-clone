import { useNavigate } from "react-router";

export default function PlaylistItem({ data,user }) {
  const navigate = useNavigate()
  return (
    <div className="flex items-center gap-4" onClick={()=>navigate(`/playlist/${data.id}`)}>
      <img
        src={data.image}
        alt={data.name}
        className="w-12 h-12 object-cover rounded"
      />
      <div className="flex-1">
        <p className="text-sm font-semibold">{data.name}</p>
        <p className="text-xs text-gray-400">Playlist • {user.name}</p>
      </div>
    </div>
  );
}
