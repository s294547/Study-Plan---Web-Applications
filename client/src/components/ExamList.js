/* IMPORTING CUSTOMIZED COMPONENTS */
import ExamRow from '../utilities/ExamRow';

/* IMPORTING BOOTSTRAP COMPONENTS */
import { Table } from 'react-bootstrap'


function ExamList(props) {

  /* LIST OF ALL THE EXAMS */
  return (
    <>
      <Table  style={{ marginRight:40, marginTop:40}} hover striped className="container">
        <thead>
          <tr align="center" className="row justify-content-md-center"><th style={{color:'blue'}}>List of all exams</th></tr>
        </thead>
        <tbody>
          {props.exams.map((exam) => (<ExamRow exam={exam} mode={props.mode} plan={props.plan} key={exam.code} setPlan={props.setPlan} />))}
        </tbody>
      </Table>
    </>
  );
}

export default ExamList;