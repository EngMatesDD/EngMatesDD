import classNames from 'classnames/bind';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import styles from './Login.module.scss';
import Input from '~/components/Input';
import WrapperAuth from '~/components/WrapperAuth';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import valid from '../logicAuth';
import config from '~/config';
import { loginUser } from '~/redux/userSlice';
import notify from '~/utils/notify';

const cx = classNames.bind(styles);

function Login() {
    const { loading } = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = (formData, e) => {
        e.preventDefault();

        const data = {
            username: formData.username,
            password: formData.password,
        };

        dispatch(loginUser(data)).then((result) => {
            const payload = result.payload;
            if (!payload?.statusCode) {
                notify.success(config.notification.LOGIN_SUCCESS);
                navigate(config.routes.HOME);
                return;
            }

            if (payload.statusCode && payload.statusCode === 400) {
                if (payload.message.includes(config.errorMesseage.WRONG_NAME_OR_PASSWORD)) {
                    setError('username', { type: 'custom', message: payload.message });
                    setError('password', { type: 'custom', message: payload.message });
                    return;
                }
                if (payload.message.includes(config.errorMesseage.EMAIL_NOT_VERIFY)) {
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('password', data.password);
                    navigate(config.routes.VERIFYREGISTER);
                    return;
                }
            }
            return;
        });
    };

    return (
        <WrapperAuth title="Login">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Input
                    name={'username'}
                    placeholder={'Username'}
                    autoComplete={'username'}
                    {...register('username', valid.userName)}
                    errolMesseage={errors.username?.message}
                />
                <Input
                    name={'password'}
                    placeholder={'Password'}
                    type={'password'}
                    autoComplete={'current-password'}
                    {...register('password', valid.password)}
                    errolMesseage={errors.password?.message}
                />
                <Button className={cx('btn')} primary rounded>
                    {loading ? <Loading /> : 'Login'}
                </Button>
            </form>
            <Button className={cx('btn', 'btn-google')} red rounded leftIcon={faGoogle}>
                Login with google
            </Button>
            <div className={cx('modifer')} id="modifer">
                <Link to={config.routes.FORGETPASSWORD}>Forgot password?</Link>
                <Link to={config.routes.SIGNUP}>Sign up</Link>
            </div>
        </WrapperAuth>
    );
}

export default Login;
