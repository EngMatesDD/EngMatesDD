import classNames from 'classnames';

const cx = classNames;

function ItemMessenger({ isUser }) {
    return (
        <div className={cx('relative mt-4 flex', { 'justify-end': isUser, 'justify-start': !isUser })}>
            <div className={cx('max-w-[90%] rounded-2xl bg-blue-400 px-3 py-2')}>
                Anh là 1 kỹ sư IT ngành K*** KSTN tốt nghiệp BK đã hơn 1 thập kỷ. Năm xưa mỗi lần đứng dưới cổng Ký túc
                xá BK Hòa Hỏa Quận 10 thấy chúng nó đứng đợi chở nhau đi chơi cuối tuần mà ko ai pick anh cả. Anh cũng
                tuổi thân lắm. Anh đẹp trai mà, lại học giỏi nữa. Giờ ở tuổi 3x, là kỹ sư từng làm việc cho Goo.., là
                người Mỹ Gốc Việt. Anh phải chịu cảnh ế vợ. Ko để lại gen thông minh cho mai sao. Nên ta nói các sư tỷ
                BK của máy em có nhiều cô ko có não là vậy.
            </div>
        </div>
    );
}

export default ItemMessenger;
