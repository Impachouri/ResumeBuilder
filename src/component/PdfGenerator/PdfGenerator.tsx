import { useReactToPrint } from 'react-to-print';
import { FaArrowDown } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";   
import './PdfGenerator.css'
import { useState } from "react";

const PdfGenerator  = ({resumeRef}:any) => {
    const [pdfname, setPdfName] = useState('resume');
    const [download, setDownload] = useState(false);

    const handlePrint = useReactToPrint({
        content: () => resumeRef.current,
      });

    // const handleGeneratePdf = () => {
    //     const doc = new jsPDF({
    //         format: 'a4',
    //         unit: 'pt',
    //     });

    //     doc.setFont('Inter-Regular', 'normal');

    //     doc.html(resumeRef.current, {
    //         async callback(doc) {
    //             doc.save(pdfname);
    //         },
    //     });
    //     setDownload((preValue)=>!preValue);
    //     setPdfName('resume');
    // };



  return (
    <>
        <div className="fixed top-[92%] left-[92%]">
            <button className="pdf-generator-button" onClick={() => setDownload((preValue)=>!preValue)}><FaArrowDown /></button>
        </div>
        {
            download &&
                <div className="pdf-generator-modal">
                    <button className="pdf-cancel-button" onClick={() => setDownload((preValue)=>!preValue) }><MdOutlineCancel size={25}/></button>
                    <label htmlFor="pdf-name" className="pdf-name">Name the File</label>
                    <input type="text" name="pdf-name" value={pdfname} onChange={(e)=>setPdfName(e.target.value)}/>
                    <button onClick={handlePrint} className="pdf-save">Save</button>
                </div>
        }
    </>
  )
}

export default PdfGenerator