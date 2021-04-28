import React from 'react';
import PersonRow from './PersonRow';
import { Link } from 'react-router-dom';
import axios from 'axios';


class PeopleTable extends React.Component {
    state = {
        people: []
    }

    componentDidMount = async () => {
        await this.refreshPeople();
    }

    refreshPeople = async () => {
        const { data } = await axios.get('/api/peoplecars/getpeople');
        this.setState({ people: data });
    }

    render() {
        return (
            <>
                <Link to={`/addperson/`}>
                    <button className="btn btn-outline-success btn-block">Add Person</button>
                </Link>
                <br></br>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Age</th>
                            <th>Car Count</th>
                            <th>Add Car</th>
                            <th>Delete Cars</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.people.map(p =>
                            <PersonRow
                                key={p.id}
                                person={p}
                            />)}
                    </tbody>
                </table>
            </>
        )
    }
}

export default PeopleTable;