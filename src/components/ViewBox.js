import React, { Component, PropTypes } from 'react';
import delSrc0 from '../assets/images/switch_deleteRow_0.svg'
import delSrc1 from '../assets/images/switch_deleteRow_1.svg'
import btn_range_0_src from '../assets/images/switch_draw_0.svg'
import btn_range_1_src from '../assets/images/switch_draw_1.svg'
import btn_text_0_src from '../assets/images/switch_number_0.svg'
import btn_text_1_src from '../assets/images/switch_number_1.svg'
import btn_eraser_0_src from '../assets/images/switch_eraser_0.svg'
import btn_eraser_1_src from '../assets/images/switch_eraser_1.svg'
import btn_red_0_src from '../assets/images/switch_red_0.svg'
import btn_red_1_src from '../assets/images/switch_red_1.svg'
import btn_yellow_0_src from '../assets/images/switch_yellow_0.svg'
import btn_yellow_1_src from '../assets/images/switch_yellow_1.svg'
import btn_blue_0_src from '../assets/images/switch_blue_0.svg'
import btn_blue_1_src from '../assets/images/switch_blue_1.svg'

import { fabric } from 'fabric'

import '../assets/styles/ItemInfos.scss'

class ViewBox extends Component {
    constructor(props){
        super(props)

        this.canvas = {};
        this.toolBar = {};
        this.target = {};
        this.mouseOver = {};
        this.initPos = 0;
        this.imgNum = 0;
        this.imgs = [];
        this.delImg = null;
        this.delImgSrc0 = {};
        this.delImgSrc1 = {};
        this.sectionId = this.props.sectionId;
        this.mode = 'SELECT';
        this.preMode = 'SELECT';
        this.deleteMode = false;
        this.deli = null;

        this.preColor = 'RED';
        this.color = '#FF0000';
        this.colorSelect = 'RED';

        this.doDrawing = false;
        this.drawingObject = null;
        this.draws = [];
        this.drawsIndex = 0;

        this.doTexting = false;
        this.textingObject = null;
        this.texts = [];
        this.textIndex = 0;

        this.mouseFrom = {};
        this.mouseTo = {};
        this.mouseCursor = 'pointer';
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas(`canvas_${this.sectionId}`, {
            backgroundColor: 0x000000
        });
        this.canvas.setWidth(0);
        this.canvas.setHeight(80);
        this.canvas.preserveObjectStacking = true;
        this.canvas.selection = false;
        this.loadImg();
    }

