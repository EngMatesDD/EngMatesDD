import httpRequest from '~/utils/httpRequest';
import config from '~/config';

const getAllNews = async (token, page = 0, size = 12) => {
    const res = await httpRequest.get(config.api.news.GETALL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            size: size,
            page: page,
        },
    });
    return res.data;
};

const deleteNews = async (token, id) => {
    const res = await httpRequest.delete(config.api.news.DELETE, {
        params: {
            id: id,
        },
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const createNews = async (data, token) => {
    const res = await httpRequest.post(config.api.news.CREATE, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const editNews = async (data, token) => {
    const res = await httpRequest.put(config.api.news.EDIT, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};

const getDetailNews = async (id, token) => {
    const res = await httpRequest.get(config.api.news.GETDETAIL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        params: {
            id: id,
        },
    });
    return res.data;
};

export { getAllNews, deleteNews, createNews, editNews, getDetailNews };
