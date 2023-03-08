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
    margin:"0px",
    width:"100%",
    fontFamily: "Arial",
  };

  const formSub = async (data) => {
    try {
      // const res = await fetch("http://localhost:3004/contacts", {
      //   method: "POST",
      //   headers: {
      //     "Content-type": "aplication/json",
      //   },
      //   body: JSON.stringify(data),
      // });
      // const newdata = await res.json();
      // console.log(newdata);

      let res = await axios.post("http://localhost:3004/contacts", data);
      // console.log('hi',res);
      setContacts([...contacts, res.data]);
    } catch (error) {
      // console.log('error',error);
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

  //get single Contact
  const getCon = async (id) => {
    //const res = await fetch(`http://localhost:3004/contacts/${id}`);
    let res = await axios.get(`http://localhost:3004/contacts/${id}`);

    //console.log(res.data);
    const data =  res.data;
    // const data =  res.join();
    // console.log(typeof res);
    // console.log(Object.keys(res));
    // console.log(Object.values(res));
    
    return data;
  };

  const favToggle = async (id) => {
    try{
      
      const singleCon = await getCon(id);
      const upTask = { ...singleCon, fav: !singleCon.fav };
       const res = await axios.put(`http://localhost:3004/contacts/${id}`, upTask);
      console.log(res.data.fav);  
        
      // setContacts([...contacts, res.upTask]);
      
    
if(res.status===200){
    let updatedContact = contacts.map((singleContact) => {
      return singleContact.id === id
        ? { ...singleContact, fav: !singleContact.fav }
        : singleContact;
    });
    setContacts(updatedContact);
  }
}catch(error){
  console.log("error in toggle is",error);
}
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
