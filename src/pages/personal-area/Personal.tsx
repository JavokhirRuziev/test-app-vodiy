import { Button } from '@/components/ui/button';
import { RootState } from 'modules/store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Personal() {
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <>
            <Button className='mt-4 ml-4' onClick={() => navigate('/')}>
                Home
            </Button>
            <div className='flex items-center flex-col'>
                <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
                    {`${user?.firstName} ${user?.lastName}`}
                </h1>
                <div className='flex items-center mt-4 gap-4'>
                    <img src={user?.image} alt='' />
                    <div>
                        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                            {user?.phone}
                        </h3>
                        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                            {user?.email}
                        </h3>
                        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                            {user?.gender}
                        </h3>
                        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                            {user?.birthDate}
                        </h3>
                        <h3 className='scroll-m-20 text-2xl font-semibold tracking-tight'>
                            {user?.age} years old
                        </h3>
                    </div>
                </div>
            </div>
        </>
    );
}
