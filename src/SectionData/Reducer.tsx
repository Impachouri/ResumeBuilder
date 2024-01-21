import { Reducer, useReducer } from "react";
import { SectionDataType, defaultState } from "./DefaultState";


export type SectionDataAction =
  | { type: "LINK_INPUT", data: {activeSection: keyof SectionDataType, activeItem?: number, name:string, value:string, index:number} }
  | { type: "ADD_LINK", data:{activeSection: keyof SectionDataType, activeItem?: number} }
  | { type: "REMOVE_LINK", data: {activeSection: keyof SectionDataType, activeItem?: number, index: number} }
  | { type: "PERSONAL_INFO", data: {name:string, value:string, index?:number | undefined}}
  | { type: "EXPERIENCE", data: {name:string, value:string, index: number} }
  | { type: "ADD_EXPERIENCE" }
  | { type: "REMOVE_EXPERIENCE", data: { index: number } }
  | { type: "PROJECTS", data: {name:string, value:string, index: number} }
  | { type: "ADD_PROJECT" }
  | { type: "REMOVE_PROJECT", data: { index: number } }
  | { type: "EDUCATION", data: {name:string, value:string, index: number} }
  | { type: "ADD_EDUCATION" }
  | { type: "REMOVE_EDUCATION", data: { index: number } }
  | { type: "SKILLS", data: {name:string, value:string} }
  | { type: "ACHIEVEMENTS", data: {name:string, value:string} };

export const SectionDataReducers: Reducer<any, SectionDataAction> = (
  state,
  action
) => {

  const link = {
    linkName: "",
    link: ""
  }

  const exp = {
    company: "",
    links: [],
    start_date: "",
    end_date: "",
    position: "",
    responsibilities: "",
  };

  const pro = {
    name: "",
    liveLink: "",
    links: [],
    start_date: "",
    end_date: "",
    description: "",
    technologies: "",
  };

  const edu = {
    institution: "",
    links: [],
    start_date: "",
    end_date: "",
    degree: "",
    grade: "",
  };

  switch (action.type) {

    
    case "LINK_INPUT":
      if(action.data.activeItem === -1){
        return {
          ...state,
          [action.data.activeSection]:{
            ...state[action.data.activeSection],
            links: state[action.data.activeSection].links.map((link: link, index: number)=>
            index === action.data.index 
            ? {...link, [action.data.name]: action.data.value}
            : link
            )
          }
        }
      }
      return {
        ...state,
        [action.data.activeSection]: state[action.data.activeSection].map((item:any, index:number)=>(
          index === action.data.activeItem
          ? {
            ...item,
            links: item.links.map((link:any, key:number)=>(
              key === action.data.index 
              ? {...link, [action.data.name]:action.data.value} 
              : link
              ))
            } : item
            )) 
          }
          
    case "ADD_LINK":
      if(action.data.activeItem === -1){
        return {
          ...state,
          [action.data.activeSection]:{
            ...state[action.data.activeSection],
            links:[
              ...state[action.data.activeSection].links,
              link
            ]
          }
        }
      }
      return {
        ...state,
        [action.data.activeSection]: state[action.data.activeSection].map((item:any, index:number)=>(
          index === action.data.activeItem
          ? {
            ...item,
            links: [
              ...item.links,
              link
            ]
          }
          :
          item
          ))
      }

    case "REMOVE_LINK":
      if(action.data.activeItem === -1){
        const linkAfterRemove = state[action.data.activeSection].links.filter((_link: link, index: number) => 
        index != action.data.index
        )
        return {
          ...state,
          [action.data.activeSection]: {
            ...state[action.data.activeSection],
            links: linkAfterRemove
          }
        }
      }
      const linkAfterRemove = state[action.data.activeSection].map((item:any, i:number)=>(
        i === action.data.activeItem
        ? {
          ...item,
          links: item.links.filter((_link: any, j:number)=>
          j != action.data.index
          )
        }
        : item
        ))
        return {
          ...state,
          [action.data.activeSection]: linkAfterRemove
        };
    case "PERSONAL_INFO":
      return {
        ...state,
        personalInfo: {
          ...state.personalInfo,
          [action.data.name]: action.data.value,
        },
      };

    case "EXPERIENCE":
      return {
        ...state,
        experience: state.experience.map((exp: any, index: number)=>
          index === action.data.index
            ? {...exp, [action.data.name]:action.data.value}
            : exp
        )
      };

    case "ADD_EXPERIENCE":
      return {
        ...state,
        experience:[
          ...state.experience,
          exp,
        ]
      };

    case "REMOVE_EXPERIENCE":
      const newExperience = state.experience.filter((_exp: any, index: number)=>
        index !== action.data.index
      )
      const experienceAfterRemove = newExperience.length === 0 ? [exp] : newExperience
      return {
        ...state,
        experience: experienceAfterRemove
      }

    case "PROJECTS":
      return {
        ...state,
        projects: state.projects.map((project:any, index:number) =>
        index === action.data.index
          ? { ...project, [action.data.name]: action.data.value }
          : project
      )
      }

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [
          ...state.projects,
          pro
        ]
      }

    case "REMOVE_PROJECT":
      const newProjects = state.projects.filter((_pro: any, index: number)=>
        index !== action.data.index
      )
      const projectAfterRemove = newProjects.length === 0 ? [pro] : newProjects;

      return {
        ...state,
        projects: projectAfterRemove
      }

    case "EDUCATION":
      return {
        ...state,
        education: state.education.map((edu: any, index: number)=>
          index === action.data.index 
          ? {...edu, [action.data.name]:action.data.value}
          : edu
        )
      }

    case "ADD_EDUCATION":
      return {
        ...state,
        education: [
          ...state.education,
          edu
        ]
      }

    case "REMOVE_EDUCATION":
      const newEducations = state.education.filter((_edu: any, index: number)=>
        index !== action.data.index
      )
      const educationAfterRemove = newEducations.length === 0 ? [edu] : newEducations; 
      return {
        ...state,
        education: educationAfterRemove
      }

    case "SKILLS":
      return {
        ...state,
        ['skills']: action.data.value,
      };

    case "ACHIEVEMENTS":
      return {
        ...state,
        ['achievements']: action.data.value,
      };
    default:
      return state;
  }
};

