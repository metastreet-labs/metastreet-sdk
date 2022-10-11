const DASH_URL = "https://player.vimeo.com/external/759253076.mpd?s=35d7c5853116455f43e689cd4026d4da50c5ac15";
const MP4_URL =
  "https://player.vimeo.com/progressive_redirect/playback/759253076/rendition/480p/file.mp4?loc=external&signature=d6433dfe2cca7940b41c9527dce155eaa002ca5cfb2a32c7ba98c8a16218af41";

const SuccessAnimation = () => {
  return (
    <video autoPlay loop className="w-56 h-56 mx-auto my-4">
      <source src={DASH_URL} />
      <source src={MP4_URL} />
      Your browser doesn't support the video tag
    </video>
  );
};

export default SuccessAnimation;
