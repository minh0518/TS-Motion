import { BaseComponent } from '../../components.js';

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`<section class="todo">
            <h2 class="todo_title"></h2>
            <input type="checkbox" class="todo_checkbox">
        </section>`);

    const titleElement = this.element.querySelector('.todo_title') as HTMLHeadingElement;
                                                            // h1과 같은 heading 태그를 대표하는 요소
    titleElement.textContent = title;

    const todoElement = this.element.querySelector('.todo_checkbox') as HTMLInputElement;
    
    todoElement.insertAdjacentText('afterend', todo);
    // 텍스트문자열을 지정위치에 삽입. afterend니까 input요소 뒤
  }
}