    createToolBar() {
        
        let background = new fabric.Rect({
            width: 70, height: 107, fill: '#808080'
        });
        let back1 = new fabric.Rect({
            left: 0, top: 13,
            width: 34, height: 94, fill: '#B3B3B3'
        })
        let back2 = new fabric.Rect({
            left: 36, top: 13,
            width: 34, height: 94, fill: '#B3B3B3'
        })

        this.toolRange = new fabric.Rect({left: 2, top: 15, width: 30, height: 30});
        this.toolRange.setPatternFill({source: this.btn_range_0, repeat: 'no-repeat'});

        this.toolText = new fabric.Rect({left: 2, top: 45, width: 30, height: 30});
        this.toolText.setPatternFill({source: this.btn_text_0, repeat: 'no-repeat'});

        this.toolEraser = new fabric.Rect({left: 2, top: 75, width: 30, height:30});
        this.toolEraser.setPatternFill({source: this.btn_eraser_0, repeat: 'no-repeat'});

        this.toolRed = new fabric.Rect({left: 38, top: 15, width: 30, height:30});
        this.toolRed.setPatternFill({source: this.btn_red_1, repeat: 'no-repeat'});

        this.toolYellow = new fabric.Rect({left: 38, top: 45, width: 30, height:30});
        this.toolYellow.setPatternFill({source: this.btn_yellow_0, repeat: 'no-repeat'});

        this.toolBlue = new fabric.Rect({left: 38, top: 75, width: 30, height:30});
        this.toolBlue.setPatternFill({source: this.btn_blue_0, repeat: 'no-repeat'});

        this.toolBar = new fabric.Group([background, back1, back2, this.toolRange, this.toolText, this.toolEraser, this.toolRed, this.toolYellow, this.toolBlue], {
            left: 10, top: 10,
            lockRotation: true, hasRotatingPoint: false, opacity: 1,
            lockScalingFlip: true, lockScalingX: true, lockScalingY: true, hasControls: false,
            scaleX:1.5, scaleY: 1.5, subTargetCheck: true
        });
        this.toolBar.withIn = null;
        this.canvas.add(this.toolBar);
        this.toolBar.on('selected', () => {this.toolBarTime = Date.now();})

        this.canvas.on('mouse:over', e => {
            if(e.target !== null && e.target.i !== null && e.target.i === 'img') this.mouseOver = e.target;
            if(e.target === this.toolBar && !this.deleteMode) this.toolBar.set({opacity: 1});
            if(e.target !== null && e.target.draw !== null && e.target.draw === 'rect' && !this.deleteMode && this.mode === 'ERASER') {
                this.draws.forEach(d => {
                    if(d.index === e.target.index) d.set({stroke: '#0F0'});
                    else d.set({stroke: d.color});
                })
            }
            if(e.target !== null && e.target.t !== null && e.target.t === 'text' && !this.deleteMode && this.mode === 'ERASER') {
                this.texts.forEach(t => {
                    if(t.index === e.target.index) t.set({fill: '#0F0'});
                    else t.set({fill: t.color});
                })
            }
            if(this.deleteMode && this.imgs.length > 0){
                this.imgs.forEach((img,i) => {
                    if(e.target === img || (this.mouseOver === img && e.target === this.delImg) || (e.target !== null && e.target.withIn !== null && e.target.withIn === i)) {
                        this.mouseOver = img;
                        img.set({opacity: 0.5, backgroundColor: '#7fbf5f', hoverCursor: 'default'});
                        let l = img.width*img.scaleX/2 - 25;
                        let t = img.top + img.height*img.scaleY/2 - 25;
                        if(this.delImg !== null){
                            this.delImg.visible = true;
                            this.delImg.set({left: l});
                            this.delImg.animate('top', t, {
                                duration: 10, 
                                onChange: this.canvas.renderAll.bind(this.canvas)
                            });
                        }
                    }
                });
                if(e.target === this.delImg) {
                    this.delImg.setElement(this.delImgSrc1);
                }
            }
        });
        this.canvas.on('mouse:out', e => {
            if(e.target === this.toolBar && !this.deleteMode) this.toolBar.set({opacity: 1});
            if(e.target !== null && e.target.draw !== null && e.target.draw === 'rect' && !this.deleteMode && this.mode === 'ERASER') {
                this.draws.forEach(d => {
                    if(d.index === e.target.index) d.set({stroke: d.color});
                })
            }
            if(e.target !== null && e.target.t !== null && e.target.t === 'text' && !this.deleteMode && this.mode === 'ERASER') {
                this.texts.forEach(t => {
                    if(t.index === e.target.index) t.set({fill: t.color});
                })
            }
            if(this.deleteMode && this.imgs.length > 0){
                this.imgs.forEach(img => {
                        img.set({opacity: 1, hoverCursor: 'pointer'});
                        if(this.delImg !== null) this.delImg.visible = false;

                });
            }
            if(e.target === this.delImg) {
                if(this.delImg !== null) this.delImg.setElement(this.delImgSrc0);
            }
        });
        this.canvas.on('mouse:dblclick', e => {
            if(e.target !== this.toolBar && e.target !== {} && !this.deleteMode && e.target.draw !== 'rect' && e.target.i === 'img') {
                this.target = {};
                if(this.target !== e.target || this.target === {}) {
                    this.target = e.target;
                    this.toolBar.animate('top', this.target.top+10, {
                        duration: 300,
                        onChange: this.canvas.renderAll.bind(this.canvas)
                    });
                }
            }
        });
        this.canvas.on('mouse:down', e => {
            this.mouseFrom.x = e.e.offsetX;
            this.mouseFrom.y = e.e.offsetY;

            if(this.mode === 'RANGE' && e.target !== this.toolBar && !this.deleteMode) this.doDrawing = true;
            if(this.mode === 'TEXT' && e.target !== this.toolBar && !this.deleteMode) {
                this.doTexting = true;
                if(this.textingObject) this.saveTexts();
            }
            if(e.target !== null && e.target.draw !== null && e.target.draw === 'rect' && !this.deleteMode && this.mode === 'ERASER') {
                this.draws.forEach((d, i) => {
                    if(d.index === e.target.index) {
                        this.canvas.remove(d);
                        this.draws.splice(i,1);
                    }
                });
            }
            if(e.target !== null && e.target.t !== null && e.target.t === 'text' && !this.deleteMode && this.mode === 'ERASER') {
                this.texts.forEach((t, i) => {
                    if(t.index === e.target.index) {
                        this.canvas.remove(t);
                        this.texts.splice(i,1);
                    }
                });
            }


            if(!this.deleteMode) {
                if(e.subTargets[0] === this.toolRange && (Date.now() - this.toolBarTime > 100)) {
                    if(this.mode !== 'RANGE') {
                        this.mode = 'RANGE';
                        this.saveTexts();
                    }else {
                        this.mode = 'SELECT';
                        this.saveDraws();
                        this.saveTexts();
                    }
                }else if(e.subTargets[0] === this.toolText && (Date.now() - this.toolBarTime > 100)) {
                    if(this.mode !== 'TEXT') {
                        this.mode = 'TEXT';
                        this.saveDraws();
                    }else {
                        this.mode = 'SELECT';
                        this.saveDraws();
                        this.saveTexts();
                    }
                }else if(e.subTargets[0] === this.toolEraser && (Date.now() - this.toolBarTime > 100)) {
                    if(this.mode !== 'ERASER') {
                        this.mode = 'ERASER';
                        this.saveTexts();
                        this.saveDraws();
                    }else {
                        this.mode = 'SELECT';
                        this.saveTexts();
                        this.saveDraws();
                    }
                }

                if(e.subTargets[0] === this.toolRed && (Date.now() - this.toolBarTime > 100)) {
                    this.color = '#FF0000';
                    this.colorSelect = 'RED';
                }else if(e.subTargets[0] === this.toolYellow && (Date.now() - this.toolBarTime > 100)) {
                    this.color = '#FFFF00';
                    this.colorSelect = 'YELLOW';
                }else if(e.subTargets[0] === this.toolBlue && (Date.now() - this.toolBarTime > 100)) {
                    this.color = '#00D4FF';
                    this.colorSelect = 'BLUE';
                }
            }
        });

        this.canvas.on('mouse:move', e => {
            if(!this.doDrawing) return;
            this.mouseTo.x = (e.e.offsetX < this.mouseFrom.x) ? this.mouseFrom.x : (e.e.offsetX > this.mouseOver.left+(this.mouseOver.width*this.mouseOver.scaleX)) ? (this.mouseOver.left+(this.mouseOver.width*this.mouseOver.scaleX)) : e.e.offsetX;
            this.mouseTo.y = (e.e.offsetY < this.mouseFrom.y) ? this.mouseFrom.y : (e.e.offsetY > this.mouseOver.top+(this.mouseOver.height*this.mouseOver.scaleY)) ? (this.mouseOver.top+(this.mouseOver.height*this.mouseOver.scaleY)) : e.e.offsetY;
            this.drawing();
        });

        this.canvas.on('mouse:up', e => {
            this.doDrawing = false;

            if(e.target === this.toolBar) this.checkOutOfRange();
            if(e.target !== this.toolBar && this.mode === 'TEXT' && this.doTexting && !this.deleteMode) this.texting();
            if(this.deleteMode) {
                if(e.target === this.delImg) {
                    let target = document.getElementById(`toolicon_img_${this.sectionId}.${this.mouseOver.index}`);
                    target.click();
                    this.target = {};
                    this.imgs.forEach((img, i) => {
                        if(img.index === this.mouseOver.index) {
                            this.h = img.height*img.scaleY;
                            this.initPos -= this.h;
                            
                            img.visible = false;
                            
                            this.canvas.remove(this.delImg);
                            this.delImg = null;
                            
                            if(this.imgs.length > 1) this.fixDeletePosition(i, this.h);
                            else {
                                this.canvas.setHeight(this.initPos);
                                this.draws.forEach(d => {this.canvas.remove(d);});
                                this.draws = [];
                                this.texts.forEach(t => {this.canvas.remove(t);});
                                this.texts = [];
                            }
                            
                            this.canvas.remove(img);
                            this.imgs.splice(i,1);
                            this.draws.forEach(d => {this.resetWithIn(d);});
                            this.texts.forEach(t => {this.resetWithIn(t);});
                        }
                    });
                }
            }
        });
        this.requestRender();
    }

