function Exam(code, name, credits, maxStudents, currentStudents, incompatible, preparatory){
    this.code=code;
    this.name=name;
    this.credits=credits;
    this.maxStudents=maxStudents;
    this.currentStudents=currentStudents;
    this.incompatible=incompatible;
    this.preparatory=preparatory;
}

function ExamList(){
    this.list=[];
    this.addnewexam= (newexam) => {this.list.push(newexam);};
}

 function StudyPlan(studyPlan, type){
    this.studyPlan=studyPlan;
    this.type=type;
    this.getCredits= () =>{
        let i=0;
        let sum=0;
        for(i=0; i<this.studyPlan.length; i++){
            sum=sum+this.studyPlan[i].credits;
        }
        return sum;
      }
    this.findPreparatory = (preparatory) =>{
        let i=0;
        for(i=0; i<this.studyPlan.length; i++){
            if(this.studyPlan[i].code===preparatory)
                return true;
        }
        return false;
    }
    this.areIncompatible = (incompatible) =>{
        let i=0, j=0;
        for(i=0; i<this.studyPlan.length; i++){
            for(j=0; j<incompatible.length; j++)
                if(this.studyPlan[i].code===incompatible[j])
                    return true;
        }
        return false;
    }
    this.findIncompatible = (incompatible) =>{
        let i=0, j=0;
        let list=[];
        for(i=0; i<this.studyPlan.length; i++){
            for(j=0; j<incompatible.length; j++)
                if(this.studyPlan[i].code===incompatible[j])
                    list.push(incompatible[j])
        }
        return list;
    }

    this.findExam = (code)=>{
        let i=0;
        for(i=0; i<this.studyPlan.length; i++){
            if(this.studyPlan[i].code===code)
                return true;
        }
        return false;
    }
 }

function EmptyPlan(){
   return new StudyPlan([], "None");

}
export { StudyPlan, Exam, ExamList, EmptyPlan};