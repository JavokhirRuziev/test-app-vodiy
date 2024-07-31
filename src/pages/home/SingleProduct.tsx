import { useEffect, useState } from 'react';
import { request } from 'utils/request';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function SingleProduct() {
    const [searchParams] = useSearchParams();
    const id = searchParams.get('id');
    const [product, setProduct] = useState<any>();
    const navigate = useNavigate();

    useEffect(() => {
        request
            .get(`/products/${id}`)
            .then((res) => setProduct(res.data))
            .catch((err) => alert(err));
    }, []);

    return (
        <div>
            <Button onClick={() => navigate('/')} className='mt-4 ml-4'>
                Home
            </Button>

            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-6 text-center'>
                {product?.title}
            </h1>
            <div className='mx-auto flex items-center gap-4 justify-center'>
                <img
                    src={product?.images[0]}
                    alt='product-image'
                    className='w-80 object-contain h-80 '
                />
                <div className='w-80'>
                    <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight text-orange-400'>
                        {product?.price}$
                    </h3>
                    <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
                        {product?.brand}
                    </h2>
                    <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight text-slate-500	'>
                        {product?.description}
                    </h3>
                </div>
            </div>
        </div>
    );
}
