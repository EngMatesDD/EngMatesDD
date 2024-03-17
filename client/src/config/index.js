import routes from './routes';
import api from './api';
import constantsValid from './Auth/constantsValid';
import errorMesseage from './Auth/errorMesseage';
import notification from './Auth/notification';
import language from './language';
import getParamaterHeaderSecondnary from './paramaterHeaderSecondnary';
import wordsbooks from './WordsBooks';
import manageWordFolder from './ManageWordFolder';
import manageUser from './ManageUser';
import manageNews from './ManageNews';
import manageVideo from './ManageVideo'
import ManageWordCategory from './ManageWordCategory';
import ManageWordInCategory from './ManageWordInCategory';
import lookup from './Lookup';
import forum from './Forum';

const config = {
    routes,
    api,
    constantsValid,
    errorMesseage,
    notification,
    language,
    getParamaterHeaderSecondnary,
    wordsbooks,
    manageWordFolder,
    manageUser,
    manageNews,
    manageVideo,
    ManageWordCategory,
    ManageWordInCategory,
    forum,
    lookup,
};

export default config;
