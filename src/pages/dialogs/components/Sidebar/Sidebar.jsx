import React, {useEffect, useState} from 'react';
import {useAuth} from "../../../../routing/hooks/useAuth";
import classes from "./Sidebar.module.css";
import SidebarList from "./SidebarList/SidebarList";
import SidebarSearch from "./SidebarSearch/SidebarSearch";

const Sidebar = ({fetchedDialogs ,currentDialog, fetchMessagesAndSetDialog}) => {
    const [searchedDialogs, setSearchedDialogs] = useState([])
    const [searchQuery, setSearchQuery] = useState('')

    const {user} = useAuth()

    // Поиск по диалогам
    useEffect(()=>{
        setSearchedDialogs(fetchedDialogs
            .filter((dialog)=>
                {
                    let companionName = dialog.firstUser === user.id? dialog.secondUserName : dialog.firstUserName
                    return companionName.toLowerCase().includes(
                        searchQuery.toLowerCase()
                    )
                }
            )
        )
    }, [searchQuery, fetchedDialogs])

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsWrapper}>
                <SidebarSearch
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
                <SidebarList
                    dialogs={searchedDialogs}
                    currentDialog={currentDialog}
                    currentUserId={user.id}
                    onDialogCLick={fetchMessagesAndSetDialog}
                />
            </div>
        </div>
    );
};

export default Sidebar;