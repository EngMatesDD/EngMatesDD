import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faVolumeLow } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';

import styles from './ItemWord.module.scss';
import { Wrapper as PopperWrapper } from '~/components/Popper';
// import EditFolder from '../EditFolder';
// import DeleteFolder from '../DeleteFolder';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function ItemWord({ infordWord, onPageChange }) {
    const [isPoperEditWord, setIsPoperEditWord] = useState(false);
    const [isPoperDeleteWord, setIsPoperDeleteWord] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordFolder' });
    // const navigate = useNavigate();

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <PopperWrapper className={cx('menu-popper')}>
                <div className={cx('menu-item')} onClick={(e) => showPoperEditWord(e)}>
                    {t('edit')}
                </div>
                <div className={cx('menu-item')} onClick={(e) => showPoperDeleteWord(e)}>
                    {t('delete')}
                </div>
            </PopperWrapper>
        </div>
    );

    const showPoperEditWord = (e) => {
        e.stopPropagation();
        setIsPoperEditWord(true);
        document.body.style.overflow = 'hidden';
    };

    const showPoperDeleteWord = (e) => {
        e.stopPropagation();
        setIsPoperDeleteWord(true);
        document.body.style.overflow = 'hidden';
    };

    return (
        <Fragment>
            <div className={cx('itemWord')}>
                <div className={cx('section1')}>
                    <div>
                        <div className={cx('title')}>
                            <div className={cx('name-word')}>abandon /əˈbændən/</div>
                            <div className={cx('sound')}>
                                <span>US</span>
                                <FontAwesomeIcon icon={faVolumeLow} />
                                <span>UK</span>
                                <FontAwesomeIcon icon={faVolumeLow} />
                            </div>
                        </div>
                        <div className={cx('Definition')}>
                            <div className={cx('title')}>{t('definition')}</div>
                            <div className={cx('content')}>
                                <div>to stop doing an activity before you have finished it</div>
                                <div>từ bỏ, đầu hàng, không làm nữa dù chưa xong</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Image
                            className={cx('image')}
                            src="https://tse4.mm.bing.net/th?id=OIP.RgAVXeYE3WsnWQFzNkf2RwHaEK&pid=Api&P=0&h=220"
                        />
                    </div>
                </div>
                <div className={cx('Example')}>
                    <div className={cx('title')}>{t('example')}</div>
                    <ul className={cx('content')}>
                        <li>The game was abandoned at half-time because of the poor weather conditions.</li>
                        <li>The game was abandoned at half-time because of the poor weather conditions.</li>
                    </ul>
                </div>

                <Tippy
                    interactive
                    delay={[0, 700]}
                    offset={[12, 8]}
                    placement="top-end"
                    zIndex={9}
                    render={renderResult}
                >
                    <div className={cx('menu')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </Tippy>
            </div>
            {/* {isPoperEditFolder && (
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
            )} */}
        </Fragment>
    );
}

ItemWord.propTypes = {
    infordWord: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default ItemWord;
