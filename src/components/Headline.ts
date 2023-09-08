import { Component } from '../core/jungyu';

export default class Headline extends Component {
  render() {
    this.el.classList.add('headline'); // headline이라는 클래스 추가.
    this.el.innerHTML = /*html*/ `
      <h1>
        <span>OMDb API</span><br/>
        THE OPEN <br/>
        MOVIE DATABASE
      </h1>
      <p>
      The OMDb API is a RESTful web service to obtain movie information,<br/>
      all content and images on the site are contributed and maintained by our users.<br/>
      If you find this service useful, please consider making a one-time donation or become a patron.
      </p>
    `;
  }
}
