import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useState, Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

import PopperForm from '~/components/PopperForm';
import Loading from '~/components/Loading';
import Input from '~/components/Input';
import notify from '~/utils/notify';
import config from '~/config';
import getValid from '../validateForm';
import { createNews } from '~/services/manageNewsServices';

function AddNews({ setIsPoperAddNews, onPageChange }) {
    const [loading, setLoading] = useState(false);

    const { t } = useTranslation('translation', { keyPrefix: 'ManageNews' });
    const [cookies] = useCookies(['token']);

    const location = useLocation();

    const currentPath = location.pathname;
    const categoryId = currentPath.split('/')[2];
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const valid = getValid();

    const closePoper = () => {
        setIsPoperAddNews(false);
        document.body.style.overflow = 'visible';
    };

    const handleMiddleCreateNews = async (data) => {
        await createNews(data, cookies.token);
        await onPageChange(1, true);
        setIsPoperAddNews(false);
        document.body.style.overflow = 'visible';
        setLoading(false);
        notify.success(config.manageNews.notification().ADD_NEWS_SUCCESS);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    const handleCreateNews = async (formData, e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            title: formData.title,
            content: formData.content,
            categoryId: categoryId,
        };
        const messeageNotify = config.manageWordFolder.errorMesseage.getMesseageNotify();
        handleMiddleCreateNews(data).catch((error) => {
            setLoading(false);

            if (!error.response) {
                notify.error(messeageNotify.ERROR_NETWORD);
                return;
            }

            notify.error(error.response.data.message);
            return;
        });
    };
    return (
        <Fragment>
            <PopperForm
                onClose={closePoper}
                onSave={handleCreateNews}
                handleSubmitForm={handleSubmit}
                title={t('add_news')}
            >
                <Input
                    name={'title'}
                    label={t('title')}
                    {...register('title', valid.title)}
                    errolMesseage={errors.title?.message}
                />
                <Input
                    name={'content'}
                    label={t('content')}
                    {...register('content', valid.content)}
                    errolMesseage={errors.definition?.message}
                    textArea={true}
                />
            </PopperForm>
            {loading && <Loading />}
        </Fragment>
    );
}

AddNews.propTypes = {
    setIsPoperAddNews: PropTypes.func.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default AddNews;
