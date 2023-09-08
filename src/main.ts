import App from './App'
import router from './routes' // 폴더 안에있는 index는 생략이 가능! ('./routes/index'와 같음)

const root = document.querySelector('#root')
root?.append(new App().el)

router() // index.js 에서 동작.
