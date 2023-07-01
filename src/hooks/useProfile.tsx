import { useUser } from "@clerk/nextjs";
import { Profile } from "@prisma/client";
import { get } from "lodash-es";
import { createContext, useContext, useEffect, useState } from "react";
import redaxios from "redaxios";

const UseProfile = createContext<Profile | null>(null);

export const ProfileProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user, isSignedIn } = useUser();
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isSignedIn || !user) {
        if (profile) setProfile(null);
        return;
      }
      const name = user.fullName;
      const email = get(user, "primaryEmailAddress.emailAddress");
      if (!name || !email) {
        if (profile) setProfile(null);
        return;
      }
      try {
        const res = await redaxios.post("/api/me", {
          name,
          email,
        });
        if (res.status === 200) {
          const data: Profile = res.data;
          setProfile(data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSignedIn, user]);

  return <UseProfile.Provider value={profile}>{children}</UseProfile.Provider>;
};

// Same useUser hook from before
export const useProfile = () => {
  return useContext(UseProfile);
};
