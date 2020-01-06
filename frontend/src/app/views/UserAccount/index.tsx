import * as React from 'react';
import { getUserProfile, updateUserProfile } from './requests';
import { IOLink } from '../../../lib/elements';
import cn from 'classnames';
import './styles.scss';

interface UserAccountProps {
  logout: () => void;
  urlParams: {
    id?: number;
  }
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

const UserAccount: React.FC<UserAccountProps> = ({ logout, urlParams }) => {
  const [userProfile, setUserProfile] = React.useState<UserProfile>({} as UserProfile);
  const [userAvatar, setUserAvatar] = React.useState();
  const [mouseOverImage, setMouseOverImage] = React.useState(false);
  const [userId, setUserId] = React.useState<number>();
  const imageInputRef = React.useRef<HTMLInputElement>({} as HTMLInputElement);

  React.useEffect(() => {
    if (urlParams.id) {
      const userId = urlParams.id;
      setUserId(userId);
      getUserProfile(userId).then(res => setUserProfile(res.data[0]));
    }
  }, [urlParams.id]);

  const handleImageChange = (e: any) => {
    setUserAvatar(e.target.files[0]);
  };

  const updateProfile = (e: any) => {
    // e.preventDefault();
    const status = e.target.elements.status.value;
    const form_data = new FormData();
    form_data.append('avatar', userAvatar, userAvatar.name);
    if (status) {
      form_data.append('status_text', status);
    }
    if (userId) {
      updateUserProfile(form_data, userId);
    }
  }

  return (
    <div className={cn('io-userprofile')}>
      <>
        <div className={cn('io-userprofile__card')}>
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
          <p>Status: {userProfile && userProfile.status_text}</p>
          <p>First Name: {userProfile && userProfile.first_name}</p>
          <p>Last Name: {userProfile && userProfile.last_name}</p>
          <p>City: {userProfile && userProfile.city}</p>
          <p>Country: {userProfile && userProfile.country}</p>
          <p>Job Profile: {userProfile && userProfile.job_profile}</p>
        </div>
        <form
          onSubmit={updateProfile} >
          <label><b>Image : </b></label>
          <input
            type="file"
            id="image"
            accept="image/png, image/jpeg"
            name={'avatar'}
            onChange={handleImageChange}
            ref={imageInputRef}
          />
          <label><b>Status : </b></label>
          <input type={'text'} name={'status'} />
          <input type={'submit'} name={'Login'} />
          <br />
        </form>
        <IOLink to={'/'} onClick={logout}>
          <i className={cn('fa', 'fa-sign-out')} />
        </IOLink>
      </>
    </div>
  );
}


export default UserAccount;
