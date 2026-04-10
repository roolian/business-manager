import Client from '#models/client'
import Contact from '#models/contact'
import { Button, Modal, Table, TableHead, TableHeadCell, TableBody, TableRow, TableCell, ModalBody } from 'flowbite-react'
import { useState } from 'react'
import { HiPencilAlt } from 'react-icons/hi'
import { toast } from 'react-toastify'
import ClientForm, { ClientFormValues } from '~/app/components/forms/ClientForm'
import ContactForm, { ContactFormValues } from '~/app/components/forms/ContactForm'

import { Head, router } from '@inertiajs/react'

interface ClientEditProps {
  client: Client
}

export default function ClientIndex({ client }: ClientEditProps) {
  const [contact, setContact] = useState<Contact | undefined | null>(null)

  const handleSubmit = (values: ClientFormValues) => {
    router.post('/clients/' + client.id, values, {
      onSuccess: () => toast.success('Client mis à jour avec succès'),
      onError: () => toast.error('Vérifiez les données'),
    })
  }
  const handleSubmitContact = async (contactValues: ContactFormValues) => {
    if (contact === undefined) {
      router.post('/contacts/create', contactValues, {
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        onSuccess: () => toast.success('Contact créé avec succès'),
        onError: () => toast.error('Vérifiez les données'),
      })
    } else {
      contact &&
        router.post('/contacts/' + contact.id, contactValues, {
          headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          onSuccess: () => toast.success('Contact mis à jour avec succès'),
          onError: () => toast.error('Vérifiez les données'),
        })
    }
  }

  return (
    <>
      <Head title="Homepage" />

      <div className="page-content">
        <div className="mb-10">
          <h1 className="mb-10">Modifier le client</h1>
          <ClientForm client={client} contacts={client.contacts} onSubmit={handleSubmit} />
        </div>

        <h2 className="mb-6">Contacts chez le client</h2>
        <Table className="max-w-xl ">
          <TableHead>
            <TableHeadCell>
              <span>Nom</span>
            </TableHeadCell>
            <TableHeadCell>
              <span>Prénom</span>
            </TableHeadCell>

            <TableHeadCell>
              <span>Actions</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className="divide-y">
            {client.contacts.map((c: Contact) => (
              <TableRow key={c.id}>
                <TableCell className="">{c.lastName}</TableCell>
                <TableCell className="">{c.firstName}</TableCell>
                <TableCell className="">
                  <div onClick={() => setContact(c)} className="hover:text-blue-600">
                    <HiPencilAlt size={20} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Button
          className="mt-6"
          onClick={async () => {
            setContact(undefined)
          }}
        >
          Ajouter un contact
        </Button>
      </div>

      <ModalForm
        isOpen={contact === undefined}
        title="Ajouter un contact"
        onClose={() => {
          setContact(null)
        }}
        onSubmit={handleSubmitContact}
        client={client}
      />

      {contact && (
        <ModalForm
          isOpen={!!contact}
          title="Modifier le contact"
          onClose={() => {
            setContact(null)
          }}
          onSubmit={handleSubmitContact}
          contact={contact}
          client={client}
        />
      )}
    </>
  )
}

interface ModalFormProps {
  isOpen: boolean
  title?: string
  onClose: () => void
  onSubmit: (values: ContactFormValues) => void
  contact?: Contact
  client: Client
}

const ModalForm = ({ isOpen, title, onClose, onSubmit, contact, client }: ModalFormProps) => (
  <Modal show={isOpen} onClose={onClose} dismissible>
    <ModalBody>
      {title && <h3 className="mb-8">{title}</h3>}
      <ContactForm onSubmit={onSubmit} contact={contact} isModal clientId={client.id} />
    </ModalBody>
  </Modal>
)
