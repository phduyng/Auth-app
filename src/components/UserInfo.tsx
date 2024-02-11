import { ExtendedUser } from "../../next-auth";
import { FC } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
}

const UserInfo: FC<UserInfoProps> = ({ user, label }) => {
  return (
    <Card>
      <CardHeader className="w-[600px] shadow">
        <p className="text-2xl font-semibold text-center">{label}</p>
      </CardHeader>
      <CardContent className="mt-4 space-y-4">
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm ">
          <p className="text-sm font-medium">ID</p>
          <p className="font-mono text-xs max-w-[180px] truncate p-1 bg-slate-100 rounded-md">
            {user?.id}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm ">
          <p className="text-sm font-medium">Name</p>
          <p className="font-mono text-xs max-w-[180px] truncate p-1 bg-slate-100 rounded-md">
            {user?.name}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm ">
          <p className="text-sm font-medium">Email</p>
          <p className="font-mono text-xs max-w-[180px] truncate p-1 bg-slate-100 rounded-md">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm ">
          <p className="text-sm font-medium">Role</p>
          <p className="font-mono text-xs max-w-[180px] truncate p-1 bg-slate-100 rounded-md">
            {user?.role}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between p-3 border rounded-lg shadow-sm ">
          <p className="text-sm font-medium">Two Factor Authentication</p>
          <Badge variant={user?.isTwoFactorEnabled ? "success" : "destructive"}>
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
