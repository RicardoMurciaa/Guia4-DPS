"use client"
import {useState} from "react";

export const Headers = ({
    allProducts = [],
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
}) => {
    const [active, setActive] = useState(false);

    const onDeleteProduct = product => {
        //funcionalidad para confirmacion de eliminar un producto
        const confirmacion = window.confirm(`Eliminar ${product.title} del carrito?`);

        if (confirmacion){
            const results = allProducts.filter(
                item => item.id !== product.id
            );

            setTotal(total - product.price * product.quantity);
            setCountProducts(countProducts - product.quantity);
            setAllProducts(results);
        }
    };

    const onCleanCart = () => {

        const confirmacion = window.confirm("Desea vaciar el carrito?");

        if (confirmacion) {
            setAllProducts([]);
            setTotal(0);
            setCountProducts(0);   
        }
    };
    return (
        <header>
            <h1>Tienda de Libros</h1>
            <div className='containter-icon'>
                <div className='container-cart-icon' onClick={() => setActive(!active)}>
                    <img src="https://th.bing.com/th/id/OIP.aJRetvtprfjJ1eU-gVDZCwHaHa?rs=1&pid=ImgDetMain" 
                    alt="carrito" className="icon-cart" />
                    <div className='count-products'>
                        <span id='contador-productos'>{countProducts}</span>
                    </div>
                </div>

                <div className={`container-cart-products ${active ? '' : 'hidden-cart'}`}>
                    {allProducts && allProducts.length ? (
                        <>
                            <div className='row-product'>
                                {allProducts.map(product => (
                                    <div className='cart-product' key={product.id}>
                                        <img src={product.urlImage} alt={product.title} className="imagen-producto-carrito" />
                                        <div className='info-cart-product'>
                                            <span className='cantidad-producto-carrito'>
                                                {product.quantity}
                                            </span>
                                            <p className='titulo-producto-carrito'>
                                                {product.title}
                                            </p>
                                            <span className='precio-producto-carrito'>
                                                ${product.price}
                                            </span>
                                        </div>
                                        <img src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png" alt="cerrar" className="icon-close" onClick={() => onDeleteProduct(product)} />
                                    </div>
                                ))}
                            </div>

                            <div className='cart-total'>
                                    <h3>Total:</h3>
                                    <span className='total-pagar'>${total}</span>
                            </div>

                            <button className='btn-clear-all' onClick={onCleanCart}>Vaciar Carrito</button>
                        </>
                    ) : (
                        <p className='cart-empty'> El carrito esta vacio </p>
                    )}
                    </div>
                </div>
        </header>
    );
};

export default Headers;