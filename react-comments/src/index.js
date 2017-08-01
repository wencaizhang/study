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
ReactDOM.render(
    <CommentApp />, 
    document.getElementById('root')
);
registerServiceWorker();
