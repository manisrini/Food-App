import CartIcon from '../Cart/CartIcon'
import style from './HeaderCartButton.module.css'
import {useContext,useState,useEffect} from 'react'
import CartContext from '../../store/cart-contex'


const HeaderCartButton = (props) => {

     const [CartBtnstate, setCartBtnstate] = useState(false)
    const Cartctx = useContext(CartContext)
    const numOfCartItems = Cartctx.items.reduce((curNum,item)=>{
        return curNum + item.amount
    },0)

    const btnclasses = `${style.button} ${CartBtnstate ? style.bump : ''}`

    useEffect(() => {
        if(Cartctx.items.length === 0){
            return;
        }
        setCartBtnstate(true)

       const timer =  setTimeout(() => {
            setCartBtnstate(false)
            
        },300)
        return () => {
            clearTimeout(timer)
        }
    }, [Cartctx.items])
  
    return (
        <button className={btnclasses} onClick={props.onClick}>
            <span className={style.icon}><CartIcon /></span>
            <span>Cart</span>
            <span className={style.badge}>{numOfCartItems}</span>
        </button>
    )
}

export default HeaderCartButton;