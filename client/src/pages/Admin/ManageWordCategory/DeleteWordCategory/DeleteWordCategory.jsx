// import classNames from 'classnames/bind';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';

// import styles from './Delete.module.scss';
import Loading from '~/components/Loading';
import PopperConfirm from '~/components/PopperConfirm';
import { deleteCategory } from '~/services/manageWordCategoryServices';
import notify from '~/utils/notify';
import config from '~/config';

// const cx = classNames.bind(styles);

function DeleteWordCategory({ setIsPoperDeleteWordCategory, categoryId }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageWordCategory' });
    //eslint-disable-next-line no-unused-vars
    const [cookies, setCookie] = useCookies(['token']);

    const closePoper = () => {
        setIsPoperDeleteWordCategory(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleDeletetCategory = async () => {
        await deleteCategory(cookies.token, categoryId).then((result) => {
            setIsPoperDeleteWordCategory(false);
            document.body.style.overflow = 'visible';
            setLoading(false);
            notify.success(config.ManageWordCategory.notification().DELETE_CATEGORY_SUCCESS);
            setTimeout(() => {
                window.location.reload();
            }, 1000);
        });
    };

    const handleDeleteCategory = async () => {
        setLoading(true);
        const messeageNotifyCategory = config.ManageWordCategory.errorMesseage.getMesseageNotify();
        handleMiddleDeletetCategory().catch((error) => {
            setLoading(false);
            const messeageNotify = config.errorMesseage.getMesseageNotify();
            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            const { message } = error.response.data;
            const { messeageLogic } = config.ManageWordCategory.errorMesseage;
            if (error.response.status === 404 && message.includes(messeageLogic.CATEGORY_NOT_FOUND)) {
                notify.error(messeageNotifyCategory.CATEGORY_NOT_FOUND);
                return;
            }
            notify.error(error.response.data.message);
            return;
        });
    };

    return (
        <Fragment>
            <PopperConfirm onClose={closePoper} onSave={handleDeleteCategory}>
                {t('are_you_sure_to_delete_category')}
            </PopperConfirm>

            {loading && <Loading />}
        </Fragment>
    );
}

export default DeleteWordCategory;
