import classNames from 'classnames/bind';
import { useEffect, useState, Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useTranslation } from 'react-i18next';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';

import styles from './VideoDetail.module.scss';
import ItemVideo from '../ItemVideo';
import Error from '~/pages/OtherPage/NotExist';
import Loading from '~/components/Loading';
import Image from '~/components/Image';
import ReactPlayer from 'react-player';
import { getDetailVideo } from '~/services/manageVideoServices';
import { getVideosCategoryById } from '~/services/manageVideoCategoryServices';
import notify from '~/utils/notify';
import config from '~/config';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

function NewDetail() {
    const [loading, setLoading] = useState(false);
    const [inforVideo, setInforVideo] = useState({});
    const [listVideoSuggesion, setListVideoSuggesion] = useState([]);

    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    const location = useLocation();

    const currentPath = location.pathname;
    const VideoId = String(currentPath.split('/')[3]);

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

    const getVideosOfCategory = async () => {
        setLoading(true);
        await getVideosCategoryById(token, inforVideo.categpryId)
            .then((result) => {
                setLoading(false);
                setListVideoSuggesion(result.videos);
                return;
            })
            .catch((error) => {
                setLoading(false);
                const messeageNotify = config.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }
            });
    };

    useEffect(() => {
        getVideosOfCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inforVideo]);

    useEffect(() => {
        setLoading(true);
        getDetailVideo(VideoId, token)
            .then((result) => {
                setLoading(false);
                setInforVideo(result);
                return;
            })
            .catch((error) => {
                setLoading(false);
                setInforVideo(null);
                const messeageNotify = config.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }
            });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPath]);

    return (
        <Fragment>
            {inforVideo && (
                <div className={cx('mb-[80px] w-full')}>
                    <div
                        className={cx(
                            'new-container mt-20  flex flex-wrap justify-between gap-y-4 px-[10%]',
                            'max-[1350px]:justify-center max-[1350px]:px-[5%]',
                        )}
                    >
                        <div className={cx('w-[700px] overflow-hidden')}>
                            <ReactPlayer
                                url={inforVideo.url}
                                controls
                                className={cx(
                                    '!h-[390px] !w-full overflow-hidden rounded-xl',
                                    'max-md:h-[310px] max-md:w-[500px]',
                                )}
                            />
                            <div className={cx('mt-1 text-3xl font-medium')}>{inforVideo.title}</div>
                            <div className={cx('mt-4 flex flex-wrap items-center justify-start gap-2 text-base')}>
                                <Image src="" fallback={NoimageAvatar} className={cx(' h-5 w-5 rounded-full')} />
                                <div className={cx('font-semibold')}>Minh Phương</div>
                                <div className={cx('w-full font-medium')}>{convertTime(differenceInTime)}</div>
                            </div>
                            <Button primary rightIcon={faChevronCircleDown} className={cx('mt-10 rounded-full px-3')}>
                                Show transcripts
                            </Button>
                            {/* <div className={cx('mt-3 text-justify')}>
                                Thanks for attending this management meeting. As you know, (89) despite our strategy of
                                positioning ourselves as a seller of high-quality furniture, (90) we've been losing
                                business to several secondhand stores selling used furniture in the area. There's one
                                thing that we can start doing that many other furniture stores aren't: offering free
                                assembly. By developing cross-functional delivery teams, we'll be able to gain a
                                competitive edge. So (91) next month, all of our delivery teams will attend sessions
                                where they'll learn how to assemble our products in customers' homes.
                            </div> */}
                        </div>
                        <div className={cx('w-[350px]')}>
                            {listVideoSuggesion.map((video, index) => (
                                <ItemVideo key={index} inforVideo={video} pageDetail />
                            ))}
                        </div>
                    </div>
                    {loading && <Loading />}
                </div>
            )}
            {!inforVideo && <Error />}
        </Fragment>
    );
}

export default NewDetail;
