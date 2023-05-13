type DateTimeProps = {
  value: string;
};

const DateTime = ({ value }: DateTimeProps) => {
  return (
    <div className="flex flex-col justify-center items-start">
      <span className="text-xs text-black">
        {new Date(value).toLocaleDateString()}
      </span>
      <span className="text-xs text-gray-500">
        {new Date(value).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

export default DateTime;
