// Bot API action constants
module.exports = Object.freeze({
  identifier: "quote",
  actions: ["create", "get", "getById", "random", "power_on", "power_off"],
  schema: {
    create: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 10,
          max: 220,
          pattern: "alphanumeric"
        }
      ]
    },
    get: {
      arg_count: 0,
      args: []
    },
    random: {
      arg_count: 0,
      args: []
    },
    getById: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 3,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    },
    power_on: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 3,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    },
    power_off: {
      arg_count: 1,
      args: [
        {
          name: "name",
          type: "string",
          min: 3,
          max: 15,
          pattern: "alphanumeric"
        }
      ]
    }
  }
});

