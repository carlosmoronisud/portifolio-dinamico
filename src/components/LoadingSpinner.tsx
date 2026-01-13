const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="relative">
          <div className="w-20 h-20 border-6 border-primary-200 rounded-full"></div>
          <div className="w-20 h-20 border-6 border-primary-500 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>
        <p className="mt-6 text-gray-600">Carregando ...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;