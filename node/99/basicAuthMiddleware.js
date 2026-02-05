export default (config) => {
  return (req, res, next) => {
    if (req.headers.authorization) {
      const [, usernamePassword] = req.headers.authorization.split(' ');

      //console.log(usernamePassword);

      const buffer = Buffer.from(usernamePassword, 'base64');

      //console.log(buffer.toString());

      const [user, pwd] = buffer.toString().split(':');

      /*if (user === 'Donald' && pwd === 'MAGA!') {
        return next();
      }*/

      if (config.users.find(u => u.user === user && u.pwd === pwd)) {
        return next();
      }
    }

    res.writeHead(401, [
      'WWW-Authenticate', 'Basic realm="PCS App"'
    ]);

    res.end('You are not authorized to view this page!');
  };
}
