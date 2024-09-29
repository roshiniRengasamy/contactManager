import { useState } from 'react'
import '../themes/addContactStyle.css'
import { useNavigate } from 'react-router-dom'

const AddContact = ({ addContact }) => {
    let navigate = useNavigate()
    let [contact, setContact] = useState({ name: '', email: '' })
    const add = (e) => {
        e.preventDefault()
        if (contact.name === '' || contact.email === '') {
            alert('Each field should be filled')
            return;
        }
        addContact(contact)
        setContact({ name: '', email: '' })
        navigate('/')
    }
    return (
        <div className='addContactContainer'>
            <h3>Add Contact</h3>
            <form className='form' onSubmit={add}>
                <div className='formContainer'>
                    <label className='label'>Name</label>
                    <input type='text' name='name' placeholder='Enter your name' value={contact.name} onChange={(e) => { setContact({ ...contact, name: e.target.value }) }} />
                </div>
                <div className='formContainer'>
                    <label className='label'>Email</label>
                    <input type='text' name='email' placeholder='Enter your mail' value={contact.email} onChange={(e) => { setContact({ ...contact, email: e.target.value }) }} />
                </div>
                <button type='submit' className='formButton'>Add</button>
            </form>
        </div>
    )
}

export default AddContact;