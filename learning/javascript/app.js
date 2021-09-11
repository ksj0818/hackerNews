/**
 * 자바스크립트로 특정한 elements, 어떤 태그를 선택하는데 필요한 도구를 제공해주는데 그 도구가 document.getElementById 
 * 서버라고 하는 네트워크 너머에 있는 데이터를 가져오는 도구가 ajax
 * new XMLHttpRequest() 이것을 사용하기 위해서는 메뉴얼을 봐야함 (구글링 해보기)
 * 자바스크립트에서 코드에서 다루기 쉽도록 Response에 있는 데이터를 Preview탭에 있는 것처럼 바꿔보기 (객체로 바꾸기)
 * JSON 데이터를 객체로 바꾸는 도구는 JSON.parse(); 자바스크립트가 기본적으로 제공함.
 * location 객체는 브라우저가 기본으로 제공해주는 객체인데 주소와 관련된 다양한 정보들을 제공해줌
 * 자바스크립트 코드에서는 사용자가 언제 버튼을 누르는지 확인할 길이 없음, 그래서 자바스크립트만으로는 그런 상황을 대처할 수 없고,
 * 그것과 관련된 시스템을 브라우저가 제공해줌 (이벤트 시스템)
 * 앵커 태그의 #은 해시태그라고 하는데 일종의 북마크임, 페이지내에서 어떤 앵커 태그의 이름 name이라고 하는 속성과 같은 해시 이름이 들어오면
 * 그 위치로 바로 스크롤링 되게 만드는 기능, 해시가 바뀐 이벤트는 hashchange
 */

const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json'; 
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'; // id에 마킹만 해놓기
const content = document.createElement('div');
const container = document.getElementById('root');

function getData(url) {  
  ajax.open('GET', url, false);
  ajax.send();
  
  // 응답 값(JSON 값)을 객체로 변환
  return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);
const ul = document.createElement('ul'); 

window.addEventListener('hashchange', function () {
  // location 객체는 브라우저가 기본적으로 제공해주는 객체인데 주소와 관련된 다양한 정보들을 제공해줌, hash는 주소와 관련되어있기 때문에 location객체로 이용
  const id = location.hash.substr(1);
    
  const newsContent = getData(CONTENT_URL.replace('@id', id));
  const title = document.createElement('h1');

  container.innerHTML = `
    <h1>${newsContent.title}</h1>
    <div>
      <a href='#'>목록으로</a>
    </div>
  `;
});

const newsList = [];
newsList.push('<ul>');  // push()는 배열의 가장 마지막 요소에 새로 추가하는 메서드
for (let i = 0; i < 10; i++) {
  newsList.push(`
    <li>
      <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count})
      </a>
    </li>`
  );
}
newsList.push('</ul>');

// 배열을 하나의 문자열로 합치는 기능을 배열이 제공함
container.innerHTML = newsList.join('');