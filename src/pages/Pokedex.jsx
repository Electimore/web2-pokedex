import React, { useState, useEffect } from "react";
import "./Pokedex.css";

const getPokemonPage = async (page = 0, elementsPerPage = 20) => {
  let offset = page * elementsPerPage;
  let limit = elementsPerPage;
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error(`Response was not OK! Status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching Pokemon Page:", err);
    return null;
  }
};

const getPokemon = async (name) => {
  if (name === "") {
    return null;
  }
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    if (!response.ok) {
      throw new Error(`Response was not OK! Status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching Pokemon:", err);
    return null;
  }
};

const getTypeImages = async () => {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/type/`);
    if (!response.ok) {
      throw new Error(`Response was not OK! Status: ${response.status}`);
    }

    const responseJson = await response.json();

    let typeImages = Array(responseJson.count - 1);

    for (let i = 0; i < responseJson.count - 1; i++) {
      const typeResponse = await fetch(responseJson.results[i].url);
      if (!typeResponse.ok) {
        throw new Error(`Response was not OK! Status: ${typeResponse.status}`);
      }
      const typeResponseJson = await typeResponse.json();
      //   prettier-ignore
      typeImages[i] = {
        "name": typeResponseJson.name,
        "sprite": typeResponseJson.sprites['generation-viii']['legends-arceus'].name_icon}
        ;
    }

    return typeImages;
  } catch (err) {
    console.error("Error fetching Types:", err);
    return null;
  }
};

function Podekex() {
  const [pokedexEntries, setPokedexEntries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPokemon, setTotalPokemon] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [types, setTypes] = useState(null);

  const elementsPerPage = 20;

  useEffect(() => {
    const fetchTypes = async () => {
      setTypes(await getTypeImages());
    };

    fetchTypes();
  }, []);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);

      const data = await getPokemonPage(currentPage - 1, elementsPerPage);
      let pokemonPageData = Array(20);
      setTotalPokemon(data.count);

      for (let i = 0; i < data.results.length; i++) {
        let singlePokemonData = await getPokemon(data.results[i].name);
        pokemonPageData[i] = {
          name: data.results[i].name,
          id: singlePokemonData.id,
          types: singlePokemonData.types.map((item) => item.type.name),
          sprite: singlePokemonData.sprites.other.showdown.front_default,
        };
      }

      if (data) {
        setPokedexEntries(pokemonPageData);
      } else {
        setError("Failed to load Pokemon data.");
      }

      setLoading(false);
    };

    fetchPokemonData();
  }, [currentPage]);

  const getTypeImageUrl = (type) => {
    if (types != null) {
      let returnable = null;
      types.forEach((element) => {
        if (element.name == type) {
          returnable = element.sprite;
        }
      });
      return returnable;
    }
    return null;
  };

  const numberOfPages = Math.ceil(totalPokemon / elementsPerPage);

  const goToPrevPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, numberOfPages));
  };

  if (loading) {
    return (
      <>
        <h1>Loading Pokemon data...</h1>
        <div id="loading">
          <img id="loading-img" src="../../public/loading-no-bg.gif" />
        </div>
      </>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>POKEDEX</h1>
      <a href="./about" id="about">
        About
      </a>
      <div id="poke_grid">
        {pokedexEntries.map((entry) => (
          <a href={"./pokemon/" + entry.name}>
            <div key={entry.id}>
              <p id="id">{entry.id}</p>
              <div id="type" key={entry.number}>
                {entry.types.map((type) => (
                  <img src={getTypeImageUrl(type)} key={entry.id + type} />
                ))}
              </div>

              <img id="poke_img" src={entry.sprite}></img>
              <p id="name">{entry.name}</p>
            </div>
          </a>
        ))}
      </div>

      <div id="buttons">
        <button id="prev" onClick={goToPrevPage} disabled={currentPage === 1}>
          &#8249;
        </button>

        <button
          id="next"
          onClick={goToNextPage}
          disabled={currentPage === numberOfPages}
        >
          &#8250;
        </button>
      </div>
      <p id="page">
        page:{" "}
        <span>
          {currentPage}/{numberOfPages}
        </span>
      </p>
    </>
  );
}

export default Podekex;
