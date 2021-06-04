import SiteBucket from "./components/SiteBucket";

const tictactoeBucket = new SiteBucket({
  name: 'unbeatable-tic-tac-toe',
});

exports.tictactoeBucket = tictactoeBucket.outputs;
