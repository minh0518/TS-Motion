import { Component } from './components/components.js';
import { InputDialog } from './components/dialog/dialog.js';
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

class App {
  private readonly page: Component & Composable;

  //어플리케이션을 추가할 최상위 루트 요소
  constructor(appRoot: HTMLElement, dialogRoot: HTMLElement) {
    this.page = new PageComponent(PageItemComponent);
    this.page.attachTo(appRoot);
    // PageComponent가 상속하고 있는 baseComponents의 attachTo() 사용

    // const image = new ImageComponent('Image Title','https://picsum.photos/200/300');
    // this.page.addChild(image);

    // const note = new NoteComponent('Note Title', 'Note Body');
    // this.page.addChild(note);

    // const todo = new TodoComponent('Todo Title', 'Todo Item');
    // this.page.addChild(todo);

    // const video = new VideoComponent('Video Title','https://www.youtube.com/watch?v=7RiMu2DQrb4');
    // this.page.addChild(video);

    // 이미지
    const imageBtn = document.querySelector('#new-image')! as HTMLElement;
    imageBtn.addEventListener('click', () => {
      const dialog = new InputDialog();

      const inputSection = new MediaSectionInput();

      dialog.addChild(inputSection); // dialog에 inputSection를 추가해주고
      dialog.attachTo(dialogRoot); // dialog에를 body태그에 추가해줌

      // dialog를 켰다가 다시 닫을 때
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot); //body태그에서 제거
      });

      // dialog에 새로운 섹션을 추가 할 때
      dialog.setOnSubmitListener(() => {
        //입력받은 정보를 바탕으로 새로운 섹션 추가
        const image = new ImageComponent(inputSection.title, inputSection.url);
        this.page.addChild(image);

        // 이후에 dialog창을 닫음
        dialog.removeFrom(dialogRoot);
      });
    });

    // 비디오
    const videoBtn = document.querySelector('#new-video')! as HTMLElement;
    videoBtn.addEventListener('click', () => {
      const dialog = new InputDialog();

      const inputSection = new MediaSectionInput();

      dialog.addChild(inputSection); // dialog에 inputSection를 추가해주고
      dialog.attachTo(dialogRoot); // dialog에를 body태그에 추가해줌

      // dialog를 켰다가 다시 닫을 때
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot); //body태그에서 제거
      });

      // dialog에 새로운 섹션을 추가 할 때
      dialog.setOnSubmitListener(() => {
        //입력받은 정보를 바탕으로 새로운 섹션 추가
        const image = new VideoComponent(inputSection.title, inputSection.url);
        this.page.addChild(image);

        // 이후에 dialog창을 닫음
        dialog.removeFrom(dialogRoot);
      });
    });

    // 노트
    const noteBtn = document.querySelector('#new-note')! as HTMLElement;
    noteBtn.addEventListener('click', () => {
      const dialog = new InputDialog();

      const inputSection = new TextSectionInput();

      dialog.addChild(inputSection); // dialog에 inputSection를 추가해주고
      dialog.attachTo(dialogRoot); // dialog에를 body태그에 추가해줌

      // dialog를 켰다가 다시 닫을 때
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot); //body태그에서 제거
      });

      // dialog에 새로운 섹션을 추가 할 때
      dialog.setOnSubmitListener(() => {
        //입력받은 정보를 바탕으로 새로운 섹션 추가
        const image = new NoteComponent(inputSection.title, inputSection.body);
        this.page.addChild(image);

        // 이후에 dialog창을 닫음
        dialog.removeFrom(dialogRoot);
      });
    });

    // 할 일
    const todoBtn = document.querySelector('#new-todo')! as HTMLElement;
    todoBtn.addEventListener('click', () => {
      const dialog = new InputDialog();

      const inputSection = new TextSectionInput();

      dialog.addChild(inputSection); // dialog에 inputSection를 추가해주고
      dialog.attachTo(dialogRoot); // dialog에를 body태그에 추가해줌

      // dialog를 켰다가 다시 닫을 때
      dialog.setOnCloseListener(() => {
        dialog.removeFrom(dialogRoot); //body태그에서 제거
      });

      // dialog에 새로운 섹션을 추가 할 때
      dialog.setOnSubmitListener(() => {
        //입력받은 정보를 바탕으로 새로운 섹션 추가
        const image = new TodoComponent(inputSection.title, inputSection.body);
        this.page.addChild(image);

        // 이후에 dialog창을 닫음
        dialog.removeFrom(dialogRoot);
      });
    });
  }
}

// document.body가 아니라 다른곳에 추가하고 제거하고 싶다면
// 여기에서만 수정하면 됨
new App(document.querySelector('.document')! as HTMLElement, document.body);
