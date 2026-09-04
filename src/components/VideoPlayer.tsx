import { useState } from "react";
import { PlayIcon } from "./icons";

export default function VideoPlayer({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="group/player relative overflow-hidden rounded-xl border border-line bg-ink shadow-[0_30px_60px_rgba(13,31,51,0.25)]">
      {playing ? (
        <video
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          className="aspect-video w-full bg-ink"
        />
      ) : (
        <button
          onClick={() => setPlaying(true)}
          className="relative block w-full cursor-pointer text-start"
          aria-label={`Play: ${title}`}
        >
          <img
            src={poster}
            alt={title}
            className="aspect-video w-full object-cover opacity-90 transition-all duration-700 group-hover/player:scale-[1.03] group-hover/player:opacity-100"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/20" />

          <span className="absolute inset-0 flex items-center justify-center">
            <span className="relative flex h-20 w-20 items-center justify-center md:h-24 md:w-24">
              <span className="absolute inset-0 animate-ping rounded-full bg-flame/35 motion-reduce:hidden" />
              <span className="relative flex h-full w-full items-center justify-center rounded-full bg-flame text-white shadow-[0_12px_40px_rgba(232,89,12,0.5)] transition-transform duration-300 group-hover/player:scale-110">
                <PlayIcon className="h-8 w-8 translate-x-0.5" />
              </span>
            </span>
          </span>

          <span className="absolute bottom-4 start-4 flex items-center gap-2">
            <span className="rounded-full bg-ink/75 px-3.5 py-1.5 text-xs font-bold text-paper backdrop-blur-sm">
              {title}
            </span>
          </span>
          <span
            className="absolute bottom-4 end-4 rounded-full bg-paper/90 px-2.5 py-1 text-[11px] font-extrabold text-ink tabular-nums"
            dir="ltr"
          >
            0:15
          </span>
        </button>
      )}
    </div>
  );
}
