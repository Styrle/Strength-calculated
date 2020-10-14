import React from 'react';
import 'rodal/lib/rodal.css';

class WeightsDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: this.props.preselect || '',
            optionItems: [],
            values: [59, 66, 74, 83, 93, 105, "105+"],
        };
    }
    //Creating our html elements with our values imported
    componentDidMount() {
        let tmp_arr = [];
        tmp_arr.push(<option value="" key="0">Select weight in KG</option>);
        this.state.values.forEach(x => tmp_arr.push(<option value={x} key={x}>{x}</option>));
        this.setState({optionItems: tmp_arr});
        this.setState({selectedItem: this.props.preselect});
    }
    //Setting up our form render
    render() {
        const {
            props,
        } = this;
        return (
            <div>
                <select
                    className="form-control"
                    required={props.required}
                    value={this.state.selectedItem}
                    onChange={e => {
                        this.setState({selectedItem: e.target.value});
                        props.onChange(e.target.value);
                    }}>
                    {this.state.optionItems}
                </select>
            </div>
        );
    }
}

export default WeightsDropdown;
