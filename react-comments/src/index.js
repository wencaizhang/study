import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CommentApp from './CommentApp'
import registerServiceWorker from './registerServiceWorker';

class Title extends Component {
    handleClickonTitle (word, e) {
        console.log(this, word, e.target.innerHTML)
    }

    render () {
        return (
            <h1 onClick={this.handleClickonTitle.bind(this, "Hello")}>React 小书</h1>
        )
    }
}

class Header extends Component {
    render () {
        return (
            <div>
                <Title />
                <h2> This is Header </h2>
            </div>
        )
    }
}

class Main extends Component {
    render () {
        return (
            <div>
                <h2>This is main content</h2>
            </div>
        )
    }
}

class Footer extends Component {
    render () {
        return (
            <div>
                <h3>This is footer</h3>
            </div>
        )
    }
}

class Index extends Component {
    constructor () {
        super()
        this.state = {
            likedText: '已赞',
            unlikedText: '赞'
        }
    }

    handleClickOnChange () {
        this.setState({
            likedText: '取消',
            unlikedText: '点赞'
        })
    }

    render () {
        // return (
        // <div>
        //     <Header />
        //     <Main />
        //     <LikeButton 
        //         wordings={{likedText: '已赞', unlikedText: '赞'}} 
        //         onClick={() => console.log('Click on like button!')} />
        //     <Footer />
        // </div>
        // )

        return (
            <div>
                <LikeButton
                    likedText={this.state.likedText}
                    unlikedText={this.state.unlikedText} />
                <div>
                    <button onClick={this.handleClickOnChange.bind(this)}>
                        修改 wordings
                    </button>
                </div>
            </div>
        )
    }
}

class LikeButton extends Component {
    static defaultProps = {
        likedText: '取消',
        unlikedText: '点赞'
    }

    constructor () {
        super()
        this.state = { 
            isLiked: false
        }
    }

    handleClickOnLikeButton () {
        // console.log(this.state.isLiked)
        this.setState({
            isLiked: !this.state.isLiked
        })
        if (this.props.onClick) {
            this.props.onClick()
        }
        // this.props.likedText = 'quxiao'
        // console.log(this.state.isLiked)
        // console.log('====================================');
        // this.setState({ count: 0 })
        // console.log(this.state.count)
        // this.setState({ count: this.state.count + 1 })
        // console.log(this.state.count)
        // this.setState({ count: this.state.count + 2 })
        // console.log(this.state.count)
        // console.log('====================================');
        // console.log('====================================');
        // this.setState((prevState) => {
        //     return { count: 0 }
        // })
        // this.setState((prevState) => {
        //     console.log(prevState)
        //     return { count: prevState.count + 1 }
        // })
        // this.setState((prevState) => {
        //     console.log(prevState)
        //     return { count: prevState.count + 2 }
        // })
        // console.log(this.state.count)
        // console.log('====================================');
    }

    render () {
        // const likedText = this.props.likedText || '取消'
        // const unlikedText = this.props.unlikedText || '点赞'

        return (
            <button onClick={this.handleClickOnLikeButton.bind(this)}>
                { this.state.isLiked
                    ? this.props.likedText
                    : this.props.unlikedText }
            </button>
        )
    }
}

const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

class List extends Component {
    render () {
        const userElements = []
        for (let user of users) {
            userElements.push(
                <div>
                    <div>姓名：{user.username}</div>
                    <div>性别：{user.gender}</div>
                    <div>年龄：{user.age}</div>
                    <hr />
                </div>
            )
        }
        return (
            <div>{userElements}</div>
        )
    }
}

class List2 extends Component {
    render () {
        return (
            <div>
                {users.map((user) => {
                    return (
                        <div>
                            <div>姓名：{user.username}</div>
                            <div>年龄：{user.age}</div>
                            <div>性别：{user.gender}</div>
                            <hr />
                        </div>
                    )
                })}
            </div>
        )
    }
}

class List3 extends Component {
    render () {
        const { user } = this.props
        return (
            <div>
                <div>姓名：{user.username}</div>
                <div>年龄：{user.age}</div>
                <div>性别：{user.gender}</div>
                <hr />
            </div>
        )
    }
}

class ListIndex extends Component {
    render () {
        return (
            <div>
                {users.map((user, i) => <List3 key={i} user={user} />)}
            </div>
        )
    }
}

class Clock extends Component {
    constructor () {
        // 初始化的东西放在 constructor 中
        super()
        this.state = {
            date: new Date()
        }
    }

    componentWillMount () {
        // 组件的启动，如 ajax、定时器的启动，可以放在 componentWillMount 中
        this.timer = setInterval(() => {
            this.setState({ date: new Date() })
        }, 1000)
    }

    render () {
        return (
            <div>
                <h1>
                    <p>现在时间是</p>
                    {this.state.date.toLocaleDateString()}
                </h1>
            </div>
        )
    }

    componentWillUnmount () {
        // 组件销毁时，需要清理数据类的工作放在 componentWillUnmount 中
        clearInterval(this.timer)
    }
}

class Index2 extends Component {
    constructor () {
        super()
        this.state = {
            isShowClock: true
        }
    }

    handleShowOrHide () {
        this.setState({
            isShowClock: !this.state.isShowClock
        })
    }
    render () {
        return (
            <div>
                <button onClick={this.handleShowOrHide.bind(this)}>显示或隐藏时钟</button>
                {this.state.isShowClock ? <Clock /> : null}
            </div>
        )
    }
}

class AutoFocusInput extends Component {
    componentDidMount () {
        // 通过 ref 属性进行 DOM 操作
        this.input.focus()
    }

    render () {
        return (
            <input type="text" ref={(input) => this.input = input}/>
        )
    }
}

class Card extends Component {
    render () {
        return (
            <div className='card'>
                <div className='card-content'>
                    {this.props.content}
                </div>
            </div>
        )
    }

    componentDidMount () {
        console.log(this.props.children)
    }
}

class Editor extends Component {
    constructor () {
        super()
        this.state = {
            content: '<h1>React.js 小书</h1>'
        }
    }

    render () {
        // dangerouslySetInnerHTML 来动态渲染 innerHTML
        // 目的是为了防止跨站脚本攻击
        return (
            <div>
                <div 
                    className="eidtor-wrapper"
                    dangerouslySetInnerHTML={{__html: this.state.content}} />
                <h1 style={{ fontSize: '12px', color: 'lightblue' }}>React.js 小书</h1>
            </div>
        )

    }
}

ReactDOM.render(
    <CommentApp />, 
    document.getElementById('root')
);
registerServiceWorker();
