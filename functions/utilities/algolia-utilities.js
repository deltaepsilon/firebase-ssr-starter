const { promisify } = require('util');
const algoliasearch = require('algoliasearch');

module.exports = ({ environment }) => {
  const {
    algolia: { applicationId, adminApiKey, prefix },
    schema: { users },
  } = environment;

  const client = algoliasearch(applicationId, adminApiKey);

  return {
    usersIndex: client.initIndex(`${prefix}:${users}`),
    deleteObject: index => promisify(index.deleteObject.bind(index)),
    deleteObjects: index => promisify(index.deleteObjects.bind(index)),
    saveObject: index => promisify(index.saveObject.bind(index)),
    saveObjects: index => promisify(index.saveObjects.bind(index)),
  };
};
