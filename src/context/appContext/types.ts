import { Dispatch, ReactNode, SetStateAction } from "react";

export type AppContextStateType = {
  state: AppStateType;
  dispatch: Dispatch<AppActionType>;
  activeSection: keyof AppStateType;
  setActiveSection: Dispatch<SetStateAction<keyof AppStateType>>;
};

export type AppDataProviderProps = {
  children: ReactNode;
};

export type AppActionType =
  | {
      type: "LINK_INPUT";
      data: {
        activeSection: keyof AppStateType;
        activeItem?: number;
        name: string;
        value: string;
        index: number;
      };
    }
  | {
      type: "ADD_LINK";
      data: { activeSection: keyof AppStateType; activeItem?: number };
    }
  | {
      type: "REMOVE_LINK";
      data: {
        activeSection: keyof AppStateType;
        activeItem?: number;
        index: number;
      };
    }
  | {
      type: "PERSONAL_INFO";
      data: { name: string; value: string; index?: number | undefined };
    }
  | { type: "EXPERIENCE"; data: { name: string; value: string; index: number } }
  | { type: "ADD_EXPERIENCE" }
  | { type: "REMOVE_EXPERIENCE"; data: { index: number } }
  | { type: "PROJECTS"; data: { name: string; value: string; index: number } }
  | { type: "ADD_PROJECT" }
  | { type: "REMOVE_PROJECT"; data: { index: number } }
  | { type: "EDUCATION"; data: { name: string; value: string; index: number } }
  | { type: "ADD_EDUCATION" }
  | { type: "REMOVE_EDUCATION"; data: { index: number } }
  | { type: "SKILLS"; data: { name: string; value: string } }
  | { type: "ACHIEVEMENTS"; data: { name: string; value: string } };

export type SectionType =
  | AppStateType["personalInfo"]
  | AppStateType["experience"]
  | AppStateType["projects"]
  | AppStateType["education"]
  | AppStateType["skills"]
  | AppStateType["achievements"];

export type SectionItemType =
  | ExperienceType
  | ProjectType
  | EducationType
  | AppStateType["personalInfo"];

type LinkType = {
  linkName: string;
  link: string;
};

type ExperienceType = {
  company: string;
  links: LinkType[];
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
  links: LinkType[];
};
type EducationType = {
  institution: string;
  links: LinkType[];
  start_date: string;
  end_date: string;
  degree: string;
  grade: string;
};

type AppStateType = {
  personalInfo: {
    fname: string;
    lname: string;
    phone: string;
    email: string;
    links: LinkType[];
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
  LinkType,
  ExperienceType,
  ProjectType,
  EducationType,
  AppStateType,
};
