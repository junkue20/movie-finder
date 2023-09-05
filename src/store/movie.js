import { Store } from '../core/jungyu';

const store = new Store({
  searchText: '',
  page: 1,
  pageMax: 1,
  movies: [],
  movie: {},
  loading: false,
  message: 'Search for the movie title!',
});
export default store;

export const searchMovies = async (page) => {
  store.state.loading = true;
  store.state.page = page;
  if (page === 1) {
    store.state.movies = []; // 다시 빈 배열로 초기화.
    store.state.message = '';
  }
  try {
    const res = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify({
        title: store.state.searchText,
        page
      }),
    });
    const { Search, totalResults, Response, Error } = await res.json();

    if (Response === 'True') {
      store.state.movies = [
        // 배열 리터럴 및 전개 연산자 사용 (1페이지 + 2페이지 정보... 계속해서 누적되는 형식)
        ...store.state.movies,
        ...Search,
      ];
      store.state.pageMax = Math.ceil(Number(totalResults) / 10);
    } else {
      store.state.message = Error;
      store.state.pageMax = 1;
    }
  } catch (error) {
    console.log('searchMovies error: ', error);
  } finally {
    store.state.loading = false;
  }
};
export const getMovieDetails = async (id) => {
  try {
    const res = await fetch('/api/movie', {
      method: 'POST',
      body: JSON.stringify({
        id
      })
    })
    store.state.movie = await res.json();
  } catch (error) {
    console.log('getMovieDetails error: ', error);
  }
};
