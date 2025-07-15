import Client from '#models/client'
import Contact from '#models/contact'
import { Button, Modal, Table } from 'flowbite-react'
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
          <Table.Head>
            <Table.HeadCell>
              <span>Nom</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span>Prénom</span>
            </Table.HeadCell>

            <Table.HeadCell>
              <span>Actions</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {client.contacts.map((c: Contact) => (
              <Table.Row key={c.id}>
                <Table.Cell className="">{c.lastName}</Table.Cell>
                <Table.Cell className="">{c.firstName}</Table.Cell>
                <Table.Cell className="">
                  <div onClick={() => setContact(c)} className="hover:text-blue-600">
                    <HiPencilAlt size={20} />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
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
    <Modal.Body>
      {title && <h3 className="mb-8">{title}</h3>}
      <ContactForm onSubmit={onSubmit} contact={contact} isModal clientId={client.id} />
    </Modal.Body>
  </Modal>
)
