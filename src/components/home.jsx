import React from 'react';
import Fetch from '../service'

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
    }

    componentWillMount () {
        let url = 'https://api.github.com/emojis';
        // let url = 'http://localhost:8088/mock-data/logs.json';
        Fetch(url,'get').then((res)=>{
            this.setState({
                list: Object.values(res)
            })
        })
    }
    
    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.list.map((item,index)=>{
                            return(
                                <li key={index}><img src={item}/></li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default Main;