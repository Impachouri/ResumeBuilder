import { Reducer } from "react";
import {
  EducationType,
  ExperienceType,
  ProjectType,
  AppActionType,
  AppStateType,
  LinkType,
  SectionType,
  SectionItemType,
} from "./types";

export const appReducer: Reducer<AppStateType, AppActionType> = (
  state,
  action
) => {
  const link = {
    linkName: "",
    link: "",
  };

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

  let section: SectionType;
  let updatedSection: SectionType;

  switch (action.type) {
    case "LINK_INPUT":
      section = state[action.data.activeSection];
      updatedSection = Array.isArray(section)
        ? (section.map((item: SectionItemType, index: number) =>
            index === action.data.activeItem
              ? {
                  ...item,
                  links: item.links.map((link: LinkType, key: number) =>
                    key === action.data.index
                      ? { ...link, [action.data.name]: action.data.value }
                      : link
                  ),
                }
              : item
          ) as SectionType)
        : ({
            ...(section as { links: LinkType[] }),
            links: (section as { links: LinkType[] }).links.map(
              (link: LinkType, index: number) =>
                index === action.data.index
                  ? { ...link, [action.data.name]: action.data.value }
                  : link
            ),
          } as SectionType);

      return {
        ...state,
        [action.data.activeSection]: updatedSection,
      };

    case "ADD_LINK":
      section = state[action.data.activeSection];
      updatedSection = Array.isArray(section)
        ? (section.map((item: SectionItemType, index: number) =>
            index === action.data.activeItem
              ? {
                  ...item,
                  links: [...item.links, link],
                }
              : item
          ) as SectionType)
        : ({
            ...(section as { links: LinkType[] }),
            links: [...(section as { links: LinkType[] }).links, link],
          } as SectionType);

      return {
        ...state,
        [action.data.activeSection]: updatedSection,
      };

    case "REMOVE_LINK":
      section = state[action.data.activeSection];
      updatedSection = Array.isArray(section)
        ? (section.map((item: SectionItemType, index: number) =>
            index === action.data.activeItem
              ? {
                  ...item,
                  links: item.links.filter(
                    (_link: LinkType, linkIndex: number) =>
                      linkIndex !== action.data.index
                  ),
                }
              : item
          ) as SectionType)
        : ({
            ...(section as { links: LinkType[] }),
            links: (section as { links: LinkType[] }).links.filter(
              (_link: LinkType, linkIndex: number) =>
                linkIndex !== action.data.index
            ),
          } as SectionType);

      return {
        ...state,
        [action.data.activeSection]: updatedSection,
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
        experience: state.experience.map((exp: ExperienceType, index: number) =>
          index === action.data.index
            ? { ...exp, [action.data.name]: action.data.value }
            : exp
        ),
      };

    case "ADD_EXPERIENCE":
      return {
        ...state,
        experience: [...state.experience, exp],
      };

    case "REMOVE_EXPERIENCE":
      section = state.experience.filter(
        (_exp: ExperienceType, index: number) => index !== action.data.index
      );
      updatedSection = section.length === 0 ? [exp] : section;
      return {
        ...state,
        experience: updatedSection,
      };

    case "PROJECTS":
      return {
        ...state,
        projects: state.projects.map((project: ProjectType, index: number) =>
          index === action.data.index
            ? { ...project, [action.data.name]: action.data.value }
            : project
        ),
      };

    case "ADD_PROJECT":
      return {
        ...state,
        projects: [...state.projects, pro],
      };

    case "REMOVE_PROJECT":
      section = state.projects.filter(
        (_pro: ProjectType, index: number) => index !== action.data.index
      );
      updatedSection = section.length === 0 ? [pro] : section;

      return {
        ...state,
        projects: updatedSection,
      };

    case "EDUCATION":
      return {
        ...state,
        education: state.education.map((edu: EducationType, index: number) =>
          index === action.data.index
            ? { ...edu, [action.data.name]: action.data.value }
            : edu
        ),
      };

    case "ADD_EDUCATION":
      return {
        ...state,
        education: [...state.education, edu],
      };

    case "REMOVE_EDUCATION":
      section = state.education.filter(
        (_edu: EducationType, index: number) => index !== action.data.index
      );
      updatedSection = section.length === 0 ? [edu] : section;
      return {
        ...state,
        education: updatedSection,
      };

    case "SKILLS":
      return {
        ...state,
        ["skills"]: {
          ...state.skills,
          [action.data.name]: action.data.value,
        },
      };

    case "ACHIEVEMENTS":
      return {
        ...state,
        ["achievements"]: {
          ...state.achievements,
          [action.data.name]: action.data.value,
        },
      };
    default:
      return state;
  }
};
