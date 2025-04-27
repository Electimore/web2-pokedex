import { Link } from "react-router-dom";

function About() {
  return (
    <>
      <h1>About</h1>
      <a className="return" href="../">
        &laquo; Return
      </a>
      <div id="about_page">
        <p>It's a Pokedex, like idk what else to put there...</p>
        <br />
        <p>Made by: Aleksander Daniel Gwóźdź and Karolina Anna Krysiak</p>
        <br />
        <p>
          Nothing to see here. <Link to="./">Return to Pokedex.</Link>
        </p>
      </div>
    </>
  );
}

export default About;
