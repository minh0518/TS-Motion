import { BaseComponent, Component } from '../components.js';

export interface Composable {
  addChild(child: Component): void;
}

type OnCloseListener = () => void;

interface SectionContainer extends Component,Composable {
  setOnCloseListener(listener:OnCloseListener): void;
}

type SectionContainerConstructor={
  new (): SectionContainer
  // 이 타입의 클래스는 아무것도 전달받지 않은 생성자가 있고
  // 이 생성자를 호출해서 SectionContainer를 구현하는 클래스를 만드는 것입니다
}

export class PageItemComponent extends BaseComponent<HTMLElement> implements SectionContainer{

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
  extends BaseComponent<HTMLUListElement> implements Composable {
  constructor(private pageItemConstructor : SectionContainerConstructor ) {
    super('<ul class="page"></ul>');
  }

  addChild(section: Component) {
    const item = new this.pageItemConstructor();
    item.addChild(section);
    item.attachTo(this.element, 'beforeend');

    //close버튼이 눌리면 실행될 함수 등록
    item.setOnCloseListener(()=>{
      item.removeFrom(this.element)
      // this.element에서 item을 제거
    })
  }
}
