import React from 'react'
import CardList from './CardList';
import {robots} from './robots';
import SearchBox from './SearchBox';
import Scroll from './Scroll';
import './App.css';


class App extends React.Component {
    constructor() {
        super();
        this.state= {
            robots: [],
            searchField: ''
        }
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> {
                return response.json();
            })
            .then(users=> {
                this.setState({robots: users})
            })
    }

    onSearchChange = (event)=> {
        this.setState({searchField: event.target.value});
        
    }

    render() {

        const {robots, searchField} = this.state;
        const filteredRobots = robots.filter(robot=> {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return !robots.length ? <h1>Loading</h1> :
         (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange}/>
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
        )
    }
}

export default App;
