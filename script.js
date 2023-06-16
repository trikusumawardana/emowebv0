const video = document.getElementById("video");
const status = document.getElementById("status");
const promptDiv = document.getElementById("prompt");
const body = document.body;

navigator.mediaDevices.getUserMedia({ video: true })
  .then((stream) => {
    video.srcObject = stream;
    video.width = 640;
    video.height = 480;
    video.videoWidth = 640;
    video.videoHeight = 480;
  })
  .catch((error) => {
    console.log("Error accessing video stream: ", error);
  });

const recommendations = {
  music: [],
  movies: []
};

let captureCount = 0;
const captureLimit = 10;
const captureInterval = 5000; // 5 seconds
const framesPerSecond = 30; // Number of frames captured per second

async function detect() {
  const model = await tf.loadLayersModel("model/model.json");

  const img = tf.browser.fromPixels(video);
  const resized = tf.image.resizeBilinear(img, [48, 48]);
  const normalized = resized.div(255).expandDims(); // Expand dimensions to match the model's input shape

  const result = model.predict(normalized);
  const data = Array.from(result.dataSync());

  console.log(data);

  const maxIndex = data.indexOf(Math.max(...data));
  const emotions = ["Angry", "Disgust", "Fear", "Happy", "Sad", "Surprise", "Neutral"];
  const emotion = emotions[maxIndex];

  status.innerText = emotion;
  updateBackground(emotion);
  tf.dispose([img, resized, normalized, result]);

  updateRecommendations(emotion);

  captureCount++;
  if (captureCount === captureLimit) {
    video.pause();
    showRecommendations();
  }
}

video.addEventListener("play", () => {
  const interval = setInterval(() => {
    if (captureCount < captureLimit) {
      detect();
    }
  }, 10000 / framesPerSecond);

  setTimeout(() => {
    clearInterval(interval);
    video.pause();
    showRecommendations();
  }, captureInterval);
});

function updateBackground(emotion) {
  const colorMap = {
    Angry: "#FF0000",
    Disgust: "#8B008B",
    Fear: "#FFA500",
    Happy: "#FFD700",
    Sad: "#0000FF",
    Surprise: "#00FF00",
    Neutral: "#808080",
  };

  const color = colorMap[emotion] || "#f5f5f5";
  body.style.backgroundColor = color;
}

function updateRecommendations(emotion) {
  const recommendationsMap = {
    Angry: { music: "Rock", movie: { title: "Attack on Titan", year: 2013 } },
    Disgust: { music: "Metal", movie: { title: "Parasyte -the maxim-", year: 2014 } },
    Fear: { music: "Gothic", movie: { title: "Tokyo Ghoul", year: 2014 } },
    Happy: { music: "Pop", movie: { title: "K-On!", year: 2009 } },
    Sad: { music: "Ballads", movie: { title: "Clannad", year: 2007 } },
    Surprise: { music: "Electronic", movie: { title: "Death Note", year: 2006 } },
    Neutral: { music: "Classical", movie: { title: "Kino no Tabi", year: 2017 } },
  };

  const recommendation = recommendationsMap[emotion] || { music: "", movie: { title: "", year: "" } };
  recommendations.music.push(recommendation.music);
  recommendations.movies.push(recommendation.movie);
}

function showRecommendations() {
  const musicList = document.getElementById("musicList");
  const moviesList = document.getElementById("moviesList");

  const musicIndex = Math.floor(Math.random() * recommendations.music.length);
  const movieIndex = Math.floor(Math.random() * recommendations.movies.length);

  const musicItem = document.createElement("li");
  musicItem.textContent = recommendations.music[musicIndex];
  musicList.appendChild(musicItem);

  const movieItem = document.createElement("li");
  const movie = recommendations.movies[movieIndex];
  movieItem.textContent = `${movie.title} (${movie.year})`;
  moviesList.appendChild(movieItem);

  promptDiv.innerText = "";

  // Dispose of the recommendations and clear the recommendations object
  tf.dispose(recommendations.music);
  tf.dispose(recommendations.movies);
  recommendations.music.length = 0;
  recommendations.movies.length = 0;
}
