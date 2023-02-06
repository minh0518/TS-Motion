import { BaseComponent, Component } from '../components.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;

class PageItemComponent extends BaseComponent<HTMLElement> implements Composable{

  private closeListener?: OnCloseListener;

  constructor() {
    super(`<li class="page_item">
            <section class="page_item_body"></section>
            <div class="page_item_controls">
              <button class="close">&times;</button>
            </div>
          </li>`);
    const closeBtn = this.element.querySelector('.close')! as HTMLButtonElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener()
      //closeListener가 있다면 호출
      //누군가 등록을 해 놓았따면 close버튼이 클릭됐다고 알려줌
    };
  }

  addChild(child: Component) {
    const container = this.element.querySelector('.page_item_body')! as HTMLElement;
    child.attachTo(container);
    //container의 afterbegin에다가 child의 this .element를 붙임
    //'afterbegin' >> element 안에 가장 첫번째 child
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
}

export class PageComponent
  extends BaseComponent<HTMLUListElement>
  implements Composable
{
  constructor() {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new PageItemComponent();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');

    //close버튼이 눌리면 실행될 함수 등록
    item.setOnCloseListener(()=>{
      item.removeFrom(this.element)
      // this.element에서 item을 제거
    })
  }
}
