const LoadingIndicator = ({ message = "Loading..." }) => {
    return (
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-opacity-50"></div>
        <p className="text-gray-400 mt-4">{message}</p>
      </div>
    );
  };
  
  export default LoadingIndicator;
  