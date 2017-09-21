/**
 * Created by Administrator on 2017/1/20.
 */
/* jshint ignore: start */
import React from 'react';
import { Route } from 'react-router';
import storage from './storageOperation';
import Welcome from '../welcome';
import json from '../../pageList.json';


const requireAuth = (nextState, replace) =>{
  //判断token跳转
  if (!storage.getToken()){
    storage.clearStorage();
    storage.clearStorage("menu");
    replace({pathname: "/"});
  }
/*  if(!isMobile() && nextState.location.pathname.indexOf("mobile") === -1){
    replace({pathname: "/mobile"+ nextState.location.pathname});
  }*/
};

const jumpMobile = (nextState, replace) =>{
  requireAuth(nextState, replace);
  if(window.navigator.userAgent.indexOf("Mobile") !== -1){
    replace({pathname: "/mobile/index"})
  }
};

const jumpPc = (nextState, replace) =>{
  requireAuth(nextState, replace);
  if(window.navigator.userAgent.indexOf("Mobile") === -1){
    replace({pathname: "/index"})
  }
};

/*const isMobile = () =>{
  return window.navigator.userAgent.indexOf("Mobile") === -1;
};*/

const jumpIndex = (nextState, replace) =>{
  let token;
  token = storage.getToken();
  if (token){
    replace({pathname: "/index"});
  }
};

const isRoot = (nextState, replace) =>{
  requireAuth(nextState, replace);
  if (storage.getStorage().ID < 10002){
    replace({pathname: "/index"})
  }
};
const isRootShowEmployee = (nextState, replace) =>{
  requireAuth(nextState, replace);
  if (storage.getStorage().Role > 10002 && storage.getStorage().Role !== 10010){
    replace({pathname: "/index"})
  }
};

const onlySmall10002 = (nextState, replace) =>{
  requireAuth(nextState, replace);
  if (storage.getStorage().GroupID >= 10002){
    replace({pathname: "/index"})
  }
};

export const AdminRoutes = (nextState, replace) =>{
  return (
    requireAuth(nextState, replace)
  )
};
export const JumpIndex = (nextState, replace) =>{
  return (
    jumpIndex(nextState, replace)
  )
};
export const IsRoot = (nextState, replace) =>{
  return (
    isRoot(nextState, replace)
  )
};
export const IsRootShowEmployee = (nextState, replace) =>{
  return (
    isRootShowEmployee(nextState, replace)
  )
};
export const OnlySmall10002 = (nextState, replace) =>{
  return (
    onlySmall10002(nextState, replace)
  )
};
export const JumpMobile = (nextState, replace) =>{
  return (
    jumpMobile(nextState, replace)
  )
};
export const JumpPc = (nextState, replace) =>{
  return (
    jumpPc(nextState, replace)
  )
};