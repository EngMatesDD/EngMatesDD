import classNames from 'classnames/bind';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import styles from './Wordbooks.module.scss';
import HeaderSecondnary from '~/components/HeaderSecondnary';
import Loading from '~/components/Loading';
import Itembox from './Itembox';
import CreateFolder from './CreateFolder';
import { getFolderAll } from '~/services/folderService';
import { getAllCategory } from '~/services/manageWordCategoryServices';
import { updateCurrentPage } from '~/redux/wordBooksSlice';
import notify from '~/utils/notify';
import config from '~/config';
import Pagination from '~/components/Pagination';

const cx = classNames.bind(styles);

function Wordbooks() {
    const [listFolder, setListFolder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPoperCreateFolder, setIsPoperCreateFolder] = useState(false);
    const [totalPage, setTotalPage] = useState(1);
    const [isDeleteorEdit, setIsDeleteorEdit] = useState(false);
    const [isChangeCategory, setIsChangeCategory] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [cookies] = useCookies(['token']);
    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });

    const location = useLocation();
    const currentPath = location.pathname;
    const currentPage = Number(currentPath.split('/')[3]);
    const nameCategory = String(currentPath.split('/')[2]);

    const paramater = config.getParamaterHeaderSecondnary().wordbooks;

    const showPoperCreateFolder = () => {
        setIsPoperCreateFolder(true);
        document.body.style.overflow = 'hidden';
    };

    const onPageChange = (value, isChanged = false) => {
        dispatch(updateCurrentPage(value));
        if (isChanged === true) {
            setIsDeleteorEdit(true);
        }
        const index = currentPath.lastIndexOf('/');
        const pathToPageChanged = currentPath.slice(0, index + 1) + String(value);
        navigate(pathToPageChanged);
    };

    const changeCategory = (index) => {
        const nameCategory = paramater.menuFilter[index].label;
        const lastIndex = currentPath.lastIndexOf('/');
        const secondLastIndex = currentPath.lastIndexOf('/', lastIndex - 1);
        const pathToChangedCategory = currentPath.slice(0, secondLastIndex + 1) + String(nameCategory) + '/1';
        navigate(pathToChangedCategory);
        setIsChangeCategory(true);
    };

    const getMyFolder = async (currentPage = 1) => {
        setLoading(true);
        const token = cookies.token;
        await getFolderAll(token, currentPage - 1, listFolder.size)
            .then((result) => {
                setLoading(false);
                setListFolder(result.folders);
                setTotalPage(result.totalPage);
                setIsDeleteorEdit(false);
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

    const getExploreFolder = async (currentPage = 1) => {
        setLoading(true);
        const token = cookies.token;
        await getAllCategory(token, currentPage - 1, listFolder.size)
            .then((result) => {
                setLoading(false);
                setListFolder(result.wordCategories);
                setTotalPage(result.totalPage);
                setIsDeleteorEdit(false);
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
        if (isChangeCategory === false) {
            if (nameCategory === 'explore') {
                getExploreFolder(currentPage);
            } else {
                getMyFolder(currentPage);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage, isDeleteorEdit]);

    useEffect(() => {
        console.log('nameCategory: ', nameCategory);
        if (isChangeCategory === true) {
            if (nameCategory === 'explore') {
                getExploreFolder();
            } else {
                getMyFolder();
            }
            setIsChangeCategory(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nameCategory]);
    return (
        <Fragment>
            <div className={cx('mb-[100px] w-full')}>
                {/* header */}
                <HeaderSecondnary
                    iconTitle={paramater.iconTitle}
                    title={paramater.title}
                    backgroundColor={paramater.backgroundColor}
                    menuFilter={paramater.menuFilter}
                    onChange={changeCategory}
                />
                <div className={cx('mt-20 flex w-full flex-wrap', 'wrapper')}>
                    {/* button create folder */}
                    <div
                        className={cx(
                            'relative mb-[25px] flex cursor-pointer flex-col rounded-lg p-4',
                            'items-center justify-center text-[1.5625rem]',
                            'item-box',
                            'create-folder',
                        )}
                        onClick={showPoperCreateFolder}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                        <span className={cx('text-base')}>{t('create_folder')}</span>
                    </div>

                    {/* list folder */}
                    {listFolder.map((value, index) => (
                        <Itembox
                            key={index}
                            className={cx('relative mb-[25px] flex cursor-pointer flex-col rounded-lg p-4', 'item-box')}
                            nameFolder={value.name}
                            description={value.description}
                            numberWords={value.wordIds?.length}
                            nameAuthor={localStorage.getItem('name')}
                            avatarAuthor={localStorage.getItem('avatar')}
                            idFolder={value.id}
                            onPageChange={onPageChange}
                        />
                    ))}
                </div>

                {/* Pagination */}
                <div>
                    <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={onPageChange} />
                </div>
            </div>

            {/* popper create folder */}
            {isPoperCreateFolder && (
                <CreateFolder
                    setIsPoperCreateFolder={setIsPoperCreateFolder}
                    onPageChange={onPageChange}
                    setListFolder={setListFolder}
                />
            )}

            {/* loading */}
            {loading && <Loading />}
        </Fragment>
    );
}

export default Wordbooks;
