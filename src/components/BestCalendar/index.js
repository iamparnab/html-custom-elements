import style from './style.scss';
import 'Root/main.scss';
import { MONTHS, DAYS } from './constants';
import { $ } from '../utils';

export class BestCalendar extends HTMLElement {
  constructor() {
    super();
    this.matrix = [];

    const shadowRoot = this.attachShadow({ mode: 'closed' });
    this._shadow = shadowRoot;
    /**
     * Create style
     */
    const styleElement = document.createElement('style');
    styleElement.textContent = style;

    /**
     * Attach to shadowRoot
     */

    shadowRoot.appendChild(styleElement);
  }

  connectedCallback() {
    const dt = new Date();

    const month = this.getAttribute('month');
    if (month) {
      dt.setMonth(+month);
    }

    const currentDate = dt.getDate();

    this._shadow.innerHTML += this.render(dt);
    const dayNamesWrapper = $('.day-names-wrapper', this._shadow);

    /**
     * Add Days names
     */
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < DAYS.length; i += 1) {
      const div = document.createElement('div');
      div.innerText = DAYS[i];
      fragment.appendChild(div);
    }
    dayNamesWrapper.appendChild(fragment);

    /**
     * Create 6 rows
     */
    const rowFragment = document.createDocumentFragment();
    for (let i = 0; i < 6; i += 1) {
      const row = document.createElement('div');
      row.className = `row-${i + 1}`;
      /**
       * Create 7 Columns
       */
      const colFragment = document.createDocumentFragment();
      for (let j = 0; j < 7; j += 1) {
        const col = document.createElement('div');
        if (this.matrix[i] === void 0) {
          this.matrix[i] = [];
        }
        this.matrix[i][j] = col;
        col.className = `col-${j + 1}`;
        colFragment.appendChild(col);
      }

      row.appendChild(colFragment);
      rowFragment.appendChild(row);
    }

    const dateWrapperElem = $('.date-wrapper', this._shadow);
    dateWrapperElem.appendChild(rowFragment);

    /**
     * Set Date to 1st of month
     */
    dt.setDate(1);

    let col = dt.getDay();
    let row = 0;

    for (let i = 1; i <= 31; i += 1) {
      if (col === 7) {
        col = 0;
        row += 1;
      }
      this.matrix[row][col].innerText = i;
      if (i === currentDate) {
        this.matrix[row][col].classList.add('current');
      }
      col += 1;
    }
  }

  render(dt) {
    const monthName = MONTHS[dt.getMonth()];
    const year = dt.getFullYear();

    return `
      <div class="best-calendar-w">
        <div>
          ${monthName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${year}
        </div>
        <div class="day-names-wrapper">
        </div>
        <div class="date-wrapper">
        </div>
      </div>
    `;
  }
}

customElements.define('best-calendar', BestCalendar);
