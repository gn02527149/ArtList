import '../assets/styles/styles.scss';
import React, { Component } from 'react';
import Explanation   from './Explanation';
import Worksection from './Worksection';
import Appendview from './Appendview';

export default class Root extends Component {
    constructor() {
        super();
    }
    
    render() {
        return (
            <div>
                <Explanation />
                <Worksection />
                <Appendview />
            </div>
        );
    };
};
