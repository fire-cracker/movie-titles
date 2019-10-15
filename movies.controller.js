import https from 'https';

export const getAllMovies = ({ query: { substr } }, response) => {

  let url =  `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}`;

  let titlesArray = [];
  https.get(url, (res) => {
    res.setEncoding('utf8');
    res.on('data', function (body) {
      let dataResult = JSON.parse(body);
      let movies = dataResult.data;
      let totalPages = dataResult.total_pages;
      titlesArray = [...returnSortedTitles(movies)];


      if (totalPages > 1) {
        for (let page = 2; page <= totalPages; page++) {
          let newUrl = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=${page}`;
          https.get(newUrl, (res) => {
            res.setEncoding('utf8');
            res.on('data', function (body) {
              let newData = JSON.parse(body);
              let newMovies = newData.data;
              titlesArray = [...titlesArray, ...returnSortedTitles(newMovies)];

              if(page === totalPages) {
                return response.status(200).send({
                  success: 'true',
                  total: newData.total,
                  titlesArray
                });
              }
            })
          })
        }
      } else {
        return response.status(200).send({
          success: 'true',
          total: dataResult.total,
          titlesArray
        });
      }
    })
  });

  function returnSortedTitles(movies) {
    return movies.map((movie) => movie.Title).sort();
  }
}

export default getAllMovies