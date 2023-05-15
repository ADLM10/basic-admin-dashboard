const Preloader = () => {
  const tablePattern = [];

  const pageButtons = [];

  for (let i = 0; i < 6; i++) {
    tablePattern.push(
      <div className="flex justify-between items-center pt-4">
        <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48"></div>
        <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48"></div>
        <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48"></div>
        <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48"></div>
        <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48"></div>
      </div>
    );
  }

  for (let i = 0; i < 12; i++) {
    pageButtons.push(
      <div className="h-10 bg-gray-300 rounded-full dark:bg-gray-700 w-10"></div>
    );
  }

  return (
    <div
      role="status"
      className="p-4 space-y-4 w-full rounded border border-gray-200 divide-y divide-gray-200 shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
          <div className="w-80 h-4 bg-gray-200 rounded-full dark:bg-gray-700"></div>
        </div>
        <div className="flex justify-between items-center space-x-6">
          <div className="h-10 bg-gray-300 rounded-full dark:bg-gray-700 w-48"></div>
          <div className="h-10 bg-gray-300 rounded-full dark:bg-gray-700 w-48"></div>
        </div>
        <div className="flex justify-between items-center space-x-6">
          <div className="h-10 bg-gray-300 rounded-xl dark:bg-gray-700 w-52"></div>
          <div className="h-10 bg-gray-300 rounded-xl dark:bg-gray-700 w-52"></div>
        </div>
      </div>
      <div className="flex justify-between items-center pt-4">
        <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48"></div>
        <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48"></div>
        <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48"></div>
        <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48"></div>
        <div className="h-8 bg-gray-300 rounded-xl dark:bg-gray-700 w-48"></div>
      </div>
      {tablePattern}
      <div className="flex justify-between items-center pt-4">
        <div className="h-10 bg-gray-300 rounded-xl dark:bg-gray-700 w-52"></div>
        {pageButtons}
        <div className="h-10 bg-gray-300 rounded-xl dark:bg-gray-700 w-52"></div>
      </div>
    </div>
  );
};

export default Preloader;
