import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';


// import Videos from './Video';
// import Photos from './Photos';

import Videos from 'qianbi-components/Videos'
import Photos from 'qianbi-components/Photos'


function Main() {
    return (
        <div>
            <Videos/>
            <br />
            <Photos />
        </div>
    )
}

ReactDOM.render(
    <Main/>, document.getElementById('root'));
registerServiceWorker();
