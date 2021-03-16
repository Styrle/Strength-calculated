import React from 'react';
import { Redirect } from "react-router-dom";
import liftService from '../services/lift';
import { swalError, swalSuccess } from "../utils/swal";
import './Components.css';
//This component stringifys our lifts and puts it into our database with a name, weight and data stamp
class AddLifts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lowerBodyLifts: ["Front Squat", "Glute Bridge", "Leg Curls", "Leg Extension", "Split Squat", "Reverse Lunge", "Calf Raise" , "Good Morning"],
            upperBodyLifts: ["Dumbbell Row", "Shoulder Press", "Face Pull", "Lat Pulldown", "Dips", "Incline Press", "Rope Pushdown", "Skullcrushers"],
            compoundLifts: ["Squat", "Bench", "Deadlift", "Overhead Press", "Snatch", "Clean & Jerk","Pull-up", "Lunge"],
            sorted: [],
            chks: [],
            showLower: false,
            redirectTo: null,
            lifts: []
        };
    }
    //This handles our onclick event when a user selects the lifts that they train most oftern
    //We will swap out txt for either lower body, compound or upper body name tags
    hanldeOption = e => {

      const isChecked = e.target.checked;
      const id = e.target.id;

      if (isChecked) {
          document.querySelector("#txt_" + id + "").style = "display:block";
          this.setState({ chks: [...this.state.chks, id] });
      } else {
          document.querySelector("#txt_" + id + "").style = "display:none";
          let t = this.state.chks.filter(x => x.toLowerCase() !== id.toLowerCase());
          this.setState({ chks: t });
      }
  }
  //This handles when our user clicks the calculate button and then stringifys our data to be ready to input into our database
    handleCalculate = async e => {
      let isFine = true;
      e.preventDefault();
      if (this.state.chks.length === 0)
          return swalError('There is no input lift');

      const arr = [];
      this.state.chks.forEach(x => {
          const name = document.querySelector("#" + x + "").value || "";
          const weight = document.querySelector("#txt_" + x + "").value;

          if (weight <= 0 || weight === "") {
              isFine = false;
              return swalError(`Enter ${name} weight`);
          }
          else
              arr.push({ name, weight });
      });
      //stringify call
      if (isFine) {
          const t = arr.sort((a, b) => b.weight - a.weight);
          await liftService.add(JSON.stringify(t))
              .then(result => {
                  if (result.error) {
                      swalError(result.error);
                      return;
                  }
                  swalSuccess('Lifts added successfully!');
                  this.setState({ redirectTo: '/recent' });
              });
      }
  }

    render() {

        return (
            <div>
              {this.state.redirectTo && <Redirect push to={this.state.redirectTo}/>}
                <div className="col-md-12">
                    <div className="col-md-6">
                        <h3 className="mt-4">SELECT THE LIFTS THAT YOUR TRAIN</h3>
                        <h5 className="mt-4" style={{ fontWeight: "400" }}>PLEASE INPUT YOUR CURRENT PERSONAL BEST, ONE REP MAXIMUM YOU HAVE SET IN THE GYM</h5>
                    </div>
                </div>
                <div className="row col-md-12 text-divider">
                    <div className="col-md-5">
                        <h5 className="c-lifts" style={{ fontWeight: "400" }}>Compound Lifts:</h5>
                    </div>
                    <div className="col-md-4">
                        <h5 className="l-lifts" style={{ fontWeight: "400" }}>Isolation Lifts:</h5>
                    </div>
                </div>
                <div className="row table-compound">
                      <table className="col-md-12 col-lg-4 table">
                          <thead>
                            <tr>
                              <th></th>
                              <th className=" lift-font">Exercise</th>
                              <th className="lift-font ">Weight</th>
                              <th></th>
                            </tr>
                          </thead>
                          {this.state.compoundLifts.map((item, i) =>
                              <tbody key={i}>
                                  <tr style={{ display: 'contents' }}>
                                      <td>
                                          <input  type="checkbox" className="lift-uncheck lift-check" value={item} id={"compound" + i}
                                              onClick={e => this.hanldeOption(e)} />
                                      </td>
                                      <td> <label className="form-check-label" htmlFor={"compound" + i}>{item}</label></td>
                                      <td><input key={item} style={{ display: "none" }} type="number" min="0" step="1" className="lift-input" id={"txt_compound" + i} /></td>
                                      <td className="KG"><span>KG</span></td>
                                  </tr>
                              </tbody>
                          )}
                      </table>
                      <div>
                          <h5 className="l-lifts2" style={{ fontWeight: "400" }}>Isolation Lifts:</h5>
                      </div>
                        <div className="col-md-1 col-lg-1">
                        </div>

                        <table className="col-md-12 col-lg-4 table">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th className="lift-font">Exercise</th>
                                    <th className="lift-font">Weight</th>
                                    <th></th>
                                  </tr>
                                </thead>
                                {this.state.upperBodyLifts.map((item, i) =>
                                        <tbody key={i}>
                                            <tr style={{ display: 'contents' }}>
                                                <td>
                                                    <input type="checkbox" className="lift-check" value={item} id={"upperBody" + i}
                                                        onClick={e => this.hanldeOption(e)} />
                                                </td>
                                                <td> <label className="form-check-label" htmlFor={"upperBody" + i}>{item}</label></td>
                                                <td><input style={{ display: "none" }} type="number" min="0" step="1" className="lift-input" id={"txt_upperBody" + i} /></td>
                                                <td><span>KG</span></td>
                                            </tr>
                                        </tbody>
                                    ) }
                              </table>
                              <table className="col-md-12 col-lg-3 table">
                                  <thead>
                                    <tr>
                                      <th></th>
                                      <th className="lift-font">Exercise</th>
                                      <th className="lift-font">Weight</th>
                                      <th></th>
                                    </tr>
                                  </thead>
                                  {
                                      this.state.lowerBodyLifts.map((item, i) =>
                                          <tbody key={i}>
                                              <tr style={{ display: 'contents' }}>
                                                  <td>
                                                      <input type="checkbox" className="lift-check" value={item} id={"lowerBody" + i}
                                                          onClick={e => this.hanldeOption(e)} />
                                                  </td>
                                                  <td> <label className="form-check-label" htmlFor={"lowerBody" + i}>{item}</label></td>
                                                  <td><input style={{ display: "none" }} type="number" min="0" step="1" className="lift-input" id={"txt_lowerBody" + i} /></td>
                                                  <td><span>KG</span></td>
                                              </tr>
                                          </tbody>
                                      )}
                                </table>
                  </div>
                <div className="row m-2" >
                    <div className=" col-md-12 text-center">
                      <button className="calculate-button" onClick={e => this.handleCalculate(e)}>Calculate
                      </button>
                    </div>
                </div>

            </div>
        );
    }
}

export default AddLifts;
