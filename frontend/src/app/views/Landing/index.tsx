import * as React from 'react';
import { IOCard } from '../../../lib/components/IOCards';
import cn from 'classnames';
import './styles.scss';
import { getUsers } from './requests';
import { AxiosResponse } from 'axios';
import { UserProfile } from '../../types';
import { DEFAULT_PROFILE_IMAGE_URL } from '../User/components/Profile';

export const Landing: React.FC = () => {
  const [users, setUsers] = React.useState([] as UserProfile[]);

  React.useEffect(() => {
    getUsers().then((res: AxiosResponse) => { setUsers(res.data); });
  }, [])

  return (
    <div className={cn('io-landing')}>
      <IOCard className={cn('io-landing__users')}>
        <table className={cn('io-landing__users-details')}>
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {users.map(({ firstName, lastName, jobProfile, avatar }, i) => (
              <tr key={i}>
                <td>
                  <img src={avatar ? avatar : DEFAULT_PROFILE_IMAGE_URL } alt={'user_avatar'} width={'50px'} height={'50px'} />
                </td>
                <td>
                  <p>{firstName} {lastName}</p>
                </td>
                <td>{jobProfile ? jobProfile: 'NA'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </IOCard>
    </div>
  )
}
