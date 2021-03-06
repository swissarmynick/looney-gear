import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card.component';
import './category-preview.styles.scss';

const CategoryPreview = ({ title, products }) => {
    return ( 
        <div className='category-preview-container'>
            <h2>
                <Link className='title' to={title}>
                    {title.toUpperCase()}
                </Link>
            </h2>
            <div className='preview'>
                {
                    products
                        .filter((_, index) => index < 4) //the underscore means we're not going to use the item/product itself - just using the index.
                        .map(product => ( //now we'll use the product.
                            <ProductCard key={product.id} product={product} />
                        ))
                }
            </div>
        </div>
     );
}
 
export default CategoryPreview;