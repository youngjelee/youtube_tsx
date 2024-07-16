import { useEffect, useRef, useState } from "react"
import { formatDuration } from "../utils/formatDuration"
import { formatTimeAgo } from "../utils/formatTimeAgo"

type VideoGridItem = {
    id: string
    title: string
    channel: {
        id: string
        name: string
        profileUrl: string
    }
    views: number
    postedAt: Date
    duration: number
    thumbnailUrl: string
    videoUrl: string

}

const VIEW_FORMATTER = new Intl.NumberFormat(undefined, {
    notation: "compact"
})

export function VideoGridItem(videoGridItem: VideoGridItem) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (videoRef.current == null) return

        if (isVideoPlaying) {
            videoRef.current.currentTime = 0
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
    }, [isVideoPlaying])

    return (
        <div className="flex flex-col gap-2"
            onMouseEnter={() => setIsVideoPlaying(true)} onMouseLeave={() => setIsVideoPlaying(false)}
        >
            <a href={`/watch=?v=${videoGridItem.id}`} className="relative aspect-video">
                <img src={videoGridItem.thumbnailUrl}
                    className={`block w-full h-full object-cover rounded-xl `}
                    alt="" />
                <div className="absolute bottom-1 right-1 bg-secondary-dark text-secondary text-sm px-0.5 rounded">
                    {formatDuration(videoGridItem.duration)}
                </div>
                <video
                    className={`block 
                        h-full 
                        object-cover 
                        absolute inset-0 
                        transition-opacity duration-1000 
                        ${isVideoPlaying ? "opacity-100 delay-100" : "opacity-0"
                        }`}
                    ref={videoRef}
                    muted
                    playsInline
                    src={videoGridItem.videoUrl}
                />

            </a>
            <div className="flex gap-2 ">
                <a href={`/@${videoGridItem.channel.id}`} className="flex-shrink-0">
                    <img src={videoGridItem.channel.profileUrl} className="w-12 h-12 rounded-full" alt="" />

                </a>
                <div className="flex flex-col">
                    <a href={`/`} className="font-bold">
                        {videoGridItem.title}
                    </a>
                    <a href={`/`} className="text-secondary-text text-sm">
                        {videoGridItem.channel.name}
                    </a>
                    <div className="text-secondary-text text-sm">
                        조회수 {VIEW_FORMATTER.format(videoGridItem.views)} • {formatTimeAgo(videoGridItem.postedAt)}
                    </div>
                </div>

            </div>


        </div>

    );
}