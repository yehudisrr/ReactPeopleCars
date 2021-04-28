import React from 'react';
import { produce } from 'immer';
import axios from 'axios';

class AddCarPage extends React.Component {

    state = {
        car: {
            make: '',
            model: '',
            year: '',
        },
        person: {
            firstName: '',
            lastName: ''
        }
    }

    componentDidMount = async () => {
        const { personId } = this.props.match.params;
        const { data } = await axios.get(`/api/peoplecars/getbyid?id=${personId}`);
        this.setState({ person : data });
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.car[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onAddClick = async () => {
        const { personId } = this.props.match.params;
        const { make, model, year } = this.state.car;
        await axios.post('/api/peoplecars/addcar', { make, model, year, personId });
        this.props.history.push('/');
    }

    render() {

        return (
            <div className="row" >
                <div className="col-md-6 offset-md-3 card card-body bg-light">
                    <h1> Add a car for {this.state.person.firstName} {this.state.person.lastName} </h1>
                    <input type="text" name='make' onChange={this.onTextChange} className="form-control" placeholder="Make" />
                    <br />
                    <input type="text" name='model' onChange={this.onTextChange} className="form-control" placeholder="Model" />
                    <br />
                    <input type="text" name='year' onChange={this.onTextChange} className="form-control" placeholder="Year" />
                    <br />
                    <button onClick={this.onAddClick} className="btn btn-primary btn-block">Add</button>
                </div>
            </div >
        );
    }
}

export default AddCarPage;