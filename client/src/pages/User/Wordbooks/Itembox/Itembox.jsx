import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faEllipsis } from '@fortawesome/free-solid-svg-icons';

import styles from './Itembox.module.scss';
import PopperMenu from '~/components/PopperMenu';
import EditFolder from '../EditFolder';
import DeleteFolder from '../DeleteFolder';
import Image from '~/components/Image';
import getListItemInMenuPopper from '~/config/listItemInMenuPopper';

const cx = classNames.bind(styles);

function Itembox({
    nameFolder,
    numberWords,
    nameAuthor = localStorage.getItem('name'),
    avatarAuthor = localStorage.getItem('avatar'),
    description,
    idFolder,
    className,
    onPageChange,
}) {
    const [isPoperEditFolder, setIsPoperEditFolder] = useState(false);
    const [isPoperDeleteFolder, setIsPoperDeleteFolder] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });
    const navigate = useNavigate();

    const inforFolder = { nameFolder, idFolder, description };

    const location = useLocation();
    const currentPath = location.pathname;

    const classes = cx({
        [className]: className,
    });

    const showPoperEditFolder = (e) => {
        e.stopPropagation();
        setIsPoperEditFolder(true);
        document.body.style.overflow = 'hidden';
    };

    const showPoperDeleteFolder = (e) => {
        e.stopPropagation();
        setIsPoperDeleteFolder(true);
        document.body.style.overflow = 'hidden';
    };

    const openDetailFolder = () => {
        const lastIndex = currentPath.lastIndexOf('/');
        const pathToOpenFolder = currentPath.slice(0, lastIndex + 1) + String(idFolder) + '/1';
        navigate(pathToOpenFolder);
    };

    const handleClickMenuItem = (e, data) => {
        switch (data.code) {
            case 'delete':
                showPoperDeleteFolder(e);
                break;
            case 'edit':
                showPoperEditFolder(e);
                break;
            default:
        }
    };

    return (
        <Fragment>
            <div className={classes} onClick={openDetailFolder}>
                {/* name folder */}
                <div className={cx('text-[0.9375rem] font-semibold')}>{nameFolder || 'No name'}</div>
                {/* number words */}
                <div className={cx('mt-[10px]')}>
                    <FontAwesomeIcon className={cx('icon', 'mr-2')} icon={faBookOpen} />
                    <span className={cx('font-medium')}>{numberWords + t('words')}</span>
                </div>
                {/* description */}
                <div className={cx('flex-1 text-[0.75rem] italic text-zinc-900')}>
                    {description && (description.length < 50 ? description : description.substr(0, 50) + '...')}
                </div>
                {/* infor Author */}
                <div className={cx('mb-5 flex flex-1 items-end')}>
                    <div className={cx('flex items-center')}>
                        <Image className={cx('mr-2 h-5 w-5 rounded-full')} src={avatarAuthor} />
                        <span className={cx('text-slate-500')}>{nameAuthor}</span>
                    </div>
                </div>
                {/* operation to Folder */}
                <PopperMenu items={getListItemInMenuPopper().wordBook.Itembox} handleClick={handleClickMenuItem}>
                    <div className={cx('absolute bottom-[5px] right-[10px]')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </PopperMenu>
            </div>
            {isPoperEditFolder && (
                <EditFolder
                    setIsPoperEditFolder={setIsPoperEditFolder}
                    inforFolder={inforFolder}
                    onPageChange={onPageChange}
                />
            )}
            {isPoperDeleteFolder && (
                <DeleteFolder
                    setIsPoperDeleteFolder={setIsPoperDeleteFolder}
                    inforFolder={inforFolder}
                    onPageChange={onPageChange}
                />
            )}
        </Fragment>
    );
}

Itembox.propTypes = {
    nameFolder: PropTypes.string.isRequired,
    numberWords: PropTypes.number.isRequired,
    nameAuthor: PropTypes.string.isRequired,
    description: PropTypes.string,
    avatarAuthor: PropTypes.string.isRequired,
    idFolder: PropTypes.string.isRequired,
    className: PropTypes.string,
    onPageChange: PropTypes.func.isRequired,
};

export default Itembox;
