/* IMPORTING CUSTOMIZED COMPONENT */
import NavigationBar            from './NavigationBar.js';
import ExamList                 from "../components/ExamList";
import StudyPlan                from "../components/StudyPlan";
import LoginForm                from "../components/LoginForm";
import { GreetingsNoMatch, GreetingsOnLogin }     from "../utilities/Messages";

/* IMPORT REACT BOOTSTRAP COMPONENTS */
import { Container }    from 'react-bootstrap';
import { Row }          from 'react-bootstrap';
import { Col }          from 'react-bootstrap';
import { useState }       from "react";


/*HOME PAGE*/
function HomePage(props) {
    /*STATE VARIABLE TO HANDLE THE PAGE STATE*/
    /*THE PAGE CAN BE IN "SHOW" MODE, TO SHOW THE STUDYPLAN AND THE UNIVERISTY EXAMS, IN "EDIT" MODE, TO HANDLE THE STUDYPLAN MODIFICATION*/
    /*OR IT CAN BE IN "ADD" MODE, TO ADD A NEW STUDY PLAN*/
    let [mode, setMode] =useState("show");

    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar user={props.user} setUser={props.setUser} setExams={props.setExams} setPlan={props.setPlan} />
            </div>
            <Container>
                <Row>
                    <Col>
                        {/* LIST OF EXAMS */}
                        <ExamList exams={props.exams} mode={mode} plan={props.plan} setPlan={props.setPlan}/>
                    </Col>
                    {props.user!=="No user" &&
                        <Col>
                            {/* STUDY PLAN*/}
                            <StudyPlan plan={props.plan} user={props.user} setExams={props.setExams}  setLoading={props.setLoading} setPlan={props.setPlan} mode={mode} setMode={setMode}/>
                        </Col>}
                </Row>
            </Container>
        </div>
        
    );
}


/*LOGIN PAGE*/
function LoginPage(props) {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar user={props.user} setUser={props.setUser} setExams={props.setExams} setPlan={props.setPlan}/>
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <GreetingsOnLogin message={props.message}/>
            </div> 

            {/* LOGIN FORM */}
            <div>
                <LoginForm setUser={props.setUser} setPlan={props.setPlan} message={props.message} setMessage={props.setMessage} />
            </div>      
        </div>
    );
}

/*NO MATCH PAGE*/

function NoMatchPage(props) {
    return (
        <div>
            {/* NAVIGATION BAR */}
            <div>
                <NavigationBar user={props.user} setUser={props.setUser} setExams={props.setExams} setPlan={props.setPlan} />
            </div>

            {/* HOME PAGE MESSAGE */}
            <div>
                <GreetingsNoMatch />
            </div>      
        </div>
    );
}

export { HomePage, NoMatchPage, LoginPage }