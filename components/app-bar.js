class AppBar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.title = this.getAttribute('title') || 'Notes App';
    this.subtitle = this.getAttribute('subtitle') || 'Your personal notes';
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        .head-title {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 4px;
          margin: 20px auto 40px auto;
          padding: 0 16px;
        }
        .head-title > h1, .head-title > h2 {
          margin: 0;
          color: #222831;
        }
        h1 {
          font-size: 3em;
          font-weight: 700;
        }
        h2 {
          font-size: 1.5em;
          font-weight: 400;
          color: #393e46;
        }
      </style>
      <div class="head-title">
        <h1>${this.title}</h1>
        <h2>${this.subtitle}</h2>
      </div>
    `;
  }

  static get observedAttributes() {
    return ['title', 'subtitle'];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue;
      this.render();
    }
  }
}

customElements.define('app-bar', AppBar);
