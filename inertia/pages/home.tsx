import { Head } from '@inertiajs/react'
import { Button } from 'flowbite-react'

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
