
class Ant {
  constructor(name, state, odds, position) {
    this.name = name;
    this.state = state;
    this.odds = odds;
    this.position = position;
  }
  
  setOdds(odds) {
    this.odds = odds;
    return this;
  }
  
  setState (state) {
    this.state = state;
    return this;
  }
}

export default Ant;