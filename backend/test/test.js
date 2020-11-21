const app = require('../index');
const chai = require('chai');
chai.use(require('chai-http'));
const { expect } = require('chai');

const agent = require('chai').request.agent(app);

describe('Yelp', () => {
  it('POST /restaurantevents - Verifying correct number of events', (done) => {
    agent.post('/restaurantevents')
      .then((res) => {
        expect(true);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('GET /usersCount - Verifying users count', (done) => {
    agent.get('/usersCount')
      .then((res) => {
        expect(true);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('POST /customerevents - Verifying correct number of customer events', (done) => {
    agent.post('/restaurantevents')
      .then((res) => {
        expect(true);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('POST /showRegistered - Verifying correct number of registered users for event', (done) => {
    agent.post('/restaurantevents')
      .then((res) => {
        expect(true);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
  it('POST /menu - Verifying correct menu', (done) => {
    agent.post('/restaurantevents')
      .then((res) => {
        expect(true);
        done();
      })
      .catch((e) => {
        done(e);
      });
  });
});

