import style from './style.scss';
import 'Root/main.scss';
import { MONTHS, DAYS } from './constants';
import { $ } from '../utils';

export class BestCalendar extends HTMLElement {
  constructor() {
    super();
    this.matrix = [];

    this.dt = new Date();
    this.currentDate = this.dt.getDate();
    this.month = null;
    this.year = null;
    this.prev = null;
    this.next = null;

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
    const month = this.getAttribute('month');
    if (month) {
      this.dt.setMonth(+month);
    }

    this._shadow.innerHTML += this.render();

    /**
     * Store Reference of Month and Year, Prev, Next
     */
    this.month = $('.month', this._shadow);
    this.year = $('.year', this._shadow);
    this.prev = $('.prev', this._shadow);
    this.next = $('.next', this._shadow);

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

    this.addDaysToCells();

    /**
     * Attach click event handlers for prev and next
     */

    this._shadow.addEventListener('click', this.handleClick.bind(this));
  }

  get getNumberOfDays() {
    return new Date(this.dt.getFullYear(), this.dt.getMonth() + 1, 0).getDate();
  }

  handleClick(ev) {
    const className = ev.target.className;

    if (className === 'prev') {
      this.dt.setMonth(this.dt.getMonth() - 1);
    } else if (className === 'next') {
      this.dt.setMonth(this.dt.getMonth() + 1);
    }

    const prevMonthIndex = this.dt.getMonth() - 1;
    const nextMonthIndex = this.dt.getMonth() + 1;

    this.year.innerText = this.dt.getFullYear();
    this.month.innerText = MONTHS[this.dt.getMonth()];
    this.prev.innerText = MONTHS[prevMonthIndex === -1 ? 11 : prevMonthIndex];
    this.next.innerText = MONTHS[nextMonthIndex === 12 ? 0 : nextMonthIndex];
    this.addDaysToCells();
  }

  addDaysToCells() {
    this.resetMatrix();

    /**
     * Set Date to 1st of month
     */
    this.dt.setDate(1);

    let col = this.dt.getDay();
    let row = 0;

    for (let i = 1; i <= this.getNumberOfDays; i += 1) {
      if (col === 7) {
        col = 0;
        row += 1;
      }
      this.matrix[row][col].innerText = i;
      if (i === this.currentDate) {
        this.matrix[row][col].classList.add('current');
      } else {
        this.matrix[row][col].classList.remove('current');
      }
      col += 1;
    }
  }
  resetMatrix() {
    for (let i = 0; i < 6; i += 1) {
      for (let j = 0; j < 7; j += 1) {
        this.matrix[i][j].innerText = '';
      }
    }
  }
  render() {
    const monthName = MONTHS[this.dt.getMonth()];
    const prevMonth = MONTHS[this.dt.getMonth() - 1];
    const nextMonth = MONTHS[this.dt.getMonth() + 1];
    const year = this.dt.getFullYear();

    return `
      <div class="best-calendar-w">
        <div>
          <div class="prev">${prevMonth}</div>
          <div>
            <div class="month">${monthName}</div>
            <div class="year">${year}</div>
          </div>
          <div class="next">${nextMonth}</div>
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