    drawing() {
        if(this.drawingObject) this.canvas.remove(this.drawingObject);
        let canvasObject = null;
        let path = `M ${this.mouseFrom.x} ${this.mouseFrom.y} L ${this.mouseTo.x} ${this.mouseFrom.y} L ${this.mouseTo.x} ${this.mouseTo.y} L ${this.mouseFrom.x} ${this.mouseTo.y} L ${this.mouseFrom.x} ${this.mouseFrom.y} z`;
        canvasObject = new fabric.Path(path, {
            left:this.mouseFrom.x, top: this.mouseFrom.y, stroke: this.color, strokeWidth: 2, fill: 'transparent',
            lockMovementX: true, lockMovementY: true, lockRotation: true,
            lockScalingFlip: true, lockScalingX: true, lockScalingY: true,
            hasControls: false, hasBorders: false, selectable: false,
            hoverCursor: 'pointer'
        });
        canvasObject.draw = 'rect'
        canvasObject.color = this.color;
        canvasObject.index = this.drawsIndex;

        if(canvasObject) {
            this.canvas.add(canvasObject);
            this.drawingObject = canvasObject;
        }
    }

    saveDraws() {
        if(this.drawingObject) {
            this.imgs.forEach((img, i) => {
                if(this.drawingObject.isContainedWithinObject(img)) this.drawingObject.withIn = i;
            });
            this.draws.push(this.drawingObject);
            this.drawsIndex++;
            this.drawingObject = null;
        }
    }

