import React from 'react';
import 'rodal/lib/rodal.css';
//Creating our AgeDropdown component so users can put in their age catagory
class AgesDropdown extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedItem: this.props.preselect || '',
            optionItems: [],
            values: ["Sub Junior (16-18)", "Junior (19-23)", "Senior (24-40)", "Masters 1 (41-49)", "Masters 2 (50-59)", "Masters 3 (60-69)"],
        };
    }

    componentDidMount() {
        let tmp_arr = [];
        tmp_arr.push(<option value="" key="0">Select age</option>);
        this.state.values.forEach(x => tmp_arr.push(<option value={x} key={x}>{x}</option>));
        this.setState({optionItems: tmp_arr});
        this.setState({selectedItem: this.props.preselect});
    }

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

export default AgesDropdown;
