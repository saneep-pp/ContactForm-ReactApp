import Home from "./Home";
import "./App.css";
import React from "react";
import NotFoundPage from "./NotFoundPage";
import Favourites from "./Favourites";
import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
const App = () => {
  //Created states to store contacs
  const [contacts, setContacts] = useState([]);

  //For rendering repeatly use useEffect Hooks
  useEffect(() => {

    const getContacts = async () => {
      const contactsFormServer = await fetchContacts();
      setContacts(contactsFormServer);
    };
    getContacts();
  }, []);
//Add Styles to Heading
  const headstyle = {
    color: "white",
    backgroundColor: "Black",
    padding: "10px",

    fontFamily: "Arial",
  };
  
  
  const formSub = async (data) => {
    try{
      
      // const res = await fetch("http://localhost:3004/contacts", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "aplication/json",
      //   },
      //   body: JSON.stringify(data),
      // });
      // const newdata = await res.json();
      // console.log(newdata);

      let res = await axios.post('http://localhost:3004/contacts',data)
      console.log('hiiii',res);
      setContacts([...contacts,res.data]);
    }catch(error){
      console.log('error',error);
    }
  
  };

  const fetchContacts = async () => {
    const res = await fetch("http://localhost:3004/contacts");
    const data = await res.json();
    
    return data;
    
  };
  const deleteContact = async (id) => {
    const res = await fetch(`http://localhost:3004/contacts/${id}`, {
      method: "DELETE",
    });
    if (res.status === 200) {
      let newContact = contacts.filter((singleContact) => {
        return singleContact.id !== id;
      });
      setContacts(newContact);
    }
  };

  const favToggle = (id) => {
    let updatedContact = contacts.map((singleContact) => {
      return singleContact.id === id
        ? { ...singleContact, fav: !singleContact.fav }
        : singleContact;
    });
    setContacts(updatedContact);
  };

  return (
    <>
      <BrowserRouter>
        <h2 style={headstyle}>
          Private Contact
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/favourites">Favourites</Link>
            </li>
          </ul>
        </h2>

        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                formSub={formSub}
                contacts={contacts}
                deleteContact={deleteContact}
                favToggle={favToggle}
              />
            }
          />
          <Route
            path="Favourites"
            element={
              <Favourites
                contacts={contacts}
                deleteContact={deleteContact}
                favToggle={favToggle}
              />
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