    texting() {
        // if(this.textingObject) this.canvas.remove(this.textingObject);
        let canvasObject = null;
        canvasObject = new fabric.Textbox('', {
            left:this.mouseFrom.x, top: this.mouseFrom.y, fill: this.color,
            lockMovementX: true, lockMovementY: true, lockRotation: true,
            lockScalingFlip: true, lockScalingX: true, lockScalingY: true,
            hasControls: false, hasBorders: true, selectable: false, editable: true,
            hoverCursor: 'pointer',
            fontSize: 30, fontFamily: 'Comic Sans MS'
        })
        canvasObject.t = 'text';
        canvasObject.color = this.color;
        if(canvasObject) {
            this.canvas.add(canvasObject);
            this.textingObject = canvasObject;
            canvasObject.enterEditing();
        }
    }

    saveTexts() {
        if(this.textingObject && this.textingObject.text !== '') {
            this.imgs.forEach((img, i) => {
                if(this.textingObject.isContainedWithinObject(img)) this.textingObject.withIn = i;
            });
            this.texts.push(this.textingObject);
            this.textingObject.exitEditing();
            this.textingObject.editable = false;
            this.textingObject.index = this.textIndex;
            this.textIndex++;
            this.textingObject = null;
            // this.doTexting = false;
        }else if(this.textingObject && this.textingObject.text === ''){
            this.textingObject.exitEditing();
            this.textingObject = null;
        }
    }

    resetWithIn(object) {
        this.imgs.forEach((img, i) => {
            if(object.isContainedWithinObject(img)) object.withIn = i;
        });
    }

