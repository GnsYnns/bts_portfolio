// URL du flux RSS
var rssFeedUrl =
  "https://cors-anywhere.herokuapp.com/https://dotnet.developpez.com/index/rss";

// Nombre d'articles à afficher
var numArticles = 5;

// Fonction pour récupérer et afficher les données du flux RSS
function fetchRssFeed() {
  fetch(rssFeedUrl)
    .then((response) => response.text())
    .then((data) => {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data, "text/xml");
      var items = xmlDoc.querySelectorAll("item");

      var rssFeedDiv = document.getElementById("rss-feed");

      for (var i = 0; i < numArticles; i++) {
        var item = items[i];
        var title = item.querySelector("title").textContent;
        var description = item.querySelector("description").textContent;
        var link = item.querySelector("link").textContent;

        var articleDiv = document.createElement("div");
        articleDiv.innerHTML = `
            <h2><a href="${link}" target="_blank">${title}</a></h2>
            <p>${description}</p>
        `;
        rssFeedDiv.appendChild(articleDiv);
      }
    })
    .catch((error) => {
      console.error("Une erreur s'est produite :", error);
    });
}

// Appeler la fonction pour récupérer le flux RSS
fetchRssFeed();