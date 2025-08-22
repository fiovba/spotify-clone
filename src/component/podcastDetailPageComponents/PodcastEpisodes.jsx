import React from 'react';

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long'
    });
}

function PodcastEpisodes({ episodes, author }) {
    return (
        <div className="mt-6 space-y-4">
            {episodes.map(episode => (
                <div
                    key={episode.id}
                    className="hover:bg-neutral-700 transition justify-center items-center rounded-lg p-4 flex gap-2 cursor-pointer"
                >
                    <img className='w-40 h-20' src={episode.image} alt="" />
                    <div>
                        <h3 className="text-lg font-semibold">{episode.title}</h3>
                        <h5 className="text-sm text-[#444] font-semibold">{author}</h5>
                        <p className="text-gray-400 text-md mt-1 line-clamp-2">
                            {episode.description}
                        </p>
                        <p className='text-sm'>{formatDate(episode.releaseDate)} • {episode.duration}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PodcastEpisodes;
