export const searchMovies = (searchTerm) => {
  return fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=5d77597c`, {
    method: "GET",
    headers: {
    }
  }).then(res => {
    let json;
    try {
      json = res.json();
    } catch (e) {
      json = e;
    }
    return json;
  });
};

export const getMovieDetails = (id) => {
  return fetch(`https://www.omdbapi.com/?i=${id}&apikey=5d77597c`, {
    method: "GET",
    headers: {
    }
  }).then(res => {
    let json;
    try {
      json = res.json();
    } catch (e) {
      json = e;
    }
    return json;
  });
};
