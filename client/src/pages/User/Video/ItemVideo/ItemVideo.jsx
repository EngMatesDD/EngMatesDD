import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import styles from './ItemVideo.module.scss';
import Image from '~/components/Image';
import ImgVideo from './imgVideo.jpg';
import config from '~/config';

const cx = classNames.bind(styles);

function ItemVideo({ inforVideo, pageDetail }) {
    const navigate = useNavigate();

    const { t } = useTranslation('translation', { keyPrefix: 'Forum' });

    const nowDate = new Date();
    const commentDate = new Date(inforVideo?.createdAt);
    const differenceInTime = nowDate.getTime() - commentDate.getTime();

    const convertTime = (time) => {
        let timeconverted = time / (1000 * 3600 * 24 * 365);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('year');
        }

        timeconverted = time / (1000 * 3600 * 24 * 30);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('month');
        }

        timeconverted = time / (1000 * 3600 * 24 * 7);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('week');
        }

        timeconverted = time / (1000 * 3600 * 24);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('day');
        }

        timeconverted = time / (1000 * 3600);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('hour');
        }

        timeconverted = time / (1000 * 60);
        if (timeconverted >= 1) {
            return String(Math.floor(timeconverted)) + ' ' + t('minute');
        }

        return 'just_finished';
    };

    const openNewDetail = () => {
        const idCategory = inforVideo?.categpryId ? inforVideo?.categpryId : 'all';
        const pathToOpenFolder =
            config.routes.video.VIDEO + '/' + String(idCategory) + '/' + String(inforVideo?.id) + '/0';
        navigate(pathToOpenFolder);
    };

    return (
        <div
            className={cx('flex items-center justify-center ', { 'h-[120px] !items-start': pageDetail })}
            onClick={openNewDetail}
        >
            <div
                className={cx(
                    'flex w-[240px] cursor-pointer flex-wrap overflow-hidden rounded-lg',
                    'hover:!text-text-color-link ',
                    { 'w-full justify-between': pageDetail },
                )}
            >
                {inforVideo ? (
                    <video
                        className={cx('h-[150px] w-full', { 'h-[92px] !w-[170px]': pageDetail })}
                        src={inforVideo.url}
                    ></video>
                ) : (
                    <Image className={cx('h-[150px] w-full', { 'h-[92px] !w-[170px]': pageDetail })} src={ImgVideo} />
                )}

                <div className={cx({ 'w-[170px] text-sm': pageDetail })}>
                    <div className={cx('mt-2 font-semibold leading-4', { '!mt-0': pageDetail })}>
                        {inforVideo?.title || 'name is not avaiable'}
                    </div>
                    {/* <div className={cx('mt-1 flex items-center font-medium', { 'mt-2': pageDetail })}>
                        <Image
                            className={cx('mr-3 h-[25px] w-[25px] rounded-full')}
                            src={''}
                            fallback={noImageAvatar}
                        />
                        <div>{inforVideo?.nameAuthor || 'Pen channel'}</div>
                    </div> */}
                    <div className={cx('mt-1 flex items-center pb-4 font-medium')}>{convertTime(differenceInTime)}</div>
                </div>
            </div>
        </div>
    );
}

ItemVideo.propTypes = { inforVideo: PropTypes.object };

export default ItemVideo;
