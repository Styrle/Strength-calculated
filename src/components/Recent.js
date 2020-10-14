import React from "react";
import StrongestToWeakest from "./StrongestToWeakest";
import Difference from "./Difference";

class Recent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          showHomeButton: false
        }
    }
    //This sets our button to show and components when mounting
    componentDidMount() {
        if(window.location.href.split('/').pop().toLowerCase() === 'recent') {
            this.setState({ showHomeButton: true});
        }
    }

    //Combining our two components for the page after add lifts
    render() {
        return (
        <div>

            <div className="row-recent text-center recent">
                <div className="col-sm-12 col-md-6">
                    <StrongestToWeakest />
                </div>
                <div className="col-sm-12 col-md-6">
                    <Difference />
                </div>
                {
                    this.state.showHomeButton &&
                    <div className="row">
                        <div className="col-sm-12 col-md-12">
                            <a className="progress-button" href="/home">Continue</a>
                        </div>
                    </div>
                }
            </div>
          </div>

        );
    }
}

export default Recent;
