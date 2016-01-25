export default {
  apiService: {
    url: process.env.API_SERVICE_URL,
  },

  language: process.env.LANGUAGE,

  pokemon: {
    gridSize: process.env.POKEMON_GRID_SIZE,
    maxId: process.env.POKEMON_MAX_ID,
    imageLarge: process.env.POKEMON_IMAGE_LARGE,
    imageSmall: process.env.POKEMON_IMAGE_SMALL,
  },
};
