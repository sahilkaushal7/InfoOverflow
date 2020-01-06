import * as React from 'react';
import { getProfile, updateProfile } from '../../requests';
import { IOLink } from '../../../../../lib/elements';
import cn from 'classnames';
import { AxiosResponse } from 'axios';

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
    form_data.append('avatar', userAvatar, userAvatar.name);
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
          <p>{userProfile && userProfile.status_text && `Status: ${userProfile.status_text}`}</p>
          <p>{userProfile && userProfile.first_name && `First Name: ${userProfile.first_name}`}</p>
          <p>{userProfile && userProfile.last_name  && `Last Name: ${userProfile.last_name}`}</p>
          <p>{userProfile && userProfile.city  && `City: ${userProfile.city}`}</p>
          <p>{userProfile && userProfile.country  && `Country: ${userProfile.country}`}</p>
          <p>{userProfile && userProfile.job_profile  && `Job Profile: ${userProfile.job_profile}`}</p>
        </div>
        <form
          onSubmit={updateDetails} >
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


export default Profile;
