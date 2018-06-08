import React from 'react'
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import {searchRobots} from '../actions';
import {connect} from 'react-redux';
import {setSearchField, requestRobots} from '../actions';

class App extends React.Component {

    componentDidMount() {
       this.props.onRequestRobots();
    }

    render() {

        const {searchField, onSearchChange, robots, isPending} = this.props;
        const filteredRobots = robots.filter(robot=> {
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        });

        return isPending ? <h1>Loading</h1> :
         (
                <div className='tc'>
                    <h1 className='f2'>RoboFriends</h1>
                    <SearchBox searchChange={onSearchChange}/>
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
        )
    }
}

const mapStateToProps = state => ({
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
});

const mapDispatchToProps = dispatch => ({
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: ()=> requestRobots(dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
