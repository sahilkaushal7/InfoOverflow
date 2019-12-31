import * as React from 'react';
import { getUserProfile, updateUserProfile } from './requests';
import { IOLink } from '../../../lib/elements';
import cn from 'classnames';

interface UserAccountProps {
  userId: number;
  logout: () => void;
}

export interface UserProfile {
  user: number;
  avatar: string;
  id: number;
  status_text: string;
  created_on: string;
  first_name: string;
  last_name: string;
  city: string;
  country: string;
  job_profile: string;
}

const UserAccount: React.FC<UserAccountProps> = ({ userId, logout }) => {
  const [userProfile, setUserProfile] = React.useState<UserProfile>({} as UserProfile);
  const [userAvatar, setUserAvatar] = React.useState();

  React.useEffect(() => {
    getUserProfile(userId).then(res => setUserProfile(res.data[0]));
  }, [userProfile]);

  const handleImageChange = (e: any) => {
    setUserAvatar(e.target.files[0]);
  };

  const updateProfile = (e: any) => {
    e.preventDefault();
    const status = e.target.elements.status.value;
    const form_data = new FormData();
    form_data.append('avatar', userAvatar, userAvatar.name);
    form_data.append('status_text', status);
    updateUserProfile(form_data, userId);
  }

  return (
    <div>
      {!!(userProfile) &&
        <>
          <img src={userProfile.avatar} alt={'user_avatar'} width={'50px'} height={'50px'} />
          <p>Status: {userProfile.status_text}</p>
          <p>Updated On: {userProfile.created_on}</p>
          <p>First Name: {userProfile.first_name}</p>
          <p>Last Name: {userProfile.created_on}</p>
          <p>City: {userProfile.city}</p>
          <p>Country: {userProfile.country}</p>
          <p>Job Profile: {userProfile.job_profile}</p>
          <form
            onSubmit={(e) => updateProfile(e)} >
            <label><b>Image : </b></label>
            <input
              type="file"
              id="image"
              accept="image/png, image/jpeg"
              name={'avatar'}
              onChange={handleImageChange}
            />
            <label><b>Status : </b></label>
            <input type={'text'} name={'status'} />
            <input type={'submit'} name={'Login'} />
            <br />
          </form>
          <IOLink to={'/'} onClick={logout}>
            <i className={cn('fa', 'fa-user-times')} />
          </IOLink>
        </>
      }
    </div>
  );
}


export default UserAccount;
