const ajax = new XMLHttpRequest();

// https://api.hnpwa.com/v0/news/1.json이라는 하는 것에서 가져오는 데이터를 동기적으로 가져오겠다.
ajax.open('GET', 'https://api.hnpwa.com/v0/news/1.json', false); 
ajax.send();  // 실제로 데이터 가져오려면 ajax가 제공한 send함수 호출
// console.log(ajax.response);              // 가져온 데이터는 response라고 하는 값에 들어있음
/**
 * - document.getElementById와 같이 HTML을 조작하는 도구처럼 서버라고 하는 네트워크 너머에 있는 데이터를 가져오는 도구도 제공이 됨, 바로 그 도구가 ajax.
-  자바스크립트 코드에서 다루기 쉽도록 Response에 있는 데이터를 Preview탭에 있는 것처럼 바꿔보기, Preview 탭에서 보여주는 것들을 객체라고 부름, 응답 값을 객체로 바꿔보기 
  JSON 데이터를 객체로 바꾸는 도구는 JSON.parse, 자바스크립트가 기본으로 제공,
  이 함수는 괄호 안에 입력으로 받은 JSON 데이터를 객체로 바꿔서 반환을 해줌
 */

const newsFeed = JSON.parse(ajax.response);
// 백틱 사용
document.getElementById('root').innerHTML = `<ul>
  <li>${newsFeed[0].title}</li>
  <li>${newsFeed[1].title}</li>
  <li>${newsFeed[2].title}</li>
</ul>`;