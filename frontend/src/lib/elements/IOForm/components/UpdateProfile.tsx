import * as React from 'react';
import { IOInput } from '../../IOInput';
import cn from 'classnames';

interface UpdateProfileProps {
  submitHandler: (e: any) => void;
  handleImageChange: (e: any) => void;
  status: string;
}

export const UpdateProfile = React.forwardRef(({ submitHandler, handleImageChange, status }: UpdateProfileProps, ref) => {
  return (
    <div>
      <form
        className={cn('io-form')}
        onSubmit={submitHandler} >
        <IOInput
          type={'file'}
          id={'image'}
          accept={"image/png, image/jpeg"}
          name={'avatar'}
          onChange={handleImageChange}
          ref={ref}
        />
        <IOInput
          type={'text'}
          name={'status'}
          placeholder={status ? status : 'Enter your status'}
        />
        <IOInput type={'submit'} value={'Update'} />
        <br />
      </form>
    </div>
  )
});
