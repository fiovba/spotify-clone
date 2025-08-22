import React from 'react';

function PodcastAbout({ about, rating, ratingCount, tags }) {
    const tag = tags.split(',')
    return (
        <div className="bg-neutral-900 p-4 rounded-lg">
            
            <p className="text-gray-300 text-sm mb-3">{about}</p>
            <div className="text-yellow-400 font-medium">
                {rating} ★ <span className="text-gray-400">({ratingCount} ratings)</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {tag.map((t, index) => (
                    <span 
                        key={index} 
                        className="bg-neutral-800 text-gray-300 px-3 py-1 rounded-full text-xs"
                    >
                        {t}
                    </span>
                ))}
            </div>
        </div>
    );
}

export default PodcastAbout;
