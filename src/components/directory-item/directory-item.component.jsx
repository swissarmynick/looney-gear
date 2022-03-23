import './directory-item.styles.scss';

const DirectoryItem = ({ category }) => {
    const { imageUrl, title, size } = category;
    return ( 
        <div className={`directory-item-container ${size}`}>
            <div 
                className='background-image' 
                style={{ 
                    backgroundImage: `url(${imageUrl})`
                }} 
            />
            <div className='body'>
                <h2>{title.toUpperCase()}</h2>
                <p>Shop Now!</p>
            </div>
        </div>
     );
}
 
export default DirectoryItem;