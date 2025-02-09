import { Button } from "@/components/ui/button";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { PdfDataType, StatusEnum } from "./pdf-viewer.types";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

export const PdfViewer = ({ url, status }: PdfDataType) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
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
    setPageNumber(1);
  }

  function changePage(offset: number) {
    if (pageNumber >= 1) {
      setPageNumber((prevPageNumber) => prevPageNumber + offset);
    }
  }

  const render = {
    [StatusEnum.pending]: <div>Loading ...</div>,
    [StatusEnum.success]: (
      <>
        <div ref={containerRef} className="w-full h-full">
          <Document
            file={url}
            onLoadError={(error) => console.error(error)}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<div>Loading ...</div>}
            error={
              <p className={"text-danger-900 text-sm text-center"}>
                نمونه سند مورد نظر دریافت نشد !
              </p>
            }
          >
            <Page
              pageNumber={pageNumber}
              renderTextLayer={false}
              width={containerDimensions.width - 40} // Adjust the width dynamically
              height={containerDimensions.height - 40} // Adjust height to fit the container
              renderAnnotationLayer={false}
            />
          </Document>
        </div>
        <div className="flex w-full justify-center items-center gap-5 select-none">
          <Button
            variant={pageNumber === numPages ? "outline" : "default"}
            className="cursor-pointer rounded-full border py-0 size-20 max-w-8 w-8 max-h-8"
            onClick={() => changePage(+1)}
            disabled={pageNumber === numPages}
          >
            <MoveRightIcon />
          </Button>
          <span className="font-bold text-xl">{pageNumber}</span>
          <Button
            variant={pageNumber === 1 ? "outline" : "default"}
            className="cursor-pointer rounded-full border py-0 size-20 max-w-8 w-8 max-h-8"
            onClick={() => changePage(-1)}
            disabled={pageNumber === 1}
          >
            <MoveLeftIcon />
          </Button>
        </div>
      </>
    ),
    [StatusEnum.error]: (
      <p className={"text-danger-900 text-sm text-center"}>
        نمونه سند مورد نظر دریافت نشد !
      </p>
    ),
    [StatusEnum.idle]: <div>Loading ...</div>,
  };

  return (
    <div className="flex-1 justify-center flex flex-col items-center">
      {render[status]}
    </div>
  );
};
