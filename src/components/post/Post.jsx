import React, {useState} from 'react';
import classes from "./Post.module.css";
import userPhoto from '../../assets/svg/userPhoto.svg'
import dots from '../../assets/svg/dots.svg'
import Delete from '../../assets/svg/delete.svg'

const Post = ({children, name, time}) => {
    const [dotsClicked, setDotsClicked] = useState(false)

    return (
        <div className={classes.post}>
            <div className={classes.title}>
                <img src={userPhoto} alt="userPhoto" className={classes.userPhoto}/>
                <div>
                    <div className={classes.titleName}>{name}</div>
                    <div className={classes.titleTime}>{time}</div>
                </div>
                <div className={classes.dotsBlock} onClick={()=>setDotsClicked(!dotsClicked)}>
                    {/*Нужно сделать нормальную функцию отрктия/закрытия окна*/}
                    <img src={dots} alt='dots' className={classes.dots} /> {/*Нужно будет сделать без каритнки*/}
                    <div className={classes.deleteBtn} style={dotsClicked ? {} : {display: 'none'}}>
                        <img src={Delete} alt="delete"/>
                        <div>Удалить</div>
                    </div>
                </div>
            </div>
            <div className={classes.content}>
                {children}
            </div>
        </div>
    );
};

export default Post;