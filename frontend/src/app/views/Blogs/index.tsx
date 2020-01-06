import * as React from 'react';
import { Blog } from '../../types';
import { getBlogs } from './requests';

export const Blogs: React.FC = () => {
  const [blogs, setBlogs] = React.useState<Blog[]>([] as Blog[]);

  React.useEffect(() => {
    getBlogs().then(res => setBlogs(res.data));
  }, [])

  return (
    <div>
      {JSON.stringify(blogs)}
    </div>
  )
}
