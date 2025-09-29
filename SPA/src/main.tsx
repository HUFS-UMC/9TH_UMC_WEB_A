// 콘텐츠를 렌더링할 컨테이너를 가져옴
const appContainer = document.getElementById('app') as HTMLDivElement;

// URL에 따라 다른 콘텐츠를 렌더링하는 함수
const renderPage = (url: string): void => {
  switch (url) {
    case '/':
      appContainer.innerHTML = '<h1>홈 페이지</h1><p>타입스크립트로 구현된 SPA입니다.</p>';
      break;
    case '/about':
      appContainer.innerHTML = '<h1>소개 페이지</h1><p>타입 안정성을 확보한 라우팅입니다.</p>';
      break;
    case '/contact':
      appContainer.innerHTML = '<h1>연락처</h1><p>이 페이지는 동적으로 렌더링됩니다.</p>';
      break;
    default:
      appContainer.innerHTML = '<h1>404 Not Found</h1><p>페이지를 찾을 수 없습니다.</p>';
  }
};

// 링크 클릭 이벤트를 처리하는 함수
const handleLinkClick = (event: MouseEvent): void => {
  const target = event.target as HTMLAnchorElement;

  if (target.tagName === 'A') {
    event.preventDefault();
    const url = target.getAttribute('href');

    if (url) {
      history.pushState({}, '', url);
      renderPage(url);
    }
  }
};

// 페이지 로드 후 초기 렌더링
window.addEventListener('DOMContentLoaded', () => {
  renderPage(location.pathname);
});

// 뒤로가기/앞으로가기 버튼 이벤트 처리
window.addEventListener('popstate', () => {
  renderPage(location.pathname);
});

// 문서 전체에 클릭 이벤트 리스너 추가
document.addEventListener('click', handleLinkClick);