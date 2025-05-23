# 08 Assignment 2 - A Pokédex

In this assignment, you must create a Pokédex using React! A Pokédex is a catalog of Pokémon, that a trainer can browse to get detailed information about any Pokémon.

**Requirements:**

- [x] Pokémon information must be retrieved from [PokéAPI](https://pokeapi.co/), which you should already be familiar with.
- [x] The Pokédex must display a list of Pokémon and support simple pagination (e.g. “next” and “previous” buttons to get the next/previous page of Pokémon), such that not all Pokémon are displayed at the same time.
- [ ] When a user clicks on a specific Pokémon, additional information about that Pokémon must be displayed. E.g. type(s), stats, abiltities, height and weight.
- [x] The application must contain multiple pages (e.g. "pokedex" and "about") and utilize [React Router](https://reactrouter.com/en/main) to route between them.
- [x] The application must be developed using [Vite](https://vite.dev/).

Feel free to expand on the requirements. If you'd like to create something different from a Pokedex, you are welcome to find another Web API to work with. Just ensure that you meet all the requirements outlined above (pagination, a detailed view and multiple pages)!

**Handin instructions:**

- [ ] Your App must be hosted on Github Pages. Follow [this guide](https://vite.dev/guide/static-deploy#github-pages) for instructions on how to deploy your React App.
- [ ] On itslearning, hand in the link to your App hosted on GitHub Pages.

The assignment can be developed alone or in groups of 2-4 and is evaluated on an approved/not approved basis. It must be approved in order to attend the course exam.

 <blockquote>
 <details>
 <summary>Display hints...</summary>
 <p>Before writing any code, consider making a sketch of your UI and split it into React components using the approach described in the article <a href="https://react.dev/learn/thinking-in-react"> "Thinking in React"</a>.</p>
 <p><a href="https://github.com/KasperKnop/WEB2/blob/main/05%20Asynchronous%20Programming/README.md#2-converting-to-promises">This previous exercise</a> should give you a good idea of how to fetch data from the PokeAPI.</p>
 <p>For pagination, you can apply "limit" and "offset" query parameters to the endpoint, e.g: <code>"https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0"</code>. This specific query will return the 20 first pokemon. To get a specific page, change the offset to <code>limit * pageNumber</code>.
 <p>For routing to work on Github Pages, make sure you are using <code>createHashRouter</code> instead of <code>createBrowserRouter</code>.</p>
 </details>
 </blockquote>
