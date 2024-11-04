import React from 'react';
import SidebarListItem from "../SidebarListItem/SidebarListItem";

const SidebarList = ({dialogs, currentDialog, currentUserId, onDialogCLick}) => {
    return (
        dialogs.map((item)=>{
                let companion = {
                    name: item.firstUser === currentUserId ? item.secondUserName : item.firstUserName,
                    dateOfLastMessage: item.updatedAt,
                    lastMessage: item.lastMessage
                }
                return <SidebarListItem
                    item={companion}
                    key={item.id}
                    onClick={()=>onDialogCLick(item)}
                    style={currentDialog._id === item._id? {background: 'rgba(217,217,217,0.2)'} : {}}
                />
            }
        )
    );
};

export default SidebarList;