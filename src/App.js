/* eslint-disable no-unused-vars */
import {Route, Switch} from 'react-router-dom'
import Home from './components/Home'
import LoginPage from './components/LoginPage'
import JobsPage from './components/JobsPage'
import JobDetails from './components/JobDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/jobs" component={JobsPage} />
      <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
      <Route component={NotFound} />
    </Switch>
  </>
)
export default App