    fixDeletePosition(i, h) {
        let drawDeleteEnd = 0, drawDeleteCount = 0;
        this.draws.sort((a, b) => {return a.withIn - b.withIn;})
        this.draws.forEach((d, index) => {
            if(d.withIn === i) {
                this.canvas.remove(d);
                drawDeleteEnd = index;
                drawDeleteCount++;
            }else if(d.withIn > i) {
                d.animate('top', d.top-h, {
                    duration: 500,
                    onChange: this.canvas.renderAll.bind(this.canvas)
                });
            }
        });
        this.draws.splice(drawDeleteEnd-drawDeleteCount+1, drawDeleteCount);

        let textDeleteEnd = 0, textDeleteCount = 0;
        this.texts.sort((a, b) => {return a.withIn - b.withIn;})
        this.texts.forEach((t, index) => {
            if(t.withIn === i) {
                this.canvas.remove(t);
                textDeleteEnd = index;
                textDeleteCount++;
            }else if(t.withIn > i) {
                t.animate('top', t.top-h, {
                    duration: 500,
                    onChange: this.canvas.renderAll.bind(this.canvas)
                });
            }
        });
        this.texts.splice(textDeleteEnd-textDeleteCount+1, textDeleteCount);

        this.imgs.forEach((img, index) => {
            if(index > i) {
                img.index -= 1;
                img.animate('top', img.top-h, {
                    duration: 500,
                    onChange: this.canvas.renderAll.bind(this.canvas)
                })
                let imgElement = document.getElementById(`preview_img_${this.sectionId}.${img.index}`);
                img.setElement(imgElement);
                img.set({height: img.height});
            }
        });

        setTimeout(() => {this.canvas.setHeight(this.initPos);}, 500);
        
    }

    createDelImg() {
        this.delImgSrc0 = document.getElementById("delImg0");
        this.delImgSrc1 = document.getElementById("delImg1");

        if(this.delImgSrc0 !== null) {
            this.delImg = new fabric.Image(this.delImgSrc0 , {
                width: 50, height: 50, hoverCursor: 'pointer',
                lockMovementX: true, lockMovementY: true, lockRotation: true,
                lockScalingFlip: true, lockScalingX: true, lockScalingY: true,
                hasControls: false, hasBorders: false
            });
            
            this.canvas.add(this.delImg);
            this.delImg.visible = false;
            this.delImg.bringForward(true);
        }
        
    }

    sortDraws() {
        this.draws.sort((a, b) => {
            return b.width*b.height - a.width*a.height;
        });
        
        this.draws.forEach((d, i) => {
            d.index = i;
            this.canvas.remove(d);
        });
        this.draws.forEach(d=> {
            this.canvas.add(d);
        });
    }

    requestRender() {
        // console.log(this.mode, this.deleteMode, this.target.index);
        // console.log('from', this.mouseFrom);
        // console.log('to', this.mouseTo);
        // console.log(this.target.index, this.mouseOver.index);
        // console.log(this.draws, this.texts);
        // console.log(this.toolRange, this.toolText, this.toolEraser);
        
        if(this.deleteMode) {
            this.saveTexts();
            this.saveDraws();
            this.mode = 'SELECT';
        }
        
        this.imgs.forEach(e => {
            this.canvas.sendToBack(e);
        });
        if(this.draws.length > 1 && !this.deleteMode && this.mode === 'ERASER') {
            this.sortDraws();
            this.texts.forEach(t => {
                this.canvas.bringToFront(t);
            });
        }
        this.canvas.bringToFront(this.toolBar);

        if(this.imgs.length == 0) this.canvas.setHeight(0);

        if(this.preMode !== this.mode) {
            this.showToolWhich();
            this.preMode = this.mode;
        }
        if(this.preColor !== this.colorSelect) {
            this.showColorWhich();
            this.preColor = this.colorSelect;
        }

        if(this.delImg === null && this.imgs.length > 0) {
            this.createDelImg();
        }
        if(this.delImg !== null) this.canvas.bringToFront(this.delImg);
        this.canvas.renderAll.bind(this.canvas);
        setTimeout(() => {this.requestRender();}, 100);
    }

