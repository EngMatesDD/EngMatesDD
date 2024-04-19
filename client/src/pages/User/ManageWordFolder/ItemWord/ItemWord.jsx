import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis, faVolumeLow } from '@fortawesome/free-solid-svg-icons';
import { Howl } from 'howler';

import styles from './ItemWord.module.scss';
import PopperMenu from '~/components/PopperMenu';
import EditWord from '../EditWord';
import DeleteWord from '../DeleteWord';
//import Image from '~/components/Image';
import getListItemInMenuPopper from '~/config/listItemInMenuPopper';

const cx = classNames.bind(styles);

function ItemWord({ inforWord, onPageChange }) {
    const [isPoperEditWord, setIsPoperEditWord] = useState(false);
    const [isPoperDeleteWord, setIsPoperDeleteWord] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordFolder' });

    const soundPlay = (src) => {
        const sound = new Howl({ src, html5: true });
        sound.play();
    };

    const playSoundUK = () => {
        soundPlay(inforWord.pronunciationUKAudio);
    };

    const playSoundUS = () => {
        soundPlay(inforWord.pronunciationUSAudio);
    };

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

    const handleClickMenuItem = (e, data) => {
        switch (data.code) {
            case 'delete':
                showPoperDeleteWord(e);
                break;
            case 'edit':
                showPoperEditWord(e);
                break;
            default:
        }
    };

    return (
        <Fragment>
            <div className={cx('itemWord', 'relative mb-6 w-full rounded-lg border-[1px] border-solid p-7 ')}>
                <div className={cx('flex justify-between')}>
                    <div>
                        <div className={cx('flex')}>
                            {/* name word */}
                            <div className={cx('mr-2 text-xl font-semibold')}>
                                {inforWord.name + ' '}
                                {inforWord.pronunciationUK}
                            </div>
                            {/* pronounce */}
                            <div className={cx('flex items-center font-normal ')}>
                                <span className={cx('my-0 ml-[10px] mr-1 !text-black')}>US</span>
                                <FontAwesomeIcon icon={faVolumeLow} onClick={playSoundUS} />
                                <span className={cx('my-0 ml-[10px] mr-1 !text-black')}>UK</span>
                                <FontAwesomeIcon icon={faVolumeLow} onClick={playSoundUK} />
                            </div>
                        </div>

                        {/* definition */}
                        <div className={cx('mt-[10px]')}>
                            <div className={cx('font-semibold')}>{t('definition')}</div>
                            <div>
                                <div>{inforWord?.types[0]?.means[0]?.conceptEnglish.slice(0, -1)}</div>
                                <div className={cx('bg-blue-200')}>
                                    {inforWord?.types[0]?.means[0]?.conceptVietnamese || 'Sẽ có khi có API'}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <Image
                            className={cx('w-[160px] rounded-lg')}
                            src="https://tse4.mm.bing.net/th?id=OIP.RgAVXeYE3WsnWQFzNkf2RwHaEK&pid=Api&P=0&h=220"
                        /> */}
                    </div>
                </div>
                {/* example */}
                {inforWord?.types[0]?.means[0]?.examples?.length !== 0 && (
                    <div className={cx('mt-[10px]')}>
                        <div className={cx('font-semibold ')}>{t('example')}</div>
                        <ul className={cx('list-inside')}>
                            {inforWord?.types[0]?.means[0]?.examples.map((value, index) => (
                                <li key={index}>{value.example}</li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* operation to word */}
                <PopperMenu items={getListItemInMenuPopper().wordBook.Itembox} handleClick={handleClickMenuItem}>
                    <div className={cx('absolute bottom-[5px] right-[10px] cursor-pointer')}>
                        <FontAwesomeIcon icon={faEllipsis} />
                    </div>
                </PopperMenu>
            </div>
            {/* popper edit word */}
            {isPoperEditWord && (
                <EditWord setIsPoperEditWord={setIsPoperEditWord} inforWord={inforWord} onPageChange={onPageChange} />
            )}
            {/* popper delete word */}
            {isPoperDeleteWord && (
                <DeleteWord
                    setIsPoperDeleteWord={setIsPoperDeleteWord}
                    inforWord={inforWord}
                    onPageChange={onPageChange}
                />
            )}
        </Fragment>
    );
}

ItemWord.propTypes = {
    inforWord: PropTypes.object.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default ItemWord;
