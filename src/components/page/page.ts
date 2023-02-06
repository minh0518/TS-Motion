import { BaseComponent, Component } from '../components.js';

export interface Composable {
  addChild(child: Component): void;
}

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable {
  constructor() {
    super(`<li class="page_item">
            <section class="page_item_body"></section>
            <div class="page_item_controls">
              <button class="close">&times;</button>
            </div>
          </li>`);
  }

  addChild(child: Component) {
    const container = this.element.querySelector('.page_item_body')! as HTMLElement;
    child.attachTo(container);
    //container의 afterbegin에다가 child의 this .element를 붙임
    //'afterbegin' >> element 안에 가장 첫번째 child
  }
}

export class PageComponent extends BaseComponent<HTMLUListElement> implements Composable {
  constructor() {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');
  }
}
