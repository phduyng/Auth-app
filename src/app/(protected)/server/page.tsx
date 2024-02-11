import UserInfo from "@/components/UserInfo";
import { currentUser } from "@/lib/auth";

const ServerPage = async () => {
  const user = await currentUser();

  return <UserInfo label="💻 Server components" user={user} />;
};

export default ServerPage;
