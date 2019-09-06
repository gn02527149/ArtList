import React, { Component, PropTypes } from 'react';
import delSrc0 from '../assets/images/switch_deleteRow_0.svg'
import delSrc1 from '../assets/images/switch_deleteRow_1.svg'
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
        this.deleteMode = false;
        this.deli = null;
        //SELECT
        //RANGE
        //TEXT
        //ERASER
    }

    componentDidMount() {
        this.canvas = new fabric.Canvas(`canvas_${this.sectionId}`, {
            backgroundColor: 0x000000
        });
        this.canvas.setWidth(0);
        this.canvas.setHeight(80);
        this.canvas.preserveObjectStacking = true;
        this.canvas.selection = false;
        this.createToolBar();
        this.requestRender();
    }

    createToolBar() {
        
        let background = new fabric.Rect({
            width: 100, height: 32.5, fill: '#aaa', opacity: 0.7
        });
        this.toolRange = new fabric.Rect({
            width: 20, height: 20, fill:'transparent', opacity: 0.7, left: 5, top: 5, stroke: '#a55', strokeWidth: 2.5
        })
        this.toolText = new fabric.Circle({
            radius: 10, fill: '#5a5', opacity: 0.7, left: 40, top: 5
        })
        this.toolEraser = new fabric.Triangle({
            width: 20, height:20, fill: '#55a', opacity: 0.7, left: 75, top: 5
        })
        this.toolBar = new fabric.Group([background, this.toolRange, this.toolText, this.toolEraser], {
            left: 10, top: 10,
            lockRotation: true, hasRotatingPoint: false, opacity: 0.7,
            lockScalingFlip: true, lockScalingX: true, lockScalingY: true, hasControls: false,
            scaleX:1.5, scaleY: 1.5, subTargetCheck: true
        });
        this.canvas.add(this.toolBar);
        this.toolBar.on('selected', () => {this.toolBarTime = Date.now();})

        this.canvas.on('mouse:over', e => {
            if(e.target === this.toolBar && !this.deleteMode) this.toolBar.set({opacity: 1});
            if(this.deleteMode && this.imgs.length > 0){
                this.imgs.forEach(img => {
                    if(e.target === img || (this.mouseOver === img && e.target === this.delImg)) {
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
            if(e.target === this.toolBar && !this.deleteMode) this.toolBar.set({opacity: 0.7});
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
            if(e.target !== this.toolBar && e.target !== {} && !this.deleteMode) {
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
            if(!this.deleteMode) {
                if(e.subTargets[0] === this.toolRange && (Date.now() - this.toolBarTime > 100)) {this.mode = 'RANGE';}
                else if(e.subTargets[0] === this.toolText && (Date.now() - this.toolBarTime > 100)) {this.mode = 'TEXT';}
                else if(e.subTargets[0] === this.toolEraser && (Date.now() - this.toolBarTime > 100)) {this.mode = 'ERASER';}
            }
        });
        this.canvas.on('mouse:up', e => {
            if(e.target === this.toolBar) this.checkOutOfRange();
            if(this.deleteMode) {
                if(e.target === this.delImg) {
                    let target = document.getElementById(`toolicon_img_${this.sectionId}.${this.mouseOver.index}`);
                    target.click();

                    this.imgs.forEach((img, i) => {
                        if(img.index === this.mouseOver.index) {
                            this.h = img.height*img.scaleY;
                            this.initPos -= this.h;
                            this.canvas.setHeight(this.initPos);
                            img.visible = false;
                            
                            this.canvas.remove(this.delImg);
                            this.delImg = null;
                            
                            if(this.imgs.length > 1) this.fixDeletePosition(i, this.h);
                            
                            this.canvas.remove(img);
                            this.imgs.splice(i,1);
                        }
                    });
                }
            }
        });
    }

    fixDeletePosition(i, h) {
        this.imgs.forEach((img, index) => {
            if(index > i) {
                img.index -= 1;
                img.animate('top', img.top-h, {
                    duration: 10,
                    onChange: this.canvas.renderAll.bind(this.canvas)
                })
                let imgElement = document.getElementById(`preview_img_${this.sectionId}.${img.index}`);
                img.setElement(imgElement);
                img.set({height: img.height});
            }
        });
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

    requestRender() {
        if(this.delImg !== null) this.canvas.bringToFront(this.delImg);
        this.canvas.bringToFront(this.toolBar);
        this.imgs.forEach(e => {
            this.canvas.sendToBack(e);
        });
        if(this.imgs.length == 0) this.canvas.setHeight(0);
        this.showToolWhich();
        if(this.delImg === null && this.imgs.length > 0) {
            this.createDelImg();
        }

        this.canvas.renderAll.bind(this.canvas);
        setTimeout(() => {
            this.requestRender();
        }, 100);
    }

    showToolWhich() {
        switch(this.mode){
            case 'SELET':
            case 'RANGE':
                this.toolRange.set({opacity: 1});
                this.toolText.set({opacity: 0.3});
                this.toolEraser.set({opacity: 0.3});
                return;
            case 'TEXT':
                this.toolRange.set({opacity: 0.3});
                this.toolText.set({opacity: 1});
                this.toolEraser.set({opacity: 0.3});
                return;
            case 'ERASER':
                this.toolRange.set({opacity: 0.3});
                this.toolText.set({opacity: 0.3});
                this.toolEraser.set({opacity: 1});
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
        this.deleteMode = nextProps.disabled == 'disabled' ? true : false;

        setTimeout(() => {
            if(nextProps.imgs.length > this.imgNum && !this.deleteMode){
                let imgElement = document.getElementById(`preview_img_${this.sectionId}.${nextProps.imgs.length-1}`);
                let viewElement = document.getElementById('viewBox');
                
                if(imgElement){
                    let adjustX = (viewElement.clientWidth-7.5) / imgElement.naturalWidth;
                    let xy = imgElement.naturalWidth / imgElement.naturalHeight;
                    let adjustY = ((viewElement.clientWidth/xy)-7.5) / imgElement.naturalHeight;
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
                    imgInstance.index = `${nextProps.imgs.length-1}`;
                    this.canvas.add(imgInstance);
                    this.imgs.push(imgInstance);

                    // console.log(imgInstance);
                    
                    if(nextProps.imgs.length == 1){
                        this.canvas.setHeight(imgInstance.height*adjustY + 5);
                    }else{
                        let hh = this.canvas.height + imgInstance.height*adjustY;
                        this.canvas.setHeight(hh);
                    }
                    this.canvas.setWidth(viewElement.clientWidth);
                    this.initPos += imgInstance.height*adjustY;
                }
            }
            this.imgNum = nextProps.imgs.length;
        }, 300);
    }
    genIMGs(info, index){
        const { sectionId, imgs, toolicon, _runTool} = this.props
        let src = imgs[index]==0?"":imgs[index]
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
        const { sectionId, _addreferView, imgs, disabled } = this.props;
        return (
            <div className="viewBox fx1" id="viewBox">
                <input id={`viewBoxInput_${sectionId}`} type="file" onChange={_addreferView} disabled={disabled} defaultValue='' accept="image/*"></input>
                <canvas id={`canvas_${this.sectionId}`}></canvas>
                <label htmlFor={`viewBoxInput_${sectionId}`}>
                    {imgs.map((info, index) =>this.genIMGs(info, index))}
                </label>
            </div>
        )
    }
}
  
export default ViewBox;