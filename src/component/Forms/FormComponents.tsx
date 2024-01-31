type FormProps = {
    type: string;
    label: string;
    id: string;
    defaultValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void;
}

type FormButtonProps = {
    label: string;
    id: string;
    handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>)=>void;
}

type FormLinkProps = {
    linkName: string;
    link: string;
    index: number;
    handleLinkInput: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index:number)=>void;
}

const defaultCss = {
    div: "flex flex-col gap-2",
    label: "mb-2 text-xl font-medium text-gray-900 dark:text-white",
    input: "bg-gray-50 w-full text-gray-900 text-lg rounded-lg focus:outline-none focus:ring p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
    buttonDiv: "flex justify-end gap-5 m-8",
    button: "border-3 bg-primary text-xl font-medium text-white py-2 px-5 rounded-lg"
}

export const FormInput = ({type, label, id, defaultValue, handleInputChange}: FormProps) => {
    return (
        <div className={defaultCss.div}>
            <label htmlFor={id} className={defaultCss.label} >{label}</label>
            <input 
                type={type} 
                id={id}
                name={id} 
                value={defaultValue} 
                onChange={ handleInputChange } 
                className={defaultCss.input}  
            />
        </div>
    );
}


export const FormTextArea = ({label, id, defaultValue, handleInputChange}: FormProps) => {
    return (
        <div className={defaultCss.div}>
            <label htmlFor={id} className={defaultCss.label}>{label}</label>
            <textarea 
                id={id} 
                name={id} 
                onChange={ handleInputChange } 
                value={Array.isArray(defaultValue) ? defaultValue.join('\n') : defaultValue}
                className={`${defaultCss.input} w-full`} 
            />
        </div>
    );
}


export const FormButton = ({label, id, handleClick}: FormButtonProps) => {
    return (
        <div className={defaultCss.buttonDiv}>
            <button 
                className={defaultCss.button} 
                id={id} 
                onClick={handleClick}
            >
                {label}
            </button>
        </div>
    );
}


export const FormLinkInput = ({linkName, link, index, handleLinkInput}: FormLinkProps) =>{
    return (
        <div className="flex flex-row gap-4 w-full">
            <input 
                className={defaultCss.input} 
                type="text" 
                name="linkName" 
                placeholder="Enter your text here" 
                value={linkName}
                onChange={(e) => handleLinkInput(e,index) }
            />
            <input 
                className={defaultCss.input} 
                type="text" 
                name="link" 
                placeholder="Enter your link here" 
                value={link}
                onChange={(e) => handleLinkInput(e,index) }
            />
        </div>
    );
}



