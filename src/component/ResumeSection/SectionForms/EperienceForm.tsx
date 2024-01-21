import { ErrorBoundary } from "react-error-boundary";
import { useContext, useEffect, useState } from "react";
import { SectionContext, SectionDataContext } from "../../../SectionData/Context";
import { FormButton, FormInput } from "../../Forms/FormComponents";
import { MdCancel } from "react-icons/md"; 
import TextEditor from "../../TextEditor/TextEditor";
import { v4 as uuidv4 } from 'uuid';

const ExperienceForm = () => {
  const { sectionState, dispatch, activeSection } = useContext(SectionDataContext) as SectionContext;
  const experiences = sectionState['experience'];
  const [activeExperience, setActiveExperience] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    dispatch({type:"EXPERIENCE", data: {name:name, value:value, index:activeExperience}});
  }

  const handleTextArea= (content: any) => {
    const name = "responsibilities";
    const value = content;

    dispatch({type:"EXPERIENCE", data: {name:name, value:value, index:activeExperience}});
  }
  
  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch({type: "ADD_EXPERIENCE"});
  }

  const handleRemove = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.preventDefault();
    dispatch({type:"REMOVE_EXPERIENCE", data:{index:index}});
  }

  useEffect(()=>(
    setActiveExperience(experiences.length-1)
  ), [experiences]);
  
  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-6 mb-6">
            <h2 className="uppercase text-3xl font-bold" >
              {activeSection}
            </h2>
          <div className="flex flex-wrap gap-1 justify-center">
            { experiences.map((_:any, index:number)=>(
              <div key={uuidv4()} className={`flex item-center gap-2 border-1 rounded-lg border-solid p-2  ${activeExperience === index && 'bg-secondary text-white font-medium'}`}>
                <button className="bg-none boder-0 cursor-pointer" onClick={()=>setActiveExperience(index)}>
                  Experience {index+1} 
                </button>
                <button className="bg-none boder-0 cursor-pointer" onClick={(e)=>handleRemove(e, index) }>
                  <MdCancel />
                </button>
              </div>
            ))}
          </div>
        </div>
        {experiences[activeExperience] &&
          <form className="flex flex-col gap-7" key={uuidv4()}>
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 ">
              <FormInput type="text" label="Comapny" id="company" defaultValue={experiences[activeExperience]['company']} handleInputChange={ handleInputChange } />
              <FormInput type="text" label="Position" id="position" defaultValue={experiences[activeExperience]['position']} handleInputChange={ handleInputChange } />
              <FormInput type="month" label="Start Date" id="start_date" defaultValue={experiences[activeExperience]['start_date']} handleInputChange={ handleInputChange } />
              <FormInput type="month" label="End Date" id="end_date" defaultValue={experiences[activeExperience]['end_date']} handleInputChange={ handleInputChange } />
            </div>
            <TextEditor label="Responsibility" id="responsibilities" value={experiences[activeExperience]['responsibilities']} handleTextArea={ handleTextArea }/>
            <FormButton label="Add" id="addExperience" handleClick={ handleAdd } />
          </form>
        }
    </div>
    </ErrorBoundary>
  );
}

export default ExperienceForm;


  // const formFields: FormFieldProps["formFields"]  = [
  //   { label: "Company", type: "text", name: "company", id: "company", value: experience[0]['company'] },
  //   { label: "Date", type: "month", name: "date", id: "date", value: experience[0]['date'] },
  //   { label: "Position", type: "text", name: "position", id: "position", value: experience[0]['position'] },
  //   { label: "Responsibility", type: "text-area", name: "responsibilities", id: "responsibilities", value: experience[0]['responsibilities'] },
  // ];

  // const formAction: FormFieldProps["formAction"] = [
  //   {label:"Add", name:"addExperience" , id:"addExperience"},
  //   {label:"Save", name:"saveExperience" , id:"saveExperience"},
  // ]
  // <SectionFormTemplate formFields={formFields} formAction={formAction} formHandle={formHandle}/>