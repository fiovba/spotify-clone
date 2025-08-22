import { useState, useEffect } from "react";
import ColorThief from "colorthief";
export function useDominantColor(imageSrc, factor = 1, defaultColor = [34, 34, 34]) {
  const [color, setColor] = useState(defaultColor);

  useEffect(() => {
    if (!imageSrc) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = imageSrc;

    img.onload = () => {
      try {
        const colorThief = new ColorThief();
        let col = colorThief.getColor(img); 
        if (factor !== 1) {
          col = col.map((c) => Math.floor(c * factor));
        }
        setColor(col);
      } catch (err) {
        console.error("Color extraction error:", err);
        setColor(defaultColor);
      }
    };
  }, [imageSrc, factor]);

  return color; 
}
