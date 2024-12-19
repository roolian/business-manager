import { Head } from '@inertiajs/react'
import { Button, Sidebar } from 'flowbite-react'
import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from 'react-icons/hi'

export default function Home() {
  return (
    <>
      <Head title="Homepage" />
      <div className="p-8">
        <h1 className="">Page 1</h1>
        <div className="mt-5">
          <Button>Click me</Button>
        </div>
      </div>
    </>
  )
}
