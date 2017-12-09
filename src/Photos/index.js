import React from 'react'


import axios from 'axios'
import Modal from 'react-modal'

import './index.scss'


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
        border: 0,
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden'
    }
};

class Videos extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            imgUrl:'',
            photos: []
        }
    }
    componentDidMount() {
        const userId = this.props.userId || 1
        axios
            .get(`/services/profile/album/photosTop6/${userId}`)
            .then(res => {
                if (res.status === 200) {
                    const {code, data} = res.data
                    if (code == 0) {
                        this.setState({photos: data})
                    }
                }
            })
            .catch(err => {
                console.log(err)
            })
    }
    handleClick(url) {
        this.setState({imgUrl: url, isOpen: true})
    }
    closeModal() {
        this.setState({isOpen: false})
    }
    render() {
        const {isOpen, photos,imgUrl} = this.state
        return (
            <div className='photos-box'>
                <h3 className='title'>Photos</h3>
                <div className='container'>
                    {photos.map((photo,index) => <img onClick={ () => this.handleClick(photo.albumPhoto)} src={photo.albumPhoto} key={index} alt='' />)}
                </div>
                <Modal
                    isOpen={isOpen}
                    ariaHideApp={false}
                    onRequestClose={() => this.closeModal()}
                    closeTimeoutMS={3}
                    style={customStyles}
                    contentLabel="Modal">
                    <img src={imgUrl} height="200" width="200" alt="" />
                </Modal>
            </div>
        )
    }
}

export default Videos
