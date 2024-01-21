import { ErrorBoundary } from "react-error-boundary";
import { useContext, useEffect, useState } from "react";
import { MdCancel } from "react-icons/md"; 
import { SectionContext, SectionDataContext } from "../../../SectionData/Context";
import { FormInput, FormButton } from "../../Forms/FormComponents";
import FormLink from "../../Forms/FormLink";
import TextEditor from "../../TextEditor/TextEditor";
import { v4 as uuidv4 } from 'uuid';

const ProjectForm = () => {
  const { sectionState, dispatch, activeSection } = useContext(SectionDataContext) as SectionContext;
  const projects = sectionState['projects'];
  const [activeProject, setActiveProject] = useState<number>(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    dispatch({type:"PROJECTS", data: {name:name, value:value, index:activeProject}});
  }

  const handleTextArea= (content: any) => {
    dispatch({type:"PROJECTS", data: {name:"description", value:content, index:activeProject}});
  }

  const handleAdd = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    dispatch({type: "ADD_PROJECT"});
  }

  const handleRemove = ( e: React.MouseEvent<HTMLButtonElement, MouseEvent>, index: number) => {
    e.preventDefault();
    dispatch({type:"REMOVE_PROJECT", data:{index:index}});
  }

  useEffect(()=>(
    console.log(activeProject)
  ), [activeProject]);

  return (
    <ErrorBoundary
      fallback={<p>There was an error while submitting the form</p>}
    >
      <div className="flex flex-col">
        <div className="flex flex-wrap gap-6 mb-6">
          <h2 className="uppercase text-3xl font-bold">
            {activeSection}
          </h2>
          <div className="flex flex-wrap gap-1 justify-center">
            { projects.map((_, index:number)=>(
              <div key={uuidv4()} className={`flex item-center gap-2 border-1 rounded-lg border-solid p-2  ${activeProject === index && 'bg-secondary text-white font-medium'}`}>
              <button className="bg-none boder-0 cursor-pointer"  onClick={()=>setActiveProject(index)}>
                Project {index+1} 
              </button>
              <button className="bg-none boder-0 cursor-pointer" onClick={(e)=>handleRemove(e, index) }>
                <MdCancel />
              </button>
            </div>
            ))}
          </div>
        </div>
        {projects[activeProject] && 
          <form className="flex flex-col gap-7">
            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 ">
              <FormInput type="text" label="Name" id="name" defaultValue={projects[activeProject]['name']} handleInputChange={ handleInputChange } />
              <FormInput type="text" label="Live Link" id="liveLink" defaultValue={projects[activeProject]['liveLink']} handleInputChange={ handleInputChange } />
              <FormInput type="month" label="Start Date" id="start_date" defaultValue={projects[activeProject]['start_date']} handleInputChange={ handleInputChange } />
              <FormInput type="month" label="End Date" id="end_date" defaultValue={projects[activeProject]['end_date']} handleInputChange={ handleInputChange } />
              <FormLink activeItem={activeProject}/>
            </div>
            <TextEditor label="Description" id="description" value={projects[activeProject]['description']} handleTextArea={ handleTextArea }/>
            <FormInput type="text" label="Technology" id="technologies" defaultValue={projects[activeProject]['technologies']} handleInputChange={ handleInputChange } />
            <FormButton label="Add" id="addProject" handleClick={ handleAdd } />
          </form>
        }
    </div>
    </ErrorBoundary>
  );
}
export default ProjectForm;


  // const formFields: FormFieldProps["formFields"]  = [
  //   { label: "Name", type: "text", name: "name", id: "name", value: projects[0]['name'] },
  //   { label: "Date", type: "month", name: "date", id: "date", value: projects[0]['date'] },
  //   { label: "Description", type: "text-area", name: "description", id: "description", value: projects[0]['description'] },
  //   { label: "Technology", type: "text", name: "technologies", id: "technologies", value: projects[0]['technologies'] },
  // ];

  // const formAction: FormFieldProps["formAction"] = [
  //   {label:"Add", name:"addProject" , id:"addProject"},
  //   {label:"Save", name:"saveProject" , id:"saveProject"},
  // ]