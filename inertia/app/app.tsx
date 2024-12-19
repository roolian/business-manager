/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css'
import { hydrateRoot } from 'react-dom/client'
import { createInertiaApp } from '@inertiajs/react'
import MainLayout from './components/layouts/MainLayout'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name: string) => {
    const pages = import.meta.glob('../pages/**/*.tsx', { eager: true })
    let page = pages[`../pages/${name}.tsx`]

    page.default.layout = page.default.layout || ((page) => <MainLayout children={page} />)

    return page
  },

  setup({ el, App, props }) {
    hydrateRoot(el, <App {...props}></App>)
  },
})
