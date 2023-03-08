import "./contacts.css";
const Contact = (props) => {
  // console.log(props.contact);
  let id=props.contact.id;
  let fav=props.contact.fav;
  
  return (
    <div className="main">
      <div className="card">
        <div className="container">
          <h4>
            <b>{props.contact.name}</b>
          <div onClick={()=>{props.favToggle(id)}} > <i className={fav?"fas fa-star text-warning":"far fa-star text-warning"}></i></div> 
          </h4>
          <p>{props.contact.phone}</p>
          <p>{props.contact.email}</p>
          <p><button type="button" onClick={()=>{props.deleteContact(id)}}>Delete</button></p>
        </div>
      </div>
    
    
    </div>
  );
};

export default Contact;
