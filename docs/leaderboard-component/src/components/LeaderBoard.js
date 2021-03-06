import React, { Component } from 'react';
import { Row } from './Row';
import { List, AutoSizer } from 'react-virtualized';
import './styles.css';
import axios from 'axios';
import 'react-virtualized/styles.css';

export class LeaderBoard extends Component {

  constructor() {
    super();
    this.state = { users: [], fakeLines: [], fakePoints: [], sortOrder: null }
  }

  style = {
    border: "1px solid #c1c1c1",
    borderRadius: '4px',
    padding: '10px',
    margin: '0 auto'
  }

  // users = [
    // "sattawatsup",
    // "oneCodeSlinger",
    // "someshchandra",
    // "un1crom",
    // "smadenian",
    // "SeanSassenrath",
    // "helenanderson",
    // "ParkerDSlote"
  // ]

  componentDidMount() {
    // Set fake number of commits
    this.setState({ fakeLines: this.renderFakeNumbers(30, 3), fakePoints: this.renderFakeNumbers(30, 2), sortOrder: 'points' })
    // Get random users from GitHub
    axios.get('https://api.github.com/users')
      .then(({data}) => {
        let dataWithCommits = [];
        data.forEach((user, i) => {
          dataWithCommits.push(Object.assign({}, user, { points: this.state.fakePoints[i], lines: this.state.fakeLines[i] }));
        })
        dataWithCommits.sort((a, b) => {
          if (a.points > b.points) {
            return -1;
          } else if (a.points < b.points) {
            return 1;
          } else {
            return 0;
          }
        })
        this.setState({ users: dataWithCommits, sortOrder: 'points' });
      })
      .then(() => {
        this.sortBy('points');
      })
  }

  renderFakeNumbers = (numberOfItems, decimals) => {
    let fakeNumbers = [];
    for (let i = 0; i < 30; i++) {
      fakeNumbers.push(Math.random().toString().split('').splice(2, decimals).join(''));
    }
    return fakeNumbers;
  }

  sortBy = (arg) => {
    const sortedUsers = this.state.users.sort((a, b) => {
      if (a[arg] > b[arg]) {
        return -1;
      } 
      if (a[arg] < b[arg]) {
        return 1;
      }
      return 0;
    })
    this.setState({users: sortedUsers, sortOrder: arg});
  }

  rowRenderer = ({
    key,
    index,
    style
  }) => <Row key={key} index={index} style={style} users={this.state.users} commits={this.state.users[index].lines}  points={this.state.users[index].points} />

  render() {
    return (
      <div>
        <h2>Leaderboard</h2>
        <div style={{display: "flex", alignItems: "center"}}>
          <p className="de-leaderboard--p">Sort by:</p> 
          <button 
            onClick={() => this.sortBy('lines')} 
            className={this.state.sortOrder === "lines" ? "de-leaderboard--button de-leaderboard--button-active" : "de-leaderboard--button"}
          >
            Lines
          </button>
          <button 
            onClick={() => this.sortBy('points')} 
            className={this.state.sortOrder === "points" ? "de-leaderboard--button de-leaderboard--button-active" : "de-leaderboard--button"}
          >
            Points
          </button>
        </div>
        <AutoSizer disableHeight>
          {({ width, height }) => (
            <List
              width={width}
              height={500}
              rowCount={this.state.users.length}
              rowHeight={100}
              rowRenderer={this.rowRenderer}
              style={this.style}
              sortOrder={this.state.sortOrder}
            />
          )}
        </AutoSizer>
      </div>
    );
  }
}