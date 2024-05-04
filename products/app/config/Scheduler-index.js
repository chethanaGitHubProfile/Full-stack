module.exports = {
  hello: {
    frequency: "* * * * * *",
    handler: "handler/sayHello",
  },

  goodBye: {
    frequency: "* * * * * *",
    handler: "handler/goodBye",
  },
  tacos: {
    frequency: "* * * * * *",
    handler: "handler/tacos",
  },
};
