import { useContext } from "react";
import { ImCancelCircle } from "react-icons/im";
import { FormLinkInput } from "./FormComponents";
import {
  AppContext,
  AppContextStateType,
  AppStateType,
  LinkType,
} from "../../context/appContext";

type FormLinkProps = {
  activeItem: number;
};

const FormLink = ({ activeItem }: FormLinkProps) => {
  const {
    state: appState,
    activeSection,
    dispatch,
  } = useContext(AppContext) as AppContextStateType;

  const handleLinkInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.currentTarget;
    dispatch({
      type: "LINK_INPUT",
      data: {
        activeSection: activeSection,
        activeItem: activeItem,
        name: name,
        value: value,
        index: index,
      },
    });
  };

  const handleAddLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    dispatch({
      type: "ADD_LINK",
      data: { activeSection: activeSection, activeItem: activeItem },
    });
  };

  const handleRemoveLink = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => {
    e.preventDefault();
    dispatch({
      type: "REMOVE_LINK",
      data: {
        activeSection: activeSection,
        activeItem: activeItem,
        index: index,
      },
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-row gap-5 items-center">
        <label className="mb-2 text-xl font-medium  text-gray-900">Link</label>
        <button
          className="w-fit p-1 text-sm border-1 rounded-lg bg-secondary text-white cursor-pointer"
          onClick={(e) => handleAddLink(e)}
        >
          Add Link
        </button>
      </div>
      {(activeItem !== -1
        ? (
            appState[activeSection] as
              | AppStateType["experience"]
              | AppStateType["education"]
              | AppStateType["projects"]
          )[activeItem].links
        : (appState[activeSection] as { links: LinkType[] }).links
      ).map((link: LinkType, index: number) => (
        <div key={index} className="flex items-center gap-5 text-2xl">
          <FormLinkInput
            linkName={link.linkName}
            link={link.link}
            index={index}
            handleLinkInput={handleLinkInput}
          />
          <button onClick={(e) => handleRemoveLink(e, index)}>
            <ImCancelCircle />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FormLink;
