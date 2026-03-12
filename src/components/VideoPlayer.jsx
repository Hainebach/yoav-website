import { useEffect, useRef } from "react";
import Image from "next/image";
import { extractVimeoId } from "../../lib/vimeo";

export default function VideoPlayer({ video }) {
  const { title, vimeoUrl, thumbnailUrl } = video;
  const id = extractVimeoId(vimeoUrl);
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.querySelector(
      'script[src="https://player.vimeo.com/api/player.js"]',
    );
    if (!script) {
      const s = document.createElement("script");
      s.src = "https://player.vimeo.com/api/player.js";
      s.async = true;
      document.body.appendChild(s);
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full mb-40 md:max-w-7xl md:mx-auto">
      {title && <h2 className="text-lg mb-3 text-midGray">{title}</h2>}
      <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
        <iframe
          src={`https://player.vimeo.com/video/${id}?badge=0&autopause=0&player_id=0&app_id=58479`}
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
          title={title}
          loading="lazy"
        />
      </div>
    </div>
  );
}
