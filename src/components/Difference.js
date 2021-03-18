import React from "react";
import session from "../services/session";
import liftService from "../services/lift";
import {swalError} from "../utils/swal";

class Difference extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
    lifts: []
    };
    this.getDifference();
  }

    componentDidMount() {
      this._isMounted = true;
      this.getDifference();
    }

    componentWillUnmount() {
      this._isMounted = false;
    }

    //Calculating the difference of the users new personal best
  getDifference = async () => {
    await liftService.getAllByUserId(session.get('user')._id)
      .then(result => {
        if (result.error) {
          swalError(result.error);
          return;
        }
        if (!result.data || result.data.length === 0)
          return;
          //Setup for our previous and new personal best check
          const data = result.data;
          const liftsData = data.map(x => JSON.parse(x.lifts));
          const recent = liftsData[0] || [];
          const previous = liftsData.slice(1);
          const mergedPrevious = [].concat.apply([], previous);
          const lifts = [];

            recent.forEach(x => {
              const found = mergedPrevious.find(y => y.name === x.name);
              if(found) {
                lifts.push({
                  name: x.name,
                  recent: x.weight,
                  previous: found.weight,
                  difference: Math.round((Number(x.weight - found.weight) / x.weight) * 100)
                });
                } else {
                  lifts.push({
                    name: x.name,
                    recent: x.weight,
                    previous: 0,
                    difference: Math.round((Number(x.weight - 0) / x.weight) * 100)
                  });
                }
              });
          this.setState({lifts: lifts});
      });
    }

  render() {
    return(
      <div className="table-tools" style={{marginTop: '30px'}}>
        <h4>Difference between your previous and new PB</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Lift</th>
              <th>New PB</th>
              <th>Old PB</th>
              <th>Difference</th>
            </tr>
          </thead>
          <tbody>
        {this.state.lifts.map((x, idx) =>
          <tr key={idx}>
            <td>{x.name}</td>
            <td>{x.recent}</td>
            <td>{x.previous}</td>
            <td>{x.difference}%</td>
          </tr>
        )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Difference;
