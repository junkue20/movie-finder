import { Component } from '../core/jungyu';
import aboutStore  from '../store/about';


export default class TheFooter extends Component {
  constructor() {
    super({
      tagName: 'footer',
    });
  }
  render() {
    const {github, velog} = aboutStore.state;

    this.el.innerHTML = /*html*/ `
    <div>
      <a href="${velog}">
        My Velog
      </a>
    </div>
    <div>
      <a href="${github}">
        ${new Date().getFullYear()}
        Jungyu Park
      </a>
    </div>
    `;
  }
}
