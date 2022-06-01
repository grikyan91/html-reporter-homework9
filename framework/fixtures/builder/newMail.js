const { faker } = require('@faker-js/faker');

const BuildMail = function () {
  this.addUsername = function () {
    this.username = faker.name.firstName();
    return this;
  };
  this.addDomainName = function () {
    this.domainname = faker.internet.domainName();
    return this;
  };
  this.generate = function () {
    const fields = Object.getOwnPropertyNames(this);
    const data = {};
    
    fields.forEach((fieldName) => {
        if (this[fieldName] && typeof this[fieldName] !== 'function') {
          data[fieldName] = this[fieldName];
        }
    });
    return data;
  };
};

export default BuildMail;
