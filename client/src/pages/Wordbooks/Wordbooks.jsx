import classNames from 'classnames/bind';
import { useState, useEffect, Fragment } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

// import Input from '~/components/Input';
import styles from './Wordbooks.module.scss';
import HeaderSecondnary from '~/components/HeaderSecondnary';
import Loading from '~/components/Loading';
import Itembox from './Itembox';
import { getFolderAll } from '~/services/folderService';
import { initialListFolder } from '~/redux/wordBooksSlice';
import notify from '~/utils/notify';
import config from '~/config';
import CreateFolder from './CreateFolder';

const cx = classNames.bind(styles);

function Wordbooks() {
    const [listFolder, setListFolder] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isPoperCreateFolder, setIsPoperCreateFolder] = useState(false);

    const listFolderRedux = useSelector((state) => state.wordBooks);

    const dispatch = useDispatch();
    // eslint-disable-next-line no-unused-vars
    const [cookies, setCookies] = useCookies(['token']);
    const { t } = useTranslation('translation', { keyPrefix: 'WordBooks' });

    const showPoperCreateFolder = () => {
        setIsPoperCreateFolder(true);
        document.body.style.overflow = 'hidden';
    };
    useEffect(() => {}, [cookies]);

    useEffect(() => {
        //if listFolder is existed in redux, not call API
        if (listFolderRedux.listFolder) {
            setListFolder(listFolderRedux.listFolder);
            return;
        }

        const token = cookies.token;
        setLoading(true);
        getFolderAll(token)
            .then((result) => {
                setLoading(false);
                dispatch(initialListFolder(result.folders));
                setListFolder(result.folders);
                return;
            })
            .catch((error) => {
                setLoading(false);
                const messeageNotify = config.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    return;
                }
                console.log(error);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const paramater = config.getParamaterHeaderSecondnary().wordbooks;
    return (
        <Fragment>
            <div className={cx('wordbooks')}>
                <HeaderSecondnary
                    iconTitle={paramater.iconTitle}
                    title={paramater.title}
                    backgroundColor={paramater.backgroundColor}
                    menuFilter={paramater.menuFilter}
                />
                <div className={cx('wrapper')}>
                    <div className={cx('item-box', 'create-folder')} onClick={showPoperCreateFolder}>
                        <FontAwesomeIcon icon={faPlus} />
                        <span className={cx('content')}>{t('create_folder')}</span>
                    </div>
                    {listFolder.map((value, index) => (
                        <Itembox
                            key={index}
                            className={cx('item-box')}
                            nameFolder={value.name}
                            numberWords={value.wordIds.length}
                            nameAuthor={localStorage.getItem('name')}
                            avatarAuthor={localStorage.getItem('avatar')}
                            idFolder={value.id}
                        />
                    ))}
                </div>
            </div>
            {isPoperCreateFolder && <CreateFolder setIsPoperCreateFolder={setIsPoperCreateFolder} />}
            {loading && <Loading />}
        </Fragment>
    );
}

export default Wordbooks;
