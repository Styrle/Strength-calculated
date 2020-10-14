import React from 'react';
import 'rodal/lib/rodal.css';
import liftService from "../services/lift";
import { swalError } from "../utils/swal";
//https://www.npmjs.com/package/react-data-table-component#demo-and-examples
import DataTable from 'react-data-table-component';
import session from '../services/session';
import './Components.css';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lifts: [],
            date: new Date(),
        };
        //Here we are loading our data and organising it as per the heviest lift for each lift name
        if (!session.get('loggedIn'))
            return;
        else
            (async () => {
                await liftService.getAllByUserId(session.get('user')._id)
                    .then(result => {
                        if (result.error) {
                            swalError(result.error);
                            return;
                        }
                        //Getting our json data and seperating it from our long string to get individual pieces of data
                        const data = result.data;
                        if (data && data.length > 0) {
                            var separateData = data.map((main, i) => {
                                return JSON.parse(data[i].lifts).map(child => {
                                    return {
                                        date: main.datetime.slice(0, 10),
                                        name: child.name,
                                        weight: Number(child.weight)
                                    }
                                });
                            })
                            //Function will sort our heaviest lifts from eachother and make sure we display the heaviest lift within the database
                            var mergedData = [].concat.apply([], separateData);
                            var display = Object.values(mergedData.reduce((r, o) => {
                                if (o.name in r) {
                                    if (o.weight > r[o.name].weight)
                                        r[o.name] = Object.assign({}, o);
                                } else {
                                    r[o.name] = Object.assign({}, o);
                                }
                                return r;
                            }, {}));
                            this.setState({ lifts: display || [] });
                        }
                    });
            })();
    }
    //Rendering our data we have setup above
    render() {
      //Setting out our columns which will receive our data
        const columns = [
            {
                name: 'Exercise',
                selector: 'name',
                sortable: true,
            },
            {
                name: 'Date',
                selector: 'date',
                sortable: true,
            },
            {
                name: 'Weight',
                selector: 'weight',
                sortable: true,
            }
        ];
        //Returning the users all time heaviest lifts, known as personal records, not personal bests
        return (
            <div>
                <div className=" col-sm-12 col-md-12">
                    <h2 className="m-4 welcome">Welcome back, {session.get('user').name}</h2>
                    <div className="col-sm-12 col-md-12 col-lg-12 home-table">
                        <DataTable
                            title='YOUR CURRENT PERSONAL RECORDS'
                            columns={columns}
                            data={this.state.lifts}
                            paginationPerPage={10}
                            pagination={true}
                            highlightOnHover={true}
                            defaultSortField="weight"
                            defaultSortAsc={false}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
