import * as React from 'react';
import { Blog } from '../../../../types';
import { getPersonalBlogs } from '../../requests';
import { IOBlogCard } from '../../../../../lib/components/IOCards';

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
      {blogs.map((blog, i) => <IOBlogCard key={i} blog={blog} />)}
    </div>
  )
}
