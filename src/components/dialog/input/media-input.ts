import { BaseComponent } from '../../components.js';
import { MediaData } from '../dialog.js';


export class MediaSectionInput extends BaseComponent<HTMLElement> implements MediaData{
  constructor() {
    super(`<div>
            <div class="form_container">
                <label for="title">Title</label>
                <input type="text" name="" id="title" />
            </div>
            <div class="form_container">
                <label for="url">URL</label>
                <input type="text" name="" id="url" />
            </div>
        </div>`);
  }

  // 사용자가 입력하고 submit버튼을 누르면
  // 그 시점에 위의 DOM에 있는 url이나 title을 읽어옴
  get url(): string {
    const element = this.element.querySelector('#url')! as HTMLInputElement;
    return element.value;
  }
  get title(): string {
    const element = this.element.querySelector('#title')! as HTMLInputElement;
    return element.value;
  }
}