export const useSectionReducers = () => {
    const [sectionState, dispatch] = useReducer(SectionDataReducers, defaultState);
    return ({sectionState, dispatch});
}





// import { Reducer, useReducer } from "react";

// export type SectionDataType = {

//   personalInfo: Array<{
//     name: string;
//     phone: string;
//     email: string;
//     linkedIn: string;
//     profileSummary: string;
//   }>;

//   experience: Array<{
//     company: string;
//     date: string;
//     position: string;
//     responsibilities: string;
//   }>;

//   projects: Array<{
//     name: string;
//     date: string;
//     description: string;
//     technologies: string;
//   }>;

//   education: Array<{
//     institution: string;
//     date: string;
//     degree: string;
//     grade: string;
//   }>;

//   skills: Array<string>;

//   achievements: Array<string>;
// };

// export type SectionDataAction =
//   | { type : "PERSONAL_INFO", data: {name:string, value:string}}
//   | { type: "EXPERIENCE", data: {name:string, value:string} }
//   | { type: "PROJECTS", data: {name:string, value:string} }
//   | { type: "EDUCATION", data: {name:string, value:string} }
//   | { type: "SKILLS", data: {name:string, value:string} }
//   | { type: "ACHIEVEMENTS", data: {name:string, value:string} };

// export const SectionDataReducers: Reducer<any, SectionDataAction> = (
//   state,
//   action
// ) => {
//   switch (action.type) {
//     case "PERSONAL_INFO":
//       return {...state,
//         personalInfo: {
//           ...state.personalInfo,
//           [action.data.name]: action.data.value,
//         },
//       };
//     case "EXPERIENCE":
//       return {...state,
//         experience: [
//           {
//             ...state.experience[0],
//             [action.data.name]: action.data.value,
//           },
//         ],
//       };
//     case "PROJECTS":
//       return {
//         ...state,
//         projects: [
//           {
//             ...state.projects[0],
//             [action.data.name]: action.data.value,
//           }
//         ]
//       }
//     case "EDUCATION":
//       return {
//         ...state,
//         education: [
//           {
//             ...state.education[0],
//             [action.data.name]: action.data.value,
//           }
//         ]
        
