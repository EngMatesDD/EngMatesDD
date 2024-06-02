const validate = {
    length: {
        MIN_LENGTH_TITLE: 4,
        MAX_LENGTH_TITLE: 200,
        MIN_LENGTH_CONTENT: 1,
        MAX_LENGTH_CONTENT: 5000,
    },
    pattern: {
        TITLE: /^[0-9a-zA-Z\s]/,
    },
};

export default validate;
