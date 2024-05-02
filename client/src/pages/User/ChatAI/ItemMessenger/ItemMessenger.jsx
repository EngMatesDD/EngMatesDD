import classNames from 'classnames';
import PropTypes from 'prop-types';

import Spinner from '~/components/Spinner';

const cx = classNames;

function ItemMessenger({ isUser, content, loading }) {
    return (
        <div className={cx('relative mt-4 flex', { 'justify-end': isUser, 'justify-start': !isUser })}>
            <div className={cx('max-w-[90%] rounded-2xl bg-blue-400 px-3 py-2')}>
                {loading ? <Spinner className={'!h-4 !w-4'} /> : content}
            </div>
        </div>
    );
}

ItemMessenger.propTypes = {
    isUser: PropTypes.bool,
    content: PropTypes.string,
    loading: PropTypes.bool,
};

export default ItemMessenger;
