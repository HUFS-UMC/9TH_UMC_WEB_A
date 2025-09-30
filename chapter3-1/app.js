const routes = {
  "#home": {
    title: "메인",
    content: `
            <p>여기는 홈입니다.</p>
        `,
  },
  "#about": {
    title: "소개",
    content: `
            <p>여기는 소개입니다.</p>
        `,
  },
  "#contact": {
    title: "연락처",
    content: `
            <h2>연락처</h2>
            <p>여기는 연락처입니다.</p>
        `,
  },
};

function handleRoute() {
  const hash = window.location.hash || "#home";
  const route = routes[hash];
  const contentDiv = document.getElementById("app-content");

  document.title = route.title;
  contentDiv.innerHTML = route.content;
}

handleRoute();
window.addEventListener("hashchange", handleRoute);
