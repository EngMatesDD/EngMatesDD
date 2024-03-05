import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { getAllVideos } from '~/services/manageVideoServices';
import { useCookies } from 'react-cookie';
import notify from '~/utils/notify';
import config from '~/config';
import Loading from '~/components/Loading';
import { useTranslation } from 'react-i18next';
import Pagination from '~/components/Pagination';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DeleteNews from './DeleteVideo';
import AddNews from './AddVideo';
import EditVideo from './EditVideo.jsx/EditVideo';
import AddVideo from './AddVideo';
import DeleteVideo from './DeleteVideo';

function ManageVideo() {
    const location = useLocation();
    const currentPath = location.pathname;
    const currentPage = currentPath.split('/')[2];
    const [allVideos, setAllVideos] = useState([]);
    const [data, setData] = useState();
    const [cookies, setCookies] = useCookies(['token']);
    const [loading, setLoading] = useState(false);
    const [isPoperDeleteVideo, setIsPoperDeleteVideo] = useState(false);
    const [isPoperAddVideo, setIsPoperAddVideo] = useState(false);
    const [isPoperEditVideo, setIsPoperEditVideo] = useState(false);
    const [totalPage, setTotalPage] = useState(0);
    const [videoIdToDelete, setVideoIdToDelete] = useState();
    const [videoToEdit, setVideoToEdit] = useState();
    const { t } = useTranslation('translation', { keyPrefix: 'ManageVideo' });
    const navigate = useNavigate();

    const getAllVideosAPI = async (page) => {
        const token = cookies.token;
        setLoading(true);

        await getAllVideos(token, page - 1)
            .then((result) => {
                setAllVideos(result.videos);
                setData(result);
                setTotalPage(result.totalPage);
                setLoading(false);
            })
            .catch((error) => {
                const messeageNotify = config.errorMesseage.getMesseageNotify();
                if (!error.response) {
                    notify.error(messeageNotify.ERROR_NETWORD);
                    setLoading(false);

                    return;
                }
            });
    };

    const onPageChange = async (value) => {
        navigate(`/manage_videos/${value}`);
    };

    useEffect(() => {
        if (currentPage < 1) {
            navigate('/manage_videos/1');
        }
        getAllVideosAPI(currentPage);
    }, [currentPage]);

    const showPoperDeleteVideo = (videoId) => {
        setVideoIdToDelete(videoId);
        setIsPoperDeleteVideo(true);
        document.body.style.overflow = 'hidden';
    };

    const showPoperEditVideo = (video) => {
        setVideoToEdit(video);
        setIsPoperEditVideo(true);
        document.body.style.overflow = 'hidden';
    };

    const showPoperAddVideo = () => {
        setIsPoperAddVideo(true);
        document.body.style.overflow = 'hidden';
    };

    return (
        <div className="p-10">
            <button
                onClick={showPoperAddVideo}
                type="button"
                class="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {t('add_video')}
            </button>
            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table class="w-full text-left text-sm text-gray-500 rtl:text-right dark:text-gray-400">
                    <thead class="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3">
                                {t('title')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('description')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('video')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('create_at')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('update_at')}
                            </th>
                            <th scope="col" class="px-6 py-3">
                                {t('action')}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allVideos.map((video) => (
                            <tr class=" border-b odd:bg-white even:bg-gray-50 dark:border-gray-700 odd:dark:bg-gray-900 even:dark:bg-gray-800">
                                <th
                                    scope="row"
                                    class="whitespace-nowrap px-6 py-4 font-medium text-gray-900 dark:text-white"
                                >
                                    {video.title}
                                </th>
                                <td class="px-6 py-4">{video.description}</td>
                                <td class="px-6 py-4">
                                    <video src={video.url} controls></video>
                                </td>
                                <td class="px-6 py-4">{video.createdAt}</td>
                                <td class="px-6 py-4">{video.updatedAt}</td>
                                <td class="flex cursor-pointer gap-5 px-6 py-4 ">
                                    <FontAwesomeIcon
                                        className=" text-xl text-red-500"
                                        icon={faTrash}
                                        onClick={() => showPoperDeleteVideo(video.id)}
                                    />
                                    <FontAwesomeIcon
                                        className=" text-xl text-blue-500"
                                        icon={faEdit}
                                        onClick={() => showPoperEditVideo(video)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div>
                <Pagination totalPage={totalPage} currentPage={currentPage} onPageChange={onPageChange} />
            </div>
            {loading && <Loading />}
            {isPoperDeleteVideo && (
                <DeleteVideo setIsPoperDeleteVideo={setIsPoperDeleteVideo} videoId={videoIdToDelete} />
            )}
            {isPoperAddVideo && <AddVideo setIsPoperAddVideo={setIsPoperAddVideo} onPageChange={onPageChange} />}
            {isPoperEditVideo && (
                <EditVideo setIsPoperEditVideo={setIsPoperEditVideo} onPageChange={onPageChange} oldVideo={videoToEdit} />
            )}
        </div>
    );
}

export default ManageVideo;
