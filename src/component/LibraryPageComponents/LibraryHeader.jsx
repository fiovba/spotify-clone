import { FaMoon } from "react-icons/fa";

export default function LibraryHeader({user}) {
  return (

    <div className="p-4 bg-[#121212]">
      <div className="flex gap-2 items-center">
        <span><img className="w-10 h-10 rounded-full object-cover" src={user.image} alt="" /></span>
        <span className="poppins-bold">Your Library</span>
      </div>
    </div>
  );
}
