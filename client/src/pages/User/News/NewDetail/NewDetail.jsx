import classNames from 'classnames/bind';
import { Fragment, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import styles from './NewDetail.module.scss';
import ItemNews from '../ItemNews';
import Loading from '~/components/Loading';
import Error from '~/pages/OtherPage/NotExist';
import Image from '~/components/Image';
import { getDetailNews } from '~/services/manageNewsServices';
import { getAllNewsCategoryById } from '~/services/manageNewsCategoryServices';
// import ImgNew from '../img_news.png';
import notify from '~/utils/notify';
import config from '~/config';
import NoimageAvatar from '~/assets/img/noImageAvatar.png';

const cx = classNames.bind(styles);

function NewDetail() {
    const [loading, setLoading] = useState(false);
    const [inforNews, setInforNews] = useState({});
    const [listNewsSuggesion, setListNewsSuggesion] = useState([]);

    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    const location = useLocation();
    // eslint-disable-next-line no-unused-vars
    const { t } = useTranslation('translation', { keyPrefix: 'News' });

    const currentPath = location.pathname;
    const NewsId = String(currentPath.split('/')[3]);

    const NewsDate = new Date(inforNews?.createdAt);

    const formatTime = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0, nên phải cộng thêm 1
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();

        // Tạo chuỗi ngày tháng năm có định dạng mong muốn (vd: dd/mm/yyyy hh:mm:ss)
        const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
        return formattedDate;
    };

    const getNewsOfCategory = async () => {
        setLoading(true);
        await getAllNewsCategoryById(token, inforNews.categoryId)
            .then((result) => {
                setLoading(false);
                setListNewsSuggesion(result.newsList);
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
        getNewsOfCategory();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inforNews]);

    useEffect(() => {
        setLoading(true);
        getDetailNews(NewsId, token)
            .then((result) => {
                setLoading(false);
                setInforNews(result);
                return;
            })
            .catch((error) => {
                setLoading(false);
                setInforNews(null);
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
            {inforNews && (
                <div className={cx('mb-[80px] w-full')}>
                    <div className={cx('new-container mt-20  px-[18%]', 'max-sm:px-[5%]')}>
                        <div className={cx('text-3xl font-medium')}>{inforNews.title}</div>
                        <div className={cx('mb-3 mt-4 flex flex-wrap items-center justify-start gap-2 text-sm')}>
                            <Image src="" fallback={NoimageAvatar} className={cx(' h-5 w-5 rounded-full')} />
                            <div className={cx('font-semibold')}>Minh Phương</div>
                            <div className={cx('text-black/50')}>{formatTime(NewsDate)}</div>
                        </div>
                        {/* <Image src={ImgNew} className={cx('mt-12 w-full rounded-sm')} /> */}

                        {inforNews.content}
                        <div className={cx('mt-4 h-[2px] w-full bg-primary-color')}></div>
                        <div className={cx('mt-6 text-xl font-semibold')}>{t('related_news')}</div>
                        <div
                            className={cx(
                                'mt-[50px] grid w-full grid-cols-3 gap-y-6',
                                'max-xl:grid-cols-2',
                                'max-lg:grid-cols-1',
                                'wrapper',
                            )}
                        >
                            {listNewsSuggesion.map((news, index) => (
                                <ItemNews key={index} inforNew={news} />
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {!inforNews && <Error />}
            {loading && <Loading />}
        </Fragment>
    );
}

export default NewDetail;
