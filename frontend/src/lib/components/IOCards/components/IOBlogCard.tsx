import * as React from 'react';
import cn from 'classnames';
import { Blog } from '../../../../app/types';

interface IOBlogCardProps extends React.HTMLAttributes<HTMLDivElement> {
  blog: Blog;
  className?: string;
}

export const IOBlogCard: React.FC<IOBlogCardProps> = ({ blog: {
  title,
  user,
  description,
  image,
}, className }) => {
  return (
    <div className={cn('io-card', 'io-blog-card', className)}>
      <div>
        <img src={image} alt={'blog-profile'}/>
      </div>
      <b>{title}</b>
      <b>{user}</b>
      <p>{description}</p>
    </div>
  )
}
