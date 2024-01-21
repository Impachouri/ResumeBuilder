
import { useContext } from 'react';
import  { SectionContext, SectionDataContext } from '../../SectionData/Context';
import DOMPurify from 'dompurify';
import { CiLink } from "react-icons/ci";
import { v4 as uuidv4 } from 'uuid';

const defaultCss = {
  sectionContainer: "flex flex-col",
  sectionMainHeading: "flex justify-center text-lg font-bold",
  sectionSubHeading: "text-lg font-semibold",
  sectionHeading: "text-lg font-bold",
  sectionDate: "flex font-semibold",
  link: "border-b border-black font-semibold",
  border: "w-full h-[0.9px] bg-black my-[5px]",
}


const sanitizedHtml = (htmlString: string) => {
  const sanitizedHtmlString = DOMPurify.sanitize(htmlString);
  return sanitizedHtmlString;
}

const changeDate = (date:string) => {
  const [year, month] = date.split('-');
  return `${month}/${year}`
}

export const PersonalInfo: React.FC = () => {
  const { sectionState } = useContext(SectionDataContext) as SectionContext;

    return (
    <div className={` items-center ${defaultCss.sectionContainer}`}>
      <h2 className={`text-xl ${defaultCss.sectionMainHeading}`}>{sectionState['personalInfo'].fname} {sectionState['personalInfo'].lname}</h2>
      <div className={`flex gap-3 ${defaultCss.sectionSubHeading}`}>
        <p className="">{sectionState['personalInfo'].phone }</p>
        <span>|</span>
        <p className="">{sectionState['personalInfo'].email }</p>
        {sectionState['personalInfo'].links.map((link:any, index:number) => 
          <div key={uuidv4()} className="flex gap-3">
            <span>|</span>
            <a href={link.link} className={`text-lg ${defaultCss.link}`} target="_blank">{link.linkName}</a>
          </div>
        )}
      </div> 
      <div className={defaultCss.border}></div>
      <p className="">{sectionState['personalInfo'].profileSummary }</p>
    </div>
  )
  }
  
  export const Experience: React.FC = () =>{
    const { sectionState } = useContext(SectionDataContext) as SectionContext;

    return (
      <div className={defaultCss.sectionContainer}>
          <h4 className={defaultCss.sectionMainHeading}>PROFESSIONAL EXPERIENCE</h4>
          <div className={defaultCss.border}></div>
          {sectionState['experience'].map((job, index) => (
            <div key={uuidv4()}>
              <div className="flex justify-between">
                <h4 className={defaultCss.sectionSubHeading}>
                  {job.company}
                </h4>
                <div className={defaultCss.sectionDate}>
                  <h4 >{changeDate(job.start_date)}</h4>-<h4 >{changeDate(job.end_date)}</h4>
                </div>
              </div>
              <h4 className={defaultCss.sectionHeading}>
                {job.position}
              </h4>
              <div className="pl-[15px]" dangerouslySetInnerHTML={{ __html: sanitizedHtml(job.responsibilities) }}>
              </div>
            </div>
          ))}
      </div>
    )
  }
  
  export const Projects:React.FC = () =>{
    const { sectionState } = useContext(SectionDataContext) as SectionContext;
    return (
      <div className={defaultCss.sectionContainer}>
        <h4 className={defaultCss.sectionMainHeading}>PROJECTS</h4>
        <div className={defaultCss.border}></div>
        {sectionState['projects'].map((project:any, index:number) => (
          <div key={uuidv4()}>
            <div className="flex justify-between">
                {project.liveLink ? (
                  <div className="flex flex-row gap-1 place-items-center">
                    <a href={project.liveLink} target="_blank" className={defaultCss.link}>
                      <h4 className={defaultCss.sectionHeading}>{project.name}</h4>
                    </a>
                    <CiLink className="-rotate-45 text-xl"/>
                  </div>
                ) : (
                  <h4 className={defaultCss.sectionHeading}>{project.name}</h4>
                )}
              <div className={defaultCss.sectionDate}>
                  <h4 >{changeDate(project.start_date)}</h4>-<h4>{changeDate(project.end_date)}</h4>
                </div>
            </div>
            <div className="pl-[15px]" dangerouslySetInnerHTML={{ __html: sanitizedHtml(project.description) }}></div>
            { project.links 
              &&
              <div className="flex gap-2">
                {project.links.map((link:any, index:number)=>
                  <a key={index} href={link.link} target="_blank" className={defaultCss.link}>{link.linkName}</a>
                )} 
              </div>
            }
            <p>Technologies Used: {project.technologies}</p>
          </div>
        ))}
      </div>
    )
  }
  
  export const Education: React.FC = () => {
    const { sectionState } = useContext(SectionDataContext) as SectionContext;

    return (
      <div className={defaultCss.sectionContainer}>
          <h4 className={defaultCss.sectionMainHeading}>EDUCATION</h4>
          <div className={defaultCss.border}></div>
          {sectionState['education'].map((edu, index) => (
            <div key={uuidv4()} className="edu">
              <div className="flex justify-between">
                <h4 className={defaultCss.sectionHeading}>
                  {edu.institution}
                  </h4>
                <div className={defaultCss.sectionDate}>
                  <h4>{changeDate(edu.start_date)}</h4>-<h4>{changeDate(edu.end_date)}</h4>
                </div>
              </div>
              <p>{edu.degree} - {edu.grade}</p>
            </div>
          ))}
        </div>
    )
  }
  
  export const TechnicalSkills = () => {
    const { sectionState } = useContext(SectionDataContext) as SectionContext;

    return (
      <div className={defaultCss.sectionContainer}>
          <h4 className={defaultCss.sectionMainHeading}>TECHNICAL SKILLS</h4>
          <div className={defaultCss.border}></div>
          <ul className="pl-[15px]">
            {sectionState['skills'].split("\n").map((responsibility, idx) => (
              <li key={uuidv4()}>{responsibility}</li>
            ))}
          </ul>
        </div>
    )
  }
  
  export const Achievements = ()  => {
    const { sectionState } = useContext(SectionDataContext) as SectionContext;

    return (
      <div className={defaultCss.sectionContainer}>
        <h4 className={defaultCss.sectionMainHeading}>ACHIEVEMENTS</h4>
        <div className={defaultCss.border}></div>
        <p>{sectionState['achievements']}</p>
      </div>
    )
  }