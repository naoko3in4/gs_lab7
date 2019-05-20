// document.getElementById を省略
const $id = id => document.getElementById(id);
const input = $id("input");

const btn = $id('btn');
const form = $id('form');
const eventList = $id('eventlist');
const languageOptions = $id('language_options');

// 言語
const js = $id("js");
const react = $id("react");
const vue = $id("vue");
const frontend = $id("frontend");
const php = $id("php");
// const languages = [ js, react, vue, frontend, php];

const languages = [
  {key: 'js', value: 'JavaScript'}, // languages[i].key
  {key: 'react', value: 'React'}, // languages.react
  {key: 'vue', value: 'Vue'},
  {key: 'frontend', value: 'フロントエンド'},
  {key: 'php', value: 'PHP'},
  {key: 'node', value: 'Node.js'}
]

// ボタンを生成
for (let i = 0; i < languages.length; i++) {
  const button = document.createElement('button');
  button.className = 'languages';
  button.id = languages[i].key;
  button.textContent = languages[i].value;
  languageOptions.appendChild(button);
}

// 言語選択
languageOptions.addEventListener('click', e => {
  const { id } = e.srcElement; // const id = e.srcElement.id;
  const { value } = languages.find(l => {
    return l.key === id;
  })
  search(value);
})

// キーワード検索
form.addEventListener('submit', e => {
  e.preventDefault();
  const keyword = (e.srcElement[0].value).split(" ");
  search(keyword);
})

// 検索実行
const search = value => {
  const url = `https://connpass.com/api/v1/event/?keyword=${value}&count=20&callback=getConnpassEvent`;
  const script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
  document.body.removeChild(script);
}

// イベント一覧
function getConnpassEvent(data) {
  // console.log(data);
  eventList.innerHTML = "";

  const options = [];
  for (let i = 0; i < data.events.length; i++) {
    const event = data.events[i];
    /* 
      const event_url = event.event_url;
      const address = event.address;
      ...
      const lon = event.lon; までまとめて代入
    */
    const { event_url, address, title, lat, lon } = event;
    if (lat === null) {
      continue;
    }
    const eventStartT = (event.started_at).replace(/T/g, ", ");
    const eventStart = eventStartT.slice(0, -9);;
    const eventEnd = (event.ended_at).slice(11, 16);
    const eventDate = `${eventStart}〜${eventEnd}`;
    const li = document.createElement('li');
    const a = document.createElement('a');

    const option = {
      "lat": lat,
      "lon": lon,
      "height": 150,
      "width": 150,
      "description": `<a href="${event_url}" target="_blank" style="font-size: 10px;">${title}<p class="DateTime">${eventDate}</p>${address}</a>`
    };

    options.push(option);

    a.textContent = title;
    a.href = event_url;
    a.target = "_blank";
    li.appendChild(a);
    eventList.appendChild(li);
  }
  GetMap(options);
  return;
}





