const fs = require("fs");

const dateToFilter = "2023-01-01";

fs.readFile("releases.json", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading the file:", err);
    return;
  }

  try {
    const albums = JSON.parse(data);

    const filteredAlbums = albums.filter(
      (album) => album.release_date >= dateToFilter
    );

    fs.writeFile(
      "releases.json",
      JSON.stringify(filteredAlbums, null, 2),
      (err) => {
        if (err) {
          console.error("Error writing the file:", err);
          return;
        }
        console.log("Filtered albums have been written to releases.json");
      }
    );
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
});
