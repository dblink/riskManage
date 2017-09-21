/* jshint ignore : start */
import React, {Component} from 'react';
import {MaterialFlatButton as FlatButton} from '../../module/buttons';
import {inter} from '../../config/interface';
import {postImage, getImage} from '../../config/infoConfig';
import {getValue} from '../../config/dataConfig';

const style = {
    form: {
        height: `${document.body.offsetHeight - 96}px`,
        overflow: "auto"
    }
}

class UpLoadImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            src: {
                1: [],
                2: [],
                3: [],
                4: [],
                5: []
            },
            file: {
                1: [],
                2: [],
                3: [],
                4: [],
                5: []
            },
            state: {
                1:1,
                2:1,
                3:1,
                4:1,
                5:1
            },
            imageList:[]
        }
        this.onChangeImage = this.onChangeImage.bind(this);
        this.action = this.action.bind(this);
        this.getImageList = this.getImageList.bind(this);
        this.getImageList();
    }
    onChangeImage(file, sub){
        let files = file.currentTarget.files; //获取文件数量object {{0:"",1:"",length:2}}
        let srcArray = [];
        let _srcState = this.state.src;
        let _fileState = this.state.file;
        
        let length = files.length > 5 && 5 || files.length;

        for(let i=0; i<length; i++){
            if(files[i].size / 1000 > 1000){ // >1m
                alert("图片过大！");
                continue;
            }
            let _src =  window.URL.createObjectURL(files[i]); //生成位置
            srcArray.push(_src);
        }
        _srcState[sub] = srcArray;
        _fileState[sub] = files;
        
        this.setState({
            src : _srcState,
            file: _fileState
        })
        
    }
    action(e, fileName){
        e.preventDefault();
        var _state = this.state.state;
        _state[fileName] = 2;
        this.setState({state: _state});
        let _form = new FormData();
        _form.append("id" , this.props.appId);
        _form.append("uploadFileName" , fileName);
        _form.append("token", inter.login.callback.Token);

        Object.keys(this.state.file[fileName]).map((sub)=>{
            _form.append("files", this.state.file[fileName][sub]);
        })
        
        inter.postImage.data = _form
        postImage((callback)=>{
             var _state = this.state.state;
            _state[fileName] = callback;
            this.setState({state: _state});
        });
    }
    getImageList(){
        inter.getImage.data.id = this.props.appId;
        getImage((callback)=>{
            this.setState({
                imageList: callback
            })
        })
    }
    render() {
        let array = [1,2,3,4,5];
        return (
            <div style={style.form} className="clear-both">
                {
                    (getValue().Role === 10004 || getValue().Role === 10007) && array.map((sub)=>(
                        <form className="block-2-20" encType="multipart/form-data" method="post" action="/api/Image/UpLoadInfoImage" onSubmit={(e)=>this.action(e, sub)} >
                            <FlatButton label="选择图片" labelPosition="before" containerElement="label">
                                <input
                                    onChange={(e)=>this.onChangeImage(e, sub)}
                                    id="test"
                                    className="hidden"
                                    name= "a23"
                                    accept="image/png, image/jpeg, image/gif, image/jpg"
                                    type="file"
                                    multiple="multiple"
                                    />
                            </FlatButton>
                            { this.state.state[sub] === 1 && <FlatButton label="上传" labelPosition="before" containerElement="label">
                                <input className="hidden" type="submit" />
                            </FlatButton>}

                            {
                                this.state.state[sub] === 2 && <FlatButton label="上传中"  />
                            }

                            {
                                this.state.state[sub] === 0 && <FlatButton label="完成"  />
                            }
                            <div>
                                {this.state.src[sub].map((src)=><img src={src} style={{width: "100%","vertical-align": "top"}} />)}
                            </div>
                        </form>
                    ))
                }
                {this.state.imageList && <div>已上传图片</div>}
                {
                    
                    this.state.imageList && this.state.imageList.map((e)=>{
                        return <img src={e} style={{width: 400+"px"}} />
                    })
                }
            </div>
            
        );
    }
}

export {UpLoadImage};
/* jshint ignore : end */