    showToolWhich() {
        switch(this.mode){
            case 'SELECT':
                this.toolRange.setPatternFill({source: this.btn_range_0, repeat: 'no-repeat'});
                this.toolText.setPatternFill({source: this.btn_text_0, repeat: 'no-repeat'});
                this.toolEraser.setPatternFill({source: this.btn_eraser_0, repeat: 'no-repeat'});
                return;
            case 'RANGE':
                this.toolRange.setPatternFill({source: this.btn_range_1, repeat: 'no-repeat'});
                this.toolText.setPatternFill({source: this.btn_text_0, repeat: 'no-repeat'});
                this.toolEraser.setPatternFill({source: this.btn_eraser_0, repeat: 'no-repeat'});
                return;
            case 'TEXT':
                this.toolRange.setPatternFill({source: this.btn_range_0, repeat: 'no-repeat'});
                this.toolText.setPatternFill({source: this.btn_text_1, repeat: 'no-repeat'});
                this.toolEraser.setPatternFill({source: this.btn_eraser_0, repeat: 'no-repeat'});
                return;
            case 'ERASER':
                this.toolRange.setPatternFill({source: this.btn_range_0, repeat: 'no-repeat'});
                this.toolText.setPatternFill({source: this.btn_text_0, repeat: 'no-repeat'});
                this.toolEraser.setPatternFill({source: this.btn_eraser_1, repeat: 'no-repeat'});
                return;
            
        }
    }
    showColorWhich() {
        switch(this.colorSelect){
            case 'RED':
                this.toolRed.setPatternFill({source: this.btn_red_1, repeat: 'no-repeat'});
                this.toolYellow.setPatternFill({source: this.btn_yellow_0, repeat: 'no-repeat'});
                this.toolBlue.setPatternFill({source: this.btn_blue_0, repeat: 'no-repeat'});
                return;
            case 'YELLOW':
                    this.toolRed.setPatternFill({source: this.btn_red_0, repeat: 'no-repeat'});
                    this.toolYellow.setPatternFill({source: this.btn_yellow_1, repeat: 'no-repeat'});
                    this.toolBlue.setPatternFill({source: this.btn_blue_0, repeat: 'no-repeat'});
                return;
            case 'BLUE':
                    this.toolRed.setPatternFill({source: this.btn_red_0, repeat: 'no-repeat'});
                    this.toolYellow.setPatternFill({source: this.btn_yellow_0, repeat: 'no-repeat'});
                    this.toolBlue.setPatternFill({source: this.btn_blue_1, repeat: 'no-repeat'});
                return;
        }
    }

    checkOutOfRange() {
        if(this.toolBar.left < 0) {
            this.toolBar.animate('left', 10, {
                duration: 300,
                onChange: this.canvas.renderAll.bind(this.canvas)
            });
        }else if(this.toolBar.left > (this.canvas.width - (this.toolBar.width*1.5))) {
            this.toolBar.animate('left',this.canvas.width - (this.toolBar.width*1.5) - 10, {
                duration: 300,
                onChange: this.canvas.renderAll.bind(this.canvas)
            });
        }

        if(this.toolBar.top < 0) {
            this.toolBar.animate('top', 10, {
                duration: 300,
                onChange: this.canvas.renderAll.bind(this.canvas)
            });
        }else if(this.toolBar.top > (this.canvas.height - (this.toolBar.height*1.5))) {
            this.toolBar.animate('top', this.canvas.height - (this.toolBar.height*1.5) - 10, {
                duration: 300,
                onChange: this.canvas.renderAll.bind(this.canvas)
            });
        }
    }

