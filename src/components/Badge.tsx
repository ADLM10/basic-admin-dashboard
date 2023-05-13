type BadgeProps = {
  online: boolean;
};

const Badge = ({ online }: BadgeProps) => {
  return (
    <div
      className={`w-full h-full flex justify-start items-center text-xs
        ${online ? "text-green-500" : "text-gray-500"}
    `}
    >
      {online ? (
        <div
        className="w-20 h-6 flex justify-center items-center bg-green-100 rounded-full p-1 text-sm"
        >
          <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          <span>Active</span>
        </div>
      ) : (
        <div
        className="w-20 h-6 flex justify-center items-center bg-gray-300 rounded-full"
        >
          <span className="h-2 w-2 rounded-full bg-gray-500 mr-2"></span>
          <span>Inactive</span>
        </div>
      )}
    </div>
  );
};

export default Badge;
