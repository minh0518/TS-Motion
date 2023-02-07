import { BaseComponent } from '../../components.js';

export class TextSectionInput extends BaseComponent<HTMLElement> {
  constructor() {
    super(`<div>
            <div class="form_container">
                <label for="title">Title</label>
                <input type="text" name="" id="title" />
            </div>
            <div class="form_container">
                <label for="url">Body</label>
                <textarea type="text" row="3" id="body"></textarea>
            </div>
        </div>`);
  }

  // 사용자가 입력하고 submit버튼을 누르면
  // 그 시점에 위의 DOM에 있는 url이나 title을 읽어옴
  get body(): string {
    const element = this.element.querySelector('#body')! as HTMLInputElement;
    return element.value;
  }
  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement;
    return element.value;
  }
}
