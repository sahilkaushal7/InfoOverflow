import * as React from 'react';
import { IOCard } from '../../../lib/components/IOCards';
import cn from 'classnames';
import './styles.scss';
import { getUsers } from './requests';
import { AxiosResponse } from 'axios';
import { UserProfile } from '../../types';

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
            {users.map(({ firstName, lastName, jobProfile, avatar }) => (
              <tr>
                <td>
                  <img src={avatar} alt={'user_avatar'} width={'50px'} height={'50px'} />
                </td>
                <td>
                  <p>{firstName} {lastName}</p>
                </td>
                <td>{jobProfile}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </IOCard>
    </div>
  )
}
