import * as React from 'react';
import { Blog } from '../../../../types';
import { getBlogs } from '../../requests';
import { IOLink } from '../../../../../lib/elements';
import { blogsUrls } from '../../../../urls';
import { IOBlogCard } from '../../../../../lib/components/IOCards';
import cn from 'classnames';
import ResponsiveRenderer from '../../../../../lib/renderProps/ResponsiveRenderer';
import IOHorizontalMenu from '../../../../../lib/components/IOHorizontalMenu';

interface BlogsProps {
  userId: number;
}

export const Blogs: React.FC<BlogsProps> = ({ userId }) => {
  const [blogs, setBlogs] = React.useState<Blog[]>([] as Blog[]);

  React.useEffect(() => {
    getBlogs().then(res => setBlogs(res.data));
  }, [])

  const sharedProps = {
    menuItems: blogs,
    renderMenuItem: (item: Blog) => <IOBlogCard blog={item} />,
    gutterWidth: '4px',
  }

  return (
    <div className={cn('io-blogs__landing')}>
      <IOLink to={blogsUrls.myblogs(`${userId}`)}>Go To my blogs</IOLink>
      <br />
      {blogs.length > 0 &&
        <ResponsiveRenderer
          renderDesktop={() => <IOHorizontalMenu {...sharedProps} numOfCards={4} />}
          renderLaptop={() => <IOHorizontalMenu {...sharedProps} numOfCards={3} />}
          renderTablet={() => <IOHorizontalMenu {...sharedProps} numOfCards={2} />}
          renderMobileLandscape={() => <IOHorizontalMenu {...sharedProps} numOfCards={1} />}
        />
      }
    </div>
  )
}
