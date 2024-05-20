  export type link = {
    linkName: string;
    link: string;
  }

  export type ExperienceType = {
    company: string;
    links: link[];
    start_date: string;
    end_date: string;
    position: string;
    responsibilities: string;
  };

  export type ProjectType = {
    name: string;
    liveLink: string;
    start_date: string;
    end_date: string;
    description: string;
    technologies: string;
    links: link[]
  }
  export type EducationType =  {
    institution: string;
    links: link[],
    start_date: string;
    end_date: string;
    degree: string;
    grade: string;
  }
  
  export type SectionDataType = {
  
    personalInfo: {
      fname: string;
      lname: string;
      phone: string;
      email: string;
      links: link[];
      linkedIn: string;
      profileSummary: string;
    };
  
    experience: Array<ExperienceType>
  
    projects: Array<ProjectType>;
  
    education: Array<EducationType>;
  
    skills: string;
  
    achievements: string;
  };
  
  export const defaultState: SectionDataType = {
    personalInfo: {
      fname: "AMAN",
      lname: "PACHOURI",
      phone: "+91 9956224901",
      email: "ampachouri09@gmail.com",
      links: [
        {linkName: "/in/ampachouri09/", link: "https://www.linkedin.com/in/ampachouri09/"},
      ],
      linkedIn: '<a href="https://www.linkedin.com/in/ampachouri09/" target="_blank">/in/ampachouri09/</a>',
      profileSummary:
        "Passionate Software Engineer with expertise in full-stack development. Led end-to-end projects at GX INDIA, demonstrating a strong track record in project management and seamless technology integration.",
    },
    experience: [
      {
        company: "GX INDIA",
        links: [],
        start_date: "2023-01",
        end_date: "2023-10",
        position: "Software Engineer",
        responsibilities: "<ul><li>Led end-to-end development, handling both frontend and backend components. </li><li>Achieved a 30% improvement in issue resolution efficiency through the implementation of real-time notifications and automated ticket-raising. </li><li>Projected a 40% increase in user engagement by seamlessly integrating Rasa and React-based chatbot features. </li><li>Engineered an automatic ticket-raising mechanism generating detailed support tickets based on user ratings.</li></ul>",
      },
    ],
    projects: [
      {
        name: "Hostel Entry and Exit App Using Barcode",
        liveLink: "",
        links:[
          {linkName: "GitHub" , link: "https://github.com/"}
        ],
        start_date: "2022-06",
        end_date: "2022-07",
        description: "<ul><li>Collaborated in a dynamic two-person team, driving backend development for a hostel entry/exit mobile app.</li><li>Implemented cutting-edge barcode technology, fostering a collaborative effort that resulted in a 25% reduction in manual entry/exit time and a transformative enhancement in operational efficiency.</li><li>Automated registration number retrieval by integrating barcoded student identity cards, optimizing efficiency.</li></ul>",
        technologies: "React Native, Express.js",
      },
      {
        name: "Medicare",
        liveLink: "https://emed.onrender.com/",
        links: [
          {linkName: "project", link: "https://emed.onrender.com/"}
        ],
        start_date: "2021-12",
        end_date: "2022-02",
        description: "<ul><li>Developed an online medical consultancy web app facilitating patient-doctor communication while ensuring privacy.</li><li> Implemented features for easy signup using Google mail IDs, online appointment booking, video and chat consultations, and secure online payments.</li></ul>",
        technologies: "HTML, CSS, JavaScript, Materialize CSS, Express.js (Node.js)",
      },
    ],
    education: [
      {
        institution: "Motilal Nehru National Institute of Technology (NIT), Allahabad",
        links: [],
        start_date: "2020-01",
        end_date: "2023-01",
        degree: "Master of Computer Application (MCA)",
        grade: "CPI - 7.92",
      },
      {
        institution: "Bundelkhand University, Jhansi",
        links: [],
        start_date: "2017-01",
        end_date: "2020-01",
        degree: "Bachelor of Computer Application",
        grade: "Percentage - 68.38%",
      },
    ],
    skills: " ",
    achievements: "4TH Rank in Webster (Avishkar Event of MNNIT).",
  };


  