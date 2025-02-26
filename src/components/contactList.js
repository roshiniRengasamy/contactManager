import { Link } from 'react-router-dom'
import '../themes/contactListStyle.css'
import { IoSearch } from "react-icons/io5";
import ContactCard from './contactCard'
import { useRef } from 'react';

const ContactList = ({ contactList, deleteContact, searchText, searchContact, isLoading }) => {
    const inputRef = useRef()
    const search = () => {
        searchContact(inputRef.current.value)
    }

    return (
        <div className='contactListContainer'>
            <div className='contactListHeading'>
                <h3>Contact List</h3>
                <Link to={'/add'}>
                    <button>Add Contact</button>
                </Link>
            </div>
            <div className='searchContainer'>
                <input ref={inputRef} type='text' name='search' placeholder='Search here' value={searchText} onChange={search} />
                <div className='textSearchContainer'>
                    <IoSearch />
                </div>
            </div>
            {
                !isLoading ?
                    <>
                        {contactList?.length && contactList.map((item, index) => (
                            <ContactCard key={item.id} item={item} deleteContact={deleteContact} />
                        ))
                        }
                    </>
                    :
                    <div style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', height: 200 }}>Loading ...</div>
            }
        </div>
    )
}

export default ContactList