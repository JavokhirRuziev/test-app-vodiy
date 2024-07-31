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
type Selected = {
    brand: string;
    title: string;
    price: string;
    images: string[];
    id: string;
};

export default function Edit({ selected }: { selected: Selected | undefined }) {
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
            .put(`/products/${selected?.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
            .then(() => {
                alert('Successfully edited!');
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
                defaultValue={selected?.brand}
            />
            <Input
                props={register('title', { required: true })}
                label='Title'
                name='title'
                placeholder='Enter title'
                {...{ errors }}
                defaultValue={selected?.title}
            />
            <Input
                props={register('price', { required: true })}
                label='Price'
                name='price'
                placeholder='Enter price'
                {...{ errors }}
                defaultValue={selected?.price}
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
