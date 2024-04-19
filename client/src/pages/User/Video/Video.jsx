import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import styles from './Video.module.scss';
import HeaderSecondnary from '~/components/HeaderSecondnary';
import ItemVideo from './ItemVideo';
import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import { getAllVideos } from '~/services/manageVideoServices';
import { getAllVideoCategories, getVideosCategoryById } from '~/services/manageVideoCategoryServices';
import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames.bind(styles);

function Video() {
    const [listCategories, setListCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listVideo, setListVideo] = useState([]);
    const [totalPage, setTotalPage] = useState(1);

    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    const location = useLocation();
    const navigate = useNavigate();

    const currentPath = location.pathname;
    const [idCategory, setIdCategory] = useState(String(currentPath.split('/')[2]));
    const [currentPage, setCurrentPage] = useState(Number(currentPath.split('/')[3]));

    const paramater = config.getParamaterHeaderSecondnary().Video;

    const onPageChange = (value) => {
        const index = currentPath.lastIndexOf('/');
        const pathToPageChanged = currentPath.slice(0, index + 1) + String(value);
        navigate(pathToPageChanged);
        setCurrentPage(value);
    };

    const changeCategory = (index) => {
        const IdCategory = listCategories[index].id;
        const lastIndex = currentPath.lastIndexOf('/');
        const secondLastIndex = currentPath.lastIndexOf('/', lastIndex - 1);
        const pathToChangedCategory = currentPath.slice(0, secondLastIndex + 1) + String(IdCategory) + '/1';
        navigate(pathToChangedCategory);
        setCurrentPage(1);
        setIdCategory(IdCategory);
    };

    const getAll = async () => {
        setLoading(true);
        await getAllVideos(token, currentPage - 1, listVideo.size)
            .then((result) => {
                setLoading(false);
                setListVideo(result.videos);
                setTotalPage(result.totalPage);
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

    const getVideosOfCategory = async () => {
        setLoading(true);
        await getVideosCategoryById(token, idCategory, currentPage - 1, listVideo.size)
            .then((result) => {
                setLoading(false);
                setListVideo(result.videos);
                setTotalPage(result.totalPage);
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
        setLoading(true);
        getAllVideoCategories(token)
            .then((result) => {
                setLoading(false);
                const listVideosCategories = result.videoCategories.map((category) => ({
                    id: category.id,
                    label: category.name,
                    title: category.name,
                }));
                const categoryAll = [{ id: 'all', label: 'tất cả', title: 'tất cả' }];
                setListCategories([...categoryAll, ...listVideosCategories]);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (idCategory === 'all') {
            getAll();
        } else {
            getVideosOfCategory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, idCategory]);
    return (
        <div className={cx('mb-[40px] w-full')}>
            <HeaderSecondnary
                iconTitle={paramater.iconTitle}
                title={paramater.title}
                backgroundColor={paramater.backgroundColor}
                menuFilter={listCategories}
                onChange={changeCategory}
            />
            <div
                className={cx(
                    'mt-[50px] grid w-full grid-cols-4 gap-y-6 px-[10%]',
                    'max-xl:grid-cols-3',
                    'max-lg:grid-cols-2',
                    'max-sm:grid-cols-1',
                    'wrapper',
                )}
            >
                {listVideo.map((video, index) => (
                    <ItemVideo key={index} inforVideo={video} />
                ))}
            </div>
            <div>
                <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={onPageChange} />
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default Video;
