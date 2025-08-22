import React, { createContext, useEffect, useState } from 'react'
import {getSongs } from '../service/service'
export const SongContext = createContext()
function DataContext({ children }) {
    const [musicData, setMusicData] = useState([])
    const [error, setError] = useState(null)
    const [loader, setLoader] = useState([])
    useEffect(()=>{
        getSongs()
        .then(item=> setMusicData(item))
        .catch(item=>setError(item))
        .finally(()=>setLoader(item))
    },[])
    const obj ={musicData}
    return (
        <>
        <SongContext.Provider value={obj}>
            {children}
        </SongContext.Provider>
        </>
    )
}

export default DataContext
