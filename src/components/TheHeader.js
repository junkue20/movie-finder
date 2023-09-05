import { Component } from '../core/jungyu';

export default class TheHeader extends Component {
  constructor() {
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Search',
            href: '#/',
          },
          {
            name: 'Movie',
            href: '#/movie?id=tt1245526',
          },
          {
            name: 'About',
            href: '#/about',
          },
        ],
      },
    });
    window.addEventListener('popstate', () => {
      this.render();
    })
  }
  render() {
    this.el.innerHTML = /*html*/ `
    <a href="#/" class="logo"><span>OMDbAPI</span>.com</a>
    <nav>
      <ul>
        ${this.state.menus.map(menu => {
            const href = menu.href.split('?')[0];
            const hash = location.hash.split('?')[0];
            const isActive = href === hash;
            return /*html*/ `
            <li>
              <a 
                class="${isActive ? 'active' : ''}" 
                href="${menu.href}">
                ${menu.name}
              </a>
            </li>
          `;
          }).join('')}
      </ul>
    </nav>
    <a href="#/about" class="user">
      <img src="https://avatars.githubusercontent.com/u/122848687?v=4" alt="User" />
    </a>
    `;
  }
}