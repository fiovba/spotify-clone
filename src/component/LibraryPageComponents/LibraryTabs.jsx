export default function LibraryTabs() {
  const tabs = ["Playlists", "Podcasts", "Artists", "Downloaded"];

  return (
    <div
      className="flex gap-2 px-4 mt-4 overflow-x-auto whitespace-nowrap scrollbar-hidden"
    >
      {tabs.map((tab) => (
        <button
          key={tab}
          className="bg-[#222]/90 px-4 py-1 rounded-full text-sm flex-shrink-0"
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
