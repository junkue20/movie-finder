///// Component /////
interface ComponentPayload {
  tagName?: string;
  props?: {
    [key: string]: unknown;
  };
  state?: {
    [key: string]: unknown;
  };
}

/** 컴포넌트 생성기능 */
export class Component {
  public el;
  public props;
  public state;
  constructor(payload: ComponentPayload = {}) {
    const {
      tagName = 'div', // 최상위 요소의 태그 이름
      state = {},
      props = {},
    } = payload;
    this.el = document.createElement(tagName); // 컴포넌트의 최상위 요소
    this.state = state; // 부모 컴포넌트로부터 받는 데이터
    this.props = props; // 컴포넌트 안에서 사용할 데이터
    this.render();
  }
  render() {
    // 컴포넌트를 렌더링하는 함수
    // ...
  }
}

///// Router /////
interface Route {
  path: string;
  component: typeof Component;
}
type Routes = Route[]

/** 페이지 렌더링기능 */
const routeRender = (routes: Routes) => {
  // 접속할 때 해시가 없으면 /#/로 redirect 함.
  if (!location.hash) {
    history.replaceState(null, '', '/#/'); // (상태, 제목, 주소)
  }
  const routerView = document.querySelector('router-view');
  const [hash, queryString = ''] = location.hash.split('?'); // 물음표를 기준으로 쿼리스트링 구분

  // 1) 쿼리스트링을 객체로 변환해 히스토리의 상태에 저장!
  interface Query {
    [key: string]: string;
  }
  const query = queryString.split('&').reduce((acc, cur) => {
    const [key, value] = cur.split('=');
    acc[key] = value;
    return acc;
  }, {} as Query);
  history.replaceState(query, '');

  // 2) 현재 라우트 정보를 찾아서 렌더링!
  const currentRoute = routes
    .find(route => new RegExp(`^${route.path}/?$`).test(hash));
  if(routerView){
  routerView.innerHTML = '';
  currentRoute && routerView.appendChild(new currentRoute.component().el);
  }

  window.scrollTo(0, 0);
};

export function createRouter(routes: Routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes);
    });
    routeRender(routes);
  };
}

///// Store /////
interface StoreObservers {
  [key: string]: SubscribeCallback[];
}
interface SubscribeCallback {
  (arg: unknown): void;
}
export class Store<S> {
  public state = {} as S; // 상태 (데이터)
  private observers = {} as StoreObservers;
  constructor(state: S) {
    
    for (const key in state) {
      // 각 상태에 대한 변경 감시 (Setter) 설정!
      Object.defineProperty(this.state, key, {
        // Getter
        get: () => state[key], // state['message']
        // Setter
        set: (val) => {
          state[key] = val;
          if (Array.isArray(this.observers[key])) {
            // 호출할 콜백이 있는 경우
            this.observers[key].forEach((observer) => observer(val));
          }
        },
      });
    }
  }
  // 상태변경 구독!
  subscribe(key: string, cb: SubscribeCallback) {
    Array.isArray(this.observers[key]) 
      ? this.observers[key].push(cb) 
      : this.observers[key] = [cb];
  }
}
