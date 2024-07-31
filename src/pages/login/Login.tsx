import { Button } from '@/components/ui/button';
import Input from 'components/Input';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from 'modules/actions';
import { RootState } from 'modules/store';
import { useEffect } from 'react';

type Inputs = {
    username: string;
    password: string;
};

export default function LoginPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, token } = useSelector(
        (state: RootState) => state.auth
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        dispatch(login(data.username, data.password));
    };

    useEffect(() => {
        if (token) {
            navigate('/');
        }
    }, [token, navigate]);

    return (
        <div className='mx-auto w-80 my-64 p-8 border border-black rounded-md'>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col'>
                <Input
                    props={register('username', { required: true })}
                    label='User Name'
                    name='username'
                    placeholder='Enter your name'
                    {...{ errors }}
                    defaultValue={'emilys'}
                />
                <Input
                    props={register('password', { required: true })}
                    label='Password'
                    name='password'
                    placeholder='Enter password'
                    {...{ errors }}
                    defaultValue={'emilyspass'}
                />
                <Button type='submit' className='mt-6' disabled={loading}>
                    {loading ? 'Submitting...' : 'Submit'}
                </Button>
                {error && <div className='text-red-500 mt-2'>{error}</div>}
            </form>
        </div>
    );
}
