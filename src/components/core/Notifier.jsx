import EE from 'event-emitter';
import React from 'react';
import { CheckCircleFilled, CloseCircleFilled, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Close } from '../../assets/icons/close.svg';

const emitter = new EE();

export const notify = (type, msg) => {
    emitter.emit('notification', type, msg);
};

export default class Notifications extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            top: '-100px',
            message: '',
            type: '',
        };

        this.timeout = null;

        emitter.on('notification', (type, msg) => {
            this.onShow(type, msg);
        });
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    onShow = (type, msg) => {
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.setState({
                    top: '-100px',
                    type: '',
                },
                () => {
                    this.timeout = setTimeout(() => {
                        this.showNotification(type, msg);
                    }, 300);
                },
            );
        } else {
            this.showNotification(type, msg);
        }
    };

    showNotification = (type, msg) => {
        this.setState(
            {
                top: '16px',
                message: msg,
                type: type,
            },
            () => {
                this.timeout = setTimeout(() => {
                    this.setState({
                        top: '-100px',
                    });
                }, 6000);
            },
        );
    };

    // UNSAFE_componentWillMount() {
    //     clearTimeout(this.timeout);
    // }
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    render() {
        return (
            <div className="flex justify-center">
              <div className="flex justify-center">
                <div className="notification-box" style={{ top: this.state.top }}>
                    <div className="flex align-center">
                        {this.state.type === 'success' && <CheckCircleFilled className="success" />}
                        {this.state.type === 'error' && <CloseCircleFilled className="error" />}
                        {this.state.type === 'warning' && <WarningOutlined className="warning" />}
                        {this.state.type === 'info' && <InfoCircleOutlined className="info" />}
                        <div className="w2" />
                        <div>{this.state.message}</div>
                    </div>
                </div>
            </div>
            </div>
        );
    }
}
