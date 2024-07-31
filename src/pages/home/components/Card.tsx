import { request } from 'utils/request';
import { ReactComponent as Delete } from '../../../assets/icons/delete.svg';
import { ReactComponent as EditIcon } from '../../../assets/icons/edit.svg';
import { Modal } from 'components/Modal';
import Edit from './Edit';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
interface Element {
    el: {
        id: number;
        images: string[];
        price: number;
        brand: string;
        title: string;
    };
    onClick: () => void;
}

export default function Card({ el, onClick }: Element) {
    const [selected, setSelected] = useState<any>();
    const handleDeleteProduct = (id: number) => {
        request
            .delete(`/products/${id}`)
            .then((res) => alert('Successfully deleted!'))
            .catch((err) => alert('something went wrong!'));
    };

    return (
        <div
            key={el?.id}
            className='w-64 relative border border-black rounded-md px-3 py-2 bg-slate-50 hover:shadow hover:shadow-lg transition-shadow duration-200 cursor-pointer'
        >
            <Button className='absolute top-2 right-2 p-2'>
                <Delete onClick={() => handleDeleteProduct(el?.id)} />
            </Button>

            <Modal
                buttonText={<EditIcon className='fill-black' />}
                onClick={() => setSelected(el)}
            >
                <Edit selected={selected} />
            </Modal>
            <img
                src={el?.images[0]}
                alt='product-image'
                className='w-64 object-contain h-64'
                onClick={onClick}
            />
            <p
                className='leading-7 [&:not(:first-child)] absolute top-56 right-3 text-orange-400'
                onClick={onClick}
            >
                {el?.price}$
            </p>
            <p className='leading-7 [&:not(:first-child)]' onClick={onClick}>
                {el?.brand}
            </p>
            <p className='leading-7 [&:not(:first-child)]' onClick={onClick}>
                {el?.title}
            </p>
        </div>
    );
}
