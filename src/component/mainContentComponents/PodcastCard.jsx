import React, { useEffect, useState, useRef } from "react";
import ColorThief from "colorthief";
import { useNavigate } from "react-router";

const PodcastCard = ({ podcast }) => {
    const imgRef = useRef(null);
    const [bgColor, setBgColor] = useState([15, 23, 42]); // rgb rəngi array kimi saxla
    const [showFullDesc, setShowFullDesc] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        if (imgRef.current && imgRef.current.complete) {
            extractColor();
        }
    }, [podcast]);

    const extractColor = () => {
        try {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(imgRef.current);
            setBgColor(color);
        } catch (err) {
            console.error("Color extraction error:", err);
        }
    };

    const darkenColor = (color, amount = 200) => {
        return color.map((c) => Math.max(c - amount, 0));
    };

    if (!podcast) return null;

    const descLimit = 200;
    const shortDesc =
        podcast.description.length > descLimit && !showFullDesc
            ? podcast.description.slice(0, descLimit) + "..."
            : podcast.description;

    const startColor = `rgb(${bgColor[0]}, ${bgColor[1]}, ${bgColor[2]})`;
    const endColor = `rgb(${darkenColor(bgColor).join(", ")})`;

    return (
        <div
            onClick={() => navigate(`/podcasts/${podcast.id}`)}
            className="relative text-white p-5  rounded-xl justify-center shadow-lg overflow-hidden max-w-[450px]"
            style={{
                background: `linear-gradient(135deg, ${startColor} 0%, ${endColor} 100%)`,
            }}
        >
            <p className="text-3xl font-bold leading-tight">{podcast.title}</p>
            <p className="text-xl  leading-tight">{podcast.author}</p>

            <div className="mt-3 relative group rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0">
                    <div className="flex justify-center space-x-1.5 w-[60%] px-3">
                        {[...Array(20)].map((_, i) => (
                            <span
                                key={i}
                                className="wave-long"
                                style={{ animationDelay: `${(i * 100) % 1000}ms` }}
                            />
                        ))}
                    </div>
                </div>
                <div className="w-full justify-center flex">

                    <img
                        src={podcast.image}
                        alt={podcast.title}
                        ref={imgRef}
                        crossOrigin="anonymous"
                        className="relative  rounded-lg w-[70%] object-cover  transition-transform duration-300 group-hover:scale-50 z-10"
                        onLoad={extractColor}
                    />
                </div>
            </div>
            <p className="mt-2 text-sm text-gray-300">
                {shortDesc}
                {podcast.description.length > descLimit && (
                    <button
                        className="ml-2 text-blue-400 hover:underline"
                        onClick={() => setShowFullDesc((prev) => !prev)}
                    >
                        {showFullDesc ? "Show less" : "Show more"}
                    </button>
                )}
            </p>


        </div>
    );
};

export default PodcastCard;
