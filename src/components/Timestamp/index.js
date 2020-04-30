export class Timestamp extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    const epoch = eval(this.getAttribute('epoch'));
    const dt = new Date(epoch);

    shadowRoot.innerHTML = `
          <div class="timestamp-w">
              <div>
                  <div>Day:</div> 
                  <div>${dt.getDay()}</div>
              </div>
              <div>
                  <div>Month:</div> 
                  <div>${dt.getMonth()}</div>
              </div>
              <div>
                  <div>Year:</div> 
                  <div>${dt.getFullYear()}</div>
              </div>
              <div>
                  <div>Hour:</div> 
                  <div>${dt.getHours()}</div>
              </div>
              <div>
                  <div>Minutes:</div> 
                  <div>${dt.getMinutes()}</div>
              </div>
          </div>
      `;

    const style = document.createElement('style');

    style.textContent = `
          .timestamp-w {
  
          }
          .timestamp-w > div {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 4px;
          }
      `;

    shadowRoot.appendChild(style);
  }
}
customElements.define('time-stamp', Timestamp);
