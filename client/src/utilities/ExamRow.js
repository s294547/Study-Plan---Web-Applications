/* IMPORTING BOOTSTRAP COMPONENTS */
import { ZoomIn, ZoomOut, PlusCircleFill,ExclamationCircleFill }     from 'react-bootstrap-icons';
import { useState }         from "react";


/*IMPORTING CUSTOMIZED COMPONENTS*/
import {StudyPlan}  from "../utilities/exam.js";

/*PREPARATORY EXAM*/
function Preparatory(props){
    /*FUNCTION TO PRINT THE PREPARATORY EXAM*/
    let printPreparatory= (preparatory)=>{
        if(preparatory[0] === undefined)
            return "No preparatory exams required";
        else
            return "The exam with code "+preparatory[0]+" is required";
    }    

    return(
        
        <td className="col-6">
                {printPreparatory(props.preparatory)}
        </td>
    );
}

/*INCOMPATIBLE EXAMS*/
function Incompatible(props){

    /*FUNCTION TO RETRIEVE THE INCOMPATIBLE EXAMS WITH A GIVEN EXAM WITH A CERTAIN EXAMCODE*/
    let findIncompatible= (incompatibleList)=>{

        let i=0;
        let list="List of Incompatible Exams: ";
        if(incompatibleList.length===0)
            return "No incompatible exams";
        for(i=0; i<incompatibleList.length; i++){
            if(i)
                list+=", "
            list+=incompatibleList[i];
        }
        return list;
    }

    return(
        <td className="col-6">
                {findIncompatible(props.incompatible)}
        </td>
    );
}

