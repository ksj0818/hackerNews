/**
 * 자바스크립트로 특정한 elements, 어떤 태그를 선택하는데 필요한 도구를 제공해주는데 그 도구가 document.getElementById 
 * 서버라고 하는 네트워크 너머에 있는 데이터를 가져오는 도구가 ajax
 * new XMLHttpRequest() 이것을 사용하기 위해서는 메뉴얼을 봐야함 (구글링 해보기)
 * 자바스크립트에서 코드에서 다루기 쉽도록 Response에 있는 데이터를 Preview탭에 있는 것처럼 바꿔보기 (객체로 바꾸기)
 * JSON 데이터를 객체로 바꾸는 도구는 JSON.parse(); 자바스크립트가 기본적으로 제공함.
 * location 객체는 브라우저가 기본으로 제공해주는 객체인데 주소와 관련된 다양한 정보들을 제공해줌
 */

const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'; // id에 마킹만 해놓기
const content = document.createElement('div');

ajax.open('GET', NEWS_URL, false);
ajax.send();

// 응답 값(JSON 값)을 객체로 변환
const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement('ul');

window.addEventListener('hashchange', function () {
  const id = location.hash.substr(1);
  
  ajax.open('GET', CONTENT_URL.replace('@id', id), false);
  ajax.send();
  
  const newsContent = JSON.parse(ajax.response);
  const title = document.createElement('h1');

  title.innerHTML = newsContent.title;
  content.appendChild(title);  
});

for (let i = 0; i < 10; i++) {
  const li = document.createElement('li');
  const a = document.createElement('a');

  a.href = `#${newsFeed[i].id}`;
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;

  li.appendChild(a);
  ul.appendChild(li);
}

document.getElementById('root').appendChild(ul);
document.getElementById('root').appendChild(content);