import style from './style.scss';
import 'Root/main.scss';

export class Tree extends HTMLElement {
  constructor() {
    super();

    let shadow = this.attachShadow({ mode: 'closed' });

    let data = [];

    try {
      data = JSON.parse(this.getAttribute('nodelist'));
    } catch (err) {
      alert('Please provide a valid string');
    }

    let tree = document.createElement('div');
    tree.setAttribute('id', 'tree-container');
    try {
      tree.append(...this.createTree(data));
    } catch (err) {
      console.log(err);
      alert('Please provide a valid string');
    }

    let styleElem = document.createElement('style');
    styleElem.textContent = style;

    shadow.append(styleElem, tree);
  }

  node(name) {
    let nodeImg = document.createElement('img');
    nodeImg.setAttribute(
      'src',
      this.getAttribute('icon') || 'assets/images/file2.ico'
    );

    let nodeName = document.createElement('div');
    nodeName.textContent = name;

    let node = document.createElement('div');
    node.setAttribute('data-node', '');
    node.append(nodeImg, nodeName);

    return node;
  }

  createTree(data) {
    let nodeList = [];
    for (let i = 0; i < data.length; i++) {
      const node = data[i];
      let nodeElem = this.node(node.name);
      nodeList.push(nodeElem);

      if (node.children) {
        const nodeContainer = document.createElement('div');
        nodeContainer.classList.add('child-container');
        nodeContainer.append(...this.createTree(node.children));

        nodeElem.onclick = (_) => {
          let classList = nodeContainer.classList;

          if (classList.contains('show')) {
            classList.remove('show');
          } else {
            classList.add('show');
          }
        };

        nodeList.push(nodeContainer);
      }
    }
    return nodeList;
  }
}

customElements.define('t-ree', Tree);