function ExamRow(props) {

    /*STATE VARIABLE TO REMEMBER IF AN EXAM IS IN THE EXPANDED STATE*/ 
    let [expand, setExpand] = useState(false);

    /*FUNCTION TO RETRIEVE THE MAXIMUM NUMBER OF ENROLLED STUDENTS*/
    let printMaxEnrolled= (maxEnrolled)=>{
        if(maxEnrolled)
            return "Up to " + maxEnrolled +" enrolled students";
        else
            return "There is no maximum number of enrolled students";
    }

    /*FUNCTION TO CHECK IF WE CAN ADD THE EXAM TO THE STUDY PLAN*/
    let checkExamValidity= () =>{

        /*MESSAGES TO BE SHOWN UNDER A CERTAIN EXAM ROW, EXPLAINING WHY THE EXAM CANNOT BE ADDED TO THE STUDY PLAN*/
        let messages=[];


        /*IF THE EXAM IS IN THE STUDY PLAN, WE CANNOT ADD IT*/
        if(props.plan.findExam(props.exam.code)){
            messages.push("The exam is already in the study plan");
            return messages;
        }

        /*IF THE CURRENT AMOUNT OF CREDITS IS TOO HIGH TO ADD THE EXAM, WE CANNOT ADD IT */        
        if((props.plan.getCredits()+props.exam.credits)> (props.plan.type==="Full Time"?80:40))
            messages.push("The current amount of credit is too high to add this exam")

        /*IF THE EXAM IS INCOMPATIBLE WITH SOME EXAMS IN THE STUDY PLAN, WE CANNOT ADD IT */       
        if(props.exam.incompatible.length && props.plan.areIncompatible(props.exam.incompatible)){
            let list=props.plan.findIncompatible(props.exam.incompatible);
            let i=0;
            let mess="This exam is incompatible with the following exams in the study plan: "
            for(i=0; i<list.length; i++){
                if(i)
                    mess+=", "
                mess+=list[i];
            }
            messages.push(mess);
        }

        /*IF THE EXAM NEEDS A PREPARATORY EXAM THAT IS NOT IN THE STUDY PLAN, WE CANNOT ADD IT */   
        if(props.exam.preparatory[0]!== undefined && !props.plan.findPreparatory(props.exam.preparatory[0]))
            messages.push("You need to add the exam with code "+props.exam.preparatory[0]+" first" );

        /*IF THE EXAM COURSE IS FULLY BOOKED, WE CANNOT ADD IT */  
        if(props.exam.currentStudents===props.exam.maxStudents && props.exam.maxStudents){
            messages.push("The course is fully booked" );
        }

        return messages;
    } 

    /*FUNCTION TO ADD TEMPORARILY AN EXAM TO THE STUDY PLAN*/
    let addExam = () => {

        let newPlan=new StudyPlan();
        newPlan.studyPlan=[...props.plan.studyPlan];
        newPlan.type=props.plan.type;
        newPlan.studyPlan.push(props.exam);

        /*UPDATING THE STUDY PLAN*/
        props.setPlan(newPlan);
    }

    /*MARKING THE ROW WITH A DIFFERENT COLOR IF THE EXAM CANNOT BE ADDED
    let className="row justify-content-md-center";
    if(checkExamValidity().length!==0)
        className=className+" bg-secondary";
    I DINT'T LIKE THE WAY THE TABLE LOOKED, SO TO MARK THE FACT THAT AN EXAM CANNOT BE ADDED I USED AN ICON AT THE BEGINNING OF THE ROW*/

        
    /*EXAM ROW*/
    return(
        <tr align="center" className={"row justify-content-md-center"} >

            {/* ICON FOR EXPANDING THE EXAM AND FOR ADDING AN EXAM IN EDIT MODE*/}
            <td className="col">

                {/*BUTTON TO EXPAND/RESTRICT THE EXAM VIEW, WHEN WE ARE IN SHOW MODE*/}
                {expand===false && props.mode==="show" && <ZoomIn  style={{cursor:'pointer'}} onClick={()=>(setExpand(!expand))}/>}
                {expand===true && props.mode==="show" && <ZoomOut style={{cursor:'pointer'}} onClick={()=>(setExpand(!expand))}/>}

                {/*BUTTON TO ADD THE EXAM TO THE STUDY PLAN, WHEN WE ARE IN EDIT MODE AND THE OPERATION IS POSSIBLE*/}
                {props.mode!=="show" && checkExamValidity().length===0 && 
                <PlusCircleFill style={{cursor:'pointer', color:"green"}} onClick={()=>(addExam(props.exam.code))}/>}

                {/*ICON TO SHOW IT IS NOT POSSIBLE TO ADD THE EXAM TO THE STUDY PLAN, WHEN WE ARE IN EDIT MODE*/}
                {props.mode!=="show" && checkExamValidity().length!==0 && 
                <ExclamationCircleFill style={{color:"red"}} />}
            </td>

            {/* EXAM CODE */}
            <td className="col">
                {props.exam.code}
            </td>

            {/* EXAM NAME */}
            <td className="col-3">
                {props.exam.name}
            </td>

            {/* CREDITS */}
            <td className="col">
                {props.exam.credits}
            </td>

            {/* MAXIMUM NUMBER OF STUDENTS */}
            <td className="col-3">
                {printMaxEnrolled(props.exam.maxStudents)}
            </td>

            {/* NUMBER OF ENROLLED STUDENTS */}
            <td className="col-3">
                {props.exam.currentStudents+ " enrolled students"}
            </td>

            {/*PREPARATORY EXAM, WHEN THE EXAM IS EXPANDED*/}
            {expand && <Preparatory preparatory={props.exam.preparatory} />}

            {/*INCOMPATIBLE EXAMS, WHEN THE EXAM IS EXPANDED*/}
            {expand && <Incompatible incompatible={props.exam.incompatible} />}

            {/*MESSAGES SHOWN UNDER THE EXAM ROW, WHEN WE ARE IN "EDIT" MODE AND THE EXAM CANNOT BE ADDED TO THE STUDY PLAN */}
            {props.mode!=="show" && checkExamValidity().length!==0 && 
            checkExamValidity().map((message) => (<td className="col-12" key={message} style={{color:"red"}}>{message}</td>))
            }
        </tr>
    );
}

export default ExamRow;