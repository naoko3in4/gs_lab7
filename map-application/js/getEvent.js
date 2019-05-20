// document.getElementById を省略
const $id = id => document.getElementById(id);
const input = $id("input");

const btn = document.getElementById('btn');
const form = document.getElementById('form');
const eventList = document.getElementById('eventlist');

form.addEventListener('submit', e => {
  e.preventDefault();
  const keyword = e.srcElement[0].value;
  const url = `https://connpass.com/api/v1/event/?keyword=${keyword}&callback=getConnpassEvent`;
  const script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
  document.body.removeChild(script);
})

function getConnpassEvent(data) {
  console.log(data);
  eventList.innerHTML = "";

  const options = [];
  for (let i = 0; i < data.events.length; i++) {
    const event = data.events[i];
    const lat = event.lat;
    const lon = event.lon;
    if (lat === null) {
      continue;
    }
    const url = event.event_url;
    const address = event.address;
    const title = event.title;
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
      // "description": `<a href="${url}">${title},${eventDate}, ${address}</a>`
      "description": `<a href="${url}" target="_blank">${title}<p class="DateTime">${eventDate}</p>${address}</a>`
    };

    options.push(option);

    a.textContent = event.title;
    a.href = event.event_url;
    a.target = "_blank";
    li.appendChild(a);
    eventList.appendChild(li);
  }
  GetMap(options);
  return;
}





