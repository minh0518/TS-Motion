import { BaseComponent, Component } from '../components.js';
import { Composable } from '../page/page.js';

type OnCloseListener = () => void;
type OnSubmitListener = () => void;
export class InputDialog extends BaseComponent<HTMLElement> implements Composable{
  // 멤버변수
  closeListener?: OnCloseListener;
  submitListener?: OnSubmitListener;

  constructor() {
    super(`<dialog class="dialog">
            <div class="dialog_container">
              <button class="close">&times;</button>
              <div id="dialog_body"></div>
              <button class="dialog_submit">ADD</button>
            </div>
        </dialog>`);

    const closeBtn = this.element.querySelector('.close')! as HTMLElement;
    closeBtn.onclick = () => {
      this.closeListener && this.closeListener();
    };

    const submitBtn = this.element.querySelector(
      '.dialog_submit',
    )! as HTMLElement;
    submitBtn.onclick = () => {
      this.submitListener && this.submitListener();
    };
  }

  setOnCloseListener(listener: OnCloseListener) {
    this.closeListener = listener;
  }
  setOnSubmitListener(listener: OnSubmitListener) {
    this.submitListener = listener;
  }

  // Composable 구현
  addChild(child: Component): void {
    const body = this.element.querySelector('#dialog_body')! as HTMLElement;
    child.attachTo(body);
    //body에 인자로 받은 child를 붙임
  }
}
