import * as React from 'react';
import { Blog } from '../../../../types';
import { getBlogs } from '../../requests';
import { IOLink } from '../../../../../lib/elements';
import { blogsUrls } from '../../../../urls';
import { IOBlogCard } from '../../../../../lib/components/IOCards';
import cn from 'classnames';
import { IOHorizontalMenu } from '../../../../../lib/components/IOHorizontalMenu';

interface BlogsProps {
  userId: number;
}

export const Blogs: React.FC<BlogsProps> = ({ userId }) => {
  const [blogs, setBlogs] = React.useState<Blog[]>([] as Blog[]);

  React.useEffect(() => {
    getBlogs().then(res => setBlogs(res.data));
  }, [])

  return (
    <div className={cn('io-blogs__landing')}>
      <IOLink to={blogsUrls.myblogs(`${userId}`)}>Go To my blogs</IOLink>
      <br />
      <IOHorizontalMenu
        menuItems={blogs}
        renderMenuItem={(item: Blog) => <IOBlogCard blog={item} />}
        numOfCards={5}
        gutterWidth={'4px'}
      />
    </div>
  )
}
