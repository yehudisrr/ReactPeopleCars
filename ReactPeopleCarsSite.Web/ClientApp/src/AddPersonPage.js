import React from 'react';
import { produce } from 'immer';
import axios from 'axios';

class AddPersonPage extends React.Component {

    state = {
        person: {
            firstName: '',
            lastName: '',
            age: ''
        }
    }

    onTextChange = e => {
        const nextState = produce(this.state, draftState => {
            draftState.person[e.target.name] = e.target.value;
        });
        this.setState(nextState);
    }

    onAddClick = async () => {
        await axios.post('/api/peoplecars/addperson', this.state.person);
        this.props.history.push('/'); 
    }

    render() {
        return (
            <div className="row" >
                <div className="col-md-6 offset-md-3 card card-body bg-light">
                    <input type="text" name='firstName' onChange={this.onTextChange} className="form-control" placeholder="First Name" />
                    <br />
                    <input type="text" name='lastName' onChange={this.onTextChange} className="form-control" placeholder="Last Name" />
                    <br />
                    <input type="text" name='age' onChange={this.onTextChange} className="form-control" placeholder="Age" />
                    <br />
                    <button onClick={this.onAddClick} className="btn btn-primary btn-block">Add</button>
                </div>
            </div >
        );
    }
}

export default AddPersonPage;