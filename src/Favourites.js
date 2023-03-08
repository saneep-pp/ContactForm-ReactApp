import Contact from "./Contact";

const Favourites=({contacts,deleteContact,favToggle})=>{
    return(
        
        <div className="Favcard">
          <div className="container">
           {
            contacts.map((singleContact)=>{
                return(
                    singleContact.fav && (
                        <Contact
                        key={singleContact.id}
                        favToggle={favToggle}
                        deleteContact={deleteContact}
                        contact={singleContact}
                        />
                        )
                    )
                }
                )
            }
           {contacts.filter(single=>single.fav).length===0 && <h1>No Favourite contact</h1>}
        </div>
      
      
      </div>
    )
}
export default Favourites;