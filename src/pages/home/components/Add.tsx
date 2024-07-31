import { Button } from '@/components/ui/button';
import Input from 'components/Input';
import { SubmitHandler, useForm } from 'react-hook-form';
import { request } from 'utils/request';

type Inputs = {
    brand: string;
    title: string;
    price: string;
    photo: object;
};

export default function Add() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data: any) => {
        const formData = new FormData();
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                formData.append(key, data[key]);
            }
        }

        request
            .post(`/products/add`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(() => {
                alert('Successfully added!');
            })
            .catch(() => {
                alert('Something went wrong!');
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
            <Input
                props={register('brand', { required: true })}
                label='Brand'
                name='brand'
                placeholder='Enter brand name'
                {...{ errors }}
            />
            <Input
                props={register('title', { required: true })}
                label='Title'
                name='title'
                placeholder='Enter title'
                {...{ errors }}
            />
            <Input
                props={register('price', { required: true })}
                label='Price'
                name='price'
                placeholder='Enter price'
                {...{ errors }}
            />
            <Input
                props={register('photo', { required: true })}
                label='Photo'
                name='photo'
                placeholder='Enter photo'
                type='file'
                {...{ errors }}
            />
            <Button type='submit' className='mt-6'>
                Submit
            </Button>
        </form>
    );
}
