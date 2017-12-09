import React from 'react'

import classname from 'classnames'

import axios from 'axios'
import Modal from 'react-modal'

import './index.scss'
import playIcon from './playTop.png'

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        padding: 0,
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden'
    }
};

class VideoBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showTitle: false
        }
    }
    onMouseOver = () => {
        const {id, type} = this.props
        if (type === 1)
            return
        this.setState({showTitle: true})
        this.refs['video' + id].play()
    }
    onMouseOut = () => {
        const {id, type} = this.props
        if (type === 1)
            return
        this.setState({showTitle: false})
        this.refs['video' + id].pause()
    }
    renderSource() {
        const {albumPhoto, type, id} = this.props
        if (type === 1) {
            return <img src={albumPhoto} alt=''/>
        }
        if (type === 2) {
            return <video ref={'video' + id} src={albumPhoto}/>
        }
    }
    renderShade(prefix) {
        if (this.props.type === 1)
            return
        const {videoTime, videoTitle, id, albumPhoto} = this.props
        const titleCls = classname({
            [`${prefix}-title`]: true,
            [`${prefix}-title_hover`]: this.state.showTitle
        })
        const playCls = classname({
            [`${prefix}-playBase`]: true,
            [`${prefix}-playBase_hover`]: this.state.showTitle
        })
        const wordCls = classname({
            [`${prefix}-word`]: true,
            [`${prefix}-word_hover`]: this.state.showTitle
        })
        return (
            <div className={wordCls}>
                <p className={`${prefix}-time`}>{videoTime}</p>
                <div className={`${prefix}-play`} onClick={() => this.props.handleClick(albumPhoto)}>
                    <div className={playCls}>
                        <img className='playIcon' src={playIcon} width='22' height='22' alt=''/>
                    </div>
                </div>
                <p className={titleCls}>{videoTitle}</p>
            </div>
        )
    }
    render() {
        const prefix = 'video' || this.props.prefix
        return (
            <div
                className={`${prefix}-box`}
                onMouseOver={this.onMouseOver}
                onMouseOut={this.onMouseOut}>
                {this.renderSource()}
                {this.renderShade(prefix)}
            </div>
        )
    }
}

class Videos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            chooseId: 0,
            videoUrl:'',
            videos: []
        }
    }
    componentDidMount() {
        const userId = this.props.userId || 1
        axios
            .get(`/services/profile/album/videosTop3/${userId}`)
            .then(res => {
                if (res.status === 200) {
                    const {code, data} = res.data
                    if (code == 0) {
                        this.setState({videos: data})
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleClick (url){
        this.setState({videoUrl: url, isOpen:true  })
    }
    closeModal(){
        this.setState({
            isOpen: false
        })
    }
    render() {
        const {videos, isOpen, videoUrl} = this.state
        return (
            <div className='videos-box'>
                <h3 className='title'>Videos</h3>
                {videos.map((item, index) => <VideoBox key={index} {...item} handleClick={this.handleClick.bind(this)}/>)}
                <Modal
                    isOpen={isOpen}
                    ariaHideApp={false}
                    onRequestClose={() => this.closeModal()}
                    closeTimeoutMS={3}
                    style={customStyles}
                    contentLabel="Modal">
                   <video src={videoUrl} controls />
                </Modal>
            </div>
        )
    }
}

export default Videos
