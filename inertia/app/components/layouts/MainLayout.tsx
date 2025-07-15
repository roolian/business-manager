import { Link, usePage } from '@inertiajs/react'
import { Sidebar } from 'flowbite-react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { HiChartPie, HiIdentification, HiOfficeBuilding } from 'react-icons/hi'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const { url } = usePage()

  return (
    <>
      <main className="flex h-full ">
        <div className="w-72">
          <Sidebar aria-label="Default sidebar example" className="w-full bg-none">
            <Sidebar.Logo href="/" img="/images/logoipsum-325.svg" imgAlt="Flowbite logo" />
            <Sidebar.Items>
              <Sidebar.ItemGroup className="bg-none">
                <Sidebar.Item as={Link} href="/" icon={HiChartPie} active={url === '/'}>
                  Dashboard
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  href="/clients"
                  icon={HiOfficeBuilding}
                  labelColor="dark"
                  active={url === '/clients'}
                >
                  Clients
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  href="/contacts"
                  icon={HiIdentification}
                  labelColor="dark"
                  active={url === '/contacts'}
                >
                  Contacts
                </Sidebar.Item>
                <Sidebar.Item
                  as={Link}
                  href="/quotes"
                  icon={HiIdentification}
                  labelColor="dark"
                  active={url === '/quotes'}
                >
                  Devis
                </Sidebar.Item>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </div>

        <section className="flex-1">{children}</section>
      </main>

      <ToastContainer />
    </>
  )
}
