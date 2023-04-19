/* IMPORTING BOOTSTRAP COMPONENTS */
import { Navbar }       from "react-bootstrap";
import { Container }    from "react-bootstrap";
import { Nav }          from "react-bootstrap";
import { Button }       from 'react-bootstrap';

/*IMPORTING REACT ROUTER COMPONENTS*/
import { useNavigate }  from "react-router-dom";

/*IMPORTING APIS*/
import { logout }        from "../utilities/API.js";

/*IMPORTING UTILITIES*/
import {StudyPlan} from "../utilities/exam.js"

function MyNavbar(props) {
    const navigate = useNavigate();

    /*FUNCTION TO HANDLE THE LOGOUT OF AN USER*/
    const handleLogout=async  ()=> {
        try{

            await logout();
            /*IF THE USER MANAGES TO LOGOUT CORRECTLY*/
            props.setPlan(new StudyPlan([], "None"));
            props.setUser("No user");

        }catch(error){
            /*IF SOMETHING WENT WRONG WITH THE LOGOUT*/
            console.log(error);
            alert(error); 

        }
    }

    return ( 
        <Navbar expand="lg" bg="primary" variant="dark">

            {/* LOGO AND NAVBAR BRAND */}
            <Container>
                <Navbar.Brand action="true" style={{cursor:'pointer'}} onClick={() => {navigate('/');}}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-book-half" viewBox="0 0 16 16"><path d="M8.5 2.687c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/></svg>{' '}
                    Study Plan
                </Navbar.Brand>
            </Container>
            
            {/* LOGIN BUTTON */}
            {(props.user==="No user") && <Button align ="center" variant='secondary' style={{cursor:'pointer'}} onClick={()=>(navigate('/login'))}> Login </Button>} 

            {/* USER LOGO, USER NAME AND SURNAME AND LOGOUT BUTTON*/}
            <Container>
                {/*USER NAME AND SURNAME*/}
                {(props.user!=="No user") && <Navbar.Brand style={{color:'white'}}>
                    {props.user.name+" "+props.user.surname}
                </Navbar.Brand>}

                {/*LOGOUT BUTTON*/}
                {(props.user!=="No user") && <Button align ="right" variant='danger' style={{cursor:'pointer'}} onClick={()=>(handleLogout())}> Logout </Button>}
                
                {/*USER LOGO*/}
                <Nav className="ms-auto">
                    <Nav.Link>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                        </svg>
                    </Nav.Link>
                </Nav>
            </Container>
    </Navbar>
    );
}

/* EXPORTING NAVBAR */
export default MyNavbar;