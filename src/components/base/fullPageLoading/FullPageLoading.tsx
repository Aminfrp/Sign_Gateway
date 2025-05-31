import ParaphLoading from "@/components/base/paraphLoading/ParaphLoading";

const FullPageLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50">
      <div className="flex items-center justify-center space-x-2">
        <ParaphLoading />
      </div>
    </div>
  );
};

export default FullPageLoading;
