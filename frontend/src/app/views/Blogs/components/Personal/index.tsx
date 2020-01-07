import * as React from 'react';
import { Blog } from '../../../../types';
import { getPersonalBlogs } from '../../requests';

interface PersonalBlogsProps {
  urlParams: {
    id?: number;
  }
}

export const PersonalBlogs: React.FC<PersonalBlogsProps> = ({ urlParams }) => {

  const [blogs, setBlogs] = React.useState<Blog[]>([] as Blog[]);

  React.useEffect(() => {
    if(urlParams.id){
      getPersonalBlogs(urlParams.id).then(
        res => setBlogs(res.data)
      )
    }
  }, [urlParams.id])

  return (
    <div>
      {JSON.stringify(blogs)}
    </div>
  )
}
