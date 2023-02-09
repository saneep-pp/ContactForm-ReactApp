import Form from "./Form";
import Contact from "./Contact";
const Home = (props) => {
  
  return (
    <div>
      <div>
        <Form formSub={props.formSub} />
      </div>

      {props.contacts.map((singleContact) => {
        return <Contact key={singleContact.id} contact={singleContact} deleteContact={props.deleteContact}  favToggle={props.favToggle}/>;
      })}
      {props.contacts.lenght===0 && <div> no contacts to show</div>}
    </div>
  );
};

export default Home;
