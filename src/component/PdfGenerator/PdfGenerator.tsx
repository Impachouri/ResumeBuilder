import { useReactToPrint } from 'react-to-print';
import { FaArrowDown } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const PdfGenerator: React.FC<{ resumeRef: React.RefObject<HTMLElement> }> = ({ resumeRef }) => {
  const [pdfname, setPdfName] = useState('resume');
  const [download, setDownload] = useState(false);
  const downloadRef = useRef(null);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  }
  );

  const handleDownload = () => {
    if(resumeRef){
      handlePrint();
      setDownload(false);
      console.log("fill");
    }
  };

  useEffect(() => {
    const inputRef = downloadRef.current as HTMLInputElement | null;
    if (inputRef) {
      inputRef.focus();
    }
  }, [download]);

  return (
    <>
      <div className="fixed top-[92%] left-[92%] z-50">
        <button className="grid place-items-center w-9 h-9 rounded-full bg-[#0078D4] text-white cursor-pointer" onClick={() => setDownload((preValue) => !preValue)}><FaArrowDown /></button>
      </div>
      {download ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-xl font-semibold">
                    Name the File
                  </h3>
                  <button
                    className="p-1 mx-auto bg-transparent border-0 text-black  float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setDownload(false)}
                  >
                    <span className="bg-transparent text-black h-6 w-6 text-xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="m-5">
                  <input ref={downloadRef} className="h-12" type="text" name="pdf-name" value={pdfname} onChange={(e) => setPdfName(e.target.value)} />
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={handleDownload}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  )
}

export default PdfGenerator