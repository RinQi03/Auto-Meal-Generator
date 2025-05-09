import './config.mjs';

export async function youtubeExtractor(name){

    // if (name.includes(" ")){
    //     name = name.replaceAll(" ","+");
    // }

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${name}&type=video&maxResults=1&key=${process.env.YOUTUBE_API_KEY}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      const data = await response.json();
      const firstVideo = data.items[0];
    //   const videoURL = `https://www.youtube.com/watch?v=${firstVideo.id.videoId}`;
    //   console.log('First video URL:', videoURL);
      return firstVideo.id.videoId;
    } catch (error) {
      console.error('Error fetching YouTube API results:', error);
    }
  };
  
  