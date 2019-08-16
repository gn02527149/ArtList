import '../assets/styles/styles.scss';
import React, { Component } from 'react';
import Explanation   from './Explanation';
import Worksection from './Worksection'

export default class Root extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div>
                <Explanation />
                <Worksection />
            </div>
        );
    };
};
