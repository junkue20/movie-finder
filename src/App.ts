import { Component } from './core/jungyu';
import TheHeader from './components/TheHeader';
import TheFooter from './components/TheFooter';

export default class App extends Component {
  render() {
    /** 페이지 구분용 기능 */
    const theHeader = new TheHeader().el; 
    const theFooter = new TheFooter().el; 
    const routerView = document.createElement('router-view');
    this.el.append(
      theHeader,
      routerView,
      theFooter
      );
  }
}
