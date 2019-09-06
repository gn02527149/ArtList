import '../assets/styles/styles.scss';
import React, { Component } from 'react';
import Explanation   from './Explanation';
import Worksection from './Worksection';
import Appendview from './Appendview';
import Modal from './Modal';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default class Root extends Component {
    constructor() {
        super();
        this.handleClickPDF = this.handleClickPDF.bind(this);
    }

    handleClickPDF() {
        let pdf = new jsPDF('p','mm','a3');
        let fileName = 'hello.pdf';
        
        html2canvas(document.body).then(function(canvas) {
            let image = canvas.toDataURL();
            let width = pdf.internal.pageSize.getWidth();
            let height = pdf.internal.pageSize.getHeight();
            pdf.addImage(image, 'PNG', 0, 0, width, height);
            pdf.save(fileName);
        });
    }
    
    render() {
        return (
            <div>
                <Explanation />
                <Worksection />
                <Appendview />
                <Modal />
                <button id='jsPDF' onClick={this.handleClickPDF}>PDF</button>
            </div>
        );
    };
};
