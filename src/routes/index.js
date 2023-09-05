import { createRouter } from '../core/jungyu';
import Home from './Home';
import Movie from './Movie';
import About from './About';
import NotFound from './NotFound'

export default createRouter([
  { path: '#/', component: Home }, // Home이라는 이름의 컴포넌트를 출력
  { path: '#/movie', component: Movie }, // Movie
  { path: '#/about', component: About },
  { path: '.*', component: NotFound }, //
]);
