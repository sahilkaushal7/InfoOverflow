import * as React from 'react';
import { getProfile, updateProfile } from '../../requests';
import { IOLink } from '../../../../../lib/elements';
import cn from 'classnames';
import { AxiosResponse } from 'axios';
import { IOCard } from '../../../../../lib/components/IOCards';
import { UpdateProfile } from '../../../../../lib/elements/IOForm';

interface UserAccountProps {
  logout: () => void;
  urlParams: {
    id?: number;
  }
}

export interface Profile {
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

const Profile: React.FC<UserAccountProps> = ({ logout, urlParams }) => {
  const [userProfile, setProfile] = React.useState<Profile>({} as Profile);
  const [userAvatar, setUserAvatar] = React.useState();
  const [mouseOverImage, setMouseOverImage] = React.useState(false);
  const [userId, setUserId] = React.useState<number>();
  const imageInputRef = React.useRef<HTMLInputElement>({} as HTMLInputElement);

  React.useEffect(() => {
    if (urlParams.id) {
      const userId = urlParams.id;
      setUserId(userId);
      getProfile(userId).then((res: AxiosResponse) => setProfile(res.data));
    }
  }, [urlParams.id]);

  const handleImageChange = (e: any) => {
    setUserAvatar(e.target.files[0]);
  };

  const updateDetails = (e: any) => {
    // e.preventDefault();
    const status = e.target.elements.status.value;
    const form_data = new FormData();
    if (userAvatar) {
      form_data.append('avatar', userAvatar, userAvatar.name);
    }
    if (status) {
      form_data.append('status_text', status);
    }
    if (userId) {
      updateProfile(form_data, userId);
    }
  }

  return (
    <div className={cn('io-userprofile')}>
      <>
        <IOCard className={cn('io-userprofile__card')}>
          <div className={cn('io-userprofile__card-actions')}>
            <p onClick={logout} className={cn('io-clickable')}>
              <i className={cn('fa', 'fa-sign-out')} /> Logout
            </p>
            <p className={cn('io-clickable')}>
              <i className={cn('fa', 'fa-pencil')} /> Edit Profile
            </p>
          </div>
          {userProfile && userProfile.avatar && <div
            className={cn('io-userprofile__card-image', 'io-clickable')}
            onMouseOver={() => setMouseOverImage(true)}
            onMouseLeave={() => setMouseOverImage(false)}
          >
            {mouseOverImage &&
              <div className={cn('io-userprofile__card-image-overlay', 'io-clickable')} >
                <i
                  className={cn('fa', 'fa-pencil')}
                  onClick={() => (imageInputRef.current as HTMLInputElement).click()}
                />
              </div>}
            <img src={userProfile.avatar} alt={'user_avatar'} />
          </div>}
          <p>
            <b>{userProfile && userProfile.first_name} {userProfile && userProfile.last_name}</b>
            <br />
            {userProfile && userProfile.city}, {userProfile && userProfile.country}
          </p>
          <div className={cn('io-userprofile__card-summary')}>
            <div>
              <span><i className={cn('fa', 'fa-briefcase')} /><b>Profile :</b></span>
              <span>{userProfile && userProfile.job_profile}</span>
            </div>
            <div>
              <span><i className={cn('fa', 'fa-newspaper-o')} /><b>Status :</b></span>
              <span>{userProfile && userProfile.status_text}</span>
            </div>
          </div>
        </IOCard>
      </>
    </div >
  );
}


export default Profile;
