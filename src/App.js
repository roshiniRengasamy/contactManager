import { useEffect, useState } from 'react';
import AddContact from './components/addContact';
import ContactList from './components/contactList';
import Header from './components/header';
import { v4 as uuid } from 'uuid';
import { HashRouter, Route, Routes } from 'react-router-dom';
import ContactDetails from './components/contactDetails';
import api from './services/contacts';
import EditContact from './components/editContact';

function App() {
  // const localStorageKey = "contact";
  const [contactList, setContactList] = useState([])
  const [searchContactList, setSearchContactList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const retriveContacts = async () => {
    let response = await api.get('/contacts')
    setContactList(response.data)
    setIsLoading(false)
  }

  useEffect(() => {
    console.log('---')
    setIsLoading(true)
    retriveContacts()
  }, [])

  // useEffect(() => {
  // localStorage.setItem(localStorageKey, JSON.stringify(contactList))
  // }, [contactList])

  const addContact = async (contact) => {
    setIsLoading(true)
    let payload = {
      id: uuid(),
      ...contact
    }
    let response = await api.post('/contacts', payload)
    // setContacts([...contacts, { id: uuid(), ...contact }]);
    setContactList([...contactList, response.data])
    setIsLoading(false)
  }

  const updateContact = async (contact) => {
    setIsLoading(true)
    let response = await api.put(`/contacts/${contact.id}`, contact)
    // setContacts([...contacts, { id: uuid(), ...contact }]);
    let { id } = contact
    setContactList(contactList.map((contact) => {
      return contact.id === id ? { ...response.data } : contact
    }))
    setIsLoading(false)
  }

  const searchContact = (search) => {
    setIsLoading(true)
    setSearchText(search)
    const newContactList = contactList.filter((contact) => {
      return Object.values(contact).join('').toLowerCase().includes(search)
    })
    if (newContactList) {
      setSearchContactList(newContactList)
    }
    else {
      setSearchContactList(...contactList)
    }
    setIsLoading(false)
  }

  const deleteContact = async (id) => {
    setIsLoading(true)
    api.delete(`/contacts/${id}`)
    const newContactList = contactList.filter((contact) => {
      return contact.id !== id;
    });
    setContactList(newContactList);
    setIsLoading(false)
  }

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <HashRouter>
        <Header />
        <Routes>
          <Route path='/' element={
            <ContactList
              searchContact={searchContact}
              searchText={searchText}
              contactList={searchText?.length < 1 ? contactList : searchContactList}
              deleteContact={deleteContact}
              isLoading={isLoading}
            />} />
          <Route path='/add' element={<AddContact addContact={addContact} />} />
          <Route path='/edit/:id' element={<EditContact updateContact={updateContact} />} />
          <Route path='/view/:id' element={<ContactDetails />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
