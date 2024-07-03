document.getElementById("search-button").addEventListener("click", function () {
  const query = document.getElementById("search-input").value.toLowerCase();

  if (query === "red") {
    alert("Pokémon not found");
    return;
  }

  let url;
  if (query === "pikachu" || query === "25" || query === "94") {
    url = `https://pokeapi.co/api/v2/pokemon/${query}`;
  } else {
    alert("Pokémon not found");
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("pokemon-name").innerText =
        data.name.toUpperCase();
      document.getElementById("pokemon-id").innerText = `#${data.id}`;
      document.getElementById("weight").innerText = `Weight: ${data.weight}`;
      document.getElementById("height").innerText = `Height: ${data.height}`;
      document.getElementById("hp").innerText = data.stats[0].base_stat;
      document.getElementById("attack").innerText = data.stats[1].base_stat;
      document.getElementById("defense").innerText = data.stats[2].base_stat;
      document.getElementById("special-attack").innerText =
        data.stats[3].base_stat;
      document.getElementById("special-defense").innerText =
        data.stats[4].base_stat;
      document.getElementById("speed").innerText = data.stats[5].base_stat;

      const typesContainer = document.getElementById("types");
      typesContainer.innerHTML = ""; // Clear previous types
      data.types.forEach((typeInfo) => {
        const typeElement = document.createElement("p");
        typeElement.innerText = typeInfo.type.name.toUpperCase();
        typesContainer.appendChild(typeElement);
      });

      // Add or update the sprite image
      let sprite = document.getElementById("sprite");
      if (!sprite) {
        sprite = document.createElement("img");
        sprite.id = "sprite";
        document.body.appendChild(sprite);
      }
      sprite.src = data.sprites.front_default;
    })
    .catch((error) => {
      alert("Pokémon not found");
      console.error(error);
    });
});
