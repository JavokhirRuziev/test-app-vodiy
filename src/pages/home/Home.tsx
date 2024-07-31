import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { request } from 'utils/request';
import { ReactComponent as LogOut } from '../../assets/icons/logout.svg';
import Card from './components/Card';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'modules/store';
import { logout } from 'modules/actions';
import { Modal } from 'components/Modal';
import Add from './components/Add';

export default function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [products, setProducts] = useState<any>();
    const { user } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        request
            .get('/products')
            .then((res) => setProducts(res.data))
            .catch((err) => alert(err));
    }, []);

    const handleGoToProduct = (id: number) => navigate(`/product?id=${id}`);
    const handleLogOut = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <div>
            <div className='flex items-center justify-between mt-4 mx-4'>
                <Button onClick={handleLogOut}>
                    <LogOut /> Log out
                </Button>
                <Modal buttonText='Add product'>
                    <Add />
                </Modal>
                <Button onClick={() => navigate('/personal-area')}>
                    {user?.firstName?.slice(0, 1)}.{user?.lastName}
                </Button>
            </div>
            <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-6 text-center'>
                Products
            </h1>
            <div className='flex flex-wrap gap-5 justify-center mb-5'>
                {products?.products?.map((el: any | undefined) => (
                    <Card
                        {...{ el, onClick: () => handleGoToProduct(el?.id) }}
                    />
                ))}
            </div>
        </div>
    );
}
