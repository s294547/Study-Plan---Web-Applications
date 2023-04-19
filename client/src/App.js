import './App.css';

/* IMPORTING REACT BOOTSTRAP COMPONENT */
import { useEffect, useState }       from "react";

/* IMPORT REACT ROUTE COMPONENT */
import { BrowserRouter }  from 'react-router-dom';
import { Routes }         from "react-router-dom";
import { Route }          from 'react-router-dom'; 

/* IMPORTING BOOTSTRAP CSS */
import 'bootstrap/dist/css/bootstrap.min.css';

/* IMPORTING CUSTOMIZED COMPONENT */
import { HomePage }         from "./components/Home";
import { NoMatchPage }      from "./components/Home";
import { LoginPage }     from './components/Home';
import { readExams, readStudyPlan , getUserInfo}        from "./utilities/API.js";

/*IMPORTING UTILITIES*/
import {StudyPlan} from "./utilities/exam.js"


/**
 * @brief Main function
 * 
 * @returns the main page of the website
 */
function App() {

  /* DATA AND STATES USED */
  let [plan, setPlan] = useState(new StudyPlan([], "None"));
  let [exams, setExams] = useState([]);
  let [user, setUser] =useState("No user");
  let [loading, setLoading] = useState(true);
  let [message, setMessage]=useState("");
  
  /*AT MOUNT PAGE TIME..*/
  useEffect(()=>{

    async function load() {

      /*LOADING THE LIST OF EXAMS*/
      try{
        const list = await readExams();
        setExams(list);
      } catch (error){
        console.log(error);
        alert(error); 
      }

      /*TRYING TO RETRIEVE USER INFOS, IF USER ALREADY LOGGED*/
      try{
        const student= await getUserInfo();
        let userObj={name: student.name, surname: student.surname, id: student.id};
        setUser(userObj);

        /*IF A USER IS ALREADY LOGGED, RETRIEVE HIS STUDY PLAN*/
        try{
          const newPlan = await readStudyPlan();
          setPlan(newPlan);
        }catch(error){
          console.log(error);
          alert(error);
        }

      } catch (error){

        //user is not logged, do nothing

      }

      setLoading(false);
    }
    load();
  }, []);

  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage setLoading={setLoading} exams={exams} setUser={setUser} setExams={setExams} plan={plan} setPlan={setPlan} user={user}/>} />         {/* HOME PAGE */}
        <Route path='/login' element={<LoginPage setLoading={setLoading} user={user} setUser={setUser} message={message} setMessage={setMessage} setExams={setExams} setPlan={setPlan}/>} /> {/* LOGIN PAGE */}
        <Route path='*' element={<NoMatchPage user={user} setUser={setUser} setExams={setExams} setPlan={setPlan}  />} />          {/* PAGE NOT FOUND */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
