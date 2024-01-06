import classNames from 'classnames/bind';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';


import styles from './RequiredLogin.module.scss';

const cx = classNames.bind(styles);

function RequiredLogin() {
    const { t } = useTranslation('translation', { keyPrefix: 'OtherPage' });
    return (
        <div className={cx('wrapper')}>
            <div className={cx('w-full border-l-2 border-l-black py-3 px-4 bg-amber-100 text-amber-600')}>
                <FontAwesomeIcon className={cx("icon")} icon={faTriangleExclamation}/>
                {t('requires_login')}</div>
        </div>
    );
}

export default RequiredLogin;
