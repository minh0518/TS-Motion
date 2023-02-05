import { BaseComponent } from '../../components.js';

export class VideoComponent extends BaseComponent<HTMLElement> {
  constructor(title: string, url: string) {
    super(`<section class="video">
                <div class="video_player"><iframe class="video_iframe"></iframe></div>
                <h3 class="video_title"></h3>
         </section>`);
    const iframe = this.element.querySelector('.video_iframe')! as HTMLIFrameElement;

		// 일반 url을 넘겨주면 임베드 url로 변환하는 함수 사용
    iframe.src = this.convertToEmbeddedURL(url); 		

    const titleElement = this.element.querySelector(
      '.video_title',
    )! as HTMLHeadingElement;
    titleElement.textContent = title;
  }

  private convertToEmbeddedURL(url: string): string {
    const regExp =
      /^(?:https?:\/\/)?(?:www\.)?(?:(?:youtube.com\/(?:(?:watch\?v=)|(?:embed\/))([a-zA-Z0-9-]{11}))|(?:youtu.be\/([a-zA-Z0-9-]{11})))/;
    const match = url.match(regExp);
    // match()는 정규표현식과 매칭되는것이 있다면 배열형태로 리턴

    // 배열의 값이 있다면 첫번째를 , 첫번째가 없다면 두번째를 사용
    // 매치된 것이 아예 없다면 undefined
    const videoId = match ? match[1] || match[2] : undefined;
    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // 매칭되는 것이 없으면 일반 url 리턴 (이때의 예외처리 로직을 작성하는게 좋음)
  }
}