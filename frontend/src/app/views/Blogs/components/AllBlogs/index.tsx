import * as React from 'react';
import { Blog } from '../../../../types';
import { getBlogs } from '../../requests';
import { IOLink } from '../../../../../lib/elements';
import { blogsUrls } from '../../../../urls';

interface BlogsProps {
  userId: number;
}

export const Blogs: React.FC<BlogsProps> = ({ userId }) => {
  const [blogs, setBlogs] = React.useState<Blog[]>([] as Blog[]);

  React.useEffect(() => {
    getBlogs().then(res => setBlogs(res.data));
  }, [])

  return (
    <div>
      <IOLink to={blogsUrls.myblogs(`${userId}`)}>Go To my blogs</IOLink>
      <br />
      {JSON.stringify(blogs)}
    </div>
  )
}
