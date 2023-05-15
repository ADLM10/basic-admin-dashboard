const ProfilePlaceholder = ({
  value,
  profileImageUrl,
  email,
}: {
  value: string;
  profileImageUrl: string;
  email: string;
}) => {
  return (
    <div className="flex gap-2 items-center">
      <img src={profileImageUrl} alt={value} className="w-8 h-8 rounded-full" />
      <div className="flex flex-col justify-center items-start">
        <span>{value}</span>
        <span className="text-xs text-gray-500">{email}</span>
      </div>
    </div>
  );
};

export default ProfilePlaceholder;
