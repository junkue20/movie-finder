import { Component } from '../core/jungyu';
import movieStore, { searchMovies } from '../store/movie';

export default class Search extends Component {
  render() {
    this.el.classList.add('search');
    this.el.innerHTML = /* html */ `
      <input 
        type="text" 
        class="search-input" 
        value="${movieStore.state.searchText}" 
        placeholder="Enter the Movie title to search!">
      <button class="btn btn-primary">Search!</button>
    `;

    const inputEl = this.el.querySelector('input');
    inputEl.addEventListener('input', () => {
      movieStore.state.searchText = inputEl.value;
    });
    inputEl.addEventListener('keydown', e => {
      if (e.key === 'Enter' && movieStore.state.searchText.trim()) {  // trim() 메소드는 문자 앞뒤의 공백을 제거하는 역할 수향.
        searchMovies(1)
      }
    });

    const btnEl = this.el.querySelector('.btn');
    btnEl.addEventListener('click', () => {
      if (movieStore.state.searchText.trim()) {
        searchMovies(1)
      }
    });
  }
}
