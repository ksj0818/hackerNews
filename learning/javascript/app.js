const ajax = new XMLHttpRequest();
const NEWS_URL = 'https://api.hnpwa.com/v0/news/1.json';
// https://api.hnpwa.com/v0/news/1.json이라는 하는 것에서 가져오는 데이터를 동기적으로 가져오겠다.
ajax.open('GET', NEWS_URL, false); // url은 바뀔 수 있음 바뀔 가능성이 있는 데이터는 따로 변수로 빼주는게 좋음
ajax.send();  // 실제로 데이터 가져오려면 ajax가 제공한 send함수 호출
// console.log(ajax.response);  // 가져온 데이터는 response라고 하는 값에 들어있음

const newsFeed = JSON.parse(ajax.response);
// document라고 하는 도구가 HTML를 조작하는 데 필요한 모든 도구들을 제공함
const ul = document.createElement('ul'); // ul 태그를 반환

for (let i=0; i<10; i++) {
  const li = document.createElement('li'); // li 태그를 반환
  li.innerHTML = newsFeed[i].title;
  ul.appendChild(li);
}

document.getElementById('root').appendChild(ul);  //root 하위에 추가