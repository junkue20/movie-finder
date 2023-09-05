import { Component } from '../core/jungyu';
import movieStore from '../store/movie';
import MovieItem from './MovieItem';

export default class MovieList extends Component {
  constructor() {
    super();
    movieStore.subscribe('movies', () => {
      this.render();
    });
    movieStore.subscribe('loading', () => {
      this.render();
    });
    movieStore.subscribe('message', () => {
      this.render();
    });
  }
  render() {
    this.el.classList.add('movie-list');
    this.el.innerHTML = /*html*/ `
    ${movieStore.state.message 
    ? /*html*/`<div class="message">${movieStore.state.message}</div>`
    : /*html*/`<div class="movies"></div>`}
    <div class="the-loader hide"></div>
    `;

    const moviesEl = this.el.querySelector('.movies');
    moviesEl?.append(  // moviesEl가 존재할때만 append가 실행되는 선택적 체이닝
      ...movieStore.state.movies.map(movie => new MovieItem({
            movie, // ==  movie: movie
          }).el
      )
    )

    const loaderEl = this.el.querySelector('.the-loader');
    movieStore.state.loading 
      ? loaderEl.classList.remove('hide') 
      : loaderEl.classList.add('hide');
  }
}
