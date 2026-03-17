import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Dashboard from '../dashboard';
import NotFound from '../shared/components/NotFound';

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Dashboard} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
};

export default Routes;