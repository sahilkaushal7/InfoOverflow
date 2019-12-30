import * as React from 'react';
import { getUserProfile } from './requests';

interface UserAccountProps {
  userId: number;
}

interface UserProfile {
  user: number;
  avatar: string;
  id: number;
  statusText: string;
  createOn: string;
}

const UserAccount: React.FC<UserAccountProps> = ({ userId }) => {
  const [UserProfile, setUserProfile] = React.useState({} as UserProfile);
  React.useEffect(() => {
    getUserProfile(userId).then(res => setUserProfile(res.data[0]));
  }, [userId]);

  return (
    <div>
      This is user account
      {JSON.stringify(UserProfile)}
    </div>
  );
}


export default UserAccount;
