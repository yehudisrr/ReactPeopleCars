import React from 'react';
import { Route } from 'react-router-dom';
import PeopleTable from './PeopleTable';
import AddPersonPage from './AddPersonPage';
import AddCarPage from './AddCarPage';
import DeleteCarsPage from './DeleteCarsPage';
import Layout from './Layout';


const App = () => {
    return (
        <Layout>
            <Route exact path='/' component={PeopleTable} />
            <Route exact path='/addperson/' component={AddPersonPage} />
            <Route exact path='/addcar/:personId' component={AddCarPage} />
            <Route exact path='/deletecars/:personId' component={DeleteCarsPage} />
        </Layout>
    )
}

export default App;