/* IMPORTING CUSTOMIZED COMPONENTS */
import StudyPlanRow from '../utilities/StudyPlanRow';

/* IMPORTING UTILITIES */
import  {EmptyPlan} from "../utilities/exam";

/* IMPORTING BOOTSTRAP COMPONENTS */
import { Table } from 'react-bootstrap'
import { Button } from 'react-bootstrap';
import { useState }       from "react";

/*IMPORTING APIs*/
import {apiAddExam, apiEditType, apiRemoveStudyPlan, readExams, readStudyPlan} from '../utilities/API.js'

/*RENDERS CORRECTLY THE STUDY PLAN TABLE HEADER*/
function RenderTableHeader(props){

    /*STATE VARIBLE TO HANDLE THE CHOSEN STUDYPLAN TYPE IN EDIT MODE*/
    let [chosenType, setChosenType]= useState(false);

    /*FUNCTION TO RETRIEVE THE NUMBER OF CREDITS OF A STUDYPLAN*/
    let getCredits= (studyPlan) =>{
      let i=0;
      let sum=0;
      for(i=0; i<studyPlan.length; i++){
          sum=sum+studyPlan[i].credits;
      }
      return sum;
    }

    
    /*FUNCTION TO SAVE THE MODIFICATIONS MADE IN A STUDY PLAN*/
    let saveStudyPlan = async () =>{
      /*IF THE AMOUNT OF CREDITS  OF THE SELECTED EXAMS IS ENOUGH WE CAN SAVE THE STUDYPLAN*/
      if((getCredits(props.plan.studyPlan)>=20 && props.plan.type==="Part Time") || (getCredits(props.plan.studyPlan)>=60 && props.plan.type==="Full Time")){
          try{
            props.setLoading(true);

            /*CLEANING THE STUDYPLAN*/
            await apiRemoveStudyPlan();

            /*RESTORING THE STUDYPLAN TYPE*/
            await apiEditType(props.plan.type);
            
            /*ADDING THE EXAMS TO THE STUDYPLAN*/
            let i=0;
            for(i=0; i<props.plan.studyPlan.length; i++){
                await apiAddExam(props.plan.studyPlan[i].code)
            }
            /* JUST TO BE ALIGNED WITH OTHER POSSIBLE DEVICES..*/
            let newPlan=await readStudyPlan();
            props.setPlan(newPlan);

            /*UPDATING THE NUMBER OF STUDENTS FOR EACH EXAM BY REFRESHING THE EXAM LIST*/
            /* ALSO TO BE ALIGNED WITH OTHER POSSIBLE DEVICES..*/
            const exlist = await readExams();
            props.setExams(exlist);

            /*GOING BACK TO THE "SHOW" MODE*/
            props.setMode("show");

            /*CLEARING STATE VARIABLES*/
            setChosenType(false);
            props.setLoading(false);
          } catch (error){
            /*HANDLING APIs ERRORS*/
            console.log(error);
            alert(error); 
          }
      }
      else{
          alert('You should reach the right amount of credits before saving the Study Plan');
      }
    }
 
    /*FUNCTION TO DELETE A STUDYPLAN*/
    let deleteStudyPlan = async () =>{
      try{
        props.setLoading(true);
        /*CLEANING THE STUDYPLAN*/
        await apiRemoveStudyPlan();

        /*RESTORING THE STUDYPLAN TYPE*/
        await apiEditType("None");

        /* JUST TO BE ALIGNED WITH OTHER POSSIBLE DEVICES..*/
        let newPlan=await readStudyPlan();
        props.setPlan(newPlan);

        /*UPDATING THE NUMBER OF STUDENTS FOR EACH EXAM BY REFRESHING THE EXAM LIST*/
        /* ALSO TO BE ALIGNED WITH OTHER POSSIBLE DEVICES..*/
        const exlist = await readExams();
        props.setExams(exlist);

        /*GOING BACK TO THE "SHOW" MODE*/
        props.setMode("show");

        /*CLEARING STATE VARIABLES*/
        setChosenType(false);
        props.setLoading(false);

      }catch(error){

        /*HANDLING APIs ERRORS*/
        console.log(error);
        alert(error); 
      }
    }
   
      /*FUNCTION TO GO BACK IN "SHOW" MODE, WITHOUT MAKING ANY MODIFICATION*/    
      let cancelModifications =  async () =>{
      try{
        props.setLoading(true);

        /*RESTORING THE OLD STUDYPLAN*/
        const oldPlan= await readStudyPlan();

        /*BACK TO "SHOW" MODE*/
        props.setMode("show");
        
        /*CLEARING AND RESTORING STATE VARIABLES*/
        setChosenType(false);
        props.setPlan(oldPlan);

        /*UPDATING THE NUMBER OF STUDENTS FOR EACH EXAM BY REFRESHING THE EXAM LIST*/
        /* ALSO TO BE ALIGNED WITH OTHER POSSIBLE DEVICES OR USERS..*/
        const exlist = await readExams();
        props.setExams(exlist);
        props.setLoading(false);

      } catch (error){
        
        /*HANDLING APIs ERRORS*/
        console.log(error);
        alert(error); 
      }
    }

  /*FUNCTION TO UPDATE THE STUDY PLAN TYPE (IT CAN BE CHANGED JUST IN THE CREATING PHASE)*/
    let saveType= (type) =>{

      /*CREATING AN EMPTY STUDYPLAN*/
      let newPlan= new EmptyPlan();
      newPlan.type=type;


      /*SETTING THE STUDYPLAN AS EN EMPTY PLAN*/
      props.setPlan(newPlan);

      setChosenType(true);
    }

  /*TABLE HEADER FOR SHOW MODE*/
  if(props.mode==="show"){
    if(props.plan.type!=="None")
      /*WHEN A STUYPLAN IS FOUND..*/

      return(<tr align="center" className="row"><th className="col-12" style={{color:'blue'}}>Study Plan</th>

            {/*TOTAL CREDITS*/}
            <th className="col-4">{" Total Credits : "+getCredits(props.plan.studyPlan)}</th>

            {/*STUDYPLAN TYPE*/}
            <th className="col-4">{props.plan.type}</th>

            {/*EDIT BUTTON*/}
            <th className="col-4"><Button variant='primary' style={{cursor:'pointer'}} onClick={()=>(props.setMode("edit"))}> Edit </Button></th></tr>
        );
    else
      /*WHEN THERE IS NO STUDYPLAN..*/
      return(<tr align="center" className="row"><th className="col-12" style={{color:'blue'}}>Study Plan</th>

            <th align="center" className="col-12"> No Study Plan Found! </th>

            {/*BUTTON FOR STUDYPLAN CREATION*/}
            <th align="center" className="col-12"><Button variant='primary' style={{cursor:'pointer'}} onClick={()=>(props.setMode("add"))}> Add a Study Plan </Button></th>
           </tr>
          );
  }

  /*TABLE HEADER FOR EDIT MODE*/
  if(props.mode==="edit"){
    return(<tr align="center" className="row"><th className="col-12" style={{color:'blue'}}> Edit Study Plan</th>

            {/*TOTAL CREDITS*/}
            <th className="col-6">{" Total Credits : "+getCredits(props.plan.studyPlan)}</th>

            {/*STUDY PLAN TYPE*/}
            <th className="col-6">{props.plan.type}</th>

            {/*STUDY PLAN MAXIMUM AND MINIMUM NUMBER OF CREDITS*/}
            <th className="col-6">{"Minimum number of credits: "+ (props.plan.type==="Full Time"?60:20)}</th>
            <th className="col-6">{"Maximum number of credits: "+ (props.plan.type==="Full Time"?80:40)}</th>

            {/*CANCEL BUTTON*/}
            <th className="col-4"><Button variant='secondary' style={{cursor:'pointer'}} onClick={()=>(cancelModifications())}> Cancel </Button></th>
            
            {/*SAVE BUTTON*/}
            <th className="col-4"><Button variant='primary' style={{cursor:'pointer'}} onClick={()=>(saveStudyPlan())}> Save </Button></th>
            
            {/*DELETE BUTTON*/}
            <th className="col-4"><Button variant='danger' style={{cursor:'pointer'}} onClick={()=>(deleteStudyPlan())}> Delete </Button></th> 
            </tr>
        );
  }

  /*TABLE HEADER FOR ADD MODE*/
  if(props.mode==="add"){
    return(<tr align="center" className="row"><th className="col-12" style={{color:'blue'}}> Create a Study Plan</th>
            {/*TOTAL CREDITS*/}
            <th className="col-6">{" Total Credits : "+getCredits(props.plan.studyPlan)}</th>

            {/*STUDY PLAN TYPE CHOSEN*/}
            <th className="col-6">{chosenType===true?props.plan.type:""}</th>

            {/*STUDY PLAN MAXIMUM AND MINIMUM NUMBER OF CREDITS*/}
            <th className="col-6">{"Minimum number of credits: "+ (props.plan.type==="Full Time"?60:20)}</th>
            <th className="col-6">{"Maximum number of credits: "+ (props.plan.type==="Full Time"?80:40)}</th>

            {/*BUTTONS TO SELECT THE NEW STUDY PLAN TYPE*/}
            {chosenType===false && <th className="col-6"><Button variant='primary' style={{cursor:'pointer'}} onClick={()=>(saveType("Full Time"))}> Full Time </Button></th>}
            {chosenType===false && <th className="col-6"><Button variant='primary' style={{cursor:'pointer'}} onClick={()=>(saveType("Part Time"))}> Part Time </Button></th>}
            
            {/*BUTTONS TO SAVE THE NEW STUDY PLAN OR ABORT MODIFICATIONS*/}
            {chosenType && <th className="col-6"><Button variant='primary' style={{cursor:'pointer'}} onClick={()=>(saveStudyPlan())}> Create </Button></th>}
            {chosenType && <th className="col-6"><Button variant='secondary' style={{cursor:'pointer'}} onClick={()=>(deleteStudyPlan())}> Cancel </Button></th>}
            </tr>
        );
  }



}

function StudyPlan(props) {
  /* LIST OF ALL THE EXAMS */
  return (
    <>
      <Table style={{marginLeft:40, marginTop:40}} striped hover className="container">
        <thead>
          <RenderTableHeader plan={props.plan} mode={props.mode} setMode={props.setMode} setPlan={props.setPlan} exams={props.exams} user={props.user} setExams={props.setExams} setLoading={props.setLoading}/>
        </thead>
        <tbody>
          {props.plan.studyPlan.map((exam) => (<StudyPlanRow exam={exam} key={exam.code} plan={props.plan} setPlan={props.setPlan} mode={props.mode} />))}
        </tbody>
      </Table>
    </>
  );
}

export default StudyPlan;