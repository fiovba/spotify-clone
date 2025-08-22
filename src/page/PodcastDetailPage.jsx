import React from 'react';
import { useOutletContext, useParams } from 'react-router';
import PodcastAbout from '../component/podcastDetailPageComponents/PodcastAbout';
import PodcastHeader from '../component/podcastDetailPageComponents/PodcastHeader';
import PodcastEpisodes from '../component/podcastDetailPageComponents/PodcastEpisodes';


function PodcastDetailPage() {
    const { id } = useParams();
    const { podcasts, episodes } = useOutletContext();

    const podcast = podcasts.find(p => p.id.toString() === id);
    const podcastEpisodes = episodes.filter(e => e.podcastId.toString() === id);

    if (!podcast) {
        return <div className="text-center text-gray-400 mt-10">Podcast not found.</div>;
    }

    return (
        <div className="flex flex-col gap-6 ">
            <div className="flex-1 ">
                <PodcastHeader 
                    image={podcast.image} 
                    title={podcast.title} 
                    author={podcast.author} 
                />
                
            </div>
            <div className="w-full gap-3 flex flex-col md:flex-row justify-center p-6">
           <div className='md:w-[60%] w-full'> 
            <h2 className='text-2xl font-bold'>All Episodes</h2>
            <PodcastEpisodes episodes={podcastEpisodes}  author={podcast.author}  />
            </div>
                <div className='md:w-[40%] w-full'>
                    <h2 className='text-2xl font-bold'>About</h2>
                    <PodcastAbout
                    about={podcast.description}
                    rating={podcast.rating}
                    ratingCount={podcast.ratingCount}
                    tags={podcast.category || []}
                    
                />
                </div>
            </div>
        </div>
    );
}

export default PodcastDetailPage;
