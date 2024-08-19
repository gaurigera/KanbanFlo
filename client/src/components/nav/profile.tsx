import { User } from "@nextui-org/react";
import { cache } from "react";

interface ProfileProps {
  userId?: string;
}

const UserData = {
  name: "Gauri Gera",
  description: "Software Engineer",
  avatar: "https://avatars.githubusercontent.com/u/122551351?v=4",
};

const loadProfile = cache(async (userId?: string) => {  
  return UserData
});

export async function Profile() {
  const profileData = await loadProfile();
  return (
    <User
      name={profileData.name}
      description={profileData.description}
      avatarProps={{
        src: profileData.avatar,
      }}
    />
  );
}
