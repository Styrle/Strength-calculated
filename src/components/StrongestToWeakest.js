import React from "react";
import session from "../services/session";
import liftService from "../services/lift";
import {swalError} from "../utils/swal";

//Calculating the users strongest to weakest most recent input
class StrongestToWeakest extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      lifts: []
    };
    this.showStrongestToWeakest();
  }
  //Making sure that when our component is called for and when it is show it
  componentDidMount() {
    this._isMounted = true;
    this.showStrongestToWeakest();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

    //Here we are getting our most recent lifts and organising them as strongest and weakest lifts
  showStrongestToWeakest = async () => {
    await liftService.getLatestByUserId(session.get('user')._id)
      .then(result => {
        if (result.error) {
          swalError(result.error);
          return;
        }

        if (!result.data || result.data.length === 0)
          return;

        const data = result.data[0];
        let lifts = JSON.parse(data.lifts).map(child => {
          return {
            name: child.name,
            weight: Number(child.weight)
          }
        });
        lifts = lifts.sort((a, b) => b.weight - a.weight);
        this.setState({lifts: lifts || []});
    });
  }

  render() {
      return(
        <div className="table-tools" style={{marginTop: '30px'}}>
          <h4>Strongest to Weakest</h4>
          <table className="table">
            <thead>
              <tr>
                <th>Your Lifts</th>
                <th>New PB</th>
              </tr>
            </thead>
            <tbody>
            {this.state.lifts.map((x, idx) =>
              <tr key={idx}>
                <td>{x.name}</td>
                <td>{x.weight}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StrongestToWeakest;
