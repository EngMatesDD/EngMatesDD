import i18next from '~/utils/i18n';

const getListItemInMenuPopper = () => ({
    forum: {
        ItemComment: [{ code: 'delete', content: i18next.t('Operation.delete') }],
    },
    chatAI: {
        ItemChat: [{ code: 'delete', content: i18next.t('Operation.delete') }],
    },
});

export default getListItemInMenuPopper;
