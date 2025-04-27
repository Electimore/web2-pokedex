import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

const fetchAbilityDescription = async (url) => {
  if (!url) {
    return null;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error("Could not fetch the description...");
      return "Could not fetch description.";
    }
    const ability = await response.json();
    return (
      ability?.effect_entries?.find((entry) => entry.language.name === "en")
        ?.effect || "No description available."
    );
  } catch (error) {
    console.error("Error fetching ability description:", error);
    return "Error loading description.";
  }
};

function PokemonInfo() {
  const { name } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [types, setTypes] = useState(null);
  const [abilityDescriptions, setAbilityDescriptions] = useState(null);

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

  useEffect(() => {
    const loadAbilityDescriptions = async () => {
      if (pokemonData?.abilities) {
        const descriptions = {};
        for (const ability of pokemonData.abilities) {
          const description = await fetchAbilityDescription(
            ability.ability.url
          );
          descriptions[ability.ability.name] = description;
        }
        setAbilityDescriptions(descriptions);
      }
    };

    loadAbilityDescriptions();
  }, [pokemonData?.abilities]);

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
  if (loading || !abilityDescriptions) {
    return (
      <>
        <h1>Loading Pokemon data...</h1>
        <div id="loading">
          <img id="loading-img" src="loading-no-bg.gif" />
        </div>
      </>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div id="pokemonInfo">
      <h1>{pokemonData.name}</h1>
      <Link className="return" to="/">
        &laquo; Return
      </Link>
      <div id="typeInfo">
        {pokemonData.types.map((type) => (
          <img src={getTypeImageUrl(type.type.name)} key={type.type.name} />
        ))}
      </div>
      <div id="pokemonInfoImgs">
        <div id="pokemonInfoImgNormal">
          <h3>Normal: </h3>
          <img src={pokemonData.sprites.other.showdown.front_default}></img>
        </div>
        <div id="pokemonInfoImgShiny">
          <h3>Shiny: </h3>
          <img src={pokemonData.sprites.other.showdown.front_shiny}></img>
        </div>
      </div>

      <h2>Height: {pokemonData.height * 10}cm</h2>
      <h2>Weight: {pokemonData.weight / 10}kg</h2>

      <h2>Stats: </h2>
      <table>
        <thead>
          <tr>
            <td>HP</td>
            <td>Attack</td>
            <td>Defence</td>
            <td>Special-attack</td>
            <td>Special-defence</td>
            <td>Speed</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            {pokemonData.stats.map((stat) => (
              <td key={stat.stat.name}>{stat.base_stat}</td>
            ))}
          </tr>
        </tbody>
      </table>

      <h2>Abilities: </h2>
      {pokemonData.abilities.map((ability) => (
        <div key={ability.ability.name}>
          <h3>{ability.ability.name}</h3>
          <p>
            {abilityDescriptions[ability.ability.name] ||
              "Loading description..."}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PokemonInfo;
