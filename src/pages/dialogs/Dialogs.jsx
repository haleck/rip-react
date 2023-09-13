import React, {useEffect, useRef, useState} from 'react';
import classes from "./Dialogs.module.css";
import search from '../../assets/svg/search.svg'
import DialogsItem from "./DialogsItem";
import chats from '../../assets/svg/chats.svg'
import userPhoto from '../../assets/svg/userPhoto.svg'
import AutoResizeTextarea from "../../components/autoResizeTextarea";
import send from '../../assets/svg/post.svg'
import {useAuth} from "../../hooks/useAuth";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {addLineBreaks} from "../../utils/format";

const Dialogs = () => {
    const {user} = useAuth()
    const location = useLocation()
    const [dialog, setDialog] = useState({})
    const [fetchedDialogs, setFetchedDialogs] = useState([])
    const [searchedDialogs, setSearchedDialogs] = useState([])

    const [companionName, setCompanionName] = useState('')
    const [companionId, setCompanionId] = useState('')

    const navigate = useNavigate()

    const fetchDialogs = async (id) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/dialogs/getAllUsersDialogs/${id}`)
            setFetchedDialogs(response.data)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchDialogMessagesAndSetDialog = async (dialog) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/messages/getAllFromDialog/${dialog._id}`)
            setDialog({...dialog, messages: response.data})

            if(dialog.firstUser === user.id) {
                setCompanionId(dialog.secondUser)
                setCompanionName(dialog.secondUserName)
            } else {
                setCompanionId(dialog.firstUser)
                setCompanionName(dialog.firstUserName)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(()=>{
        const dialogId = location.state?.dialogId
        const firstUser = location.state?.firstUser
        const firstUserName = location.state?.firstUserName
        const secondUser = location.state?.secondUser
        const secondUserName = location.state?.secondUserName

        if (dialogId) {
            fetchDialogMessagesAndSetDialog({_id: dialogId, firstUser, firstUserName, secondUser, secondUserName})
        }
        fetchDialogs(user.id)
    }, [])

    const [message, setMessage] = useState('')
    const [searchQuery, setSearchQuery] = useState('')
    const dialogRef = useRef(null)

    useEffect(()=>{
        setSearchedDialogs(fetchedDialogs
            .filter((dialog)=>
                {
                    let compainonName = dialog.firstUser === user.id? dialog.secondUserName : dialog.firstUserName
                    return compainonName.toLowerCase().includes(
                        searchQuery.toLowerCase()
                    )
                }
            )
        )
    }, [searchQuery, fetchedDialogs])

    useEffect(()=>{
        if (dialog.messages)
            dialogRef.current.scrollTop = dialogRef.current.scrollHeight
    },[dialog])

    const createMessage = async () => {
        try {
            const params = {
                dialog: dialog._id,
                sender: user.id,
                senderName: user.name + ' ' + user.surname,
                receiver: dialog.firstUser === user.id ? dialog.secondUser : dialog.firstUser,
                receiverName: dialog.firstUser === user.id ? dialog.secondUserName : dialog.firstUserName,
                text: message
            }
            console.log(params)
            setMessage('')
            const response = await axios.post('http://localhost:5000/api/messages/create', params)
            await fetchDialogMessagesAndSetDialog(dialog)
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className={classes.content}>
            <div className={classes.dialogs}>
                <div className={classes.dialogsList}>
                    <label className={classes.searchBlock}>
                        <img src={search} alt='search'/>
                        <input
                            placeholder='Search'
                            value={searchQuery}
                            onChange={(e)=>setSearchQuery(e.target.value)}
                        />
                    </label>
                    {searchedDialogs.map((item)=>{
                        let companion = {
                            name: item.firstUser === user.id ? item.secondUserName : item.firstUserName,
                            dateOfLastMessage: item.updatedAt,
                            lastMessage: item.lastMessage
                        }
                            return <DialogsItem
                                item={companion}
                                key={item.id}
                                onClick={()=>fetchDialogMessagesAndSetDialog(item)}
                                style={dialog._id === item._id? {background: 'rgba(217,217,217,0.2)'} : {}}
                            />
                        }
                    )}
                </div>
            </div>
            {dialog.messages?
                <div className={classes.dialog}>
                    <div className={classes.dialogHeader}>
                        <div onClick={()=>navigate(`/${companionId}`)}>{companionName}</div>
                        <img src={userPhoto} alt='userPhoto' onClick={()=>navigate(`/${companionId}`)}/>
                    </div>
                    <div className={classes.dialogMessages} ref={dialogRef}>
                        {dialog.messages.length > 0?
                            dialog.messages.map((message, index)=>
                                dialog.messages[index-1]?.sender !== dialog.messages[index]?.sender ?
                                    <div className={classes.dialogMessage} key={index}>
                                        <img src={userPhoto} alt='userPhoto'/>
                                        <div>
                                            <div style={{color:"white"}}>{message.senderName}</div>
                                            <div>{addLineBreaks(message.text)}</div>
                                        </div>
                                    </div>
                                    :
                                    <div className={classes.dialogAdditionalMessage} key={index}>{addLineBreaks(message.text)}</div>
                            )
                            :
                            <div className={classes.dialogEmpty}>
                                <div>Ваш диалог пуст...</div>
                                <div>Начните его первым!</div>
                            </div>
                        }
                    </div>
                    <div className={classes.dialogFooter}>
                        <AutoResizeTextarea text={message} setText={setMessage} placeholder='Введите сообщение' maxLength={1000}/>
                        <img src={send} alt='sendMessage' onClick={createMessage}/>
                    </div>
                </div>
            :
                <div className={classes.tip}>
                    <img src={chats} alt='chats'/>
                    <div>Выберите чат для начала общения</div>
                </div>
            }
        </div>
    );
};

export default Dialogs;