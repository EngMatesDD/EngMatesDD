import i18next from '~/utils/i18n';

const getListItemInMenuPopper = () => ({
    forum: {
        ItemComment: [{ code: 'delete', content: i18next.t('Operation.delete') }],
    },
    chatAI: {
        ItemChat: [
            { code: 'delete', content: i18next.t('Operation.delete') },
            { code: 'rename', content: i18next.t('Operation.rename') },
        ],
    },
    wordBook: {
        Itembox: [
            { code: 'edit', content: i18next.t('Operation.edit') },
            { code: 'delete', content: i18next.t('Operation.delete') },
        ],
    },
});

export default getListItemInMenuPopper;
