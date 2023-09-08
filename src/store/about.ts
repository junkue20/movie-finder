import { Store } from '../core/jungyu';

interface Root {
  photo: string
  name: string
  email: string
  velog: string
  github: string
}


export default new Store<Root>({
  photo: 'https://avatars.githubusercontent.com/u/122848687?v=4',
  name: 'Jungyu Park',
  email: 'junkue13@gmail.com',
  velog: 'https://velog.io/@junkue20',
  github: 'https://github.com/junkue20',
})