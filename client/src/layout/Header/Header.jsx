import classNames from 'classnames/bind';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faMagnifyingGlass, faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './Header.module.scss';
import Search from './Search';
import Action from './Action';
import logo from '~/assets/img/logo.png';
import config from '~/config';
import { navigation } from './Constant';

const cx = classNames.bind(styles);

function Header() {
    const [indexNavigate, setIndexNavigate] = useState(-1);
    const [showMenu, setShowMenu] = useState(false);
    const [showBoxSearch, setShowBoxSearch] = useState(false);

    const handleNavigate = (index) => {
        setIndexNavigate(index);
    };

    const handleClickBtnMenu = () => {
        if (showMenu === false) {
            setShowMenu(true);
            return;
        }
        setShowMenu(false);
    };

    const openSearch = () => {
        setShowBoxSearch(true);
    };

    const closeSearch = () => {
        setShowBoxSearch(false);
    };

    return (
        <div className={cx('header')}>
            <div className={cx('inner')}>
                <button className={cx('menu-btn')} onClick={handleClickBtnMenu}>
                    <FontAwesomeIcon icon={faBars} />
                </button>

                <Link to={config.routes.HOME} className={cx('logo-link')}>
                    <img src={logo} alt="NoImage" />
                </Link>

                <Search showBoxSearch={showBoxSearch} />

                <ul
                    className={cx('navigation', {
                        'navigation-active': showMenu,
                    })}
                >
                    {navigation.map((value, index) => {
                        return (
                            <li
                                key={index}
                                className={cx('navigation-item', index === indexNavigate && 'navigation-item-curent')}
                                onClick={() => handleNavigate(index)}
                            >
                                <Link to={value.link} onClick={handleClickBtnMenu}>
                                    {value.title}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {!showBoxSearch && (
                    <button className={cx('open-search')} onClick={openSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                )}
                {showBoxSearch && (
                    <button className={cx('close-search')} onClick={closeSearch}>
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                )}

                <Action />
            </div>
        </div>
    );
}

export default Header;
