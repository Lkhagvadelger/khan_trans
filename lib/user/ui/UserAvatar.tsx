import { UserRole } from "@prisma/client";
import { Avatar, AvatarBadge, useColorModeValue } from "@ui/index";
import {
  FaCogs,
  FaStethoscope,
  FaUserInjured,
  FaTruck,
  FaUser,
} from "react-icons/fa";

export const UserAvatar = ({
  phoneNumber,
  code,
  role,
}: {
  phoneNumber?: string | null;
  code?: string | null;

  role?: UserRole;
}) => {
  return (
    <Avatar
      borderWidth="1"
      borderRadius="50%"
      size="sm"
      sx={{ "& > div": { fontSize: "0.625rem" } }}
      bg={stringToColor(phoneNumber + "" + code)}
      name={code + ""}
      color={"white"}
      icon={
        role === UserRole.ADMIN ? (
          <FaCogs />
        ) : role === UserRole.DRIVER ? (
          <FaTruck />
        ) : role === UserRole.DISPATCHER ? (
          <FaUser />
        ) : (
          <></>
        )
      }
    >
      <AvatarBadge boxSize="6" fontSize="0 !important">
        {}
      </AvatarBadge>
    </Avatar>
  );
};

//generate an static color based on given string
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  let color = "#";
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).substr(-2);
  }
  return color;
}
