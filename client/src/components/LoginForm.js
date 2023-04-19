import { useState } from "react";

/*IMPORTING APIS AND UTILITIES*/
import { login, readStudyPlan }        from "../utilities/API.js";

/* IMPORTING REACT ROUTER COMPONENTS */
/*IMPORTING REACT ROUTER COMPONENT*/
import { useNavigate }  from 'react-router-dom';

/* IMPORTING REACT BOOTSTRAP COMPONENTS */
import { Button } from 'react-bootstrap';
import { Form }   from 'react-bootstrap';

function LoginForm(props) {

  /* DATA AND STATES USED */
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  /*Function to handle the submission of the login form*/
  const handleSubmit = async (event) => {
  
    const form = event.currentTarget;
    event.preventDefault();

    /*IF SOME DATA OF THE LOGIN FORM IS NOT VALID, LOGIN IS NOT PERFORMED*/
    if (form.checkValidity() === false ) {
      event.stopPropagation();
      setValidated(true);
      return;
    }

    /*PERFORMING LOGIN*/
    try{
      let user= await login({username, password});
      let userObj={name: user.name, surname: user.surname, id: user.id};
      props.setUser(userObj);

      /*IF THE USER CORRECTLY LOGGED IN, HIS STUDYPLAN IS RETRIEVED*/
      try{
        const newPlan = await readStudyPlan();
        props.setPlan(newPlan);
      }catch(error){
        console.log(error);
        alert(error); 
      }  

      props.setMessage('');
      /* GOING BACK TO THE PREVIOUS PAGE */
      navigate(-1);    
    }
    catch(error){
      /*LOGIN FAILED*/
      props.setMessage('Wrong username or password');
      console.log(error);
    }
    
    /*RESTORING STATES TO THEIR DEFAULT VALUE*/
    setValidated(true);
    setUsername('');
    setPassword('');
  };

  
  return (   
    <div style={{ borderColor: 'grey', borderWidth: 2, borderStyle: 'dotted', padding: 10, margin: 250 }}>
      {/*LOGIN FORM*/}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>

        {/* USERNAME */}
        <Form.Group className='mb-3' >
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' value={username} required={true} placeholder="Username" onChange={ev => setUsername(ev.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a username.
          </Form.Control.Feedback>
        </Form.Group>

        {/* PASSWORD */}
        <Form.Group className='mb-3' >
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' value={password} required={true} placeholder="Password" onChange={ev => setPassword(ev.target.value)} />
          <Form.Control.Feedback type="invalid">
            Please provide a password.
          </Form.Control.Feedback>
        </Form.Group>

        {/* BUTTONS FOR SUBMIT AND CANCEL */}
        <div align='center'>
          <Button style={{ margin:10}}variant='outline-secondary' onClick={() => navigate(-1)}>Back</Button>
          <Button style={{ margin:10}} type='submit' variant='outline-success'>Login</Button>
        </div>
      </Form>
    </div> 
  );
}

export default LoginForm;