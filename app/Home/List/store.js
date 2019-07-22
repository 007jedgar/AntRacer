import Ant from './Model';
import Api from './api';

class AntStore {

  constructor() {
    this.api = new Api();
  }

  async getAllAntsList() {
    return this.api.getAllAntsList().then(({ data }) => {
      return this._transformAntEntityCollection(data.ants);
    });
  }

  _transformAntEntityCollection(data = []) {
    const antList = data.flatMap(ant => {
      const {name} = ant;
      const antObject = new Ant(name, 'Not yet run', 0);
      return antObject;
    });
    return antList;
  }

  resetPercentageAndState (data) {
    const antListCopy = data.slice();
    const antList = antListCopy.map(ant => {
      return ant.setOdds(0).setState('Not yet run');
    });
    return antList;
  }

  percentageListener(data, antSelected, odds){
    const antListCopy = data.slice();
    const antList = antListCopy.map(ant => {
      if (ant.name === antSelected.name) {
        return antSelected.setOdds(odds).setState('Calculated');
      }
      return ant;
    });
    return this._sortAntList(antList);
  }

  _sortAntList  = antList => antList.sort((a, b) => (a.odds < b.odds) ? 1 : -1); 

}

export default AntStore;