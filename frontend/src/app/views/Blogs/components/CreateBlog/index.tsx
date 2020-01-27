import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { IOCard } from '../../../../../lib/components/IOCards';
import { IOInput } from '../../../../../lib/elements/IOInput';
import { createBlog } from '../../requests';

interface CreateBlogProps {
  userId: number;
}

export const CreateBlog: React.FC<CreateBlogProps> = ({ userId }) => {
  const [description, setDescription] = React.useState('');

  const handleDescriptionChange = (value: string) => {
    setDescription(value);
  }

  const updateDetails = (e: any) => {
    e.preventDefault();
    const elements = e.target.elements;
    const title = elements.title.value;
    const image = elements.image.files[0];
    let formData = new FormData();
    formData.append('user', String(userId));
    formData.append('title', title);
    formData.append('description', description)

    if (image) {
      formData.append('image', image, image.name);
    }

    if (userId) {
      createBlog(formData);
    }
  }

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <IOCard>
      <form onSubmit={(e) => { updateDetails(e); return false; }}>
        <IOInput
          type={'text'}
          placeholder={'Title'}
          name={'title'}
        />
        <ReactQuill
          value={description || ''}
          onChange={handleDescriptionChange}
          placeholder={'Enter your description'}
          modules={modules}
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
