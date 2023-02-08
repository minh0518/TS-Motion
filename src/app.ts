import { Component } from './components/components.js';
import { InputDialog, MediaData, TextData } from './components/dialog/dialog.js';
import { MediaSectionInput } from './components/dialog/input/media-input.js';
import { TextSectionInput } from './components/dialog/input/text-input.js';
import { ImageComponent } from './components/page/item/image.js';
import { NoteComponent } from './components/page/item/note.js';
import { TodoComponent } from './components/page/item/todo.js';
import { VideoComponent } from './components/page/item/video.js';
import {
  Composable,
  PageComponent,
  PageItemComponent,
} from './components/page/page.js';


type InputComponentConstructor<T = (MediaData | TextData) & Component > = {
  new (): T;
};

class App {
  private readonly page: Component & Composable;

  //dialogRoot는 메소드에서도 this.로 참조하기 멤버변수로 만듦(private붙여줌)
  constructor(appRoot: HTMLElement, private dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);

    this.bindElementToDialog<MediaSectionInput>(
      '#new-image',
      MediaSectionInput,
      (input: MediaSectionInput) => new ImageComponent(input.title, input.url),
    );

    this.bindElementToDialog<MediaSectionInput>(
      '#new-video',
      MediaSectionInput,
      (input: MediaSectionInput) => new VideoComponent(input.title, input.url),
    );

    this.bindElementToDialog<TextSectionInput>(
      '#new-note',
      TextSectionInput,
      (input: TextSectionInput) => new NoteComponent(input.title, input.body),
    );
    this.bindElementToDialog<TextSectionInput>(
      '#new-todo',
      TextSectionInput,
      (input: TextSectionInput) => new TodoComponent(input.title, input.body),
    );
  }

  // dialog에 입력창과 이벤트리스너(add하면 PageComponent에 추가하고..)를 추가
  // 그리고 버튼에 연결
  private bindElementToDialog<T extends (MediaData | TextData) & Component >(
    selector: string, // 1
    InputComponent: InputComponentConstructor<T>, // 2
    makeSection: (input: T) => Component, // 3
  ) {
    const element = document.querySelector(selector)! as HTMLElement;
    element.addEventListener('click', () => {
      const dialog = new InputDialog();

      // MediaSectionInput 인지 TextSectionInput 내부적으로 정하지 않고
      // 생성자 타입을 넘겨받아서 진행해야함
      const input = new InputComponent();

      dialog.addChild(input); // dialog에 input을 추가해주고
      dialog.attachTo(this.dialogRoot); // dialog에를 body태그에 추가해줌

      // dialog를 켰다가 다시 닫을 때
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(this.dialogRoot); //body태그에서 제거
      });

      // dialog에 새로운 섹션을 추가 할 때
      dialog.setOnSubmitListener(() => {
        const component = makeSection(input);
        this.page.addChild(component);

        // 이후에 dialog창을 닫음
        dialog.removeFrom(this.dialogRoot);
      });
    });
  }
}

// document.body가 아니라 다른곳에 추가하고 제거하고 싶다면
// 여기에서만 수정하면 됨
new App(document.querySelector('.document')! as HTMLElement, document.body);
