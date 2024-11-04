import React from 'react';
import classes from "./SidebarSearch.module.css";
import search from "../../../../../assets/svg/search.svg";

const SidebarSearch = ({searchQuery, setSearchQuery}) => {
    return (
        <label className={classes.searchBlock}>
            <img src={search} alt='search'/>
            <input
                placeholder='Search'
                value={searchQuery}
                onChange={(e)=>setSearchQuery(e.target.value)}
            />
        </label>
    );
};

export default SidebarSearch;