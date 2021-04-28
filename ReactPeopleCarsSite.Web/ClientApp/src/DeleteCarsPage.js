import React from 'react';
import axios from 'axios';
import CarRow from './CarRow';

class DeleteCarsPage extends React.Component {

    state = {
        cars: []
    }

    componentDidMount = async () => {
        const { personId } = this.props.match.params;
        const { data } = await axios.get(`/api/peoplecars/getcars?personId=${personId}`);
        this.setState({ cars: data });
    }

    onNoClick = () => {
        this.props.history.push('/');
    }

    onYesClick = async () => {
        const { personId } = this.props.match.params;
        await axios.post(`/api/peoplecars/deletecars?personId=${personId}`);
        this.props.history.push('/');
    }

    render() {
        return (
            <>
                        <table className="table table-hover table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Make</th>
                                    <th>Model</th>
                                    <th>Year</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.cars.map(c =>
                                    <CarRow
                                        key={c.id}
                                        car={c}
                                    />)}
                            </tbody>
                        </table>
                        <h1>Are you sure you want to delete all of these cars?</h1>
                    <button onClick={this.onNoClick} className="btn btn-outline-danger btn-lg mr-3">No</button>
                    <button onClick={this.onYesClick} className="btn btn-outline-success btn-lg">Yes</button>
            </>
        )
    }
}

export default DeleteCarsPage;