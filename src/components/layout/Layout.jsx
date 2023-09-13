import React, {useState} from 'react';
import classes from "./Layout.module.css";
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import {useAuth} from "../../hooks/useAuth";
import logo from '../../assets/svg/logo.svg'
import avatar from '../../assets/svg/avatar.svg'
import detailsArrow from '../../assets/svg/detailsArrow.svg'
import dialogs from '../../assets/svg/dialogs.svg'
import exit from '../../assets/svg/exit.svg'

const Layout = () => {
    const {user, signOut} = useAuth()
    const location = useLocation()

    const [detailsOpen, setDetailsOpen] = useState(false)

    const navigate = useNavigate()

    return (
        <div>
            <header>
                <div className={classes.headerContainer}>
                    <img src={logo} alt='logo'/>
                    <div>RIProject</div>
                    <img className={classes.marginLeft} src={avatar} alt='avatar' />
                    <div className={classes.detailsBlock} onClick={()=>setDetailsOpen(!detailsOpen)}>
                        {/*Нужно сделать нормальную функцию отрктия/закрытия окна*/}
                        <img src={detailsArrow} alt='details'/> {/*Нужно будет переделать на div*/}
                        <div
                            className={classes.details}
                            style={detailsOpen? {} : {display: 'none'}}
                            onClick={()=>signOut(()=>navigate('/login', {state: {from: location}}))}
                        >
                            <img src={exit} alt=""/>
                            <div>Выйти</div>
                        </div>
                    </div>
                </div>
            </header>
            <div className={classes.wrapper}>
                <ul className={classes.navigation}>
                    <li>
                        <img src={avatar} alt={avatar}/>
                        <Link to={user.id}>
                            My page
                        </Link>
                    </li>
                    <li>
                        <img src={dialogs} alt={dialogs}/>
                        <Link to='dialogs'>
                            Dialogs
                        </Link>
                    </li>
                </ul>
                <div className={classes.content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;