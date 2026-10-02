import Avatar from "./Avatar";
import { useFileSrc } from "./FileImage";

interface ProfileAvatarProps {
  name: string;
  imagePath?: string | null;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
}

const ProfileAvatar = ({ name, imagePath, size = "md" }: ProfileAvatarProps) => {
  const src = useFileSrc(imagePath);
  return <Avatar src={src || undefined} name={name} size={size} shape="circle" variant="primary" />;
};

export default ProfileAvatar;
