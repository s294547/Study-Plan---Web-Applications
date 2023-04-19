/* IMPORTING BOOTSTRAP NAVBAR */
import { Alert } from "react-bootstrap";

/*MESSAGE SHOWED WHEN A LOGIN FAILS*/
function GreetingsOnLogin(props) {
    if(props.message!=="" && props.message!==undefined){
        return (
            <Alert variant="danger">
                <Alert.Heading>{props.message}</Alert.Heading>
                <hr />
                <p className="mb-0">
                    <b>Please, fill the form to Log In</b>
                </p>
            </Alert>
        );
    }
}

/*MESSAGE SHOWED WHEN THE PAGE WITH GIVEN URL IS NOT FOUND*/
function GreetingsNoMatch() {
    return (
        <Alert variant="danger">
            <Alert.Heading>404: Page Not Found</Alert.Heading>
            <p>
                Ooops! <i>hic sunt dracones</i>... 
                Take a step back and rethink where you want to go.
            </p>
        </Alert>
    );
}

/* EXPORTING GREETINGS */
export { GreetingsOnLogin, GreetingsNoMatch }

