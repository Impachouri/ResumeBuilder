type link = {
  linkName: string;
  link: string;
};

type ExperienceType = {
  company: string;
  links: link[];
  start_date: string;
  end_date: string;
  position: string;
  responsibilities: string;
};

type ProjectType = {
  name: string;
  liveLink: string;
  start_date: string;
  end_date: string;
  description: string;
  technologies: string;
  links: link[];
};
type EducationType = {
  institution: string;
  links: link[];
  start_date: string;
  end_date: string;
  degree: string;
  grade: string;
};

type SectionDataType = {
  personalInfo: {
    fname: string;
    lname: string;
    phone: string;
    email: string;
    links: link[];
    linkedIn: string;
    profileSummary: string;
  };

  experience: Array<ExperienceType>;

  projects: Array<ProjectType>;

  education: Array<EducationType>;

  skills: string;

  achievements: string;
};

export type {
  link,
  ExperienceType,
  ProjectType,
  EducationType,
  SectionDataType,
};
