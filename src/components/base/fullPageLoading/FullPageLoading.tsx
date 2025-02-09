const FullPageLoading: React.FC = () => {
  return (
    <div className="flex items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-50">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default FullPageLoading;
