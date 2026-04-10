import { renderToString } from 'react-dom/server'
import { createInertiaApp } from '@inertiajs/react'
import MainLayout from './components/layouts/MainLayout'
import { ThemeModeScript } from 'flowbite-react'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
      let page = pages[`../pages/${name}.tsx`]

      page.default.layout = page.default.layout || ((page) => <MainLayout children={page} />)
      return page
    },
    setup: ({ App, props }) => (
      <>
        <ThemeModeScript/>
        <App {...props} />
      </>
    ),
  })
}
