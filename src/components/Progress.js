import React from 'react';
import 'rodal/lib/rodal.css';
import liftService from "../services/lift";
import { swalError } from "../utils/swal";
import session from '../services/session';
import moment from "moment";
//npm package which allows us to create charts without bindto constraints
//https://www.npmjs.com/package/react-c3-component?activeTab=readme
import Chart from 'react-c3-component';
import 'c3/c3.css';
import StrongestToWeakest from "./StrongestToWeakest";
import Difference from "./Difference";


class Progress extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dates: [],
            datasets: [],
        };
    }

    componentDidMount() {
        if (!session.get('loggedIn')) return;
        //Checking our user is signed in and collecting the date, name and weight data
        (async () => {
            await liftService.getByUserId(session.get('user')._id)
                .then(result => {
                    if (result.error) {
                        swalError(result.error);
                        return;
                    }
                    const data = result.data;
                    const datetimes = data.map(x => x.datetime);
                    const arr = [];
                    const lifts = data.map(x => JSON.parse(x.lifts));
                    for (let i = 0; i < lifts.length; i++) {
                        const x = lifts[i];
                        x.forEach(k => {
                            arr.push({
                                datetime: datetimes[i],
                                name: k.name,
                                weight: k.weight
                            });
                        });
                    }
                    //setting our data out and setting the date to the correct format
                    var separateData = data.map((main, i) => {
                        return JSON.parse(data[i].lifts).map(child => {
                            return {
                                date: moment(main.datetime).format('YYYY-MM-DD'),
                                name: child.name,
                                weight: child.weight
                            }
                        });
                    })
                    var mergedData = [].concat.apply([], separateData);
                    //Merging our dates back together
                    let uniqueDates = [];
                    mergedData.forEach(x => {
                        if (uniqueDates.indexOf(x.date) === -1)
                            uniqueDates.push(x.date);
                    });
                    const t_datetimes = arr.map(x => moment(x.datetime).format('YYYY-MM-DD'));
                    this.setState({ dates: t_datetimes });
                    //Mapping our names
                    const names = [];
                    arr.forEach(x => {
                        if (names.indexOf(x.name) === -1)
                            names.push(x.name);
                    });
                    //Connecting both the names, date, weight together and pushing it when we find the date, if not then display the value 0
                    var col = [];
                    col.push(uniqueDates);
                    names.forEach(nam => {
                        let obj = [];
                        obj.push(nam);
                        uniqueDates.forEach(dat => {
                            const found = mergedData.find(f => f.date === dat && f.name === nam);
                            if (found)
                                obj.push(found.weight);
                            else
                                obj.push(null);
                        })
                        col.push(obj);
                    })
                    col[0].unshift('x');
                    this.setState({ datasets: col });
                });
        })();
    }
    //Rendering our chart
    render() {
        return (
          <div>
            <div className="progress-chart">
                <div className="col-sm-12 col-md-12">
                    <Chart
                        config={{
                            size: {
                                height: 500,
                            },
                            data: {
                                x: 'x',
                                columns: this.state.datasets
                            },
                            line: {
                            connectNull: true
                          },
                            axis: {
                                x: {
                                    type: 'timeseries',
                                    tick: {
                                        multiline:true,
                                        format: '%Y-%m-%d',
                                        fit: true,
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>
            <div className="recent-row">
            <div className="col-sm-12 col-md-6">
              <StrongestToWeakest />
            </div>
            <div  className="col-sm-12 col-md-6">
              <Difference />
            </div>
          </div>
        </div>
        );
    }
}

export default Progress;
