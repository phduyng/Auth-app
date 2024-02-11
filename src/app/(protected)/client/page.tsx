"use client";

import UserInfo from "@/components/UserInfo";
import { useCurrentUser } from "@/hooks/use-current-use";

const ServerPage = () => {
  const user = useCurrentUser();

  return <UserInfo label="📱 Client components" user={user} />;
};

export default ServerPage;
