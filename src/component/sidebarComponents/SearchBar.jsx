import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar({ onSearch, isOpen, setIsOpen }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
    useEffect(() => {
    if (!isOpen) {
      setOpen(false); // Sidebar bağlıdırsa, search input gizlənsin
      setQuery("");  
    }
  }, [isOpen]);
  return (
    <div className="pl-1 py-2">
      <div className="flex items-center">
        <button
          onClick={() => {
            setOpen((prev) => !prev);
            if (!isOpen) {
              setIsOpen(true);
            }
          }}
          className="p-2 hover:text-green-500 transition-colors"
        >
          <FaMagnifyingGlass />
        </button>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            onSearch && onSearch(e.target.value);
          }}
          placeholder="Search in Your Library"
          className={`ml-2 h-8 rounded transition-all duration-300 outline-none px-2 text-sm
            ${open ? "w-48 bg-[#2a2a2a]" : "w-0 bg-transparent"} 
            overflow-hidden`}
        />
      </div>
    </div>
  );
}
