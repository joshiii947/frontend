import {PORTADDRESS} from './fileconstant'

export const LOGIN =  `${PORTADDRESS}user/login`

export const REGISTER = `${PORTADDRESS}user/register`

export const USERINFO = `${PORTADDRESS}user/getuserinfo`

export const GETLIST = `${PORTADDRESS}user/getlist`

export const ADDFILE = `${PORTADDRESS}file/addfiles`

export const REMOVEFILE = `${PORTADDRESS}file/removefile`

export const GETFILEINFO = `${PORTADDRESS}file/getfileinfo`

export const USERFOLDERINFORMATION = `${PORTADDRESS}folder/userfolderdetails`

export const FOLDERDETAILS = `${PORTADDRESS}folder/folderdetails`

export const CREATEFOLDER = `${PORTADDRESS}folder/createFolder`

export const DELETEFOLDER = `${PORTADDRESS}folder/deleteFolder`

export const ADDFILEACCESS = `${PORTADDRESS}sharedfiles/addfileaccess`

export const REMOVEFILEACCESS = `${PORTADDRESS}sharedfiles/removefileaccess`

export const ADDFOLDERACCESS = `${PORTADDRESS}sharedfiles/addFolderAccess`

export const REMOVEFOLDERACCESS = `${PORTADDRESS}sharedfiles/removeFolderAccess`
