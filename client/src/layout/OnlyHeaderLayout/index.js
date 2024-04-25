import classNames from 'classnames/bind';

import styles from './OnlyHeaderLayout.module.scss';
import Header from '../Header/HeaderDefault';

const cx = classNames.bind(styles);

function OnlyHeaderLayout({ children }) {
    return (
        <div className={cx('wrapper')}>
            <Header />
            <div className={cx('content')}>{children}</div>
        </div>
    );
}

export default OnlyHeaderLayout;
