/* jshint ignore: start */
import React, { Component } from 'react';
import {ApplicationList} from './applicationList';

class KfApplicationList extends Component {
    render() {
        return (
            <div>
                <ApplicationList type="kefu" />
            </div>
        );
    }
}

export {KfApplicationList};
/* jshint ignore: end */