import "babel-polyfill";
import React, { Component } from 'react';
import { render } from 'react-dom';
import Roots from './components/home'

render(
    <Roots />,
    document.getElementById('roots')
);
