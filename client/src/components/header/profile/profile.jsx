import React from 'react';
import debounce from 'lodash.debounce';
import './profile.scss'

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: 'open',
            flagOpacity: false,
            flagDebounce: false,
            viewDropDownMEnu: 'none',
            elementOpacity: '0',
            elementClickWidth: '',
            elementClickLeft: '',
            elementHeaderTop: ''
        };
        this.debouncedCallback = debounce(this.callback, 2000);
    }

    componentDidMount() {
        this.setState({
            elementClickWidth: document.querySelector('.profile').getBoundingClientRect().width,
            elementClickLeft: document.querySelector('.profile').getBoundingClientRect().left,
            elementHeaderTop: document.querySelector('.header-top').getBoundingClientRect().top + document.querySelector('.header-top').getBoundingClientRect().height,
        });
    }
    handleMouseEnter = () => {
        this.setState({
            viewDropDownMEnu: `${this.state.viewDropDownMEnu === 'none' ? 'block' : ''}`,
            flagDebounce: true,
            elementClickWidth: document.querySelector('.profile').getBoundingClientRect().width,
            elementClickLeft: document.querySelector('.profile').getBoundingClientRect().left,
            elementHeaderTop: document.querySelector('.header-top').getBoundingClientRect().top + document.querySelector('.header-top').getBoundingClientRect().height / 1.5,
        });
        const elementStateFlag = this.state.flagOpacity;
        const fadeIn = (speed) => {
            let step = 1 / speed;
            if (!elementStateFlag) {
                var interval = setInterval(() => {
                    if (this.state.elementOpacity >= 1) {
                        clearInterval(interval);
                        this.setState({
                            flagOpacity: true
                        });
                    }
                    this.setState({ elementOpacity: +this.state.elementOpacity + step });
                }, speed);
            }
        }
        fadeIn(10);
        this.debouncedCallback()
    }
    handleMouseLeave = () => {
        this.setState({
            flagDebounce: false
        });
        this.debouncedCallback()
    }
    callback = () => {
        if (this.state.flagDebounce) return;
        const elementStateFlag = this.state.flagOpacity;
        const fadeOut = (speed) => {
            let step = 1 / speed;
            if (elementStateFlag) {
                var interval = setInterval(() => {
                    if (this.state.elementOpacity <= 0) {
                        clearInterval(interval);
                        setTimeout(() => {
                            this.setState({
                                flagOpacity: false,
                                viewDropDownMEnu: 'none'
                            });
                        }, 1000)
                    }
                    this.setState({ elementOpacity: +this.state.elementOpacity - step });
                }, speed);
            }
        }
        fadeOut(20);
    }

    render() {
        const style = {
            opacity: this.state.elementOpacity,
            display: this.state.viewDropDownMEnu,
            left: this.state.elementClickLeft,
            top: this.state.elementHeaderTop,
            width: this.state.elementClickWidth,
        }
        const dataImage = !JSON.parse(localStorage.getItem('setImage')) ? '' : JSON.parse(localStorage.getItem('setImage'))

        return (
            <>
                <div className='profile'>
                    {!dataImage.image ?
                        <img className="user-image" src={require('../../../userimages/default/user-icon.png')} alt=""></img>
                        :
                        <img className="user-image" src={require('../../../userimages/avatar/' + dataImage.id + '/' + dataImage.imageId + '')} alt=""></img>
                    }
                    <span className='userName'>Name</span>
                    <div className="polygon-1 elementClick" onMouseLeave={this.handleMouseLeave} onMouseEnter={this.handleMouseEnter}></div>
                </div>
                <div onMouseLeave={this.handleMouseLeave} onMouseEnter={this.handleMouseEnter} className={`dropDownMenu block position-absolute ${this.state.open}`} style={style}>
                    <ul>
                        <li className=""><span>Profile</span></li>
                        <li onClick={() => this.props.setActivePhoto(true)} className=""><span className="">Photos</span></li>
                        <li className=""><span>Setting</span></li>
                        <li className=""><span>Edit</span></li>
                    </ul>
                </div>
            </>
        )
    }
}
export default Profile;