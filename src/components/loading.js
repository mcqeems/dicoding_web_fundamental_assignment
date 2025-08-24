class Loading extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
		<style>
			:host {
				display: block;
				height: 200px;
				grid-column: 1 / -1;

			}

			.container-loading {
				width: 100%;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				grid-column: 1 / -1;
			}

			svg {
				width: 80px;
				height: 80px;
			}

			.spinner-path {
				stroke-dasharray: 283;
				stroke-dashoffset: 283;
				transform-origin: 50% 50%;
				animation: dash 1.5s ease-in-out infinite, rotate 1.5s linear infinite;
			}

			@keyframes dash {
				0% {
					stroke-dashoffset: 283;
				}
				50% {
					stroke-dashoffset: 70;
				}
				100% {
					stroke-dashoffset: 283;
				}
			}

			@keyframes rotate {
				0% {
					transform: rotate(0deg);
				}
				100% {
					transform: rotate(360deg);
				}
			}

		</style>
		<div class="container-loading">
		<svg viewBox="0 0 100 100">
			<circle cx="50" cy="50" r="45" fill="none" stroke="#ccc" stroke-width="8">
			</circle>
			<circle class="spinner-path" cx="50" cy="50" r="45" fill="none" stroke="#00adb5" stroke-width="8" stroke-linecap="round">
			</circle>
		</svg>
		</div>
		`;
  }
}

customElements.define('loading-spinner', Loading);
