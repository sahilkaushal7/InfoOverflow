import * as React from 'react';
import ReactQuill from 'react-quill';
import { Blog } from '../../../../types';
import 'react-quill/dist/quill.snow.css';
import { IOCard } from '../../../../../lib/components/IOCards';
import { IOInput } from '../../../../../lib/elements/IOInput';
import { createBlog } from '../../requests';

interface CreateBlogProps {
  userId: number;
}

export const CreateBlog: React.FC<CreateBlogProps> = ({ userId }) => {
  const [blog, setBlog] = React.useState({} as Blog);

  const handleDescriptionChange = (value: string) => {
    setBlog({
      ...blog,
      description: value
    })
  }

  const updateDetails = (e: any) => {
    e.preventDefault();
    const elements = e.target.elements;
    const title = elements.title.value;
    const image = elements.image.files[0];
    let formData = new FormData();
    formData.append('user', String(userId));
    formData.append('title', title);
    formData.append('description', blog.description)

    if (image) {
      formData.append('image', image, image.name);
    }

    if (userId) {
      createBlog(formData);
    }
  }

  return (
    <IOCard>
      <form onSubmit={(e) => { updateDetails(e); return false; }}>
        <IOInput
          type={'text'}
          value={blog.title}
          placeholder={'Title'}
          name={'title'}
        />
        <ReactQuill
          value={blog.description || ''}
          onChange={handleDescriptionChange}
          placeholder={'Enter your description'}
        />
        <IOInput
          type={'file'}
          accept={"image/png, image/jpeg"}
          name={'image'}
        />
        <IOInput type={'submit'} value={'Update'} />
      </form>
    </IOCard>
  )
}
