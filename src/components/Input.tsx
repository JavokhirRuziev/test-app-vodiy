import * as React from 'react';
import { Input as InputBase } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FieldErrors } from 'react-hook-form';

type InputProps = React.ComponentProps<typeof InputBase>;

export default function Input({
    props,
    label,
    errors,
    name,
    placeholder,
    type,
    defaultValue,
}: {
    props: InputProps;
    label?: string;
    errors: FieldErrors;
    name: string;
    placeholder?: string;
    type?: string;
    defaultValue?: string | any;
}) {
    return (
        <div className='relative mb-5'>
            <div className='flex flex-col space-y-1.5'>
                <Label htmlFor={name}>{label}</Label>
                <InputBase
                    id={name}
                    {...props}
                    placeholder={placeholder}
                    type={type ? type : 'text'}
                    defaultValue={defaultValue}
                />
            </div>
            {errors && errors[name] && (
                <p className='absolute bottom-22 text-rose-500'>
                    This field is required
                </p>
            )}
        </div>
    );
}
