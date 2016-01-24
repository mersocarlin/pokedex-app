# FE challenge v1

---

The task
--------

You're asked to create a tested, maintainable and production ready
[Pokémon Encyclopedia](http://www.pokemon.com/uk/pokedex/) using
the APIs provided by [pokéapi](http://pokeapi.co).

Feel free to use whatever preprocessor, framework, pattern you prefer
to create the Pokédex exactly as you see in the designs we provided.
Please put attention on every detail and develop it considering that
it will be one of the many components of a bigger application.
This is why we ask you to consider potentials side-effects (between
components, etc.) during the development.

#### Acceptance criteria
- A 4x4 grid is loaded with 16 Pokémon
- Every Pokémon in that grid shows its own ID, name and types
- Clicking on the "Load more Pokémon" button a new 4x4 grid is loaded
- When clicked, the button disappears and the infinite scrolling is enabled
- When a Pokémon is clicked, the single Pokémon page is opened displaying:
  - artwork (feel free to use the following links to fetch the images
    by replacing the corresponding Pokémon's ID: [large][1], [small][2]
  - ID
  - name
  - types
  - weight and height
  - description (each game has a different description, so please pick the
    latest available one)
  - abilities
  - statistics (based on a scale of 100)
  - moves

[1]: https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png
[2]: https://assets.pokemon.com/assets/cms2/img/pokedex/detail/001.png