//       }
//     case "SKILLS":
//       // console.log(action.data.name, action.data.value);
//       // console.log(state);
//       return {
//         ...state,
//         ['skills']: action.data.value,
//       };
//     case "ACHIEVEMENTS":
//       return {
//         ...state,
//         ['achievements']: action.data.value,
//       };
//     default:
//       return state;
//   }
// };

// export const defaultState: SectionDataType = {
//   personalInfo: [{
//     name: "AMAN PACHOURI",
//     phone: "+91 9956224901",
//     email: "ampachouri09@gmail.com",
//     linkedIn: "/in/ampachouri09/",
//     profileSummary:
//       "Passionate Software Engineer with expertise in full-stack development. Led end-to-end projects at GX INDIA, demonstrating a strong track record in project management and seamless technology integration.",
//   }],
//   experience: [
//     {
//       company: "GX INDIA",
//       date: "01/2023 – 10/2023",
//       position: "Software Engineer",
//       responsibilities: "Led end-to-end development, handling both frontend and backend components. \n Achieved a 30% improvement in issue resolution efficiency through the implementation of real-time notifications and automated ticket-raising. \n Projected a 40% increase in user engagement by seamlessly integrating Rasa and React-based chatbot features. \n Engineered an automatic ticket-raising mechanism generating detailed support tickets based on user ratings. ",
//     },
//   ],
//   projects: [
//     {
//       name: "Hostel Entry and Exit App Using Barcode",
//       date: "06/2022-07/2022",
//       description: "Collaborated in a dynamic two-person team, driving backend development for a hostel entry/exit mobile app. \n Implemented cutting-edge barcode technology, fostering a collaborative effort that resulted in a 25% reduction in manual entry/exit time and a transformative enhancement in operational efficiency.\n Automated registration number retrieval by integrating barcoded student identity cards, optimizing efficiency.",
//       technologies: "React Native, Express.js",
//     },
//     {
//       name: "Medicare",
//       date: "12/2021-02/2022",
//       description: "Developed an online medical consultancy web app facilitating patient-doctor communication while ensuring privacy.\nImplemented features for easy signup using Google mail IDs, online appointment booking, video and chat consultations, and secure online payments.",
//       technologies: "HTML, CSS, JavaScript, Materialize CSS, Express.js (Node.js)",
//     },
//   ],
//   education: [
//     {
//       institution: "Motilal Nehru National Institute of Technology (NIT), Allahabad",
//       date: "2020-2023",
//       degree: "Master of Computer Application (MCA)",
//       grade: "CPI - 7.92",
//     },
//     {
//       institution: "Bundelkhand University, Jhansi",
//       date: "2017-2020",
//       degree: "Bachelor of Computer Application",
//       grade: "Percentage - 68.38%",
//     },
//   ],
//   skills: ["Programming Languages: C, C++, Javascript, Typescript, Python. \n Web Technologies: HTML, CSS, Node.js, React.js, Next.js, Express.js, Nest.js, Django.\n Databases: MongoDB, SQL.\nTools & Technologies: Git, Github, Visual Studio, Postman, Docker, WebSokcet."],
//   achievements: ["4TH Rank in Webster (Avishkar Event of MNNIT)."],
// };

// export const useSectionReducers = () => {
//     const [sectionState, dispatch] = useReducer(SectionDataReducers, defaultState);
//     return ({sectionState, dispatch});
// }


