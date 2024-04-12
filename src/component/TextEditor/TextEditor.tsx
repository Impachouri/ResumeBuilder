
import 'quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';

type EditorProps = {
  label: string;
  id: string;
  value: string;
  handleTextArea: (content:string)=>void;
}


const TextEditor = ({ label, id, value, handleTextArea}: EditorProps) => {
  
  const [editorContent, setEditorContent] = useState<string>(value);

  const modules = {
    toolbar: [
      ["bold"],
      [ { list: "bullet" } ],
      ["link"],
      // [{ "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ]
  };

  const formats = [
    "bold", 
    "list",
    "link",
  ];

  const handleProcedureContentChange = (content: string) => {
    setEditorContent(content);
    handleTextArea(content);
  };


  useEffect(()=>{
    setEditorContent(value);
  }, [value])

  return (
    <div className="form form-textarea" >
        <label htmlFor={id} className="mb-2 text-xl font-medium text-gray-900 dark:text-white">{label}</label>
        <div className="grid place-items-center m-5 mb-10" >
            <ReactQuill
              theme="snow"
              modules={modules}
              formats={formats}
              placeholder="write your content ...."
              onChange={handleProcedureContentChange}
              style={{ height: "220px" }}
              defaultValue={editorContent}
              id={id}
            >
            </ReactQuill>
        </div>
    </div>
  );

}
export default TextEditor;
