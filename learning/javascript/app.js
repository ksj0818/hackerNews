/**
 * 데이터를 담을 수 있는 그릇은 변수이고,
 * 변수 여러 개를 담을 수 있는 그릇 구조물은 객체,
 * 코드를 묶을 수 있는 구조는 함수.
 */
const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
const CONTENT_URL = 'https://api.hnpwa.com/v0/item/@id.json'; // id값은 어떤 컨텐츠를 클릭했느냐에 따라 다 다름, 그래서 여기서 확정할 수가 없음 클릭했을때 바꿔주기 위해서 마킹만 해놓기
// 실제 사용자가 타이틀을 클릭 했을 때 저 CONTENT_URL을 가지고 ajax 호출해서 데이터를 가져오기, 어떻게 클릭을 했는지 알 수 있을까? 브라우저가 제공하는 이벤트 시스템이 있음(6장에서 이벤트시스템 관련된 내용 확인)

// 중복 코드 제거 (코드를 묶을 수 있는 구조 함수 이용)
function getData(url) {
  // https://api.hnpwa.com/v0/news/1.json이라는 하는 것에서 가져오는 데이터를 동기적으로 가져오겠다.
  ajax.open('GET', url, false); // url은 바뀔 수 있음 바뀔 가능성이 있는 데이터는 따로 변수로 빼주는게 좋음
  ajax.send();  // 실제로 데이터 가져오려면 ajax가 제공한 send함수 호출

  // 가져온 데이터는 response값에 들어있음
  return JSON.parse(ajax.response);
}

const newsFeed = getData(NEWS_URL);
// document라고 하는 도구가 HTML를 조작하는 데 필요한 모든 도구들을 제공함
const ul = document.createElement('ul'); // ul 태그를 반환

// hashchange는 어디서 발생하나, window객체가 있음 , addEventListenere() (어떤 이벤트가 발생하는지 듣고 있는 리스너를 등록)
window.addEventListener('hashchange', function (){
  // location 객체는 브라우저가 기본적으로 제공해주는 객체인데 주소와 관련된 다양한 정보들을 제공해 줌
  // substr(): 내가 쓰고 싶은 위치 값만 지정해 주면 그 이후부터의 값까지 씀
  const id = location.hash.substr(1);
  
  // 문자열 함수 중에 값을 대체해 주는 replace 함수가 있음
  const newsContent = getData(CONTENT_URL.replace('@id', id));  // CONTENT_URL의 @id를 id로 대체해야함
  const title = document.createElement('h1');

  title.innerHTML = newsContent.title;

  content.appendChild(title);
}); // 함수를 주는 이유는 자바스크립트의 특징 중 하나가 함수 자체를 값으로 취급해서 이렇게 함수한테 전달을 할 수도 있고 함수 자체를 실행할 수도 있음

for (let i=0; i<10; i++) {
  const div = document.createElement('div');
  const li = document.createElement('li'); // li 태그를 반환
  const a = document.createElement('a');

  // 문자열만을 가지고 UI를 만드는 방식
  // 문자열을 가지고 HTML을 만드는 방법은 innerHTML이라고 하는 DOM API가 제공하는 속성
  // innerHTML속성은 문자열을 넣었는데 그 문자열 안에 HTML 태그가 포함되어 있으면 그거 자체를 DOM API로,
  // 즉, HTML로 실제로 변환하는 것이 자동으로 처리된다는 뜻 
  div.innerHTML = `
    <li>
      <a href="#${newsFeed[i].id}">
        ${newsFeed[i].title} (${newsFeed[i].comments_count}
      </a>
    </li>
    `
    
    ul.appendChild(div.firstElementChild);
/** 
  a.href = `#${newsFeed[i].id}`;  
  a.innerHTML = `${newsFeed[i].title} (${newsFeed[i].comments_count})`;  // 괄호 열고 닫는 걸로 표현하려면 백틱을 이용해서 ${}
*/
  
  // li.appendChild(a);
}

container.appendChild(ul);  //root 하위에 추가
container.appendChild(content); 