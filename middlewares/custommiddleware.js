/*module.exports = (req, res, next) => {
  if (req.params.name) {
    if (req.params.name == 'danger') {
      console.log('Came in error');
      res.json({ status: 0, debug_daa: 'you can not send danger as name' });
    } else {
      console.log('came here');
      //pass the request to next function handler
      next();
    }
  }
};*/
function custommiddleware(req, res, next) {
  if (req.params.name) {
    if (req.params.name == 'danger') {
      console.log('Came in error');
      res.json({ status: 0, debug_daa: 'you can not send danger as name' });
    }
  }
  next();
}
module.exports = custommiddleware;
