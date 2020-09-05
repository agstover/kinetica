import '../styles/index.css'
import { AnimatePresence } from 'framer-motion'
import { MainLayout } from 'components/layouts'
import { TinaCMS, TinaProvider } from 'tinacms'
import { GithubClient, TinacmsGithubProvider } from 'react-tinacms-github'

const makeTinaCMS = pageProps => new TinaCMS({
  enabled: !!pageProps.preview,
  apis: {
    /**
     * 2. Register the GithubClient
     */
    github: new GithubClient({
      proxy: '/api/proxy-github',
      authCallbackRoute: '/api/create-github-access-token',
      clientId: process.env.GITHUB_CLIENT_ID,
      baseRepoFullName: process.env.REPO_FULL_NAME, // e.g: tinacms/tinacms.org,
    }),
  },
  /**
   * 3. Use the Sidebar and Toolbar
   */
  sidebar: pageProps.preview,
  toolbar: pageProps.preview,
})

function MyApp({ Component, pageProps, router }) {
  const getLayout = Component.getLayout || (page => page)
  const cms = makeTinaCMS(pageProps)
  return (
    <TinaProvider cms={cms}>
      <TinacmsGithubProvider
        onLogin={onLogin}
        onLogout={onLogout}
        error={pageProps.error}
      >
        <AnimatePresence exitBeforeEnter>
          <MainLayout>
          <EditLink cms={cms} />
            {
              getLayout(<Component {...pageProps} test={true} key={router.route}/>)
            }
          </MainLayout>
        </AnimatePresence>
      </TinacmsGithubProvider>
    </TinaProvider>
  )
}

const onLogin = async () => {
  const token = localStorage.getItem('tinacms-github-token') || null
  const headers = new Headers()

  if (token) {
    headers.append('Authorization', 'Bearer ' + token)
  }

  const resp = await fetch(`/api/preview`, { headers: headers })
  const data = await resp.json()

  if (resp.status == 200) window.location.href = window.location.pathname
  else throw new Error(data.message)
}

const onLogout = () => {
  return fetch(`/api/reset-preview`).then(() => {
    window.location.reload()
  })
}

export const EditLink = ({ cms }) => {
  return (
    <button onClick={() => cms.toggle()}>
      {cms.enabled ? 'Exit Edit Mode' : 'Edit This Site'}
    </button>
  )
}

export default MyApp
