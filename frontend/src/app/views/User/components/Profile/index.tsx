import * as React from 'react';
import { getProfile, updateProfile } from '../../requests';
import { IOLink } from '../../../../../lib/elements';
import cn from 'classnames';
import { AxiosResponse } from 'axios';
import { IOCard } from '../../../../../lib/components/IOCards';
import { UpdateProfile } from '../../../../../lib/elements/IOForm';
import { IOInput } from '../../../../../lib/elements/IOInput';

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
  const [editing, setEditing] = React.useState(false);
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
    // const status = e.target.elements.status.value;
    // const form_data = new FormData();
    // if (userAvatar) {
    //   form_data.append('avatar', userAvatar, userAvatar.name);
    // }
    // if (status) {
    //   form_data.append('status_text', status);
    // }
    // if (userId) {
    //   updateProfile(form_data, userId);
    // }
    setEditing(false);
  }



  return (
    <div className={cn('io-userprofile')}>
      <form onSubmit={(e) => updateDetails(e)}>
        <IOCard className={cn('io-userprofile__card')}>
          <div className={cn('io-userprofile__card-actions')}>
            <p onClick={logout} className={cn('io-clickable')}>
              <i className={cn('fa', 'fa-sign-out')} /> Logout
            </p>
            <p onClick={() => setEditing(true)} className={cn('io-clickable')}>
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
            {editing ?
              <div>
                <IOInput type={'text'} placeholder={userProfile ? userProfile.first_name : 'First name'} name={'firstName'}/>
                <IOInput type={'text'} placeholder={userProfile ? userProfile.last_name : 'Last name'} name={'lastName'}/>
              </div>
              : <b>{userProfile && userProfile.first_name} {userProfile && userProfile.last_name}</b>}
            <br />
            {editing ?
              <div>
                <IOInput type={'text'} placeholder={userProfile ? userProfile.city : 'City'} name={'city'}/>
                <IOInput type={'text'} placeholder={userProfile ? userProfile.country : 'Country'} name={'country'}/>
              </div> :
              <>{userProfile && userProfile.city}, {userProfile && userProfile.country}</>}
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
          {editing && <IOInput type={'submit'} value={'Update'} />}
        </IOCard>
      </form>
    </div >
  );
}


export default Profile;
