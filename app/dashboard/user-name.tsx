"use client";

import { useEffect, useState } from "react";

export const PROFILE_EVENT = "profile-saved";

const UserName = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const read = () =>
      setName(
        sessionStorage.getItem("demo_name") ||
          sessionStorage.getItem("demo_email")?.split("@")[0] ||
          ""
      );
    read();
    window.addEventListener(PROFILE_EVENT, read);
    return () => window.removeEventListener(PROFILE_EVENT, read);
  }, []);

  return <>{name}</>;
};

export default UserName;
