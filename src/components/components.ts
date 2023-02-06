export interface Component {
  attachTo(parent: HTMLElement, position?: InsertPosition): void;
  removeFrom(parent: HTMLElement): void;
}

export class BaseComponent<T extends HTMLElement> implements Component {
  protected readonly element: T;

  constructor(htmlString: string) {
    const template = document.createElement('template');
    template.innerHTML = htmlString;
    this.element = template.content.firstElementChild! as T;
  }

  // this.element를 parent의 position위치에다가 추가
  attachTo(parent: HTMLElement, position: InsertPosition = 'afterbegin') {
    parent.insertAdjacentElement(position, this.element);
  }

  // this.element를 parent에서 제거
  removeFrom(parent: HTMLElement) {
    // this.element의 부모요소가 전달받은 parent랑 다르다면 에러
    if (parent !== this.element.parentElement) {
      throw new Error('Parent mismatch');
    }
    parent.removeChild(this.element);
  }
}
