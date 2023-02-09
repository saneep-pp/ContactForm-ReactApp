import "./Form.css";
import { useForm } from "react-hook-form";
function Form(props) {
    const{
        register,
        handleSubmit,
        formState:{errors},
        reset,
    }=useForm(); 

    const container = {
        alignItems: "center",
        justifyContent:"center",
        display:"flex"
        
    };
   

    const onSub=(data)=>{
        data.id=Date.now();
        data.fav=false;
       props.formSub(data);
        // console.log(data);
        reset();
    }
    

    
    return (
        <div style={container}>
            <div className="flex-conatainer">
                <h2>Add Contact</h2>
                <form onSubmit={handleSubmit(onSub)}>
                <div>
                    <label for="">Name:</label>
                    <input  type="text" id="name" {...register("name",{required:"Name is Required"})} />
                    {errors.name&&(<small style={{color: "red"}} >{errors.name.message}</small>)}
                </div>
                <div>
                    <label for="">Email:</label>
                    <input type="email" id="email" {...register("email",{required:"Email is required"})} />
                    {errors.email&&(<small style={{color: "red"}} >{errors.email.message}</small>)}
                </div>
                <div>
                    <label for="">Phone:</label>
                    <input type="number" id="phone" {...register("phone",{required:"Phone Number is required",
                    pattern: {
                        value:/^\s*(?:\+?(\d{1,3}))?[-.(]*(\d{3})[-.]*(\d{4})(?: *x(\d+))?\s*$/,
                    message:"invalid phone no"}})}/>
                    {errors.phone&&(<small style={{color: "red"}} >{errors.phone.message}</small>)}
                </div>
                <div>
                    <button  type="submit" id="addcontact">Add Contact</button>
                </div>
                </form>
            </div>
        </div>
    );
}
export default Form;