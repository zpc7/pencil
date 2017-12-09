import React from 'react';
import ReactDOM from 'react-dom';
import App from './Video';
import registerServiceWorker from './registerServiceWorker';

function Main() {
    return (
        <div>
            <App/>
        </div>
    )
}

ReactDOM.render(
    <Main/>, document.getElementById('root'));
registerServiceWorker();
