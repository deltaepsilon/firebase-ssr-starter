const deleteObject = jest.fn();
const deleteObjects = jest.fn();
const saveObject = jest.fn();
const saveObjects = jest.fn();

module.exports = ({ environment }) => {
  return {
    usersIndex: 'fake users',
    deleteObject: index => deleteObject,
    deleteObjects: index => deleteObjects,
    saveObject: index => saveObject,
    saveObjects: index => saveObjects,
  };
};
