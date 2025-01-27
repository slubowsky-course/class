export default config => {
  return (req, res, next) => {
    if (req.headers.authorization) {
      console.log(req.headers.authorization);

      const parts = req.headers.authorization.split(' ');
      console.log(parts[1]);

      const userNamePasswordBuffer = Buffer.from(parts[1], 'base64');
      console.log(userNamePasswordBuffer.toString());

      const [name, password] = userNamePasswordBuffer.toString().split(':');

      console.log(name, password);

      //if (name === 'Donald' && password === 'MAGA') {
        //return next();
      //}

      if (config.users.find(u => u.name === name && u.password === password)) {
        return next();
      }
    }

    res.writeHeader(401, {
      'WWW-Authenticate': 'Basic realm="PCS APP'
    });
    res.end('Nope');
  };
};
