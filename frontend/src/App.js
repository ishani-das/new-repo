// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;


import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import USAMap from 'react-usa-map';
import StatePage from './StatePage';
import BillPage from './BillPage';
import './App.css';

import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import FormHelperText from '@mui/joy/FormHelperText';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

class App extends React.Component {

  HomePageCustomConfig = () => {
    // https://www.270towin.com/
    return {
      "WA": { fill: "navy", }, "OR": { fill: "navy", }, "CA": { fill: "navy", }, "CO": { fill: "navy", }, "NM": { fill: "navy", }, "MN": { fill: "navy", },
      "IL": { fill: "navy", }, "VA": { fill: "navy", }, "NY": { fill: "navy", }, "ME": { fill: "navy", }, "VT": { fill: "navy", }, "NH": { fill: "navy", },
      "MA": { fill: "navy", }, "RI": { fill: "navy", }, "CT": { fill: "navy", }, "NJ": { fill: "navy", }, "DE": { fill: "navy", }, "MD": { fill: "navy", }, "DC": { fill: "navy", },

      "ID": { fill: "red", }, "MT": { fill: "red", }, "WY": { fill: "red", }, "UT": { fill: "red", }, "ND": { fill: "red", }, "SD": { fill: "red", },
      "NE": { fill: "red", }, "KS": { fill: "red", }, "IA": { fill: "red", }, "MO": { fill: "red", }, "OK": { fill: "red", }, "MO": { fill: "red", },
      "AR": { fill: "red", }, "TX": { fill: "red", }, "LA": { fill: "red", }, "MS": { fill: "red", }, "AL": { fill: "red", }, "GA": { fill: "red", },
      "TN": { fill: "red", }, "SC": { fill: "red", }, "FL": { fill: "red", }, "NC": { fill: "red", }, "KY": { fill: "red", }, "WV": { fill: "red", }, "IN": { fill: "red", }, "OH": { fill: "red", },
    }
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<HomePage HomePageCustomConfig={this.HomePageCustomConfig} />} />
          <Route path="/bills/:stateCode" element={<StatePage />} />
          <Route path="/bill/:billId" element={<BillPage />} />
        </Routes>
      </Router>
    )
  }
}

const HomePage = ({ HomePageCustomConfig }) => {

  // --------------------------------------------
  const [data, setData] = React.useState({
    email: '',
    status: 'initial',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setData((current) => ({ ...current, status: 'loading' }));
    try {
      // Replace timeout with real backend operation
      setTimeout(() => {
        setData({ email: '', status: 'sent' });
      }, 1500);
    } catch (error) {
      setData((current) => ({ ...current, status: 'failure' }));
    }
  };
  // --------------------------------------------


  const navigate = useNavigate();

  const mapHandler = (event) => {
    const stateCode = event.target.dataset.name;
    console.log(`${stateCode} CLICKED!`);
    navigate(`/bills/${stateCode}`);
  }

  return (
    <div>
      <h1>welcome! click on any state to get started.</h1>

      <form onSubmit={handleSubmit} id="demo">
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
          })}
        >
          Join our Newsletter to receive weekly updates!
        </FormLabel>
        <Input
          sx={{ '--Input-decoratorChildHeight': '45px' }}
          placeholder="imavoter@gmail.com"
          type="email"
          required
          value={data.email}
          onChange={(event) =>
            setData({ email: event.target.value, status: 'initial' })
          }
          error={data.status === 'failure'}
          endDecorator={
            <Button
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Subscribe
            </Button>
          }
        />
        {data.status === 'failure' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
          >
            Oops! something went wrong, please try again later.
          </FormHelperText>
        )}

        {data.status === 'sent' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
          >
            You're all set! Check your mailbox for an email from us.
          </FormHelperText>
        )}
      </FormControl>
    </form>



      {/* <form onSubmit={handleSubmit} id="demo">
      <FormControl>
        <FormLabel
          sx={(theme) => ({
            '--FormLabel-color': theme.vars.palette.primary.plainColor,
          })}
        >
          MUI Newsletter
        </FormLabel>
        <Input
          sx={{ '--Input-decoratorChildHeight': '45px' }}
          placeholder="mail@mui.com"
          type="email"
          required
          value={data.email}
          onChange={(event) =>
            setData({ email: event.target.value, status: 'initial' })
          }
          error={data.status === 'failure'}
          endDecorator={
            <Button
              variant="solid"
              color="primary"
              loading={data.status === 'loading'}
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Subscribe
            </Button>
          }
        />
        {data.status === 'failure' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.danger[400] })}
          >
            Oops! something went wrong, please try again later.
          </FormHelperText>
        )}
        {data.status === 'sent' && (
          <FormHelperText
            sx={(theme) => ({ color: theme.vars.palette.primary[400] })}
          >
            You are all set!
          </FormHelperText>
        )}
      </FormControl>
    </form> */}









      <div className="map-container">
        <USAMap
          customize={HomePageCustomConfig()}
          onClick={mapHandler}
        />
      </div>
    </div>
  )
}

export default App;
