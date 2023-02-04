import { BaseComponent } from '../../components.js';

export class TodoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, todo: string) {
    super(`<section class="todo">
            <h2 class="todo_title"></h2>
            <input type="checkbox" class="todo_checkbox">
        </section>`);

    const titleElement = this.element.querySelector('.todo_title') as HTMLHeadElement;
    titleElement.textContent = title;

    const todoElement = this.element.querySelector('.todo_checkbox') as HTMLInputElement;
    todoElement.textContent = todo;
  }
}
