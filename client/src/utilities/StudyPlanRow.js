/* IMPORTING BOOTSTRAP COMPONENTS */
import { XCircleFill } from 'react-bootstrap-icons';

/*IMPORTING CUSTOMIZED COMPONENTS*/
import {StudyPlan}  from "../utilities/exam.js";

function StudyPlanRow(props) {

    /*FUNCTION TO REMOVE AN EXAM FROM THE STUDY PLAN*/
    let deleteExam = (code) => {

        /*CHECKING IF THIS EXAM IS PREPARATORY FOR ANOTHER EXAM IN THE STUDYPLAN*/
        for(let i=0; i<props.plan.studyPlan.length; i++){
            if(props.plan.studyPlan[i].preparatory[0]===code){                
                alert("This exam can't be removed, it is preparatory for the exam "+props.plan.studyPlan[i].name+" with code "+props.plan.studyPlan[i].preparatory);
                return;
            }
        }
        let newPlan=new StudyPlan();
        newPlan.studyPlan=props.plan.studyPlan.filter((exam) => (exam.code!==code));
        newPlan.type=props.plan.type;

        /*SETTING THE NEW STUDY PLAN*/
        props.setPlan(newPlan);
    }

    return(
        <tr align="center" className="row">
            {/*DELETE BUTTON*/}
            {props.mode==="edit" &&
                <td className="col-1">
                <XCircleFill style={{cursor:'pointer', color:"red"}} onClick={()=>(deleteExam(props.exam.code))}/>
                </td>}
            {/* EXAM CODE */}
            <td className={props.mode==="show"?"col-4":"col-3"}>
                {props.exam.code}
            </td>

            {/* EXAM NAME */}
            <td className="col-4">
                {props.exam.name}
            </td>

            {/* CREDITS */}
            <td className="col-4">
                {props.exam.credits}
            </td>
        </tr>
    );
}

export default StudyPlanRow;