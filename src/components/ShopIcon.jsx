import React from "react";
import iphone12 from './../assets/imgs/iphone12.jpeg'
import cl from './../styles/ShopIcon.module.css'

const ShopIcon = (props) => {
    return (
        <div className={cl.shopIcon}>
            <div className={cl.iconBlock}>
                <img width='250px' src={iphone12}/>
                <a href="#" className={cl.quickView}>Быстрый просмотр</a>
                <span className={cl.discount}>-14%</span>
            </div>

            <div className={cl.price}>
                <span className={cl.newPrice}>86956</span><span className={cl.oldPrice}>99 990</span>
            </div>
            <div>
                <span className={cl.priceWithDiscount}>85251</span>
            </div>
            <div>
                <p className={cl.pathToProduct}>Apple/Смартфон Iphone 12 Pro 128 GB/6.1"/2532x1170/ OLED/128 ГБ</p>
            </div>
            <div style={{color: 'rgb(201, 33, 170)', fontWeight: 'bold'}}>
            &#9733;&#9733;&#9733;&#9733;&#9733; <span className={cl.amountReviews}>87</span>
            </div>
            <div>
                <button className={cl.instalmentBtn}>В рассрочку 0-0-6</button>
            </div>

            <div>
                <button className={cl.toBusketBtn}>В корзину</button>
                <span className={cl.selectedBtn}>&#9825;</span>
            </div>
        </div>
    )
}

export default ShopIcon;