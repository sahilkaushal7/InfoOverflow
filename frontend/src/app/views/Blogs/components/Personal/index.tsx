import * as React from 'react';
import { Blog } from '../../../../types';
import { getPersonalBlogs } from '../../requests';
import { IOBlogCard } from '../../../../../lib/components/IOCards';
import { IOLink } from '../../../../../lib/elements';
import { blogsUrls } from '../../../../urls';
import ResponsiveRenderer from '../../../../../lib/renderProps/ResponsiveRenderer';
import IOHorizontalMenu from '../../../../../lib/components/IOHorizontalMenu';

interface PersonalBlogsProps {
  urlParams: {
    id?: number;
  }
}

export const PersonalBlogs: React.FC<PersonalBlogsProps> = ({ urlParams }) => {
  const [blogs, setBlogs] = React.useState<Blog[]>([] as Blog[]);

  React.useEffect(() => {
    if (urlParams.id) {
      getPersonalBlogs(urlParams.id).then(
        res => setBlogs(res.data)
      )
    }
  }, [urlParams.id])

  const sharedProps = {
    menuItems: blogs,
    renderMenuItem: (item: Blog) => <IOBlogCard blog={item} />,
    gutterWidth: '4px',
  }

  return (
    <div>
      <IOLink to={blogsUrls.createNewBlog()}>Create new blog</IOLink>
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
