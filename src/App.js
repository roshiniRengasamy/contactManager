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

  const retriveContacts = async () => {
    let response = await api.get('/contacts')
    return response.data
  }

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(localStorageKey))
    // if (retriveContacts?.length) {
    //   setContactList(retriveContacts)
    // }
    const getContacts = async () => {
      let contacts = await retriveContacts()
      setContactList(contacts)
    }
    getContacts()
  }, [])

  // useEffect(() => {
  // localStorage.setItem(localStorageKey, JSON.stringify(contactList))
  // }, [contactList])

  const addContact = async (contact) => {
    let payload = {
      id: uuid(),
      ...contact
    }
    let response = await api.post('/contacts', payload)
    // setContacts([...contacts, { id: uuid(), ...contact }]);
    setContactList([...contactList, response.data])
  }

  const updateContact = async (contact) => {
    let response = await api.put(`/contacts/${contact.id}`, contact)
    // setContacts([...contacts, { id: uuid(), ...contact }]);
    let { id } = contact
    setContactList(contactList.map((contact) => {
      return contact.id === id ? { ...response.data } : contact
    }))
  }

  const searchContact = (search) => {
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
  }

  const deleteContact = async (id) => {
    api.delete(`/contacts/${id}`)
    const newContactList = contactList.filter((contact) => {
      return contact.id !== id;
    });
    setContactList(newContactList);
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
              deleteContact={deleteContact} />} />
          <Route path='/add' element={<AddContact addContact={addContact} />} />
          <Route path='/edit/:id' element={<EditContact updateContact={updateContact} />} />
          <Route path='/view/:id' element={<ContactDetails />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
