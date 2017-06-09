import "babel-polyfill";
import React, { Component } from 'react';
import { render } from 'react-dom';
import { LocaleProvider } from 'antd';
import Roots from './components/home'

render(
    <LocaleProvider locale={{}}>
        <Roots />
    </LocaleProvider>,
    document.getElementById('roots')
);
