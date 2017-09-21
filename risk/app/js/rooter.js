/* jshint ignore: start */
import React, { Component } from 'react';
import { Route } from 'react-router';
import {getValue} from '../../app/js/config/dataConfig';

const isManager = (nextState ,replace) =>{
    if(getValue().Role.toString() !== "10008"){
        replace("/index");
    }
}
export {isManager}