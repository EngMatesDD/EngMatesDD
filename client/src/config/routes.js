const routes = {
    HOME: '/',
    otherPage: {
        ERROR: '*',
    },
    auth: {
        LOGIN: '/login',
        SIGNUP: '/signup',
        FORGETPASSWORD: '/forgetpassword',
        VERIFYREGISTER: '/VerifyRegister',
        CREATENEWPASSWORD: '/createnewpassword',
    },
    translation: {
        TRANSLATION: '/translation',
    },
    wordbooks: {
        WORDBOOK: '/wordbooks',
        WORDBOOKS: '/wordbooks/:page',
        WORDFOLDER: '/wordbooks/:pageFolder/:idFolder',
        WORDFOLDERS: '/wordbooks/:pageFolder/:idFolder/:pageWord',
    },
    video: {
        VIDEO: '/video',
    },
    news: {
        NEWS: '/news',
    },
    text_online: {
        TEXT_ONLINE: '/text_online',
    },
    forum: {
        FORUM: '/forum',
    },
    chat_ai: {
        CHAT_AI: '/chat_ai',
    },
    game: {
        GAME: '/game',
    },
    lookup: {
        LOOKUP: '/lookup/:word',
    },
    admin: {
        MANAGEUSER: '/manage_user/:page',
        MANAGEFORUM: '/manage_forum',
        MANAGEQUIZZES: '/manage_quizzes',
        MANAGECATEGORIES: '/manage_categories',
        MANAGENEWS: '/manage_news',
        MANAGEVIDEOS: '/manage_videos',
    },
};

export default routes;
