import React, { useState, useEffect } from "react";

const getPokemonPage = async (page = 0) => {
  let offset = page * 20;
  let limit = 20;
  try {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) {
      throw new Error(`Response was not OK! Status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("Error fetching Pokemon:", err);
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

function About() {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      setError(null);

      const data = await getPokemonPage(10);
      let pokemonPageData = Array(20);
      console.log(data);

      for (let i = 0; i < data.results.length; i++) {
        let singlePokemonData = await getPokemon(data.results[i].name);
        pokemonPageData[i] = {
          name: data.results[i].name,
          id: singlePokemonData.id,
          types: singlePokemonData.types.map((item) => item.type.name),
          sprite: singlePokemonData.sprites.other.showdown.front_default,
        };
      }
      console.log(pokemonPageData);

      if (data) {
        setPokemonData(pokemonPageData);
      } else {
        setError("Failed to load Pokemon data.");
      }

      setLoading(false);
    };

    fetchPokemonData();
  }, []);

  if (loading) {
    return (
      <>
        <p>Loading Pokemon data...</p>
        <img src="https://cdn.dribbble.com/userupload/21186314/file/original-b7b2a05537ad7bc140eae28e73aecdfd.gif" />
      </>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h1>PokeAPI testing</h1>
      {pokemonData && (
        <ul>
          {pokemonData.map((pokemon) => (
            <li key={pokemon.name}>
              <div>
                {pokemon.name}
                <br />
                {pokemon.types}
                {pokemon.id}
                <img src={pokemon.sprite}></img>
                <p></p>
              </div>
              <hr />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default About;
