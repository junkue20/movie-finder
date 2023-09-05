import { Component } from '../core/jungyu'

export default class NotFound extends Component {
  render() {
    this.el.classList.add('container','not-found')
    this.el.innerHTML = /*html*/ `
      <h1>
        Sorry.. <br/>
        Page not found!
      </h1>
    `
  }
}