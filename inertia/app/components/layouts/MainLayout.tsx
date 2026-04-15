import { Link, router, usePage } from '@inertiajs/react'
import { DarkThemeToggle, Sidebar, SidebarItem, SidebarItemGroup, SidebarItems, SidebarLogo } from 'flowbite-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FaAddressBook, FaBuilding, FaCalculator, FaChartPie, FaRightFromBracket } from 'react-icons/fa6'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { url } = usePage()

  return (
    <>
      <main className="flex h-full dark:bg-gray-900 min-h-screen">
        <div className="w-72">
          <Sidebar aria-label="Default sidebar example" className="w-full bg-none">
            <SidebarLogo href="/" img="/images/logoipsum-325.svg" imgAlt="Flowbite logo" />
            <SidebarItems>
              <SidebarItemGroup className="bg-none">
                <SidebarItem as={Link} href="/" icon={FaChartPie} active={url === '/'}>
                  Dashboard
                </SidebarItem>
                <SidebarItem
                  as={Link}
                  href="/clients"
                  icon={FaBuilding}
                  labelColor="dark"
                  active={url === '/clients'}
                >
                  Clients
                </SidebarItem>
                <SidebarItem
                  as={Link}
                  href="/contacts"
                  icon={FaAddressBook}
                  labelColor="dark"
                  active={url === '/contacts'}
                >
                  Contacts
                </SidebarItem>
                <SidebarItem
                  as={Link}
                  href="/quotes"
                  icon={FaCalculator}
                  labelColor="dark"
                  active={url === '/quotes'}
                >
                  Devis
                </SidebarItem>
              </SidebarItemGroup>
              <SidebarItemGroup>
                <DarkThemeToggle />
                <SidebarItem
                  as="button"
                  onClick={() => router.post('/logout')}
                  icon={FaRightFromBracket}
                  className="cursor-pointer"
                >
                  Déconnexion
                </SidebarItem>
              </SidebarItemGroup>
            </SidebarItems>
          </Sidebar>
        </div>

        <section className="flex-1">{children}</section>
      </main>

      <ToastContainer />
    </>
  )
}