    componentWillReceiveProps( nextProps ) {
        const { sectionId, imgs, toolicon, _runTool, disabled } = this.props;
        let PID;
        nextProps.sections.Imgs.forEach((item, id)=>{
            if(sectionId == item.parentsID) {
                PID = id;
            }
        });
        this.deleteMode = nextProps.sections.sectionData[PID].disabled == 'disabled' ? true : false;

        setTimeout(() => {
            if(nextProps.sections.Imgs[PID].imgSrc.length > this.imgNum && !this.deleteMode){
                let imgElement = document.getElementById(`preview_img_${this.sectionId}.${nextProps.sections.Imgs[PID].imgSrc.length-1}`);
                let viewElement = document.getElementById('viewBox');

                if(imgElement){
                    let adjustX = (viewElement.clientWidth-10) / imgElement.naturalWidth;
                    let xy = imgElement.naturalWidth / imgElement.naturalHeight;
                    let adjustY = ((viewElement.clientWidth/xy)-10) / imgElement.naturalHeight;
                    let imgInstance = new fabric.Image(imgElement, {
                        top: this.initPos+2.5, left: 2.5,
                        scaleX: adjustX, scaleY: adjustY,
                        lockMovementX: true, lockMovementY: true, lockRotation: true,
                        lockScalingFlip: true, lockScalingX: true, lockScalingY: true,
                        hasControls: false, borderColor: 'rgba(76,129,245,1)', borderScaleFactor: 5,
                        hoverCursor: 'pointer'
                    });
                    imgInstance.on('selected', () => {
                        if((this.target !== imgInstance || this.target === {}) && !this.deleteMode) {
                            this.target = imgInstance;
                            this.toolBar.animate('top', this.target.top+10, {
                                duration: 300,
                                onChange: this.canvas.renderAll.bind(this.canvas)
                            });
                        }
                    });

                    imgInstance.i = 'img';
                    imgInstance.index = `${nextProps.sections.Imgs[PID].imgSrc.length-1}`;
                    this.canvas.add(imgInstance);
                    this.imgs.push(imgInstance);

                    if(nextProps.sections.Imgs[PID].imgSrc.length == 1){
                        this.canvas.setHeight(imgInstance.height*adjustY + 5);
                    }else{
                        let hh = this.canvas.height + imgInstance.height*adjustY;
                        this.canvas.setHeight(hh);
                    }
                    this.canvas.setWidth(viewElement.clientWidth);
                    this.initPos += imgInstance.height*adjustY;
                }
            }
            this.imgNum = nextProps.sections.Imgs[PID].imgSrc.length;
        }, 300);
    }

    loadImg() {
        fabric.util.loadImage(btn_range_0_src, i => {this.btn_range_0 = i;});
        fabric.util.loadImage(btn_range_1_src, i => {this.btn_range_1 = i;});
        fabric.util.loadImage(btn_text_0_src, i => {this.btn_text_0 = i;});
        fabric.util.loadImage(btn_text_1_src, i => {this.btn_text_1 = i;});
        fabric.util.loadImage(btn_eraser_0_src, i => {this.btn_eraser_0 = i;});
        fabric.util.loadImage(btn_eraser_1_src, i => {this.btn_eraser_1 = i;});
        fabric.util.loadImage(btn_red_0_src, i => {this.btn_red_0 = i;});
        fabric.util.loadImage(btn_red_1_src, i => {this.btn_red_1 = i;});
        fabric.util.loadImage(btn_yellow_0_src, i => {this.btn_yellow_0 = i;});
        fabric.util.loadImage(btn_yellow_1_src, i => {this.btn_yellow_1 = i;});
        fabric.util.loadImage(btn_blue_0_src, i => {this.btn_blue_0 = i;});
        fabric.util.loadImage(btn_blue_1_src, i => {this.btn_blue_1 = i;this.createToolBar();});
    }

    genIMGs(info, index){
        const { sections,sectionId, toolicon, _runTool} = this.props
        let PID;
        sections.Imgs.forEach((item, id)=>{
            if(sectionId == item.parentsID) {
                PID = id
            }
        });
        let src = sections.Imgs[PID].imgSrc[index]
        return (
            <div key={`preview_img_${sectionId}.${index}`} id={`preview_imgBox_${sectionId}${index}`} className="preview_imgBox">
                <img id={`preview_img_${sectionId}.${index}`} src={src}/>
                <div className={toolicon} id={`toolicon_img_${sectionId}.${index}`} onClick={_runTool}>
                    <img className="delImg" id="delImg0" src={delSrc0} />
                    <img className="delImg" id="delImg1" src={delSrc1} />
                </div>
            </div>
        )
    }
    render(){
        const { sections,sectionId, _addreferView, disabled } = this.props;
        return (
            <div className="viewBox fx1" id="viewBox">
                <input id={`viewBoxInput_${sectionId}`} type="file" onChange={_addreferView} disabled={disabled} defaultValue='' accept="image/*"></input>
                <canvas id={`canvas_${this.sectionId}`}></canvas>
                <label>
                    {sections.Imgs[sectionId-1].imgSrc.map((info, index) =>this.genIMGs(info, index))}
                </label>
            </div>
        )
    }
}
  
export default ViewBox;