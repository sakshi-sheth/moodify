document.addEventListener("DOMContentLoaded", function () {
  // Add event listeners to all mood buttons
  document.querySelectorAll(".mood-button").forEach((button) => {
    button.addEventListener("click", function () {
      const mood = this.getAttribute("data-mood");
      //   console.log("hhhhhhhhhhhh", mood); // Get mood from button
      fetchSongs(mood); // Fetch songs for the selected mood
    });
  });

  // Function to fetch songs from the Flask backend
  function fetchSongs(mood) {
    fetch("/get_songs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mood: mood }),
    })
      .then((res) => res.json())
      .then((data) => displaySongs(data))
      .catch((err) => console.error(err));
  }

  // Function to display fetched songs
  function displaySongs(songs) {
    const songList = document.getElementById("song-list");
    songList.innerHTML = ""; // Clear previous songs

    if (songs.length === 0) {
      songList.innerHTML = "<p>No songs found for this mood.</p>";
      return;
    }

    // Create and display each song in a nice format
    songs.forEach((song) => {
      const songItem = document.createElement("div");
      songItem.classList.add("song-item"); // Apply CSS styles
      songItem.innerHTML = `<p>${song}</p>`;
      songList.appendChild(songItem);
    });
  }
});
