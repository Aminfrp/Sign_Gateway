import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { PdfDataType, StatusEnum } from "./pdf-viewer.types";
import ParaphLoading from "@/components/base/paraphLoading/ParaphLoading";
import { BiMessageSquareError } from "react-icons/bi";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PdfViewer = ({ url, status }: PdfDataType) => {
  const [numPages, setNumPages] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const getContainerDimensions = () => {
    if (containerRef.current) {
      return {
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      };
    }
    return { width: 900, height: 900 };
  };

  const [containerDimensions, setContainerDimensions] = useState(
    getContainerDimensions()
  );

  useEffect(() => {
    const handleResize = () => {
      setContainerDimensions(getContainerDimensions());
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      setContainerDimensions(getContainerDimensions());
    }
  }, [containerRef.current]);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const render = {
    [StatusEnum.pending]: <ParaphLoading />,
    [StatusEnum.success]: (
      <>
        <div ref={containerRef} className="w-full overflow-auto">
          <Document
            file={url}
            onLoadError={(error) => console.error(error)}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={ <ParaphLoading />}
            className="max-h-[30rem] overflow-auto"
            error={
              <p className={"text-red-600 text-sm text-center flex gap-3 justify-center items-center"}>
                <BiMessageSquareError size={25} />  سند مورد نظر دریافت نشد !
              </p>
            }
          >
            {/* Render all pages */}
            {Array.from({ length: numPages }, (_, pageIndex) => (
              <div key={pageIndex} className="my-4">
                <Page
                  pageNumber={pageIndex + 1}
                  renderTextLayer={false}
                  width={containerDimensions.width - 40}
                  height={containerDimensions.height - 40}
                  renderAnnotationLayer={false}
                  className="flex justify-center items-center"
                />
              </div>
            ))}
          </Document>
        </div>
      </>
    ),
    [StatusEnum.error]: (
      <p className={"text-danger-900 text-sm text-center"}>
        نمونه سند مورد نظر دریافت نشد !
      </p>
    ),
    [StatusEnum.idle]:  <ParaphLoading />,
  };

  return (
    <div className="flex-1 justify-center flex flex-col items-center h-full">
      {render[status]}
    </div>
  );
};
