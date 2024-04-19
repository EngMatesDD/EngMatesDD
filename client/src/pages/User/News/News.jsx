import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

import styles from './News.module.scss';
import HeaderSecondnary from '~/components/HeaderSecondnary';
import ItemNews from './ItemNews';
import Pagination from '~/components/Pagination';
import Loading from '~/components/Loading';
import { getAllNews } from '~/services/manageNewsServices';
import { getAllCategoriesOfNews, getAllNewsCategoryById } from '~/services/manageNewsCategoryServices';
import notify from '~/utils/notify';
import config from '~/config';

const cx = classNames.bind(styles);

function News() {
    const [listCategories, setListCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [listNews, setListNew] = useState([]);
    const [totalPage, setTotalPage] = useState(1);

    const [cookies] = useCookies(['token']);
    const token = cookies.token;

    const navigate = useNavigate();

    const location = useLocation();
    const currentPath = location.pathname;
    const [idCategory, setIdCategory] = useState(String(currentPath.split('/')[2]));
    const [currentPage, setCurrentPage] = useState(Number(currentPath.split('/')[3]));

    const paramater = config.getParamaterHeaderSecondnary().News;

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
        await getAllNews(token, currentPage - 1, listNews.size)
            .then((result) => {
                setLoading(false);
                setListNew(result.listNews);
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

    const getNewsOfCategory = async () => {
        setLoading(true);
        await getAllNewsCategoryById(token, idCategory, currentPage - 1, listNews.size)
            .then((result) => {
                setLoading(false);
                setListNew(result.newsList);
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
        getAllCategoriesOfNews(token)
            .then((result) => {
                setLoading(false);
                const listNewsCategories = result.newsCategories.map((category) => ({
                    id: category.id,
                    label: category.name,
                    title: category.name,
                }));
                const categoryAll = [{ id: 'all', label: 'tất cả', title: 'tất cả' }];
                setListCategories([...categoryAll, ...listNewsCategories]);
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
            getNewsOfCategory();
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
                {listNews.map((news, index) => (
                    <ItemNews key={index} inforNew={news} />
                ))}
            </div>
            <div>
                <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={onPageChange} />
            </div>
            {loading && <Loading />}
        </div>
    );
}

export default News;
