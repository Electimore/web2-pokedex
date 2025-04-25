import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

function PokemonInfo() {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);

      setPokemonData(await getPokemon(name));
      setLoading(false);
    };

    const fetchTypes = async () => {
      setTypes(await getTypeImages());
    };

    fetchPokemonData();
    fetchTypes();
  }, []);

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
      <h1>{pokemonData.name}</h1>
      <h2>Types: </h2>
      <img src={pokemonData.sprites.other.showdown.front_default}></img>
      <h2>Height: {pokemonData.height * 10}cm</h2>
      <h2>Weight: {pokemonData.weight / 10}kg</h2>
    </>
  );
}

export default PokemonInfo;
