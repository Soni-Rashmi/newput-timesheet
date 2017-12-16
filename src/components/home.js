import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return (
          <div>
            <div>
              This is My Home Page.

             </div>
             <div>
              {this.props.children}
             </div>
          </div>

        );
    }
}
