import * as React from 'react';
import { getProfile, updateProfile } from '../../requests';
import cn from 'classnames';
import { AxiosResponse } from 'axios';
import { IOCard } from '../../../../../lib/components/IOCards';
import { IOInput } from '../../../../../lib/elements/IOInput';

interface UserAccountProps {
  logout: () => void;
  urlParams: {
    id?: number;
  }
}

export interface Profile {
  avatar: string;
  statusText: string;
  createdOn: string;
  firstName: string;
  lastName: string;
  city: string;
  country: string;
  jobProfile: string;
  [key: string]: string | Blob;
}

const Profile: React.FC<UserAccountProps> = ({ logout, urlParams }) => {
  const [userProfile, setProfile] = React.useState<Profile>({} as Profile);
  const [updatedProfile, setUpdatedProfile] = React.useState<Profile>({} as Profile);
  const [userAvatar, setUserAvatar] = React.useState();
  const [mouseOverImage, setMouseOverImage] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const imageInputRef = React.useRef<HTMLInputElement>({} as HTMLInputElement);

  React.useEffect(() => {
    if (urlParams.id) {
      const userId = urlParams.id;
      getProfile(userId).then((res: AxiosResponse) => { setProfile(res.data); setUpdatedProfile(res.data); });
    }
  }, [urlParams.id]);

  const handleImageChange = (e: any) => {
    setUserAvatar(e.target.files[0]);
  };

  const updateDetails = (e: any) => {
    // e.preventDefault();
    const userId = urlParams.id;
    const form_data = new FormData();
    if (userAvatar) {
      form_data.append('avatar', userAvatar, userAvatar.name);
    }

    Object.keys(updatedProfile).forEach((key) => {
      if (key !== 'avatar') {
        form_data.append(key, updatedProfile[key])
      }
    });

    if (userId) {
      updateProfile(form_data, userId);
    }
    setEditing(false);
  }

  const updateField = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    const profile = {
      ...updatedProfile,
      [fieldName]: value
    }
    setUpdatedProfile(profile);
  }

  return (
    <div className={cn('io-userprofile')}>
      <form onSubmit={(e) => { updateDetails(e); return false; }}>
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
            <IOInput
              type={'file'}
              accept={"image/png, image/jpeg"}
              onChange={handleImageChange}
              ref={imageInputRef}
            />
            {mouseOverImage && editing &&
              <div className={cn('io-userprofile__card-image-overlay', 'io-clickable')} >
                <i
                  className={cn('fa', 'fa-pencil')}
                  onClick={() => (imageInputRef.current as HTMLInputElement).click()}
                />
              </div>}
            <img src={userProfile.avatar} alt={'user_avatar'} />
          </div>}
          <div className={cn('io-userprofile__card-details')}>
            {editing ?
              <div>
                <IOInput
                  type={'text'}
                  defaultValue={userProfile.firstName}
                  onChange={updateField('firstName')}
                />
                <IOInput
                  type={'text'}
                  defaultValue={userProfile.lastName}
                  onChange={updateField('lastName')}
                />
              </div>
              : <b>{userProfile && userProfile.firstName} {userProfile && userProfile.lastName}</b>}
            <br />
            {editing ?
              <div>
                <IOInput
                  type={'text'}
                  defaultValue={userProfile.city}
                  onChange={updateField('city')}
                />
                <IOInput
                  type={'text'}
                  defaultValue={userProfile.country}
                  onChange={updateField('country')}
                />
              </div> :
              <>{userProfile && userProfile.city}, {userProfile && userProfile.country}</>}
          </div>
          <div className={cn('io-userprofile__card-summary')}>
            <div>
              <span><i className={cn('fa', 'fa-briefcase')} /><b>Profile :</b></span>
              <span>
                {editing
                  ? <IOInput
                    type={'text'}
                    defaultValue={userProfile.jobProfile}
                    onChange={updateField('jobProfile')}
                  />
                  : <>{userProfile && userProfile.jobProfile}</>}
              </span>
            </div>
            <div>
              <span><i className={cn('fa', 'fa-newspaper-o')} /><b>Status :</b></span>
              <span>{editing
                ? <IOInput
                  type={'text'}
                  defaultValue={userProfile.statusText}
                  onChange={updateField('statusText')}
                />
                : <>{userProfile && userProfile.statusText}</>}</span>
            </div>
          </div>
          {editing && <IOInput type={'submit'} value={'Update'} />}
        </IOCard>
      </form>
    </div >
  );
}


export default Profile;
