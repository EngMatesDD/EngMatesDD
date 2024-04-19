import PropTypes from 'prop-types';
import classNames from 'classnames';

const cx = classNames;

function MenuItem({ data, onClick }) {
    const classes = cx(
        '!justify-start rounded-none ml-0 w-full justify-start px-4 py-[6px] font-semibold leading-[1.125rem]',
        'hover:bg-background-color-secondnary cursor-pointer',
        {
            'border-t border-solid border-stone-300': data.separate,
        },
    );
    return (
        <div className={classes} onClick={(e) => onClick(e, data)}>
            {data.content}
        </div>
    );
}

MenuItem.propTypes = {
    data: PropTypes.object.isRequired,
    onClick: PropTypes.func,
};

export default MenuItem;
